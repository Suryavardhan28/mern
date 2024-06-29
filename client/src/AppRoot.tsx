import { ThemeProvider } from "@mui/material";
import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import "./App.css";
import store from "./store";
import theme from "./theme";

const AppRoot: React.FC = () => {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Provider>
    );
};

export default AppRoot;
