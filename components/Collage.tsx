"use client";

import { useModal } from "@/hooks/useModal";
import { dummyItems } from "@/lib/data";
import Image from "next/image";
import { FC, Fragment } from "react";

interface CollageProps {}

const Collage: FC<CollageProps> = ({}) => {
  const { onOpen } = useModal();

  return (
    <div className="grid grid-cols-2 bg-black pb-36 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
      {[...dummyItems, ...dummyItems, ...dummyItems].map((item, index) => (
        <Fragment key={index}>
          <div
            onClick={() => onOpen("postModal", { post: item })}
            className={`relative aspect-square cursor-pointer overflow-hidden`}
          >
            <Image
              src={item.imageUrl}
              alt="collage item"
              fill
              className="object-cover transition duration-500 ease-out hover:scale-110"
            />
          </div>
        </Fragment>
      ))}
    </div>
  );
};

export default Collage;
