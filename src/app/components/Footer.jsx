import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-6 mt-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
          <span className="text-sm font-bold text-gray-900">
            বাজার দর — প্রতিদিনের বাজার দর এক নজরে।
          </span>
          <p className="text-xs text-gray-400 mt-1">
            © ২০২৬ বাজার দর। সকল স্বত্ব সংরক্ষিত।
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-semibold text-gray-500">
          <Link href="/about" className="hover:text-green-600 transition">
            আমাদের সম্পর্কে
          </Link>
          <Link href="/privacy" className="hover:text-green-600 transition">
            প্রাইভেসি পলিসি
          </Link>
          <Link href="/terms" className="hover:text-green-600 transition">
            শর্তাবলী
          </Link>
        </div>

      </div>
    </footer>
  );
}
