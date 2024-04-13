import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import { validateSignUpDetails } from "../helpers/validators";
import { UserModel } from "../models/user.models";

export async function signup(req: Request, res: Response): Promise<Response> {
    try {
        const { userName, email, password } = req.body;

        if (
            !validateSignUpDetails(userName) ||
            !validateSignUpDetails(email) ||
            !validateSignUpDetails(password)
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const userExists = await UserModel.findOne({
            $or: [{ userName }, { email }],
        });

        if (userExists) {
            return res.status(500).json({
                success: false,
                message: "Username/email already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(200).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User could not be registered due to server error.",
        });
    }
}
