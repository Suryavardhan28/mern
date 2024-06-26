import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            "50": "#e6f0ff",
            "100": "#ccddff",
            "200": "#99bbff",
            "300": "#66a3ff",
            "400": "#338cff",
            "500": "#0073ff",
            "600": "#0066e6",
            "700": "#0059cc",
            "800": "#004db3",
            "900": "#004099",
            main: "#0073ff",
            light: "#66a3ff",
            dark: "#0059cc",
            contrastText: "#fff",
        },
        secondary: {
            "50": "#f2f4f9",
            "100": "#e5eaf3",
            "200": "#dfe4f1",
            "300": "#ccd1e8",
            "400": "#b9bee0",
            "500": "#a6a9d9",
            "600": "#808fb3",
            "700": "#666a80",
            "800": "#383a45",
            "900": "#1f1f2f",
            main: "#dfe4f1",
            contrastText: "#383a45",
            light: "#e5e8e6",
            dark: "#6e6f9c",
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
            "50": "#f2f4f9",
            "100": "#e5eaf3",
            "200": "#dfe4f1",
            "300": "#ccd1e8",
            "400": "#b9bee0",
            "500": "#a6a9d9",
            "600": "#808fb3",
            "700": "#666a80",
            "800": "#383a45",
            "900": "#1f1f2f",
            A100: "#f5f5f5",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
        },
        error: {
            "50": "#ffe8e8",
            "100": "#ffcccc",
            "200": "#ffb3b3",
            "300": "#ff9999",
            "400": "#ff8080",
            "500": "#ff6666",
            "600": "#ff4d4d",
            "700": "#ff3333",
            "800": "#ff1a1a",
            "900": "#ff0000",
            main: "#ff6666",
            light: "#ff9999",
            dark: "#ff3333",
            contrastText: "#fff",
        },
        success: {
            "50": "#e8f5e9",
            "100": "#c8e6c9",
            "200": "#a5d6a7",
            "300": "#81c784",
            "400": "#66bb6a",
            "500": "#4caf50",
            "600": "#43a047",
            "700": "#388e3c",
            "800": "#2e7d32",
            "900": "#1b5e20",
            main: "#388e3c",
            light: "#81c784",
            dark: "#388e3c",
            contrastText: "#fff",
        },
        warning: {
            "50": "#fffbea",
            "100": "#fff3c4",
            "200": "#ffeaa7",
            "300": "#ffe082",
            "400": "#ffda58",
            "500": "#ffd333",
            "600": "#ffc700",
            "700": "#ffbb00",
            "800": "#ffb000",
            "900": "#ffa500",
            main: "#ffd333",
            light: "#ffe082",
            dark: "#ffbb00",
            contrastText: "rgba(0, 0, 0, 0.87)",
        },
        info: {
            main: "#0288d1",
            light: "#03a9f4",
            dark: "#01579b",
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
