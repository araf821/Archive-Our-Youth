"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { Scaling } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface DynamicImageProps {
  src: string;
  classNames?: string;
}

const DynamicImage: FC<DynamicImageProps> = ({ src, classNames }) => {
  const [contained, setContained] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-[4/3] overflow-hidden rounded-sm border border-zinc-700",
        classNames,
      )}
    >
      <Image
        fill
        src={src}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        alt="post image"
        className={`rounded-sm ${
          contained ? "object-contain" : "object-cover"
        }`}
      />
      <button
        onClick={() => setContained((prev) => !prev)}
        className="absolute bottom-2 right-2 h-8 w-8 rounded-md bg-zinc-900/40 outline-white backdrop-blur-md transition hover:bg-zinc-900 focus-visible:outline-2 active:scale-90 sm:h-10 sm:w-10"
      >
        <span className="sr-only">resize button</span>
        <Scaling className="h-4 w-4 translate-x-2 text-zinc-50 md:h-5 md:w-5 md:translate-x-2.5" />
      </button>
    </div>
  );
};

export default DynamicImage;
