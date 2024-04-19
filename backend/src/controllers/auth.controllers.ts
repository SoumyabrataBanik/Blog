import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";

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

export async function signin(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const { email, password } = req.body;

    if (!validateSignUpDetails(email) || !validateSignUpDetails(password)) {
        next(errorHandler(false, 400, "All Fields are required"));
    }

    try {
        const validUser = await UserModel.findOne({ email });
        if (!validUser) {
            next(errorHandler(false, 400, "Wrong credentials"));
            return;
        }
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) {
            next(errorHandler(false, 400, "Wrong credentials"));
            return;
        }
        const token = jwt.sign(
            {
                id: validUser._id,
            },
            process.env.JWT_SECRET_TOKEN as Secret
        );

        const user = await UserModel.findById(validUser?._id).select(
            "-password"
        );

        return res
            .status(200)
            .cookie("accessToken", token, {
                httpOnly: true,
            })
            .json({
                success: true,
                message: "User successfully logged in",
                user,
            });
    } catch (error) {
        const message = (error as Error).message;
        next(errorHandler(false, 500, message));
        return;
    }
}

export async function googleAuth(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { userName, email, photoUrl } = req.body;

    try {
        const userExists = await UserModel.findOne({
            $or: [{ userName }, { email }],
        });

        // User already exists, sign in:
        if (userExists) {
            const token = jwt.sign(
                {
                    id: userExists?._id,
                },
                process.env.JWT_SECRET_TOKEN as Secret
            );
            const user = await UserModel.findById(userExists._id).select(
                "-password"
            );
            return res
                .status(200)
                .cookie("access-token", token, {
                    httpOnly: true,
                })
                .json({
                    success: true,
                    message: "Google login successfull",
                    user,
                });
        }

        // User does not exist, sign up:
        else {
            const generatedPassword =
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8) +
                Math.random().toString(36).slice(-8);

            const hashedPassword = await bcrypt.hash(generatedPassword, 10);
            const newUser = new UserModel({
                userName:
                    userName.toLowerCase().split(" ").join("") +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                avatar: photoUrl,
            });
            await newUser.save();

            const token = jwt.sign(
                {
                    id: newUser._id,
                },
                process.env.JWT_SECRET_TOKEN as Secret
            );

            const user = await UserModel.findById(newUser._id).select(
                "-password"
            );
            return res.status(200).cookie("access-token", token).json({
                success: true,
                message: "Google Login Successfull",
                user,
            });
        }
    } catch (error) {
        next(error);
    }
}
