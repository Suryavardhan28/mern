import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SignIn: React.FC = () => {
    const { t } = useTranslation();

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
        >
            <Typography variant="h3">{t("login.signin.title")}</Typography>
            <TextField
                margin="normal"
                label={t("login.signin.username")}
                variant="outlined"
            />
            <TextField
                margin="normal"
                label={t("login.signin.password")}
                variant="outlined"
            />
            <Button variant="contained" endIcon={<LocalShippingIcon />}>
                Start Shipping
            </Button>
        </Grid>
    );
};
export default SignIn;
