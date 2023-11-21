import { Post, User } from "@prisma/client";
import { AnimatePresence } from "framer-motion";
import { Volume2 } from "lucide-react";
import { FC } from "react";
import Overlay from "../Overlay";

interface AudioItemProps {
  post: Post & { user: User | null };
  onClick: () => void;
  clicked: boolean;
  onClose: () => void;
}

const AudioItem: FC<AudioItemProps> = ({ onClick, post, clicked, onClose }) => {
  return (
    <button
      onClick={onClick}
      className="group relative grid aspect-square h-full w-full cursor-pointer place-items-center overflow-hidden border border-zinc-800 bg-zinc-900 outline-none focus-visible:outline focus-visible:z-[9999] focus-visible:outline-4 focus-visible:outline-white"
    >
      <AnimatePresence>
        {!clicked && <Overlay onClose={onClose} />}
      </AnimatePresence>
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
        <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
      </div>
      <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
        <Volume2 className="fill-lime-400 text-lime-400 transition group-hover:fill-lime-500 group-hover:text-lime-500 md:h-10 md:w-10" />
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

      {/* {isHovered ? (
        <>
          <div className="absolute right-2 top-2 text-zinc-400 transition group-hover:animate-pulse group-hover:text-zinc-100">
            <Volume1 className="h-8 w-8 md:h-12 md:w-12" />
          </div>
          <audio className="absolute md:block" autoPlay loop>
            <source src={post.postContent} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </>
      ) : null} */}
    </button>
  );
};

export default AudioItem;
