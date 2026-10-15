"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import ProductGrid from "./ProductGrid";

const bnNums = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

function convertBanglaToEnglishNumber(input) {
  if (typeof input === "number") return input;
  if (!input) return 0;
  
  let output = input;
  for (let i = 0; i < 10; i++) {
    const regex = new RegExp(bnNums[i], "g");
    output = output.toString().replace(regex, i.toString());
  }
  
  const parsed = parseFloat(output.replace(/[^0-9.-]/g, ""));
  return isNaN(parsed) ? 0 : parsed;
}

function inlineSortProducts(productsList, criteria) {
  const list = [...productsList];
  if (criteria === "low-to-high") {
    return list.sort((a, b) => convertBanglaToEnglishNumber(a.price) - convertBanglaToEnglishNumber(b.price));
  }
  if (criteria === "high-to-low") {
    return list.sort((a, b) => convertBanglaToEnglishNumber(b.price) - convertBanglaToEnglishNumber(a.price));
  }
  return list;
}

export default function ProductSection({
  title = "সব পণ্য",
  description = "",
  products = [],
}) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setSortedProducts(products);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [products]);

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    setSortedProducts(inlineSortProducts(products, value));
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div className="h-8 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse pt-2"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="mx-auto max-w-7xl px-4 py-10 lg:px-6">
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          {description && (
            <p className="mt-1 text-sm text-base-content/60">
              {description}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <p className="text-sm text-base-content/50">
            মোট {sortedProducts.length} টি পণ্য
          </p>

          <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-gray-200 rounded-xl shadow-sm">
            <ArrowUpDown size={14} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-600">সাজান:</span>
            <div className="relative flex items-center">
              <select 
                value={sortBy} 
                onChange={handleSortChange}
                className="appearance-none bg-transparent pr-6 pl-1 py-0.5 text-xs font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="default">ডিফল্ট</option>
                <option value="low-to-high">দাম: কম থেকে বেশি</option>
                <option value="high-to-low">দাম: বেশি থেকে কম</option>
              </select>
              <ChevronDown size={12} className="absolute right-0 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      <ProductGrid products={sortedProducts} />
    </section>
  );
}
