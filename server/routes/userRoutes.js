import express from "express";
import {
    refresh,
    signIn,
    signUp,
    updatePassword,
    updateProfile,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/refresh", authenticate, refresh);
router.put("/profile", authenticate, updateProfile);
router.put("/password", authenticate, updatePassword);

export default router;
