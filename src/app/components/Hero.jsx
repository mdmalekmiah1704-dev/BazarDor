import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-transparent">
      <div className="mx-auto max-w-7xl px-4 pt-5 pb-4 lg:px-6">
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="grid items-center gap-4 px-5 py-6 sm:px-8 sm:py-7 md:grid-cols-[1fr_360px] lg:px-10 lg:py-8">
            <div>
              <div className="mb-2 inline-flex rounded-full bg-[#E8F5E9] px-3 py-1 text-[11px] font-medium text-[#2E7D32]">
                মঙ্গলবার, ৬ অক্টোবর, ২০২৬
              </div>

              <h1 className="max-w-2xl text-2xl font-black leading-tight tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                আজকের বাজারের দাম এক নজরে
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
                চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
                বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
              </p>

              <div className="mt-4">
                <Link
                  href="#সব-পণ্য"
                  className="inline-flex rounded-lg bg-[#2E7D32] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1B5E20]"
                >
                  সব পণ্য দেখুন
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[320px]">
              <Image
                src="/bazar-hero.png"
                alt="বাজার দর"
                width={600}
                height={420}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}