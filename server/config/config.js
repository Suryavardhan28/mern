import dotenv from "dotenv";
dotenv.config();

export const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const saltRounds = 10;
export const jwtExpiration = 60 * 60; // 1 hour
