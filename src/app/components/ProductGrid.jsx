import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [] }) {
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="rounded-xl bg-white px-4 py-10 text-center text-sm text-gray-500">
        কোনো পণ্য পাওয়া যায়নি।
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id || product.slug}
          product={product}
        />
      ))}
    </div>
  );
}