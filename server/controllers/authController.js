const User = require("../models/userModel");
const authService = require("../services/authService");

const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, password, organization, contact } =
            req.body;
        const hashedPassword = await authService.hashPassword(password);
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

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await authService.comparePassword(
            password,
            user.password
        );
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = authService.generateToken(user);
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    signup,
    signin,
};