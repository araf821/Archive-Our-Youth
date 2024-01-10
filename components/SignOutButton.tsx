"use client";

import { useRouter } from "next/navigation";
import { SignOutButton as SignOut } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface SignOutButtonProps {
  className?: string;
  signOutUrl?: string;
}

const SignOutButton = ({
  className,
  signOutUrl = "/home",
}: SignOutButtonProps) => {
  const router = useRouter();

  return (
    <SignOut signOutCallback={() => router.push(signOutUrl)}>
      <button
        className={cn("font-medium transition hover:text-zinc-200", className)}
      >
        Click here to log out.
      </button>
    </SignOut>
  );
};

export default SignOutButton;
