import { ObjectId } from "mongodb";
import httpStatusCodes from "../config/httpStatusCodes.js";
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
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res
                .status(httpStatusCodes.FORBIDDEN)
                .json({ message: "User Account already exists" });
        } else {
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
            res.status(httpStatusCodes.CREATED).json({
                message: "User registered successfully",
            });
        }
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({ message: "User not found" });
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(httpStatusCodes.UNAUTHORIZED)
                .json({ message: "Invalid password" });
        }
        const token = generateToken(user);
        res.status(httpStatusCodes.OK).json({
            token: token,
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                organization: user.organization,
                contact: user.contact,
            },
            message: "User logged in successfully",
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const refresh = async (req, res) => {
    try {
        const userObjectIdString = req.auth.userId;

        if (ObjectId.isValid(userObjectIdString)) {
            const userObjectId = new ObjectId(userObjectIdString);
            const user = await User.findById(userObjectId).exec();
            if (!user) {
                return res
                    .status(httpStatusCodes.BAD_REQUEST)
                    .json({ message: "User not found" });
            }
            const token = generateToken(user);
            res.status(httpStatusCodes.OK).json({
                token: token,
                userInfo: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    organization: user.organization,
                    contact: user.contact,
                },
                message: "Token refreshed successfully",
            });
        } else {
            return res
                .status(httpStatusCodes.FORBIDDEN)
                .json({ message: "Invalid token" });
        }
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { email, firstName, lastName, contact } = req.body;

        const user = await User.findOne({ email }).exec();

        if (!user) {
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({ message: "User not found" });
        }

        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.contact = contact || user.contact;

        await user.save();

        res.status(httpStatusCodes.OK).json({
            userInfo: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                organization: user.organization,
                contact: user.contact,
            },
            message: "Updated profile successfully",
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};

export const updatePassword = async (req, res) => {
    try {
        const { id, email, password, newPassword } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) {
            return res
                .status(httpStatusCodes.BAD_REQUEST)
                .json({ message: "User not found" });
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(httpStatusCodes.FORBIDDEN)
                .json({ message: "Invalid password" });
        }

        user.password = await hashPassword(newPassword);

        await user.save();

        res.status(httpStatusCodes.OK).json({
            message: "Password updated successfully",
        });
    } catch (error) {
        res.status(httpStatusCodes.INTERNAL_SERVER_ERROR).json({
            message: error.message,
        });
    }
};
