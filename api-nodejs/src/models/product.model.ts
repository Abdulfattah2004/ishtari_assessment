import type { Product } from "../schemas/product.schema";

export const products: Product[] = [
  {
    id: "1",
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    status: "active",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Gaming Mouse",
    price: 60,
    category: "Accessories",
    status: "active",
    createdAt: new Date().toISOString(),
  },
];