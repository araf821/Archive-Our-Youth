"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { usePathname } from "next/navigation";
import { Check, Copy, Facebook, Mail, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import ShareButton from "./ShareButton";

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

  const currentUrl = `${window.location.origin}${pathname}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg border-border-dark bg-background-muted p-4 outline-none md:p-8">
        <DialogHeader>
          <DialogTitle className="text-xl text-zinc-100 md:text-center md:text-2xl">
            Share this post
          </DialogTitle>
        </DialogHeader>
        <hr className="border-zinc-700" />

        <div className="flex flex-col gap-4">
          <div className="mt-4 grid grid-cols-4 place-items-center gap-2">
            <ShareButton
              platform="Facebook"
              icon={Facebook}
              shareUrl={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl,
              )}`}
              caption="Facebook"
            />
            <ShareButton
              platform="X"
              icon={"/x-logo.svg"}
              shareUrl={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl,
              )}`}
              caption="X"
            />
            <ShareButton
              platform="WhatsApp"
              icon={"/whatsapp.svg"}
              shareUrl={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
              caption="WhatsApp"
            />
            <ShareButton
              platform="Email"
              icon={Mail}
              shareUrl={`mailto:?subject=Check out this post&body=${encodeURIComponent(
                currentUrl,
              )}`}
              caption="Email"
            />
          </div>
          <div className="mt-4 flex w-full items-center justify-between gap-2 rounded-md border border-zinc-700 bg-zinc-800 p-2">
            <p className="w-fit text-zinc-300 max-md:text-sm max-sm:w-60 max-sm:truncate">
              {currentUrl}
            </p>
            <button
              onClick={() => handleCopy(currentUrl)}
              disabled={clicked}
              className="rounded-md bg-zinc-700 p-2 text-zinc-300 transition hover:bg-zinc-600"
            >
              {clicked ? (
                <p className="flex items-center gap-1.5 text-green-500">
                  <Check className="size-4 text-green-500 md:size-5" />
                </p>
              ) : (
                <p className="flex items-center gap-1.5">
                  <Copy className="size-4 md:size-5" />
                </p>
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ShareModal;
