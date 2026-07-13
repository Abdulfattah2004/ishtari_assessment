import { Router } from "express";
import {
  createProductController,
  getProductByIdController,
  getProductsController,
  updateProductStatusController,
} from "../controllers/product.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import {
  createProductSchema,
  updateProductStatusSchema,
} from "../schemas/product.schema";

const router = Router();

router.get("/", authenticate, getProductsController);

router.get("/:id", authenticate, getProductByIdController);

router.post(
  "/",
  authenticate,
  validateBody(createProductSchema),
  createProductController
);

router.put(
  "/:id/status",
  authenticate,
  validateBody(updateProductStatusSchema),
  updateProductStatusController
);

export default router;