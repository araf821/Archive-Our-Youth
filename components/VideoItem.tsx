"use client";

import { Post, User } from "@prisma/client";
import { FC, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { VideoIcon } from "lucide-react";

interface VideoItemProps {
  post: Post & { user: User };
  onClick: () => void;
}

const VideoItem: FC<VideoItemProps> = ({ post, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative grid aspect-square w-full cursor-pointer place-items-center overflow-hidden border border-zinc-800"
    >
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      <div className="absolute left-0 top-0 rounded-br-md bg-black px-2 py-0.5 text-zinc-100 max-sm:text-xs sm:text-sm">
        Video
      </div>
      <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
        <VideoIcon className="md:h-10 md:w-10" />
        <p className="text-lg md:text-2xl lg:hidden">
          {post.title.length > 24
            ? post.title.slice(0, 24) + "..."
            : post.title}
        </p>{" "}

        <p className="text-lg max-lg:hidden lg:block md:text-2xl">
          {post.title.length > 50
            ? post.title.slice(0, 50) + "..."
            : post.title}
        </p>{" "}
        <span className="text-sm">Click to Expand</span>
        <span className="text-sm">{post.user.name}</span>
      </div>
      {/* <AnimatePresence>
        {isHovered && (
          <motion.video
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            src={post.postContent}
            loop
            autoPlay
            className="absolute left-0 top-0 z-30 h-full w-full object-contain transition group-hover:scale-150"
          />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default VideoItem;
