export const instant = false;
import Link from "next/link";
import ProductGrid from "../../components/ProductGrid";
import { getProductsByCategory } from "../../lib/api";
export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const products = await getProductsByCategory(slug);

  const categoryName =
    products?.[0]?.categoryNameBn || products?.[0]?.category || slug;
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 lg:px-6">

      <Link
        href="/"
        className="text-sm text-green-700 hover:underline font-semibold"
      >
        ← সব পণ্য
      </Link>

      <div className="my-8">
        <h1 className="text-3xl font-black text-gray-900">
          {categoryName}
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          এই ক্যাটাগরির {products?.length ?? 0} টি পণ্য
        </p>
      </div>

      <ProductGrid products={products} />

    </main>
  );
}
