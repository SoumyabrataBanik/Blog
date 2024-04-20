import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { RootState } from "../redux-store/store";
import { toggleTheme } from "../redux-store/theme/themeSlice";

export default function Header() {
    const path = useLocation().pathname;

    const dispatch = useDispatch();
    const { currentUser } = useSelector((state: RootState) => state.user);
    const { theme } = useSelector((state: RootState) => state.theme);

    const onToggleThemeClick = () => {
        dispatch(toggleTheme());
    };

    return (
        <Navbar className="border-b-2">
            <Link
                to="/"
                className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
            >
                <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-400 to-pink-400 rounded-md text-white">
                    Soumyabrata's
                </span>{" "}
                Blog
            </Link>

            <form>
                <TextInput
                    type="text"
                    placeholder="Search..."
                    rightIcon={HiSearch}
                    className="hidden lg:inline"
                />
            </form>
            <Button
                className="w-12 h-10 flex items-center justify-center"
                color="gray"
            >
                <HiSearch />
            </Button>

            <div className="flex items-center justify-center gap-3 md:order-2">
                <Button
                    className="w-12 h-10 hidden sm:flex sm:items-center sm:justify-center"
                    color="gray"
                    onClick={onToggleThemeClick}
                >
                    {theme === "light" ? <FaMoon /> : <FaSun />}
                </Button>
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="user-avatar"
                                img={currentUser.avatar}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header className="block text-sm">
                            @{currentUser.userName}
                        </Dropdown.Header>
                        <Dropdown.Header className="text-sm font-semibold block truncate">
                            @{currentUser.email}
                        </Dropdown.Header>
                        <Link to="/dashboard?tab=profile">
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/sign-up">
                        <Button
                            gradientDuoTone="purpleToPink"
                            outline
                            className="h-10 flex items-center justify-center"
                        >
                            Sign Up
                        </Button>
                    </Link>
                )}
            </div>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <Navbar.Link
                    active={path === "/"}
                    as="div"
                >
                    <Link to="/">Home</Link>
                </Navbar.Link>
                <Navbar.Link
                    active={path === "/about"}
                    as="div"
                >
                    <Link to="/about">About</Link>
                </Navbar.Link>
                <Navbar.Link
                    active={path === "/projects"}
                    as="div"
                >
                    <Link to="/projects">Projects</Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    );
}
