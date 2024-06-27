import { orange, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: red,
        secondary: orange,
    },

    typography: {
        fontFamily: '"Poppins", sans-serif',
    },
});

export default theme;
