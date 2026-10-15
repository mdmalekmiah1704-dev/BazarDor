"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মেলেনি!");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("অ্যাকাউন্ট তৈরি সফল হয়েছে! সাইন ইন করুন।");
      router.push("/signin");
    }, 800);
  };

  return (
    <main className="min-h-screen bg-[#F6FBF6] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-xs text-gray-400 mb-6">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">নাম</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="যেমন: বসির উদ্দিন" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 bg-gray-50/50"
            />
          </div>

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

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">পাসওয়ার্ড নিশ্চিত করুন</label>
            <input 
              type="password" 
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="আবার লিখুন" 
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 bg-gray-50/50"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#15803D] hover:bg-[#166534] disabled:bg-gray-400 text-white font-semibold py-2.5 rounded-lg text-sm transition mt-2 shadow-sm flex items-center justify-center gap-2"
          >
            {loading && <span className="loading loading-spinner loading-xs"></span>}
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6">
          অ্যাকাউন্ট আছে? <Link href="/signin" className="text-[#15803D] font-semibold hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </main>
  );
}
