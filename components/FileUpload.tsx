"use client";

import { FC } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import Link from "next/link";
import PDFViewer from "./PDFViewer";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video";
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
  if (value) {
    if (endPoint === "image") {
      return (
        <div className="relative aspect-square h-full w-full max-w-[400px] bg-zinc-800">
          <Image
            src={value}
            alt="uploaded image"
            className="rounded-sm object-cover"
            fill
          />
          <button
            onClick={() => onChange("")}
            type="button"
            className="group absolute -right-2 -top-2 rounded-md bg-red-600 p-0.5 text-white shadow-sm"
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

    if (endPoint === "pdf") {
      return (
        <div className="relative w-full">
          <PDFViewer url={value} />
          <button
            onClick={() => onChange("")}
            type="button"
            className="group absolute -right-2 -top-2 rounded-md bg-red-600 p-0.5 text-white shadow-sm"
          >
            <X className="h-5 w-5 transition group-hover:rotate-90" />
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
    <UploadDropzone
      className={cn("h-full w-full bg-zinc-800", classNames)}
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
