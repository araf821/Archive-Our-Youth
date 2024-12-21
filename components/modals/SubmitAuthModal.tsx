"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "../ui/Dialog";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

const SubmitAuthModal = () => {
  const { onClose, type, isOpen } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === "submitAuthModal";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-900 p-4 outline-none md:py-8">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-muted-foreground transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="">You&rsquo;re not logged in.</DialogTitle>
          <DialogDescription>
            Please sign in or create an account to continue.
          </DialogDescription>
        </DialogHeader>

        <hr className="border-zinc-700" />
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          className="mt-1 w-full rounded-sm bg-green-500 py-1.5 text-center font-semibold text-zinc-950 transition duration-200 hover:bg-green-600"
        >
          Sign In
        </button>
        <Link
          href="/submit"
          className="rounded-sm border border-zinc-700 py-1.5 text-center font-medium text-zinc-300 transition duration-200"
        >
          Continue as guest
        </Link>
        <p className="text-center text-muted-foreground max-md:text-sm">
          *Note: You will not have the chance to edit or delete your posts if
          you submit without signing in.
        </p>
        <hr className="border-zinc-700" />

        <p className="text-center text-muted-foreground max-md:text-sm">
          New to the Archive?
        </p>
        <button
          onClick={() => {
            router.push("/sign-up");
          }}
          className="mb-2 rounded-sm border border-zinc-700 bg-zinc-900 py-1.5 text-center font-medium text-zinc-300 transition duration-200 hover:bg-zinc-800 hover:text-zinc-100"
        >
          Create New Account
        </button>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitAuthModal;
