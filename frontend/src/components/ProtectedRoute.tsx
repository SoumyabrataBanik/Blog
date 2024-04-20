import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import type { RootState } from "../redux-store/store";

const ProtectedRoute = (): JSX.Element => {
    const { currentUser } = useSelector((state: RootState) => state.user);

    return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
