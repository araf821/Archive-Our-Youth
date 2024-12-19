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
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import Link from "next/link";

const AuthModal = () => {
  const { onClose, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "authModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-900 p-4 outline-none md:py-8">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-zinc-400 transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="">You&rsquo;re not logged in.</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>

        <Link
          href="/sign-in"
          className="mt-1 w-full  rounded-sm bg-green-500 py-1.5 text-center font-semibold text-zinc-950 transition duration-200 hover:bg-green-600"
        >
          Sign In
        </Link>
        <hr className="border-zinc-800" />

        <p className="text-center text-zinc-400 max-md:text-sm">
          New to the Archive?
        </p>
        <Link
          href="/sign-up"
          className="mb-2 rounded-sm border border-zinc-700 bg-zinc-900 py-1.5 text-center font-medium text-zinc-300 transition duration-200 hover:bg-zinc-800 hover:text-zinc-100"
        >
          Create New Account
        </Link>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
