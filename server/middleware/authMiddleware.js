import jwt from "jsonwebtoken";
import { jwtSecretKey } from "../config/config.js";
import httpStatusCodes from "../config/httpStatusCodes.js";

const authenticate = (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res
            .status(httpStatusCodes.UNAUTHORIZED)
            .json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, jwtSecretKey);
        req.auth = decoded;
        next();
    } catch (error) {
        res.status(httpStatusCodes.UNAUTHORIZED).json({
            message: "Invalid token",
        });
    }
};

export default authenticate;
