import { hash as _hash, compare, genSalt } from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtExpiration, jwtSecretKey, saltRounds } from "../config/config.js";

export const hashPassword = async (password) => {
    const salt = await genSalt(saltRounds);
    return _hash(password, salt);
};

export const comparePassword = async (password, hash) => {
    return compare(password, hash);
};

export const generateToken = (user) => {
    const payload = { userId: user._id, email: user.email };
    return jwt.sign(payload, jwtSecretKey, { expiresIn: jwtExpiration });
};
