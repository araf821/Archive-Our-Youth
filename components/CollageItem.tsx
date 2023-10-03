"use client";

import { useModal } from "@/hooks/useModal";
import { Post, User } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import VideoItem from "./VideoItem";
import AudioItem from "./AudioItem";

interface CollageItemProps {
  post: Post & { user: User };
}

const CollageItem: FC<CollageItemProps> = ({ post }) => {
  const { onOpen } = useModal();

  const handleClick = () => {
    onOpen("postModal", { post });
  };

  if (post.contentType === "VIDEO") {
    return <VideoItem post={post} onClick={handleClick} />;
  }

  if (post.contentType === "AUDIO") {
    return <AudioItem post={post} onClick={handleClick} />;
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative aspect-square cursor-pointer overflow-hidden border border-zinc-800 transition duration-500 hover:brightness-125`}
    >
      <div className="absolute left-0 top-0 z-10 rounded-br-md bg-black px-2 py-0.5 text-xs text-zinc-100 sm:text-sm lg:text-base">
        {post.contentType === "TEXT" ? "Written" : "Image"}
      </div>
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      {post.contentType === "IMAGE" && (
        // <div className="flex flex-col gap-1">
        //   <div className="relative aspect-square w-[60%] mx-auto bg-pink-500">
        <Image
          src={post.postContent}
          alt="collage item"
          fill
          className="object-cover"
        />
        // </div>
        //  <p className="bg-pink-300 text-2xl text-white">hello</p>
        // </div>
      )}

      {post.contentType === "TEXT" && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden p-2 text-zinc-100">
          <p className="text-lg md:text-2xl">{post.title}</p>
        </div>
      )}
    </div>
  );
};

export default CollageItem;
