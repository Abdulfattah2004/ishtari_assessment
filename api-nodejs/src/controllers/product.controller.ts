import type { NextFunction, Request, Response } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProductStatus,
} from "../services/product.service";
import { AppError } from "../utils/app-error";
import type {
  CreateProductInput,
  ProductStatus,
} from "../schemas/product.schema";

type ProductParams = {
  id: string;
};

export const getProductsController = (
  _req: Request,
  res: Response
): void => {
  const products = getAllProducts();

  res.status(200).json({
    success: true,
    data: products,
  });
};


export const getProductByIdController = (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
): void => {
  try {
  const id = req.params.id;

if (Array.isArray(id) || !id) {
  throw new AppError("Invalid product ID", 400);
}

const product = getProductById(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductController = (
  req: Request<ProductParams>, 
  res: Response,
  next: NextFunction
): void => {
  try {
    const data = req.body as CreateProductInput;

    const product = createProduct(data);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductStatusController = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { status } = req.body as { status: ProductStatus };

const id = req.params.id;

if (Array.isArray(id) || !id) {
  throw new AppError("Invalid product ID", 400);
}

const product = updateProductStatus(id, status);
    if (!product) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
};