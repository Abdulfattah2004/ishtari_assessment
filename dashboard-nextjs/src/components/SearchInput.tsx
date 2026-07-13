type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div>
      <label
        htmlFor="product-search"
        className="mb-2 block text-sm font-medium text-gray-700"
      >
        Search products
      </label>

      <input
        id="product-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by name, category, or status"
        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500"
      />
    </div>
  );
}