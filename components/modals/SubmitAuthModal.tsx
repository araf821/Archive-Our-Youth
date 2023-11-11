"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { X } from "lucide-react";

const SubmitAuthModal = () => {
  const { onClose, type, isOpen } = useModal();
  const { openSignIn } = useClerk();

  const isModalOpen = isOpen && type === "submitAuthModal";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-900 px-4 py-8 outline-none">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-zinc-400 transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader>
          <p className="text-center md:text-lg text-zinc-300">
            You&apos;re not logged in.
          </p>
        </DialogHeader>

        <button
          onClick={() => {
            onClose();
            openSignIn({
              afterSignInUrl: "/submit",
            });
          }}
          className="w-full rounded-sm bg-zinc-100 py-1.5 text-center font-semibold text-zinc-900 transition hover:bg-opacity-80 md:text-lg"
        >
          Sign In
        </button>
        <hr className="border-zinc-700" />
        <Link
          href="/submit"
          className="rounded-sm border border-white py-1.5 text-center text-lg font-semibold text-white transition hover:bg-white hover:text-black"
        >
          Continue as guest
        </Link>
        <p className="text-center text-sm text-zinc-400 md:text-base">
          *Note: You will not have the chance to edit or delete your posts if
          you post without signing in.
        </p>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitAuthModal;
