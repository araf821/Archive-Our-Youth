"use client";

import { cn } from "@/lib/utils";
import { Loader2, Scaling } from "lucide-react";
import Image from "next/image";
import { ComponentProps, useState } from "react";

type ImageProps = ComponentProps<typeof Image>;

interface DynamicImageProps {
  src: string;
  classNames?: string;
  modal?: boolean;
  sizes?: string;
  alt?: string;
  fallbackSrc?: string;
  quality?: number;
  loadingComponent?: React.ReactNode;
  showResizeButton?: boolean;
  onError?: () => void;
  imageProps?: Partial<ImageProps>; // Additional image props from next/image
}

export default function DynamicImage({
  src,
  classNames,
  modal = false,
  sizes = modal
    ? "(max-width: 480px) 80vw, (max-width: 768px) 60vw, (max-width: 1024px) 50vw, 30vw"
    : "(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw",
  alt = "Image",
  fallbackSrc = "/placeholder_post_image.svg",
  quality = 90,
  loadingComponent,
  showResizeButton = true,
  onError,
  imageProps,
}: DynamicImageProps) {
  const [loading, setLoading] = useState(true);
  const [contained, setContained] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-sm border border-zinc-700",
        { "bg-zinc-800": loading },
        classNames,
      )}
    >
      {loading && (
        <div className="absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center">
          {loadingComponent || (
            <Loader2 className="size-6 animate-spin text-zinc-400" />
          )}
        </div>
      )}

      <Image
        {...imageProps}
        fill
        src={hasError ? fallbackSrc : src}
        alt={alt}
        sizes={sizes}
        quality={quality}
        onLoad={() => setLoading(false)}
        onError={handleError}
        className={cn(
          "rounded-sm transition-all duration-300",
          contained ? "object-contain" : "object-cover",
          imageProps?.className,
        )}
        priority={modal}
        loading={modal ? "eager" : "lazy"}
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
        // style={{
        //   maxWidth: modal ? "900px" : "600px",
        //   maxHeight: modal ? "600px" : "400px",
        //   width: "100%",
        //   height: "100%",
        // }}
      />

      {showResizeButton && (
        <button
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
