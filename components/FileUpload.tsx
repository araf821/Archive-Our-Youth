"use client";

import { FC } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: FC<FileUploadProps> = ({ endPoint, onChange, value }) => {
  const fileType = value?.split(".").pop();

  console.log("FILE UPLOAD PROPS:\n\n\n", endPoint, value);

  if (value && fileType !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={value}
          alt="uploaded image"
          className="rounded-full object-cover"
          fill
        />
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute -right-1 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (value && fileType === "pdf") {
    return (
      <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-200 hover:underline dark:text-indigo-400"
        >
          {value}
        </a>
        <button
          onClick={() => onChange("")}
          type="button"
          className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endPoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};

export default FileUpload;
