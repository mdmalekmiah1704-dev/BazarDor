export default function PriceTicker({ products = [] }) {
  const isArray = Array.isArray(products);

  const priceUpProducts = isArray
    ? products.filter((product) => product.change?.dir === "up")
    : [];

  const toBanglaNumber = (num) => {
    if (num === undefined || num === null) return "";
    const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num
      .toString()
      .replace(/\d/g, (digit) => banglaDigits[digit]);
  };

  const toBanglaUnit = (unitStr) => {
    if (!unitStr) return "কেজি";
    const lowerUnit = unitStr.toLowerCase().trim();
    if (lowerUnit === "kg" || lowerUnit === "কেজি") return "কেজি";
    if (lowerUnit === "litre" || lowerUnit === "liter" || lowerUnit === "লিটার") return "লিটার";
    if (lowerUnit === "dozen" || lowerUnit === "ডজন") return "ডজন";
    if (lowerUnit === "piece" || lowerUnit === "পিস") return "পিস";
    return unitStr;
  };

  return (
    <section className="w-full border-b border-gray-100 bg-white overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none py-2">
          {priceUpProducts.length > 0 ? (
            priceUpProducts.map((product, index) => {
              const title = product.nameBn || "পণ্য";
              const price = product.today ?? 0;
              const unit = product.unit || "কেজি";
              const percentage = Math.abs(
                Number(product.change?.pct ?? 0)
              );

              return (
                <div
                  key={product.id || index}
                  className="flex shrink-0 items-center gap-1.5 text-xs font-medium text-gray-600"
                >
                  <span>{product.categoryIcon || "📦"}</span>

                  <span>{title}</span>

                  <span className="font-bold text-gray-900">
                    {toBanglaNumber(price)} টাকা/{toBanglaUnit(unit)}
                  </span>

                  <span className="flex items-center gap-0.5 font-semibold text-red-500">
                    ▲ {toBanglaNumber(percentage)}%
                  </span>

                  {index < priceUpProducts.length - 1 && (
                    <span className="ml-4 text-gray-300">•</span>
                  )}
                </div>
              );
            })
          ) : (
            <div className="w-full py-0.5 text-center text-xs font-medium text-gray-400">
              সর্বশেষ বাজার আপডেট লোড হচ্ছে...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
