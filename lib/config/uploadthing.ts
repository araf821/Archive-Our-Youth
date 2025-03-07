import { createUploadthing, type FileRouter } from "uploadthing/next";

import { getCurrentUser } from "@/lib/getCurrentUser";

const f = createUploadthing();

export const fileUploader = {
  image: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const currentUser = await getCurrentUser();
      return { userId: currentUser?.userId };
    })
    .onUploadComplete(async () => {}),

  video: f({ video: { maxFileSize: "32MB" } })
    .middleware(async () => {
      const currentUser = await getCurrentUser();
      return { userId: currentUser?.userId };
    })
    .onUploadComplete(async () => {}),

  audio: f({ audio: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const currentUser = await getCurrentUser();
      return { userId: currentUser?.userId };
    })
    .onUploadComplete(async () => {}),

  thumbnail: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const currentUser = await getCurrentUser();
      return { userId: currentUser?.userId };
    })
    .onUploadComplete(async () => {}),

  pdf: f({ pdf: { maxFileSize: "8MB" } })
    .middleware(async () => {
      const currentUser = await getCurrentUser();
      return { userId: currentUser?.userId };
    })
    .onUploadComplete(async () => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof fileUploader;
