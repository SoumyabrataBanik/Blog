import e from "express";
import { UserModel } from "../models/user.models";
import { validateSignUpDetails } from "../helpers/validators";
import { truncate } from "fs";
import { errorHandler } from "../utils/ApiError";

export interface RequestUser {
    id: string;
    iat: number;
}

type RequestBody = {
    userName?: string;
    email?: string;
    password?: string;
    avatar?: string;
};

export function testFunction(req: e.Request, res: e.Response) {
    return res.json({
        message: "API connection established successfully!",
    });
}

export const updateUser = async (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) => {
    const user = (req?.user as RequestUser) || null;
    if (!user) {
        return res.status(500).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const { userName, email, password, avatar } = req.body as RequestBody;

        if (!userName && !email && !password && !avatar) {
            return res.status(400).json({
                success: false,
                message: "Nothing to update",
            });
        }

        const lowercaseUsername = userName?.toLowerCase();

        if (lowercaseUsername) {
            if (lowercaseUsername.includes(" ")) {
                return res.status(401).json({
                    success: false,
                    message: "Username cannot contain spaces",
                });
            }
            if (lowercaseUsername.length < 7) {
                return res.status(401).json({
                    success: false,
                    message: "Username cannot be less than 7 characters",
                });
            }
            if (lowercaseUsername.length > 20) {
                return res.status(401).json({
                    success: false,
                    message: "Username cannot be more than 20 characters",
                });
            }
            const userNameExists = await UserModel.findOne({
                userName: lowercaseUsername,
            });
            if (userNameExists) {
                return res.status(401).json({
                    success: false,
                    message: "Username already exists",
                });
            }
        }

        if (email) {
            if (!email.includes("@") || !email.includes(".")) {
                return res.status(401).json({
                    success: false,
                    message: "Provide a proper email",
                });
            }
            if (email.includes(" ")) {
                return res.status(401).json({
                    success: false,
                    message: "Email cannot contain spaces",
                });
            }
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                return res.status(401).json({
                    success: false,
                    message: "Email already exists",
                });
            }
        }

        if (password) {
            if (password.length > 20) {
                return res.status(401).json({
                    success: false,
                    message: "Password cannot be greater than 20 characters",
                });
            }
            if (password.length < 7) {
                return res.status(401).json({
                    success: false,
                    message: "Password cannot be less than 7 characters",
                });
            }
        }

        await UserModel.findByIdAndUpdate(user?.id, {
            $set: {
                userName: lowercaseUsername,
                email,
                password,
                avatar,
            },
        });

        return res.status(200).json({
            success: true,
            message: "User Updated successfully",
        });
    } catch (error) {
        next(errorHandler(false, 500, "Server error"));
    }
};

export const deleteUser = async function (
    req: e.Request,
    res: e.Response,
    next: e.NextFunction
) {
    const user = (req.user as RequestUser) || null;

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "Unauthorized",
        });
    }

    try {
        const userId = user.id;
        await UserModel.findByIdAndDelete(userId);
        return res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
