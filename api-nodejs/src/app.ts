import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import productRoutes from "./routes/product.routes";
import { requestLogger } from "./middleware/logger.middleware";
import { errorHandler } from "./middleware/error.middleware";
import { AppError } from "./utils/app-error";

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      message: "Too many requests. Please try again later.",
    },
  },
});

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(requestLogger);

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api", apiLimiter);
app.use("/api/products", productRoutes);

app.use((_req, _res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

export default app;