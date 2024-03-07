"use client";

import { cn } from "@/lib/utils";
import { ListRestart } from "lucide-react";

interface RefreshButtonProps {
  className?: string;
}

const RefreshButton = ({ className }: RefreshButtonProps) => {
  return (
    <button title="Refresh" onClick={() => window.location.reload()}>
      <span className="sr-only">refresh</span>
      <ListRestart
        className={cn(
          "h-5 w-5 text-zinc-500 transition hover:text-zinc-200 md:h-6 md:w-6",
          className,
        )}
      />
    </button>
  );
};

export default RefreshButton;
