"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function UpdateProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem("user_session");
    if (!session) {
      toast.error("এই পেজটি দেখতে প্রথমে লগইন করুন।");
      router.push("/signin");
    } else {
      const parsed = JSON.parse(session);
      setUser(parsed);
      setName(parsed.name || "");
    }
  }, [router]);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নামের ক্ষেত্রটি খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("user_session", JSON.stringify({ ...user, name: name.trim() }));
      toast.success("আপনার নাম সফলভাবে আপডেট করা হয়েছে!");
      router.push("/profile");
    }, 800);
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#F6FBF6] py-12 px-4">
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 text-left">
          <h1 className="text-2xl font-bold text-gray-900">তথ্য আপডেট করুন</h1>
          <p className="text-xs text-gray-400 mt-1">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm text-left">
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">নাম</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="নতুন নাম লিখুন"
                className="w-full max-w-md px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-600 bg-gray-50/50"
              />
            </div>

            <div className="flex gap-3">
              <button type="submit" disabled={loading} className="bg-[#15803D] hover:bg-[#166534] disabled:bg-gray-400 text-white font-semibold px-6 py-2 rounded-lg text-sm transition flex items-center justify-center gap-2">
                {loading && <span className="loading loading-spinner loading-xs"></span>} তথ্য আপডেট করুন
              </button>
              <button type="button" onClick={() => router.back()} className="border border-gray-200 hover:bg-gray-50 text-gray-600 px-6 py-2 rounded-lg text-sm font-semibold transition">বাতিল</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
