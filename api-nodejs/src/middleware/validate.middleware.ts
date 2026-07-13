import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export const validateBody =
  (schema: ZodType) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          message: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
      });

      return;
    }

    req.body = result.data;

    next();
  };