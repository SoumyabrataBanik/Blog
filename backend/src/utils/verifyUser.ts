import { NextFunction, Request, Response } from "express";
import jwt, { Secret, VerifyErrors } from "jsonwebtoken";
import { errorHandler } from "./ApiError";

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token =
        req.cookies["accessToken"] ||
        req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return next(errorHandler(false, 400, "Unauthorized"));
    } else {
        jwt.verify(
            token,
            process.env.JWT_SECRET_TOKEN as Secret,
            (err: VerifyErrors | null, user: unknown) => {
                if (err) {
                    return next(errorHandler(false, 400, "Unauthorized"));
                } else {
                    req.user = user;
                    next();
                }
            }
        );
    }
};
