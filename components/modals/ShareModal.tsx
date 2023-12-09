"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { usePathname } from "next/navigation";
import { Check, Copy, CopyPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const ShareModal = () => {
  const { onClose, type, isOpen } = useModal();
  const [clicked, setClicked] = useState(false);
  const pathname = usePathname();

  const isModalOpen = isOpen && type === "shareModal";

  const handleCopy = (generatedContent: string) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(generatedContent)
        .then(() => {
          setClicked(true);
          toast.success("Copied to clipboard.");
          setTimeout(() => {
            setClicked(false);
          }, 1000);
        })
        .catch((error) => {
          console.error("Clipboard write failed:", error);
          toast.error("Failed to copy link.");
        });
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-zinc-800 bg-zinc-900 px-4 py-4 outline-none">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-center text-zinc-100 md:text-2xl">
            Share this post
          </DialogTitle>
        </DialogHeader>
        <hr className="border-zinc-700" />

        <div className="flex flex-col gap-2 overflow-x-hidden">
          <p className="break-words rounded-sm bg-zinc-800 px-2 py-1 text-green-500 max-md:text-sm">{`${window.location.origin}${pathname}`}</p>
          <button
            onClick={() => handleCopy(`${window.location.origin}${pathname}`)}
            disabled={clicked}
            className="w-fit mx-auto rounded-sm p-1.5 px-2 text-zinc-300 transition hover:bg-zinc-800"
          >
            {clicked ? (
              <p className="flex items-center gap-1.5 text-green-500">
                <Check className="h-4 w-4 text-green-500 md:h-5 md:w-5" />
                Copy
              </p>
            ) : (
              <p className="flex items-center gap-1.5">
                <Copy className="h-4 w-4 md:h-5 md:w-5" />
                Copy
              </p>
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
