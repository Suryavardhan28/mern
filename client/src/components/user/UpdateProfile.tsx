import { LoadingButton } from "@mui/lab";
import { Box, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { RootState } from "../../reducers";
import { updateProfile } from "../../reducers/userSlice/actions";
import { ModalProps, ProfileUpdateValues, modalStyle } from "./utils";

const UpdateProfile: React.FC<ModalProps> = ({ open, handleClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch() as any;
    const userInfo = useSelector((state: RootState) => state.user.userInfo);
    const [loading, setLoading] = useState(false);
    const validationSchema = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string().required("Last name is required"),
        contact: yup.string().required("Contact information is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: userInfo?.email,
            firstName: userInfo?.firstName || "",
            lastName: userInfo?.lastName || "",
            contact: userInfo?.contact || "",
        },
        validationSchema,
        onSubmit: async (values: ProfileUpdateValues) => {
            setLoading(true);
            dispatch(updateProfile(values))
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
                            {t("header.myAccount")}
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
                            value={userInfo?.email}
                            disabled
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
                            value={userInfo?.organization}
                            disabled
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
                        <LoadingButton
                            type="submit"
                            variant="contained"
                            size="medium"
                            fullWidth
                            loading={loading}
                            sx={{ margin: "20px 0" }}
                        >
                            <Typography>{t("header.updateDetails")}</Typography>
                        </LoadingButton>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default UpdateProfile;
