import mongoose from "mongoose";
import { DB_NAME } from "../constants/constants";

export async function connectDB() {
    try {
        const connection = await mongoose.connect(
            process.env.MONGODB_URI || ""
        );
        console.log(
            `\nMongoDB connected successfully at MongoDB host: ${connection.connection.host}`
        );
    } catch (error) {
        console.error("Connection to MongoDB failed", error);
        process.exit(1);
    }
}
