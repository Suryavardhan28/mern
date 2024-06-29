import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
    Button,
    Grid,
    Link as MuiLink,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Logo from "../../assets/svg/Logo";
import { SignUpFormValues } from "./utils";

const validationSchema = yup.object({
    firstName: yup.string().required("Firstname is required"),
    lastName: yup.string().required("Lastname is required"),
    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required")
        .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, "Invalid email"),
    password: yup.string().required("Password is required"),
    organization: yup.string().required("Organization is required"),
    contact: yup
        .string()
        .required("Contact information is required")
        .matches(/^[0-9]+$/, "Invalid contact number"),
});

const SignUp: React.FC = () => {
    const { t } = useTranslation();
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            organization: "",
            contact: "",
        },
        validationSchema: validationSchema,
        onSubmit: async (values: SignUpFormValues) => {
            try {
                const response = await axios.post("/api/users/signup", values);
                console.log("User registered successfully:", response.data);
            } catch (error) {
                console.error("Error registering user:", error);
            }
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
                            {t("login.signUp.title")}
                        </Typography>
                        <TextField
                            id="firstName"
                            name="firstName"
                            margin="normal"
                            label={t("login.signUp.firstName")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.firstName &&
                                Boolean(formik.errors.firstName)
                            }
                            helperText={
                                formik.touched.firstName &&
                                formik.errors.firstName
                            }
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            margin="normal"
                            label={t("login.signUp.lastName")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.lastName &&
                                Boolean(formik.errors.lastName)
                            }
                            helperText={
                                formik.touched.lastName &&
                                formik.errors.lastName
                            }
                        />
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
                        <TextField
                            id="organization"
                            name="organization"
                            margin="normal"
                            label={t("login.signUp.organization")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="text"
                            value={formik.values.organization}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.organization &&
                                Boolean(formik.errors.organization)
                            }
                            helperText={
                                formik.touched.organization &&
                                formik.errors.organization
                            }
                        />
                        <TextField
                            id="contact"
                            name="contact"
                            margin="normal"
                            label={t("login.signUp.contact")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="text"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.contact &&
                                Boolean(formik.errors.contact)
                            }
                            helperText={
                                formik.touched.contact && formik.errors.contact
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
                    <Typography textAlign="center">
                        {t("login.signUp.existingAccount")}
                        <MuiLink component={Link} to="/">
                            {t("login.signIn.title")}
                        </MuiLink>
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SignUp;
