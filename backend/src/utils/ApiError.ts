class ApiError extends Error {
    success?: boolean;
    statusCode?: number;
}

export const errorHandler = (
    success?: boolean,
    statusCode?: number,
    message?: string
) => {
    const error = new ApiError();
    error.success = success || false;
    error.statusCode = statusCode || 500;
    error.message = message || "Internal Serval Error";
    return error;
};
