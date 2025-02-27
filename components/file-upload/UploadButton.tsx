import { FC } from "react";
import { cn } from "@/lib/utils";

interface UploadButtonProps {
  endPoint: "audio" | "image" | "pdf" | "video" | "thumbnail";
  onUpload: (file: File) => void;
  isPending: boolean;
  className?: string;
}

export const UploadButton: FC<UploadButtonProps> = ({
  endPoint,
  onUpload,
  isPending,
  className,
}) => {
  return (
    <button
      title="Upload file"
      type="button"
      className={cn(
        "morph-md h-full w-full cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50",
        className,
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
          onUpload(e.dataTransfer.files[0]);
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
              onUpload(e.target.files[0]);
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
