import { FC } from "react";
import { Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DeleteButtonProps {
  onClick: () => void;
  isPending: boolean;
  variant?: "icon" | "text";
  title?: string;
  className?: string;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
  onClick,
  isPending,
  variant = "icon",
  title = "Remove file",
  className,
}) => {
  if (variant === "text") {
    return (
      <button
        title={title}
        onClick={onClick}
        type="button"
        disabled={isPending}
        className={cn(
          "morph-sm rounded-sm bg-zinc-800 px-2.5 py-1.5 text-xs text-zinc-300 transition duration-200 hover:bg-background-surface hover:text-zinc-100 md:text-sm",
          className,
        )}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            Deleting...
          </span>
        ) : (
          "Remove selected file"
        )}
      </button>
    );
  }

  return (
    <button
      title={title}
      onClick={onClick}
      type="button"
      disabled={isPending}
      className={cn(
        "morph-sm group absolute -right-2 -top-2 rounded-md border border-border-dark bg-background-muted text-zinc-300 hover:text-red-500",
        className,
      )}
    >
      {isPending ? (
        <Loader2 className="size-5 animate-spin text-error" />
      ) : (
        <X className="size-5 transition group-hover:rotate-90" />
      )}
    </button>
  );
};
