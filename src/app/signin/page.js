"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SigninPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("অনুগ্রহ করে সব তথ্য প্রদান করুন");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user_session", JSON.stringify({ name: "Md Malek Miah", email: formData.email }));
      toast.success("সফলভাবে লগইন হয়েছে!");
      router.push("/");
    }, 800);
  };

  const handleSocialLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user_session", JSON.stringify({ name: "Google User", email: "googleuser@gmail.com" }));
      toast.success("গুগল লগইন সফল হয়েছে!");
      router.push("/");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F6FBF6] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">সাইন ইন</h1>
        <p className="text-xs text-gray-400 mb-6">বিস্তারিত দাম, বাজার তুলনা ও প্রতিদিনের আপডেট দেখতে লগইন করুন।</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">ইমেইল</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 bg-gray-50/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="কমপক্ষে ৮ অক্ষর" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 bg-gray-50/50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#15803D] hover:bg-[#166534] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg text-sm transition mt-2 shadow-sm flex items-center justify-center gap-2"
          >
            {loading && <span className="loading loading-spinner loading-xs"></span>}
            সাইন ইন
          </button>
        </form>

        <div className="relative my-6 text-center">
          <hr className="border-gray-200" />
          <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-white px-3 text-xs text-gray-400">অথবা</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={handleSocialLogin} className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
            <span>🌐</span> Google নিয়ে চালিয়ে যান
          </button>
          <button type="button" onClick={handleSocialLogin} className="flex items-center justify-center gap-1.5 border border-gray-200 rounded-lg py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
            <span>🐙</span> GitHub নিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          অ্যাকাউন্ট নেই? <Link href="/signup" className="text-[#15803D] font-semibold hover:underline">অ্যাকাউন্ট তৈরি করুন</Link>
        </p>

        <Link href="/" className="inline-block text-xs text-gray-400 mt-4 hover:text-gray-600 transition">
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
