"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { X } from "lucide-react";
import Link from "next/link";

const AuthModal = () => {
  const { onClose, type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "authModal";

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

        <Link
          href="/sign-in"
          className="mt-1 w-full  rounded-sm bg-primary py-1.5 text-center font-semibold text-background transition duration-200 hover:bg-primary-dark"
        >
          Sign In
        </Link>
        <hr className="border-border-dark" />

        <div className="flex w-full flex-col space-y-1">
          <p className="text-center text-text-secondary max-md:text-sm">
            New to the Archive?
          </p>
          <Link
            href="/sign-up"
            className="mb-2 rounded-sm border border-background-surface bg-background-muted py-1.5 text-center font-medium text-zinc-300 transition duration-200 hover:bg-zinc-800 hover:text-zinc-100"
          >
            Create New Account
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
