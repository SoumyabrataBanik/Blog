import { Button, Navbar, TextInput } from "flowbite-react";
import { FaMoon } from "react-icons/fa";
import { HiSearch } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const path = useLocation().pathname;
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
                >
                    <FaMoon />
                </Button>
                <Link to="/sign-up">
                    <Button
                        gradientDuoTone="purpleToPink"
                        className="h-10 flex items-center justify-center"
                    >
                        Sign Up
                    </Button>
                </Link>
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
