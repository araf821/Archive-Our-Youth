"use client";

import { FC } from "react";

import { useFileDelete } from "@/hooks/useFileDelete";
import { useFileUpload } from "@/hooks/useFileUpload";

import { AudioRenderer } from "./AudioRenderer";
import { ImageRenderer } from "./ImageRenderer";
import { PDFRenderer } from "./PDFRenderer";
import { UploadButton } from "./UploadButton";
import { VideoRenderer } from "./VideoRenderer";

interface FileUploadProps {
  endPoint: "audio" | "image" | "pdf" | "video" | "thumbnail";
  onChange: (url?: string) => void;
  value: string;
  classNames?: string;
  imageSizes?: string;
}

const FileUpload: FC<FileUploadProps> = ({
  endPoint,
  onChange,
  value,
  classNames,
  imageSizes,
}) => {
  const { handleDelete, isPending: isDeleting } = useFileDelete(onChange);
  const { handleFileUpload, isPending: isUploading } = useFileUpload(
    endPoint,
    onChange,
  );

  if (value) {
    if (endPoint === "image" || endPoint === "thumbnail") {
      return (
        <ImageRenderer
          value={value}
          onDelete={() => handleDelete(value)}
          isPending={isDeleting}
          className={classNames}
          sizes={imageSizes}
        />
      );
    }

    if (endPoint === "video") {
      return (
        <VideoRenderer
          value={value}
          onDelete={() => handleDelete(value)}
          isPending={isDeleting}
        />
      );
    }

    if (endPoint === "audio") {
      return (
        <AudioRenderer
          value={value}
          onDelete={() => handleDelete(value)}
          isPending={isDeleting}
        />
      );
    }

    if (endPoint === "pdf") {
      return (
        <PDFRenderer
          value={value}
          onDelete={() => handleDelete(value)}
          isPending={isDeleting}
        />
      );
    }
  }

  return (
    <UploadButton
      endPoint={endPoint}
      onUpload={handleFileUpload}
      isPending={isUploading}
      className={classNames}
    />
  );
};

export default FileUpload;
