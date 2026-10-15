import { betterAuth } from "better-auth";
import { mongooseAdapter } from "better-auth/adapters/mongoose";
import mongoose from "mongoose";
import dbConnect from "@/app/lib/db";

await dbConnect();

export const auth = betterAuth({
  database: mongooseAdapter(mongoose),

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  advanced: {
    redirectTo: "/signin",
  },
});
