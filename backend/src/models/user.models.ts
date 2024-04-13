import mongoose, { Schema } from "mongoose";

export interface IUser {
    username: string;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            unique: true,
            trim: true,
            required: [true, "Username is required"],
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            trim: true,
            min: [8, "Password must be 8 characters long"],
        },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
