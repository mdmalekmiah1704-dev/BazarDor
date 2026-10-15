"use client";

import Link from "next/link";

export default function CategoryNav({ categories = [] }) {
  return (
    <section id="categories" className="pt-2">
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          সব পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          আপনার প্রয়োজনীয় পণ্যের ক্যাটাগরি বেছে নিন
        </p>
      </div>

      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#2E7D32] bg-[#2E7D32] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B5E20]"
        >
          সব পণ্য
        </Link>

        {categories.map((category, index) => (
          <Link
            key={`${category.id || category.slug || "category"}-${index}`}
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-green-300 hover:bg-green-50 hover:text-[#2E7D32]"
          >
            <span>{category.icon}</span>
            <span>{category.nameBn}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}