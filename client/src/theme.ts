import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#673ab7",
            light: "#9575cd",
            dark: "#4527a0",
            contrastText: "#fff",
            50: "#ede7f6",
            100: "#d1c4e9",
            200: "#b39ddb",
            300: "#9575cd",
            400: "#7e57c2",
            500: "#673ab7",
            600: "#5e35b1",
            700: "#512da8",
            800: "#4527a0",
            900: "#311b92",
            A100: "#b388ff",
            A200: "#7c4dff",
            A400: "#651fff",
            A700: "#6200ea",
        },
        secondary: {
            main: "#e91e63",
            light: "#f06292",
            dark: "#c2185b",
            contrastText: "#fff",
            50: "#fce4ec",
            100: "#f8bbd0",
            200: "#f48fb1",
            300: "#f06292",
            400: "#ec407a",
            500: "#e91e63",
            600: "#d81b60",
            700: "#c2185b",
            800: "#ad1457",
            900: "#880e4f",
        },
        divider: "#e5eaf3",
        common: {
            black: "#000",
            white: "#fff",
        },
        text: {
            primary: "#1f1f2f",
            secondary: "#383a45",
            disabled: "rgba(0, 0, 0, 0.38)",
        },
        grey: {
            50: "#f2f4f9",
            100: "#e5eaf3",
            200: "#dfe4f1",
            300: "#ccd1e8",
            400: "#b9bee0",
            500: "#a6a9d9",
            600: "#808fb3",
            700: "#666a80",
            800: "#383a45",
            900: "#1f1f2f",
            A100: "#f5f5f5",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
        },
        error: {
            main: "#f44336",
            light: "#e57373",
            dark: "#d32f2f",
            contrastText: "#fff",
        },
        success: {
            main: "#4caf50",
            light: "#81c784",
            dark: "#388e3c",
            contrastText: "#fff",
        },
        warning: {
            main: "#ff9800",
            light: "#ffb74d",
            dark: "#f57c00",
            contrastText: "#000",
        },
        info: {
            main: "#2196f3",
            light: "#64b5f6",
            dark: "#1976d2",
            contrastText: "#fff",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        background: {
            paper: "#fff",
            default: "#fff",
        },
        action: {
            active: "rgba(0, 0, 0, 0.54)",
            hover: "rgba(0, 0, 0, 0.04)",
            hoverOpacity: 0.04,
            selected: "rgba(0, 0, 0, 0.08)",
            selectedOpacity: 0.08,
            disabled: "rgba(0, 0, 0, 0.26)",
            disabledBackground: "rgba(0, 0, 0, 0.12)",
            disabledOpacity: 0.38,
            focus: "rgba(0, 0, 0, 0.12)",
            focusOpacity: 0.12,
            activatedOpacity: 0.12,
        },
    },
    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
});

export default theme;
