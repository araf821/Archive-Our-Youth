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
    <Button
      onClick={() => router.back()}
      className={cn(
        buttonVariants({
          className: "w-32 bg-zinc-800 hover:bg-zinc-700",
        }),
        { classNames },
      )}
    >
      {label ? label : "Back"}
    </Button>
  );
};

export default BackButton;
