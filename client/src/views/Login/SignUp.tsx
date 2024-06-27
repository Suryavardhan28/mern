import { Grid, TextField, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const SignUp: React.FC = () => {
    const { t } = useTranslation();
    return (
        <Grid container justifyContent="center" alignItems="center">
            <Typography variant="h3">{t("login.signup.title")}</Typography>
            <TextField label={t("outlined")} variant="outlined" />
        </Grid>
    );
};

export default SignUp;
