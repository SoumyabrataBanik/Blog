import { useSelector } from "react-redux";
import type { RootState } from "../redux-store/store";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
