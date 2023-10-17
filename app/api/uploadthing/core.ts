import { auth } from "@clerk/nextjs";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = () => {
  const { userId } = auth();
  if (!userId) {
    return undefined;
  }
  return { userId };
};

export const ourFileRouter = {
  image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } }).onUploadComplete(
    () => {},
  ),

  video: f({
    video: { maxFileSize: "32MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),

  audio: f({
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
  }).onUploadComplete(() => {}),

  pdf: f({ pdf: { maxFileCount: 1, maxFileSize: "2MB" } }).onUploadComplete(
    () => {},
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
