import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { RootState } from "../../reducers";
import { updatePassword } from "../../reducers/userSlice/actions";
import { ModalProps, PasswordUpdateValues, modalStyle } from "./utils";
const UpdatePassword: React.FC<ModalProps> = ({ open, handleClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch() as any;
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const [loading, setLoading] = useState(false);
    const validationSchema = yup.object({
        password: yup.string().required("Current password is required"),
        newPassword: yup.string().required("New password is required"),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref("newPassword"), undefined], "Passwords must match")
            .required("Confirm password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: userInfo?.email,
            password: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema,
        onSubmit: async (values: PasswordUpdateValues) => {
            setLoading(true);
            dispatch(updatePassword(values))
                .then(() => {
                    setLoading(false);
                })
                .catch((error: any) => {
                    setLoading(false);
                    console.error("Error updating profile :", error);
                });
        },
    });

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <form onSubmit={formik.handleSubmit}>
                        <Typography textAlign="center" variant="h4">
                            {t("header.password.title")}
                        </Typography>
                        <TextField
                            id="password"
                            name="password"
                            margin="normal"
                            label={t("header.password.currentPassword")}
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
                            id="newPassword"
                            name="newPassword"
                            margin="normal"
                            label={t("header.password.newPassword")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="password"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.newPassword &&
                                Boolean(formik.errors.newPassword)
                            }
                            helperText={
                                formik.touched.newPassword &&
                                formik.errors.newPassword
                            }
                        />
                        <TextField
                            id="confirmPassword"
                            name="confirmPassword"
                            margin="normal"
                            label={t("header.password.confirmPassword")}
                            variant="outlined"
                            size="small"
                            fullWidth
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={
                                formik.touched.confirmPassword &&
                                Boolean(formik.errors.confirmPassword)
                            }
                            helperText={
                                formik.touched.confirmPassword &&
                                formik.errors.confirmPassword
                            }
                        />
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            size="medium"
                            fullWidth
                            loading={loading}
                            sx={{ margin: "20px 0" }}
                        >
                            <Typography>
                                {t("header.password.update")}
                            </Typography>
                        </LoadingButton>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdatePassword;
