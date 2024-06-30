export interface ProfileUpdateValues {
    email: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    contact: string | undefined;
}
export interface PasswordUpdateValues {
    email: string | undefined;
    password: string;
    newPassword: string;
    confirmPassword: string;
}

export const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    outline: 0,
};

export interface ModalProps {
    open: boolean;
    handleClose: () => void;
}
