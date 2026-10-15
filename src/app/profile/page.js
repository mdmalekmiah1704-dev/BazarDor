"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User, ArrowRight, LogOut } from "lucide-react";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      toast.error("প্রোফাইল দেখতে প্রথমে সাইন ইন করুন");
      router.push("/signin");
    } else {
      setUser(JSON.parse(session));
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem("user_session");
    toast.success("সফলভাবে সাইনアウト করা হয়েছে");
    router.push("/signin");
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F6FBF6] flex items-center justify-center">
        <span className="loading loading-spinner loading-md text-[#15803D]"></span>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6FBF6] px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
              <User size={32} />
            </div>
            <button type="button" onClick={handleSignOut} className="inline-flex items-center gap-1.5 border border-red-100 hover:bg-red-50 text-red-500 text-xs font-semibold px-3 py-2 rounded-lg transition bg-red-50/20">
              <LogOut size={14} /> সাইন আউট
            </button>
          </div>

          <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
          <p className="mt-1 text-sm text-gray-500">{user.email}</p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/profile/update" className="inline-flex items-center gap-2 rounded-lg bg-[#15803D] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#166534]">
              প্রোফাইল আপডেট করুন <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-6">
            <Link href="/" className="text-sm font-medium text-[#15803D] hover:underline">← বাজারে ফিরে যান</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
