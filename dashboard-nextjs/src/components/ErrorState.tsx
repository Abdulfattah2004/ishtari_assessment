type ErrorStateProps = {
  message: string;
  onRetry: () => void;
};

export function ErrorState({
  message,
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-8 text-center"
    >
      <h2 className="text-lg font-semibold text-red-800">
        Unable to load products
      </h2>

      <p className="mt-2 text-sm text-red-700">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-lg bg-red-700 px-4 py-2 text-sm font-medium text-white hover:bg-red-800"
      >
        Try again
      </button>
    </div>
  );
}