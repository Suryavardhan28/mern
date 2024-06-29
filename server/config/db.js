import mongoose from "mongoose";

const connectDB = async () => {
    mongoose
        .connect(process.env.DB_URI, {
            useMongoClient: true,
        })
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.error("MongoDB connection error:", err));
};

export default connectDB;
