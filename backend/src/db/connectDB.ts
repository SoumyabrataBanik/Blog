import mongoose from "mongoose";

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
