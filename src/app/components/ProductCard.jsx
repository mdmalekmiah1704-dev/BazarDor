import Image from "next/image";
import Link from "next/link";

const toBanglaNumber = (num) => {
  if (num === undefined || num === null) return "";
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num
    .toString()
    .replace(/\d/g, (digit) => banglaDigits[digit]);
};

export default function ProductCard({ product }) {
  if (!product) return null;

  const title = product.nameBn || "নামহীন পণ্য";
  const price = product.today ?? 0;
  const unit = product.unit || "কেজি";
  const slug = product.slug || product.id;

  const rawImage = product.image;
  const image = typeof rawImage === "string" ? rawImage.trim() : "";
  const validImage =
    image.length > 0 &&
    (image.startsWith("/") ||
      image.startsWith("http://") ||
      image.startsWith("https://"));

  const direction = product.change?.dir;
  const percentage = Math.abs(Number(product.change?.pct ?? 0));

  const isUp = direction === "up";
  const isDown = direction === "down";

  return (
    <Link
      href={`/product/${slug}`}
      className="group block rounded-xl bg-white p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
    >
      <article className="flex min-h-[145px] flex-col justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#F6FBF6] p-1.5">
            {validImage ? (
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
            ) : (
              <span className="text-xl">
                {product.categoryIcon || "📦"}
              </span>
            )}
          </div>

          <div className="min-w-0">
            <h3 className="line-clamp-2 text-sm font-bold leading-tight text-gray-800">
              {title}
            </h3>

            <p className="mt-1 text-[11px] text-gray-400">
              প্রতি {unit}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <p className="mb-0.5 text-[10px] text-gray-400">
              আজকের বাজার
            </p>

            <p className="text-lg font-bold leading-none text-gray-900">
              {toBanglaNumber(price)} টাকা
            </p>
          </div>

          {isUp && (
            <span className="text-xs font-semibold text-red-500">
              ▲ {toBanglaNumber(percentage)}%
            </span>
          )}

          {isDown && (
            <span className="text-xs font-semibold text-green-600">
              ▼ {toBanglaNumber(percentage)}%
            </span>
          )}

          {!isUp && !isDown && (
            <span className="text-xs font-semibold text-gray-400">
              — ০%
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
