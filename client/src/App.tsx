import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./views/Home";
import "./App.css";

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
