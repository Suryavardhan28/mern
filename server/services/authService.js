const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(config.saltRounds);
    return bcrypt.hash(password, salt);
};

const comparePassword = async (password, hash) => {
    return bcrypt.compare(password, hash);
};

const generateToken = (user) => {
    const payload = { userId: user._id, email: user.email };
    return jwt.sign(payload, config.jwtSecretKey, { expiresIn: "1h" });
};

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
};
