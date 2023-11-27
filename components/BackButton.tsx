"use client";

import { FC } from "react";
import { Button, buttonVariants } from "./ui/Button";
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
        "w-32 rounded-md bg-zinc-800 px-4 py-2 transition-colors duration-300 hover:bg-zinc-700",
        classNames,
      )}
      // className={buttonVariants({
      //   className: `${classNames} w-32 bg-zinc-800 hover:bg-zinc-700`,
      // })}
    >
      {label ? label : "Back"}
    </button>
  );
};

export default BackButton;
