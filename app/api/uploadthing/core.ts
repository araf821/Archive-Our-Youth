import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  image: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .onUploadError(() => {
      return;
    })
    .onUploadComplete(() => {}),

  thumbnail: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .onUploadError(() => {
      return;
    })
    .onUploadComplete(() => {}),

  video: f({
    video: { maxFileSize: "32MB", maxFileCount: 1 },
  })
    .onUploadError(() => {
      return;
    })
    .onUploadComplete(() => {}),

  audio: f({
    audio: { maxFileSize: "16MB", maxFileCount: 1 },
  })
    .onUploadError(() => {
      return;
    })
    .onUploadComplete(() => {}),

  pdf: f({ pdf: { maxFileCount: 1, maxFileSize: "2MB" } })
    .onUploadError(() => {
      return;
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
