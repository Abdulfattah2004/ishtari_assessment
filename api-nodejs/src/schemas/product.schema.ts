import { z } from "zod";

export const productStatusSchema = z.enum(["active", "inactive"]);

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number().positive(),
  category: z.string(),
  status: productStatusSchema,
  createdAt: z.string(),
});

export const createProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().positive("Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  status: productStatusSchema.optional().default("active"),
});

export const updateProductStatusSchema = z.object({
  status: productStatusSchema,
});

export type Product = z.infer<typeof productSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type ProductStatus = z.infer<typeof productStatusSchema>;