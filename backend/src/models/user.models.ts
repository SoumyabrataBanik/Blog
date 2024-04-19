import mongoose, { Schema } from "mongoose";

export interface IUser {
    userName: string;
    email: string;
    password: string;
    avatar: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
    {
        userName: {
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
        avatar: {
            type: String,
            default:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
    },
    { timestamps: true }
);

export const UserModel = mongoose.model("User", userSchema);
