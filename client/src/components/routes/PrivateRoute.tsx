import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../reducers";

interface PrivateRouteProps {
    element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    return userInfo ? element : <Navigate to="/" />;
};

export default PrivateRoute;
