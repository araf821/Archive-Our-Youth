"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  classNames?: string;
}

const BackButton: FC<BackButtonProps> = ({ classNames, label }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        "morph-sm w-32 rounded-lg border border-zinc-800 bg-zinc-800 px-4 py-2 tracking-widest text-white transition-colors duration-300",
        classNames,
      )}
    >
      {label ? label : "Back"}
    </button>
  );
};

export default BackButton;
