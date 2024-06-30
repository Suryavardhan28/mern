import React from "react";
import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes,
} from "react-router-dom";
import "./App.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Home from "./views/Home";
import SignIn from "./views/login/SignIn";
import SignUp from "./views/login/SignUp";

const App: React.FC = () => {
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
