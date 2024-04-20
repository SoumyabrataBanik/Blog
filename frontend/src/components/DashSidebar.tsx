import { useSelector } from "react-redux";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUser } from "react-icons/hi";

import { RootState } from "../redux-store/store";
import { Link } from "react-router-dom";

const DashSidebar = () => {
    const { tab } = useSelector((state: RootState) => state.tab);
    const { theme } = useSelector((state: RootState) => state.theme);
    const labelColor = theme === "dark" ? "light" : "dark";

    return (
        <Sidebar className="w-full md:w-72">
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to="/dashboard?tab=profile">
                        <Sidebar.Item
                            icon={HiUser}
                            active={tab === "profile"}
                            label={"User"}
                            labelColor={labelColor}
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight}>Sign Out</Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default DashSidebar;
