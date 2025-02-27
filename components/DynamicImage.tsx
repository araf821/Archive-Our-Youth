"use client";

import { cn } from "@/lib/utils";
import { Loader2, Scaling } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DynamicImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src: string;
  classNames?: string;
  modal?: boolean;
  fallbackSrc?: string;
  loadingComponent?: React.ReactNode;
  showResizeButton?: boolean;
  onError?: () => void;
}

// Function to append width parameter to URL
const getResizedImageUrl = (url: string, width: number) => {
  try {
    const parsedUrl = new URL(url);
    parsedUrl.searchParams.set("width", width.toString());
    return parsedUrl.toString();
  } catch {
    // If URL parsing fails (e.g., relative URL), try a simple append
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}width=${width}`;
  }
};

export default function DynamicImage({
  src,
  classNames,
  modal = false,
  alt = "Image",
  fallbackSrc = "/placeholder_post_image.svg",
  loadingComponent,
  showResizeButton = true,
  onError,
  ...imgProps
}: DynamicImageProps) {
  const [loading, setLoading] = useState(true);
  const [contained, setContained] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Handle image loading
  const handleLoad = () => {
    setLoading(false);
  };

  // Set proper dimensions when the component mounts
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      setLoading(false);
    }
  }, []);

  // Define image sizes based on modal state
  const imageSizes = modal
    ? "500px"
    : "(min-width: 1280px) 800px, (min-width: 768px) 600px, 400px";

  // Generate srcset with multiple sizes
  const srcset = hasError
    ? fallbackSrc
    : [300].map((w) => `${getResizedImageUrl(src, w)} ${w}w`).join(", ");

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-sm border border-background-surface",
        { "bg-zinc-800": loading },
        modal && "max-w-[500px]",
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

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...imgProps}
        ref={imgRef}
        src={
          hasError ? fallbackSrc : getResizedImageUrl(src, modal ? 500 : 800)
        }
        srcSet={srcset}
        sizes={imageSizes}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "absolute h-full w-full rounded-sm transition-all duration-300",
          contained ? "object-contain" : "object-cover",
          imgProps?.className,
        )}
        loading={modal ? "eager" : "lazy"}
        // Add a small transparent placeholder to improve performance
        style={{
          ...imgProps?.style,
          backgroundColor: loading ? "transparent" : undefined,
        }}
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
