class ApiError extends Error {
    success?: boolean;
    statusCode?: number;
}

export const errorHandler = (
    success: boolean,
    statusCode: number,
    message: string
) => {
    const error = new ApiError();
    error.success = success;
    error.statusCode = statusCode;
    error.message = message;
    return error;
};
