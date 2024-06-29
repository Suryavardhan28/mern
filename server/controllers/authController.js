import User from "../models/User.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../services/authService.js";

export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, organization, contact } =
            req.body;
        const hashedPassword = await hashPassword(password);
        const user = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            organization,
            contact,
        });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
