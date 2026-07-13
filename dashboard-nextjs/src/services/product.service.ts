import { ApiError } from "@/lib/api-error";
import {
  productsResponseSchema,
  type Product,
} from "@/schemas/product.schema";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const demoToken = process.env.NEXT_PUBLIC_DEMO_TOKEN;

export const getProducts = async (
  signal?: AbortSignal
): Promise<Product[]> => {
  if (!apiUrl) {
    throw new ApiError(
      "NEXT_PUBLIC_API_URL is not configured.",
      500
    );
  }

  const response = await fetch(`${apiUrl}/api/products`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${demoToken ?? ""}`,
    },
    signal,
  });

  if (response.status === 401) {
    throw new ApiError(
      "Your authentication token is missing, invalid, or expired.",
      401
    );
  }

  if (response.status === 403) {
    throw new ApiError(
      "You do not have permission to view these products.",
      403
    );
  }

  if (!response.ok) {
    throw new ApiError(
      "The server could not load the products.",
      response.status
    );
  }

  const rawData: unknown = await response.json();

  const parsedResult = productsResponseSchema.safeParse(rawData);

  if (!parsedResult.success) {
    console.error(
      "Invalid API response:",
      parsedResult.error.flatten()
    );

    throw new ApiError(
      "The API returned data in an unexpected format.",
      500
    );
  }

  return parsedResult.data.data;
};