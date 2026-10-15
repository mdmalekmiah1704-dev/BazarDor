import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import dbConnect from "@/app/lib/db";
import { toNextJsHandler } from "better-auth/next-js";

await dbConnect();

const nativeClient = mongoose.connection?.getClient ? mongoose.connection.getClient() : null;

export const auth = betterAuth({
  database: nativeClient ? mongodbAdapter(nativeClient.db()) : undefined,
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
  }
});

const handler = toNextJsHandler(auth);

export { handler as GET, handler as POST };
