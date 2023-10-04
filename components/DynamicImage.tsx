"use client";

import { Scaling } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";

interface DynamicImageProps {
  src: string;
}

const DynamicImage: FC<DynamicImageProps> = ({ src }) => {
  const [contained, setContained] = useState(false);

  return (
    <div className="relative mt-4 mb-10 aspect-[4/3] overflow-hidden">
      <Image
        fill
        src={src}
        alt="post image"
        className={`rounded-sm ${
          contained ? "object-contain" : "object-cover"
        }`}
      />
      <button
        onClick={() => setContained((prev) => !prev)}
        className="absolute bottom-2 right-2 h-8 w-8 rounded-md bg-zinc-900/40 backdrop-blur-md transition hover:bg-zinc-900 active:scale-90 sm:h-10 sm:w-10"
      >
        <Scaling className="h-4 w-4 translate-x-2 md:translate-x-2.5 text-zinc-50 md:h-5 md:w-5" />
      </button>
    </div>
  );
};

export default DynamicImage;
