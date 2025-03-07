"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2, Scaling } from "lucide-react";

import { cn } from "@/lib/utils";

interface DynamicImageProps {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  classNames?: string;
  modal?: boolean;
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  showResizeButton?: boolean;
  onError?: () => void;
  className?: string;
  priority?: boolean;
}

export default function DynamicImage({
  src,
  classNames,
  modal = false,
  alt = "Image",
  fallbackSrc = "/placeholder_post_image.svg",
  loadingComponent,
  showResizeButton = true,
  onError,
  priority = false,
  width = 800,
  height = 600,
  className,
}: DynamicImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [contained, setContained] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-sm border border-background-surface",
        { "bg-zinc-800": isLoading },
        modal && "max-w-[500px]",
        classNames,
      )}
    >
      {isLoading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          {loadingComponent || (
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          )}
        </div>
      )}

      <Image
        src={hasError ? fallbackSrc : src}
        alt={alt}
        width={width}
        height={height}
        priority={priority || modal}
        onLoadingComplete={() => setIsLoading(false)}
        onError={handleError}
        className={cn(
          "h-full w-full rounded-sm transition-all duration-300",
          contained ? "object-contain" : "object-cover",
          className,
        )}
        sizes={
          modal
            ? "(max-width: 600px) 192px, 256px,"
            : "(max-width: 600px) 192px, (max-width: 1200px) 256px, 384px"
        }
      />

      {showResizeButton && (
        <button
          type="button"
          onClick={() => setContained((prev) => !prev)}
          className="absolute bottom-2 right-2 h-8 w-8 rounded-md bg-background-muted/40 outline-white backdrop-blur-md transition-all hover:bg-background-muted/60 focus-visible:outline-2 active:scale-90 sm:h-10 sm:w-10"
          title={contained ? "Switch to cover mode" : "Switch to contain mode"}
        >
          <span className="sr-only">
            {contained ? "Switch to cover mode" : "Switch to contain mode"}
          </span>
          <Scaling className="size-4 translate-x-2 text-zinc-50 transition-transform group-active:scale-90 md:h-5 md:w-5 md:translate-x-2.5" />
        </button>
      )}
    </div>
  );
}
