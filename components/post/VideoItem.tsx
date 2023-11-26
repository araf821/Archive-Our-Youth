"use client";

import { Post, User } from "@prisma/client";
import { FC, useState } from "react";
import { VideoIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Overlay from "../Overlay";

interface VideoItemProps {
  post: Post & { user: User | null };
  onClick: () => void;
  clicked: boolean;
  onClose: () => void;
}

const VideoItem: FC<VideoItemProps> = ({ post, onClick, clicked, onClose }) => {
  return (
    <button
      onClick={onClick}
      className="group relative grid aspect-square w-full cursor-pointer place-items-center overflow-hidden border border-zinc-800 outline-none focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
    >
      <AnimatePresence>
        {!post.thumbnail && !clicked && <Overlay onClose={onClose} />}
      </AnimatePresence>
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      {!post.thumbnail && (
        <>
          <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
            <VideoIcon className="h-4 w-4 md:h-5 md:w-5" />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
            <VideoIcon className="fill-rose-400 text-rose-400 transition group-hover:fill-rose-500 group-hover:text-rose-500 md:h-10 md:w-10" />
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
        </>
      )}
    </button>
  );
};

export default VideoItem;
