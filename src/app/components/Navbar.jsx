"use client";

import Link from "next/link";
import { Menu, X, User, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

function getBanglaDate() {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setDate(getBanglaDate());
    const session = localStorage.getItem("user_session");
    if (session) {
      setUser(JSON.parse(session));
    }
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSignOut = () => {
    localStorage.removeItem("user_session");
    setUser(null);
    window.location.reload();
  };

  const isActive = (slug) => {
    return (
      pathname === `/category/${slug}` ||
      pathname.startsWith(`/category/${slug}/`)
    );
  };

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[62px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#15803D]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.2}
                stroke="currentColor"
                className="h-4 w-4 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1-1.5 0Z"
                />
              </svg>
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[16px] font-extrabold tracking-tight text-gray-900 sm:text-[17px]">
                বাজার দর
              </span>
              <span className="mt-1 text-[9px] font-medium text-gray-400">
                {date || "আজকের বাজার"}
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-[12px] font-bold text-gray-700 transition hover:bg-gray-100"
                >
                  <User size={14} />
                  {user.name}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-red-100 bg-red-50/20 text-red-500 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signin"
                  className="text-[12px] font-bold text-gray-700 hover:text-gray-900 px-3 py-1.5 transition"
                >
                  সাইন ইন
                </Link>
                <Link
                  href="/signup"
                  className="text-[12px] font-bold text-white bg-[#15803D] hover:bg-[#166534] px-4 py-2 rounded-xl transition shadow-sm"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-700 md:hidden"
            aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className="border-y border-gray-100">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <nav
            aria-label="পণ্য ক্যাটাগরি"
            className="flex items-center justify-between overflow-x-auto"
          >
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className={`flex shrink-0 items-center gap-1.5 border-b-2 px-2.5 py-2 text-[11px] font-semibold transition sm:px-3 sm:text-[12px] lg:px-4 ${
                  isActive(category.slug)
                    ? "border-[#15803D] text-[#15803D]"
                    : "border-transparent text-gray-600 hover:text-[#15803D]"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {open && (
        <div className="border-b border-gray-100 bg-white shadow-sm md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4">
            <p className="mb-3 text-[11px] font-bold text-gray-400">
              পণ্যের ক্যাটাগরি
            </p>

            <nav className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-semibold ${
                    isActive(category.slug)
                      ? "border-green-200 bg-green-50 text-[#15803D]"
                      : "border-gray-100 text-gray-600"
                  }`}
                >
                  <span className="text-base">{category.icon}</span>
                  <span>{category.name}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-gray-100 pt-4 flex flex-col gap-2">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    className="w-full text-center text-sm font-bold text-gray-700 border border-gray-200 py-2.5 rounded-xl bg-white flex items-center justify-center gap-2"
                  >
                    <User size={16} /> প্রোফাইল ({user.name})
                  </Link>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="w-full text-center text-sm font-bold text-white bg-red-500 py-2.5 rounded-xl block cursor-pointer"
                  >
                    সাইন আউট
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="w-full text-center text-sm font-bold text-gray-700 border border-gray-200 py-2.5 rounded-xl bg-white block"
                  >
                    সাইন ইন
                  </Link>
                  <Link
                    href="/signup"
                    className="w-full text-center text-sm font-bold text-white bg-[#15803D] py-2.5 rounded-xl block"
                  >
                    সাইন আপ
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
