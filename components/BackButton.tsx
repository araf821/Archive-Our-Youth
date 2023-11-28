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
        "w-32 rounded-md bg-zinc-800 text-white px-4 py-2 transition-colors duration-300 hover:bg-zinc-700",
        classNames,
      )}
    >
      {label ? label : "Back"}
    </button>
  );
};

export default BackButton;
