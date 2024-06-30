import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { Tooltip } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers";
import { logout } from "../reducers/userSlice/actions";
import UpdatePassword from "./user/UpdatePassword";
import UpdateProfile from "./user/UpdateProfile";

const Header: React.FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch() as any;

    const user = useSelector((state: RootState) => state.user.userInfo);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleProfileOpen = () => {
        setProfileModalOpen(true);
    };
    const handleProfileClose = () => {
        setProfileModalOpen(false);
    };
    const handlePasswordOpen = () => {
        setPasswordModalOpen(true);
    };
    const handlePasswordClose = () => {
        setPasswordModalOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: "1" }} />
                    {user && (
                        <div>
                            <Tooltip title={user.firstName}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleProfileOpen}>
                                    {t("header.account")}
                                </MenuItem>
                                <MenuItem onClick={handlePasswordOpen}>
                                    {t("header.password.title")}
                                </MenuItem>
                                <MenuItem onClick={handleLogout}>
                                    {t("header.logout")}
                                </MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            <UpdateProfile
                open={profileModalOpen}
                handleClose={handleProfileClose}
            />
            <UpdatePassword
                open={passwordModalOpen}
                handleClose={handlePasswordClose}
            />
        </Box>
    );
};

export default Header;
