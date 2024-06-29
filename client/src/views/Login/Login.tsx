import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/svg/Logo";
import SignIn from "./SignIn";

const Login: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    return (
        <Grid
            sx={{ height: "100vh" }}
            container
            direction="row"
            flexWrap="nowrap"
        >
            <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                className="company-logo"
                direction="column"
                sx={{ backgroundColor: theme.palette.common.black }}
            >
                <Logo />
                <Typography color={theme.palette.common.white} variant="h3">
                    {t("companyName")}
                </Typography>
            </Grid>
            <Grid container item>
                <SignIn />
            </Grid>
        </Grid>
    );
};

export default Login;
