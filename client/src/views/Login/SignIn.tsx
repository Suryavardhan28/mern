import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { SignInFormValues } from "./utils";

const validationSchema = yup.object({
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: yup.string().required("Password is required"),
});

const SignIn: React.FC = () => {
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values: SignInFormValues) => {
            console.log("Form submitted with values:", values);
        },
    });
    return (
        <Grid
            container
            item
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            sx={{ margin: "30%" }}
        >
            <form onSubmit={formik.handleSubmit}>
                <Typography variant="h3">{t("login.signin.title")}</Typography>
                <TextField
                    id="email"
                    name="email"
                    margin="normal"
                    label={t("login.email")}
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    id="password"
                    name="password"
                    margin="normal"
                    label={t("login.password")}
                    variant="outlined"
                    size="small"
                    fullWidth
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                    }
                    helperText={
                        formik.touched.password && formik.errors.password
                    }
                />
                <Button
                    type="submit"
                    variant="contained"
                    size="medium"
                    endIcon={<LocalShippingIcon />}
                    fullWidth
                    sx={{ margin: "20px 0" }}
                >
                    <Typography>{t("login.button")}</Typography>
                </Button>
            </form>
        </Grid>
    );
};
export default SignIn;
