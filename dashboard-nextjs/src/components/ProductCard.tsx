import type { Product } from "@/schemas/product.schema";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({
  product,
}: ProductCardProps) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {product.name}
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {product.category}
          </p>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            product.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          {product.status}
        </span>
      </div>

      <p className="text-2xl font-bold text-gray-900">
        ${product.price.toFixed(2)}
      </p>

      <p className="mt-4 text-xs text-gray-400">
        Created{" "}
        {new Date(product.createdAt).toLocaleDateString()}
      </p>
    </article>
  );
}