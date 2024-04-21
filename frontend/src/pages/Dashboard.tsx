import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import DashProfile from "../components/DashProfile";
import DashSidebar from "../components/DashSidebar";
import { setTab } from "../redux-store/current-tab/currentTabSlice";
import { RootState } from "../redux-store/store";

export default function Dashboard() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { tab } = useSelector((state: RootState) => state.tab);

    useEffect(() => {
        const urlFromParams = new URLSearchParams(location.search);
        const tabFromParams = urlFromParams.get("tab") || "";
        dispatch(setTab(tabFromParams));
    }, [location.search, dispatch]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            <div className="md:w-72">
                {/* Sidebar */}
                <DashSidebar />
            </div>
            <div className="w-full">
                {/* Profile */}
                {tab === "profile" && <DashProfile />}
            </div>
        </div>
    );
}
