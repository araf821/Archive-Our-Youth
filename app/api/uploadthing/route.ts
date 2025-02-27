import { getCurrentUser } from "@/lib/getCurrentUser";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { utapi } from "@/lib/uploadthing-utils";

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

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { url } = body;

    if (!url) {
      return new Response("Missing URL", { status: 400 });
    }

    // Extract fileKey from the URL
    const fileKey = url.split("/").pop();
    if (!fileKey) {
      return new Response("Invalid URL format", { status: 400 });
    }

    // Delete file using UTApi
    const result = await utapi.deleteFiles(fileKey);

    if (!result.success) {
      throw new Error("Failed to delete file");
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Delete error:", error);
    return new Response(JSON.stringify({ error: "Failed to delete file" }), {
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const endpoint = formData.get("endpoint") as keyof typeof fileUploader;

    if (!file || !endpoint) {
      return new Response("Missing file or endpoint", { status: 400 });
    }

    // Upload file using UTApi
    const result = await utapi.uploadFiles(file);

    if (result.error || !result.data) {
      throw new Error(result.error?.message || "Upload failed");
    }

    return new Response(JSON.stringify({ url: result.data.url }), {
      status: 200,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return new Response(JSON.stringify({ error: "Failed to upload file" }), {
      status: 500,
    });
  }
}
