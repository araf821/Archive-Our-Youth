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
      <DialogContent className="max-w-md bg-zinc-900 sm:px-4 border-zinc-800 px-4 py-4 outline-none">
        <DialogHeader>
          <DialogTitle className="text-xl text-zinc-100 md:text-2xl">
            Share this post
          </DialogTitle>
        </DialogHeader>
        <hr className="border-zinc-800" />

        <div className="flex items-center justify-between gap-2 break-words rounded-sm bg-zinc-800 px-4 py-3.5 text-white">
          <p>{`${window.location.origin}${pathname}`}</p>
          <div className="flex items-center gap-2">
            <div className="h-8 border-l-[1px] border-zinc-700" />
            <button
              onClick={() => handleCopy(`${window.location.origin}${pathname}`)}
              disabled={clicked}
            >
              {clicked ? <Check className="text-green-500" /> : <Copy />}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
