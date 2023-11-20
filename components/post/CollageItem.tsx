"use client";

import { useModal } from "@/hooks/useModal";
import { Post, User } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import VideoItem from "./VideoItem";
import AudioItem from "./AudioItem";
import { File, Pen } from "lucide-react";
import Overlay from "../Overlay";
import { AnimatePresence } from "framer-motion";

interface CollageItemProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

const CollageItem: FC<CollageItemProps> = ({ post, currentUser }) => {
  const { onOpen } = useModal();
  const [clicked, setClicked] = useState(
    post.contentType === "IMAGE" ? true : false,
  );

  const onClose = () => {
    setClicked(true);

    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };

  const handleClick = () => {
    if (!clicked) return;
    onOpen("postModal", { post, currentUser });
  };

  if (post.contentType === "VIDEO") {
    return (
      <VideoItem
        post={post}
        onClick={handleClick}
        onClose={onClose}
        clicked={clicked}
      />
    );
  }

  if (post.contentType === "AUDIO") {
    return (
      <AudioItem
        post={post}
        clicked={clicked}
        onClose={onClose}
        onClick={handleClick}
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`group relative aspect-square cursor-pointer overflow-hidden border border-zinc-800 transition duration-500 hover:brightness-125`}
    >
      <AnimatePresence>
        {(post.contentType === "TEXT" || post.contentType === "PDF") &&
          !clicked && <Overlay onClose={onClose} />}
      </AnimatePresence>
      {post.contentType === "PDF" && (
        <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
          <File className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      )}
      {post.contentType === "TEXT" && (
        <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
          <Pen className="h-4 w-4 md:h-5 md:w-5" />
        </div>
      )}
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      {post.contentType === "IMAGE" && (
        <>
          <Image
            src={post.postContent}
            alt="collage item"
            fill
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-zinc-200 max-md:text-sm">
            {post.user?.name || "Anonymous"}
          </span>
        </>
      )}

      {(post.contentType === "TEXT" || post.contentType === "PDF") && (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden p-2 text-zinc-100">
          <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
            {post.contentType === "PDF" ? (
              <File className="fill-amber-400 text-amber-400 transition group-hover:fill-amber-500 group-hover:text-amber-500 md:h-10 md:w-10" />
            ) : (
              <Pen className="fill-blue-400 text-blue-400 transition group-hover:fill-blue-500 group-hover:text-blue-500 md:h-10 md:w-10" />
            )}
            <p className="text-lg md:text-2xl lg:hidden">
              {post.title.length > 24
                ? post.title.slice(0, 24) + "..."
                : post.title}
            </p>{" "}
            <p className="text-lg max-lg:hidden md:text-2xl lg:block">
              {post.title.length > 50
                ? post.title.slice(0, 50) + "..."
                : post.title}
            </p>{" "}
            <span className="text-sm">Click to Expand</span>
            <span className="text-sm">{post.user?.name || "Anonymous"}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollageItem;
