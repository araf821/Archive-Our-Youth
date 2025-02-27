import { FC } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { DeleteButton } from "./DeleteButton";
import DynamicImage from "../DynamicImage";

interface ImageRendererProps {
  value: string;
  onDelete: () => void;
  isPending: boolean;
  className?: string;
}

export const ImageRenderer: FC<ImageRendererProps> = ({
  value,
  onDelete,
  isPending,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative aspect-square h-full w-full rounded-sm border border-background-surface bg-zinc-800",
        className,
      )}
    >
      <Image
        src={value}
        alt="uploaded image"
        fill
        sizes="(max-width: 768px) 192px, 320px"
        className="object-cover"
      />
      <DeleteButton
        onClick={onDelete}
        isPending={isPending}
        title="Remove image"
      />
    </div>
  );
};
