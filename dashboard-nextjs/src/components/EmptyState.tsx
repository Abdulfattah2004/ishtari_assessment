type EmptyStateProps = {
  hasSearchQuery: boolean;
};

export function EmptyState({
  hasSearchQuery,
}: EmptyStateProps) {
  return (
    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
      <h2 className="text-lg font-semibold text-gray-800">
        No products found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {hasSearchQuery
          ? "Try using a different search term."
          : "There are currently no products available."}
      </p>
    </div>
  );
}