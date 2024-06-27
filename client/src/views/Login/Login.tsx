import { Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Logo from "../../assets/svg/Logo";
import SignIn from "./SignIn";
import "./index.css";

const Login: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Grid className="container" container direction="row" flexWrap="nowrap">
            <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                className="company-logo"
                direction="column"
            >
                <Logo />
                <Typography color="white" variant="h3">
                    {t("login.companyname")}
                </Typography>
            </Grid>
            <Grid container item>
                <SignIn />
            </Grid>
        </Grid>
    );
};

export default Login;
