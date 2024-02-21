import { Post, User } from "@prisma/client";
import { FC, useState } from "react";
import { VideoIcon } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import Overlay from "../Overlay";
import Image from "next/image";

interface VideoItemProps {
  post: Post & { user: User | null };
  onClick: () => void;
  clicked: boolean;
  onClose: () => void;
}

const VideoItem: FC<VideoItemProps> = ({ post, onClick, clicked, onClose }) => {
  const [error, setError] = useState(false);

  return (
    <button
      onClick={onClick}
      aria-label="post modal button"
      className="group relative grid aspect-square w-full cursor-pointer place-items-center overflow-hidden border border-zinc-800 outline-none focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-white"
    >
      <span className="sr-only">post modal button</span>
      <AnimatePresence>
        {!post.thumbnail && !clicked && <Overlay />}
      </AnimatePresence>
      {post.thumbnail && (
        <>
          <div className="absolute inset-0">
            <div className="relative aspect-square">
              <Image
                src={error ? "/placeholder_post_image.svg" : post.thumbnail}
                alt="post thumbnail"
                className="object-cover"
                fill
                onError={() => setError(true)}
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 35vw, 25vw"
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-zinc-200 max-md:text-sm">
            {post.user?.name || "Anonymous"}
          </span>
        </>
      )}
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
        <VideoIcon className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      {!post.thumbnail && (
        <>
          <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
            <VideoIcon className="fill-rose-400 text-rose-400 transition group-hover:fill-rose-500 group-hover:text-rose-500 md:h-10 md:w-10" />
            <p className="text-lg md:text-xl lg:hidden">
              {post.title.length > 24
                ? post.title.slice(0, 24) + "..."
                : post.title}
            </p>{" "}
            <p className="text-lg max-lg:hidden md:text-xl lg:block">
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
