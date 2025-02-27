import { UTApi } from "uploadthing/server";

if (!process.env.UPLOADTHING_SECRET) {
  throw new Error("UPLOADTHING_SECRET is required");
}

// Initialize the UploadThing API client with the secret token
export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});
