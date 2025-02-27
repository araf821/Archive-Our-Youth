"use client";

import { FC } from "react";
import { useFileDelete } from "@/hooks/useFileDelete";
import { useFileUpload } from "@/hooks/useFileUpload";
import { ImageRenderer } from "./ImageRenderer";
import { VideoRenderer } from "./VideoRenderer";
import { AudioRenderer } from "./AudioRenderer";
import { PDFRenderer } from "./PDFRenderer";
import { UploadButton } from "./UploadButton";

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
