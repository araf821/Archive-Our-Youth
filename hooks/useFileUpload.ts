import { useTransition } from "react";
import { toast } from "sonner";

type FileEndpoint = "audio" | "image" | "pdf" | "video" | "thumbnail";

const validTypes = {
  image: ["image/jpeg", "image/png", "image/webp"],
  thumbnail: ["image/jpeg", "image/png", "image/webp"],
  video: ["video/mp4", "video/webm"],
  audio: ["audio/mpeg", "audio/wav"],
  pdf: ["application/pdf"],
};

export const useFileUpload = (
  endPoint: FileEndpoint,
  onChange: (url?: string) => void,
) => {
  const [isPending, startTransition] = useTransition();

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // File size validation (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size limit exceeded. Please choose a different file.");
      return;
    }

    // File type validation
    if (!validTypes[endPoint].includes(file.type)) {
      toast.error("Invalid file type. Please choose a different file.");
      return;
    }

    startTransition(async () => {
      try {
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
      }
    });
  };

  return { handleFileUpload, isPending };
};
