"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
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
      <DialogContent className="max-w-md bg-zinc-900 p-4 outline-none md:py-6">
        <DialogTrigger className="absolute right-4 top-4">
          <X className="text-zinc-400 transition hover:rotate-90 hover:text-zinc-200" />
        </DialogTrigger>
        <DialogHeader>
          <p className="text-xl font-semibold text-zinc-100 md:text-2xl">
            You&rsquo;re not logged in.
          </p>
        </DialogHeader>

        <hr className="border-zinc-700" />
        <button
          onClick={() => {
            router.push("/sign-in");
          }}
          className="morph-sm mt-1 w-full rounded-sm bg-green-500 py-1.5 text-center font-semibold text-zinc-950 transition duration-200 hover:bg-green-600 md:text-lg"
        >
          Sign In
        </button>
        <Link
          href="/submit"
          className="morph-sm rounded-sm border border-green-500 py-1.5 text-center text-lg font-semibold text-green-500 transition duration-200"
        >
          Continue as guest
        </Link>
        <p className="text-center text-sm text-zinc-400 md:text-base">
          *Note: You will not have the chance to edit or delete your posts if
          you submit without signing in.
        </p>
        <hr className="border-zinc-700" />

        <p className="text-center text-zinc-200 max-md:text-sm">
          New to the Archive?
        </p>
        <button
          onClick={() => {
            router.push("/sign-up");
          }}
          className="morph-md mb-2 rounded-sm border border-white py-1.5 text-center text-lg font-semibold text-white transition duration-200"
        >
          Create New Account
        </button>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitAuthModal;
