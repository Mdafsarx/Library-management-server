import { ErrorRequestHandler } from "express";

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err) {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Validation failed";
    res.status(statusCode).json({
      message: message,
      success: false,
      error: err,
    });
  }
};
