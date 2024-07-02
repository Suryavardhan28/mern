import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import { refresh } from "./reducers/userSlice/actions";
import Home from "./views/Home";
import SignIn from "./views/login/SignIn";
import SignUp from "./views/login/SignUp";
const App: React.FC = () => {
    const dispatch = useDispatch() as any;

    useEffect(() => {
        console.log("Calling refresh token use effect");
        dispatch(refresh())
            .then(() => {
                console.log("Token refreshed successfully");
            })
            .catch((error: any) => {
                console.error("Error while refreshing token:", error);
            });
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route
                    path="/home"
                    element={<PrivateRoute element={<Home />} />}
                />
                <Route
                    path="/"
                    element={<PublicRoute element={<SignIn />} restricted />}
                />
                <Route
                    path="/signup"
                    element={<PublicRoute element={<SignUp />} />}
                />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default App;
