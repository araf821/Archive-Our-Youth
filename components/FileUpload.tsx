"use client";

import { FC, useState } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();

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
  // const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  const [numPages, setNumPages] = useState<number>();
  const [currPage, setCurrPage] = useState<number>(1);

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
        <div className="relative rounded-sm">
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={() => {
              toast.error("Something went wrong.");
            }}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            file={value}
            className="max-h-full"
          >
            <Page
              pageNumber={currPage}
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
            />
          </Document>
          <p className="mt-1">
            Page {pageNumber} of {numPages}
          </p>
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
