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
      className={buttonVariants({
        className: `${classNames} w-32 bg-zinc-800 hover:bg-zinc-700`,
      })}
    >
      {label ? label : "Back"}
    </Button>
  );
};

export default BackButton;
