"use client";

import { FC } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: FC<FileUploadProps> = ({ endPoint, onChange, value }) => {
  if (value) {
    if (endPoint === "image") {
      return (
        <div className="relative h-full w-full">
          <Image
            src={value}
            alt="uploaded image"
            className="rounded-sm object-cover"
            fill
          />
          <button
            onClick={() => onChange("")}
            type="button"
            className="group absolute -right-2 -top-2 rounded-md bg-zinc-800 p-1 text-white shadow-sm"
          >
            <X className="h-5 w-5 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "video") {
      return (
        <div className="relative aspect-video max-h-[40vh] w-full">
          <video
            src={value}
            controls
            className="h-full w-full rounded-sm object-contain"
          />
          <button
            onClick={() => onChange("")}
            type="button"
            className="group absolute -right-2 -top-2 rounded-md bg-zinc-800 p-1 text-white shadow-sm"
          >
            <X className="h-5 w-5 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "audio") {
      return (
        <div className="w-full space-y-8 pt-4">
          <audio src={value} controls className="w-full" />
          <button
            onClick={() => onChange("")}
            type="button"
            className="rounded-md bg-zinc-800 px-3 py-2 text-zinc-300 transition hover:bg-zinc-700 max-md:text-sm md:text-base"
          >
            Remove selected audio
          </button>
        </div>
      );
    }
  }

  return (
    <UploadDropzone
      className="h-full w-full bg-zinc-800"
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);

        if (error.message.includes("maximum allowed size")) {
          toast.error(
            "File size limit exceeded. Please choose a different file.",
          );
        } else {
          toast.error(
            "Something went wrong. Could not upload your file at this time.",
          );
        }
      }}
    />
  );
};

export default FileUpload;
