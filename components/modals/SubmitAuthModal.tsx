"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

import { useModal } from "@/hooks/useModal";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";

const SubmitAuthModal = () => {
  const { onClose, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "submitAuthModal";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-background-muted p-4 outline-none md:py-8">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-text-secondary transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="">You&rsquo;re not logged in.</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>

        <hr className="border-background-surface" />
        <button
          onClick={() => {
            router.push("/sign-in");
            onClose();
          }}
          className="mt-1 w-full rounded-sm bg-primary py-1.5 text-center font-semibold text-background transition duration-200 hover:bg-primary-dark"
        >
          Sign In
        </button>
        <Link
          href="/submit"
          onClick={onClose}
          className="rounded-sm border border-background-surface py-1.5 text-center font-medium text-zinc-300 transition duration-200"
        >
          Continue as guest
        </Link>
        <p className="text-center text-text-secondary max-md:text-sm">
          *Note: You will not have the chance to edit or delete your posts if
          you submit without signing in.
        </p>
        <hr className="border-background-surface" />

        <p className="text-center text-text-secondary max-md:text-sm">
          New to the Archive?
        </p>
        <button
          onClick={() => {
            router.push("/sign-up");
            onClose();
          }}
          className="mb-2 rounded-sm border border-background-surface bg-background-muted py-1.5 text-center font-medium text-zinc-300 transition duration-200 hover:bg-zinc-800 hover:text-zinc-100"
        >
          Create New Account
        </button>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitAuthModal;
