import { useTransition } from "react";
import { toast } from "sonner";

export const useFileDelete = (onChange: (url?: string) => void) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = async (value: string) => {
    if (!value) return;

    startTransition(async () => {
      try {
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
    });
  };

  return { handleDelete, isPending };
};
