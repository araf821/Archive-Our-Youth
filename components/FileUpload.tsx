"use client";

import { FC } from "react";
import "@uploadthing/react/styles.css";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { FileIcon, X } from "lucide-react";
import { Button } from "./ui/Button";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video";
  onChange: (url?: string) => void;
  value: string;
}

const FileUpload: FC<FileUploadProps> = ({ endPoint, onChange, value }) => {
  const fileType = value?.split(".").pop();

  console.log("FILE UPLOAD PROPS:\n\n\n", endPoint, value);

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
            className="group absolute -right-2 -top-2 rounded-md bg-zinc-700 p-1 text-white shadow-sm"
          >
            <X className="h-6 w-6 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "video") {
      return (
        <div className="relative aspect-video h-full w-full">
          <video
            src={value}
            controls
            className="h-full w-full rounded-sm object-cover"
          />
          <button
            onClick={() => onChange("")}
            type="button"
            className="group absolute -right-2 -top-2 rounded-md bg-zinc-700 p-1 text-white shadow-sm"
          >
            <X className="h-6 w-6 transition group-hover:rotate-90" />
          </button>
        </div>
      );
    }

    if (endPoint === "audio") {
      return (
        <div className="w-full space-y-8 ">
          <p className="text-xl text-zinc-300 lg:text-2xl">Uploaded Audio</p>
          <audio src={value} controls className="w-full" />
          <Button
            onClick={() => onChange("")}
            type="button"
            size={"lg"}
            className="bg-zinc-800 text-base hover:bg-zinc-700"
          >
            Remove selected audio
          </Button>
        </div>
      );
    }
  }

  // if (value && fileType === "pdf") {
  //   return (
  //     <div className="relative mt-2 flex items-center rounded-md bg-background/10 p-2">
  //       <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
  //       <a
  //         href={value}
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="ml-2 text-sm text-indigo-200 hover:underline dark:text-indigo-400"
  //       >
  //         {value}
  //       </a>
  //       <button
  //         onClick={() => onChange("")}
  //         type="button"
  //         className="absolute -right-2 -top-2 rounded-full bg-rose-500 p-1 text-white shadow-sm"
  //       >
  //         <X className="h-4 w-4" />
  //       </button>
  //     </div>
  //   );
  // }

  return (
    <UploadDropzone
      className="h-full w-full bg-zinc-800"
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
