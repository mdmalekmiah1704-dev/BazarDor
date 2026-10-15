import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "অনুগ্রহ করে আপনার নাম লিখুন।"],
    },
    email: {
      type: String,
      required: [true, "অনুগ্রহ করে আপনার ইমেইল লিখুন।"],
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "অনুগ্রহ করে একটি সঠিক ইমেইল ব্যবহার করুন।"],
    },
    password: {
      type: String,
      required: [true, "অনুগ্রহ করে একটি পাসওয়ার্ড দিন।"],
      minlength: [8, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।"],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
