"use client";

import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { FC } from "react";

interface CollageItemProps {
  item: any;
}

const CollageItem: FC<CollageItemProps> = ({ item }) => {
  const { onOpen } = useModal();

  return (
    <div
      onClick={() => onOpen("postModal", { post: item })}
      className={`group relative aspect-square cursor-pointer hover:brightness-125 overflow-hidden transition duration-500`}
    >
      <div className="absolute brightness-200 left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl transition duration-700 group-hover:-translate-x-full md:duration-500" />
      <Image
        src={item.imageUrl}
        alt="collage item"
        fill
        className="object-cover transition duration-500 ease-out"
      />
    </div>
  );
};

export default CollageItem;
