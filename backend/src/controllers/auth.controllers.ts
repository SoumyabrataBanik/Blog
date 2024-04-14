import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

import { validateSignUpDetails } from "../helpers/validators";
import { UserModel } from "../models/user.models";
import { errorHandler } from "../utils/ApiError";

export async function signup(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    try {
        const { userName, email, password } = req.body;

        if (
            !validateSignUpDetails(userName) ||
            !validateSignUpDetails(email) ||
            !validateSignUpDetails(password)
        ) {
            next(errorHandler(false, 400, "All fields are required"));
        }

        const userExists = await UserModel.findOne({
            $or: [{ userName }, { email }],
        });

        if (userExists) {
            // return res.status(500).json({
            //     success: false,
            //     message: "Username/email already exists",
            // });
            next(errorHandler(false, 500, "Username/email already exists"));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // return res.status(200).json({
        //     success: true,
        //     message: "User registered successfully",
        // });
        next(errorHandler(true, 200, "User registered successfully"));
    } catch (error) {
        next(errorHandler());
    }
}
