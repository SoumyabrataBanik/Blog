import { NextFunction, Request, Response } from "express";

export interface ErrType extends Error {
    success?: boolean;
    statusCode?: number;
}

export function errorMiddleware(
    err: ErrType,
    req: Request,
    res: Response,
    next: NextFunction
) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: err.success,
        statusCode,
        message,
    });
}
