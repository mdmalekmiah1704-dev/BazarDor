import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-4 text-6xl">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900">পাতাটি পাওয়া যায়নি</h1>
        <p className="mt-3 text-gray-600">আপনি যে পাতাটি খুঁজছেন সেটি নেই।</p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-lg bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 shadow-sm"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
