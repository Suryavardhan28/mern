import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../reducers";

interface PublicRouteProps {
    element: React.ReactElement;
    restricted?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ element, restricted }) => {
    const userInfo = useSelector((state: RootState) => state.user.userInfo);

    return userInfo && restricted ? <Navigate to="/home" /> : element;
};

export default PublicRoute;
