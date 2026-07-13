import { z } from "zod";

export const productStatusSchema = z.enum(["active", "inactive"]);

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  status: productStatusSchema,
  createdAt: z.string(),
});

export const productsResponseSchema = z.object({
  success: z.literal(true),
  data: z.array(productSchema),
});

export type Product = z.infer<typeof productSchema>;
export type ProductsResponse = z.infer<typeof productsResponseSchema>;