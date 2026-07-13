"use client";

import { useEffect, useMemo, useState } from "react";

import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { LoadingState } from "@/components/LoadingState";
import { ProductCard } from "@/components/ProductCard";
import { SearchInput } from "@/components/SearchInput";
import { ApiError } from "@/lib/api-error";
import type { Product } from "@/schemas/product.schema";
import { getProducts } from "@/services/product.service";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(
    null
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async (): Promise<void> => {
      try {
        const loadedProducts = await getProducts(
          controller.signal
        );

        setProducts(loadedProducts);
        setErrorMessage(null);
      } catch (error: unknown) {
        if (
          error instanceof DOMException &&
          error.name === "AbortError"
        ) {
          return;
        }

        if (error instanceof ApiError) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage(
            "An unexpected error occurred while loading products."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  const handleRetry = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const loadedProducts = await getProducts();

      setProducts(loadedProducts);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "An unexpected error occurred while loading products."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery
      .trim()
      .toLowerCase();

    if (!normalizedQuery) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(normalizedQuery) ||
        product.category
          .toLowerCase()
          .includes(normalizedQuery) ||
        product.status
          .toLowerCase()
          .includes(normalizedQuery)
      );
    });
  }, [products, searchQuery]);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            Ishtari Hiring Assessment
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900">
            Product Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-gray-600">
            Browse and search products loaded securely from the
            Node.js API.
          </p>
        </header>

        <section className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </section>

        {isLoading && <LoadingState />}

        {!isLoading && errorMessage && (
          <ErrorState
            message={errorMessage}
            onRetry={() => void handleRetry()}
          />
        )}

        {!isLoading &&
          !errorMessage &&
          filteredProducts.length === 0 && (
            <EmptyState
              hasSearchQuery={searchQuery.trim().length > 0}
            />
          )}

        {!isLoading &&
          !errorMessage &&
          filteredProducts.length > 0 && (
            <>
              <p className="mb-4 text-sm text-gray-500">
                Showing {filteredProducts.length} of{" "}
                {products.length} products
              </p>

              <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}
              </section>
            </>
          )}
      </div>
    </main>
  );
}