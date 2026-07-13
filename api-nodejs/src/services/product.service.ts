import { randomUUID } from "crypto";
import { products } from "../models/product.model";
import type {
  CreateProductInput,
  Product,
  ProductStatus,
} from "../schemas/product.schema";

export const getAllProducts = (): Product[] => {
  return products;
};

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const createProduct = (data: CreateProductInput): Product => {
  const product: Product = {
    id: randomUUID(),
    name: data.name,
    price: data.price,
    category: data.category,
    status: data.status,
    createdAt: new Date().toISOString(),
  };

  products.push(product);

  return product;
};

export const updateProductStatus = (
  id: string,
  status: ProductStatus
): Product | undefined => {
  const product = products.find((item) => item.id === id);

  if (!product) {
    return undefined;
  }

  product.status = status;

  return product;
};