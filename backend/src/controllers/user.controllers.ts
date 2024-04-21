import e from "express";
import { UserModel } from "../models/user.models";
import { validateSignUpDetails } from "../helpers/validators";
import { truncate } from "fs";

export interface RequestUser {
    id: string;
    iat: number;
}

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
        const { userName, email, password } = req.body;
        if (validateSignUpDetails(userName)) {
            const newUsername = await UserModel.findByIdAndUpdate(user?.id, {
                userName,
            });
            await newUsername?.save();
        }
        if (validateSignUpDetails(email)) {
            const newEmail = await UserModel.findByIdAndUpdate(user?.id, {
                email,
            });
            await newEmail?.save();
        }
        if (validateSignUpDetails(password)) {
            const newPassword = await UserModel.findByIdAndUpdate(user?.id, {
                password,
            });
            await newPassword?.save();
        }
        return res.status(200).json({
            success: true,
            message: "User details updated successfully",
        });
    } catch (error) {
        next(error);
    }
};
