import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import mongoose from "mongoose";
import dbConnect from "@/app/lib/db";
import { toNextJsHandler } from "better-auth/next-js";

try {
  await dbConnect();
} catch (error) {
  console.warn("Database connection skipped during build time.");
}

const nativeClient = mongoose.connection?.getClient ? mongoose.connection.getClient() : null;
const dbInstance = nativeClient ? nativeClient.db() : { collection: () => ({}) };

export const auth = betterAuth({
  database: mongodbAdapter(dbInstance),
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
