const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    organization: {
        type: String,
        required: true,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
});

userSchema.plugin(autoIncrement.plugin, {
    model: "User",
    field: "id",
    startAt: 1,
    incrementBy: 1,
});

module.exports = mongoose.model("User", userSchema);
