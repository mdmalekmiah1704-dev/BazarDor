import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProductBySlug } from "@/app/lib/api";

async function ProductContent({ slug }) {
  const product = await getProductBySlug(slug);

  if (!product) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">
          পণ্য পাওয়া যায়নি
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          পণ্যের তথ্য পাওয়া যায়নি। পরে আবার চেষ্টা করুন।
        </p>

        <Link
          href="/"
          className="mt-4 inline-block text-sm font-semibold text-[#15803D] hover:underline"
        >
          ← সব পণ্য দেখুন
        </Link>
      </main>
    );
  }

  const title = product.nameBn || product.name || "নামহীন পণ্য";
  const price = Number(product.today ?? product.price ?? 0);
  const unit = product.unit || "কেজি";

  const rawImage = product.image;
  const image =
    typeof rawImage === "string" ? rawImage.trim() : "";

  const validImage =
    image.length > 0 &&
    (image.startsWith("/") ||
      image.startsWith("https://") ||
      image.startsWith("http://"));

  const direction = product.change?.dir;

  const percentage = Math.abs(
    Number(product.change?.pct ?? 0)
  );

  const amount = Math.abs(
    Number(
      product.change?.amount ??
        (Number(product.yesterday) > 0
          ? price - Number(product.yesterday)
          : 0)
    )
  );

  const isUp = direction === "up";
  const isDown = direction === "down";

  const markets = Array.isArray(product.markets)
    ? product.markets
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-6">
      {/* Back to Products */}
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 transition hover:text-gray-900"
      >
        ← সব পণ্যে ফিরে যান
      </Link>

      {/* Product Information */}
      <section className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-gray-100 bg-gray-50/50 p-5 sm:p-6 md:flex-row">
        <div className="flex w-full flex-col items-start gap-6 sm:flex-row md:w-auto">
          {/* Product Image */}
          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border border-gray-100 bg-white p-2 shadow-sm">
            {validImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="96px"
                />
              </div>
            ) : (
              <span className="text-4xl opacity-70">
                {product.categoryIcon || "📦"}
              </span>
            )}
          </div>

          {/* Product Name */}
          <div className="text-left">
            <h1 className="text-2xl font-extrabold leading-tight text-gray-900">
              {title}
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              প্রতি {unit}-এর দাম
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="text-xs font-medium text-gray-500">
                গতকালের তুলনায় আজ
              </span>

              {isUp ? (
                <span className="rounded bg-red-50 px-2 py-0.5 text-xs font-bold text-red-500">
                  বেড়েছে ৳{amount}
                </span>
              ) : isDown ? (
                <span className="rounded bg-green-50 px-2 py-0.5 text-xs font-bold text-green-600">
                  কমেছে ৳{amount}
                </span>
              ) : (
                <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-500">
                  অপরিবর্তিত
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Today's Price */}
        <div className="flex min-w-[140px] flex-col items-center justify-center self-stretch rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm sm:self-auto sm:items-end sm:text-right">
          <span className="text-xl font-extrabold leading-none text-gray-900">
            ৳{price}
          </span>

          <span className="mt-1 text-[11px] text-gray-400">
            টাকা / ১ {unit}
          </span>

          <div className="mt-2">
            {isUp ? (
              <span className="flex items-center justify-end gap-0.5 text-xs font-bold text-red-500">
                ▲ {percentage}%
              </span>
            ) : isDown ? (
              <span className="flex items-center justify-end gap-0.5 text-xs font-bold text-green-600">
                ▼ {percentage}%
              </span>
            ) : (
              <span className="text-xs font-bold text-gray-400">
                — 0%
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Market Prices */}
      <section className="mt-10 sm:mt-12">
        <h2 className="mb-4 text-left text-lg font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>

        <div className="w-full overflow-x-auto rounded-xl border border-gray-100 shadow-sm">
          <table className="w-full min-w-[600px] border-collapse bg-white text-left text-sm text-gray-600">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50 text-xs text-gray-500">
                <th className="p-4 font-semibold">বাজার</th>

                <th className="p-4 font-semibold">বিভাগ</th>

                <th className="p-4 text-right font-semibold">
                  সর্বনিম্ন
                </th>

                <th className="p-4 text-right font-semibold">
                  সর্বোচ্চ
                </th>

                <th className="p-4 text-right font-semibold">
                  গড়
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {markets.length > 0 ? (
                markets.map((market, index) => {
                  const min = Number(market.min ?? 0);
                  const max = Number(market.max ?? 0);

                  const average =
                    market.avg != null
                      ? Number(market.avg)
                      : Math.round((min + max) / 2);

                  return (
                    <tr
                      key={`${market.market || market.name || "market"}-${index}`}
                      className="transition-colors hover:bg-gray-50/50"
                    >
                      <td className="p-4 font-bold text-gray-800">
                        {market.market ||
                          market.name ||
                          "অজানা বাজার"}
                      </td>

                      <td className="p-4 text-gray-500">
                        {market.division || "—"}
                      </td>

                      <td className="p-4 text-right text-gray-700">
                        ৳{min}
                      </td>

                      <td className="p-4 text-right text-gray-700">
                        ৳{max}
                      </td>

                      <td className="p-4 text-right font-bold text-gray-900">
                        ৳{average}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="p-8 text-center text-gray-400"
                  >
                    কোনো বাজারভিত্তিক তথ্য পাওয়া যায়নি।
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Back Button */}
      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-lg bg-[#15803D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-800"
        >
          ← আরও পণ্যের দাম দেখুন
        </Link>
      </div>
    </div>
  );
}

export default function ProductDetails({ params }) {
  return (
    <main className="min-h-screen bg-white pb-16">
      <Suspense
        fallback={
          <div className="py-20 text-center text-gray-500">
            পণ্যের বিবরণ লোড হচ্ছে...
          </div>
        }
      >
        <ProductDetailsContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProductDetailsContent({ params }) {
  const { slug } = await params;

  return <ProductContent slug={slug} />;
}