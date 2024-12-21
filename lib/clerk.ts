import { createClerkClient } from "@clerk/nextjs/server";

export const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_API_SECRET,
});
