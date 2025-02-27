"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import Link from "next/link";
import PDFViewer from "./PDFViewer";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video" | "thumbnail";
  onChange: (url?: string) => void;
  value: string;
  classNames?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  endPoint,
  onChange,
  value,
  classNames,
}) => {
  const [isPending, setIsPending] = useState(false);

  const handleDelete = async () => {
    try {
      if (!value) return;

      const response = await fetch("/api/uploadthing", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: value }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete file");
      }

      onChange("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete file");
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      if (!file) return;

      // File size validation (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(
          "File size limit exceeded. Please choose a different file.",
        );
        return;
      }

      // File type validation
      const validTypes = {
        image: ["image/jpeg", "image/png", "image/webp"],
        thumbnail: ["image/jpeg", "image/png", "image/webp"],
        video: ["video/mp4", "video/webm"],
        audio: ["audio/mpeg", "audio/wav"],
        pdf: ["application/pdf"],
      };

      if (!validTypes[endPoint].includes(file.type)) {
        toast.error("Invalid file type. Please choose a different file.");
        return;
      }

      setIsPending(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("endpoint", endPoint);

      const response = await fetch("/api/uploadthing", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error(error);
      toast.error(
        "Something went wrong. Could not upload your file at this time.",
      );
    } finally {
      setIsPending(false);
    }
  };

  if (value) {
    if (endPoint === "image" || endPoint === "thumbnail") {
      return (
        <div
          className={cn(
            "relative aspect-square h-full w-full rounded-sm border border-background-surface bg-zinc-800",
            classNames,
          )}
        >
          <Image
            src={value}
            alt="uploaded image"
            className="rounded-sm object-cover"
            fill
          />
          <button
            title="Remove image"
            onClick={handleDelete}
            type="button"
            className="morph-sm group absolute -right-2 -top-2 rounded-md border border-border-dark bg-background-muted text-zinc-300 hover:text-red-500"
          >
            <X className="size-6 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "video") {
      return (
        <div className="relative aspect-video max-h-[40vh] w-full border border-border-dark">
          <video
            src={value}
            controls
            className="h-full w-full rounded-sm object-contain"
          />
          <button
            title="Remove video"
            onClick={handleDelete}
            type="button"
            className="morph-sm group absolute -right-2 -top-2 rounded-md border border-border-dark bg-background-muted text-zinc-300 hover:text-red-500"
          >
            <X className="size-5 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "audio") {
      return (
        <div className="w-full space-y-2 text-center">
          <audio src={value} controls className="w-full" />
          <button
            title="Remove audio"
            onClick={handleDelete}
            type="button"
            className="morph-sm rounded-sm bg-zinc-800 px-2.5 py-1.5 text-zinc-300 transition duration-200 hover:bg-background-surface hover:text-zinc-100 max-md:text-sm"
          >
            Remove selected audio
          </button>
        </div>
      );
    }

    if (endPoint === "pdf") {
      return (
        <div className="relative w-full">
          <PDFViewer url={value} />
          <button
            title="Remove PDF"
            onClick={handleDelete}
            type="button"
            className="morph-sm group absolute -right-2 -top-2 rounded-md border border-border-dark bg-background-muted text-zinc-300 hover:text-red-500"
          >
            <X className="size-5 transition group-hover:rotate-90" />
          </button>
          <Link
            href={value}
            target="_blank"
            className="group relative text-zinc-400 transition hover:text-zinc-100"
          >
            View Externally
            <span className="absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 bg-zinc-400 transition group-hover:scale-x-100 group-hover:bg-zinc-100" />
          </Link>
        </div>
      );
    }
  }

  return (
    <button
      title="Upload file"
      type="button"
      className={cn(
        "morph-md h-full w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50",
        classNames,
      )}
      onClick={() =>
        document.getElementById(`file-upload-${endPoint}`)?.click()
      }
      disabled={isPending}
      onDragOver={(e) => {
        e.preventDefault();
        e.currentTarget.classList.add("bg-zinc-700");
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("bg-zinc-700");
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.currentTarget.classList.remove("bg-zinc-700");
        if (e.dataTransfer.files[0]) {
          handleFileUpload(e.dataTransfer.files[0]);
        }
      }}
    >
      <div className="flex flex-col items-center space-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
        <p className="text-xs text-gray-400">
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-primary"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Uploading...
            </span>
          ) : (
            <>
              Drag and drop your file here, or{" "}
              <span className="font-medium text-primary">click to upload</span>
            </>
          )}
        </p>
        <input
          type="file"
          id={`file-upload-${endPoint}`}
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              handleFileUpload(e.target.files[0]);
            }
          }}
          accept={
            endPoint === "image" || endPoint === "thumbnail"
              ? "image/*"
              : endPoint === "video"
              ? "video/*"
              : endPoint === "audio"
              ? "audio/*"
              : ".pdf"
          }
        />
      </div>
    </button>
  );
};

export default FileUpload;
