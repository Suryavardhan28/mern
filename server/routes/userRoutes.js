import express from "express";
import {
    signIn,
    signUp,
    updatePassword,
    updateProfile,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.put("/profile", authenticate, updateProfile);
router.put("/password", authenticate, updatePassword);

export default router;
