import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LoadingButton from "@mui/lab/LoadingButton";
import {
    Grid,
    Link as MuiLink,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Logo from "../../assets/svg/Logo";
import { login } from "../../reducers/userSlice/actions";
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
    const theme = useTheme();
    const dispatch = useDispatch() as any;
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: SignInFormValues) => {
            setLoading(true);
            dispatch(login(values))
                .then(() => {
                    setLoading(false);
                    navigate("/home");
                })
                .catch((error: any) => {
                    setLoading(false);
                    console.error("Error logging in user:", error);
                });
        },
    });

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
            <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
            >
                <Grid item sx={{ maxWidth: "40%" }}>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography textAlign="center" variant="h3">
                            {t("login.signIn.title")}
                        </Typography>
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
                            error={
                                formik.touched.email &&
                                Boolean(formik.errors.email)
                            }
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
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
                                formik.touched.password &&
                                formik.errors.password
                            }
                        />
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            size="medium"
                            endIcon={<LocalShippingIcon />}
                            fullWidth
                            loading={loading}
                            sx={{ margin: "20px 0" }}
                        >
                            <Typography>{t("login.button")}</Typography>
                        </LoadingButton>
                    </form>
                    <Typography textAlign="center">
                        {t("login.signIn.createAccount")}
                        <MuiLink component={Link} to="/signup">
                            {t("login.signUp.title")}
                        </MuiLink>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default SignIn;
