import type { ErrorRequestHandler } from "express";
import { AppError } from "../utils/app-error";

export const errorHandler: ErrorRequestHandler = (
  error,
  _req,
  res,
  _next
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      success: false,
      error: {
        message: error.message,
      },
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    success: false,
    error: {
      message: "Internal server error",
    },
  });
};