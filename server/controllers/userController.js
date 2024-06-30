import User from "../models/User.js";
import {
    comparePassword,
    generateToken,
    hashPassword,
} from "../services/authService.js";

export const signUp = async (req, res) => {
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
        res.status(500).json({ error: error.message });
    }
};

export const signIn = async (req, res) => {
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
        res.status(200).json({
            token,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            organization: user.organization,
            contact: user.contact,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProfile = async (req, res) => {
    const { email, firstName, lastName, contact } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.contact = contact || user.contact;

        await user.save();

        res.status(201).json({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            organization: user.organization,
            contact: user.contact,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePassword = async (req, res) => {
    const { email, password, newPassword } = req.body;

    try {
        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }

        user.password = await hashPassword(newPassword);

        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
