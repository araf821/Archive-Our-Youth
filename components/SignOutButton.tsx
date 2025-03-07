"use client";

import { SignOutButton as SignOut } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
  signOutUrl?: string;
}

const SignOutButton = ({ className }: SignOutButtonProps) => {
  return (
    <SignOut>
      <button
        className={cn("font-medium transition hover:text-zinc-200", className)}
      >
        Click here to log out.
      </button>
    </SignOut>
  );
};

export default SignOutButton;
