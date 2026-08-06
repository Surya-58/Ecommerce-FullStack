import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

console.log("URI:", process.env.MONGODB_URI);

try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected Successfully");
} catch (error) {
    console.log(error);
}