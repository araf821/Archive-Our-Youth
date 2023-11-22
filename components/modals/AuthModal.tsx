"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import {
  RedirectToSignIn,
  SignInButton,
  redirectToSignIn,
} from "@clerk/nextjs";
import Link from "next/link";

const AuthModal = () => {
  const { onClose, type, isOpen } = useModal();

  const isModalOpen = isOpen && type === "authModal";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-zinc-800 px-4 py-8 outline-none">
        <DialogHeader>
          <p className="text-center text-zinc-400">
            You&apos;re not logged in.
          </p>
          <DialogTitle className="text-center text-2xl text-zinc-100">
            Welcome back to Archive Our Youth
          </DialogTitle>
        </DialogHeader>

        <Link
          href={"sign-in"}
          className="w-full rounded-sm bg-rose-500 py-1.5 text-center font-semibold transition hover:bg-opacity-80 md:text-lg"
        >
          Sign In
        </Link>
        <hr className="border-zinc-700" />
        <p className="text-center text-zinc-400">New to the Archive?</p>
        <Link
          href="/sign-up"
          className="rounded-sm border border-white py-1.5 text-center text-lg font-semibold text-white transition hover:bg-white hover:text-black"
        >
          Sign Up
        </Link>
      </DialogContent>
    </Dialog>
  );
};
export default AuthModal;
