import { Post, User } from "@prisma/client";
import { Volume1, Volume2 } from "lucide-react";
import { FC, useState } from "react";

interface AudioItemProps {
  post: Post & { user: User };
  onClick: () => void;
}

const AudioItem: FC<AudioItemProps> = ({ onClick, post }) => {
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
      className="group relative grid h-full aspect-square w-full cursor-pointer place-items-center overflow-hidden border border-zinc-800 bg-zinc-900"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
      <div className="absolute left-0 top-0 rounded-br-md bg-black px-2 py-0.5 text-zinc-100 max-sm:text-xs sm:text-sm">
        Audio
      </div>
      <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
        <Volume2 className="md:h-10 md:w-10" />
        <p className="text-lg md:text-2xl">{post.title}</p>
        <span className="text-sm">Click to Expand</span>
        <span className="text-sm">{post.user.name}</span>
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
    </div>
  );
};

export default AudioItem;
