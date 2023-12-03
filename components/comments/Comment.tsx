"use client";

import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import Image from "next/image";
import { FC } from "react";

interface CommentProps {
  comment: {
    id: number;
    content: string;
    date: string;
    user: {
      name: string;
      imageUrl: string;
    };
  };
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex items-center gap-4 py-4 text-zinc-100 max-md:gap-2">
      <div className="flex h-full flex-col items-center gap-1 self-start">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
          <Image src={comment.user.imageUrl} alt="user profile picture" fill />
        </div>
        {/* <div className="h-full w-1 bg-zinc-300" /> */}
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <p className="font-semibold tracking-wider text-white">
          {comment.user.name}
        </p>
        <p className="break-words md:text-lg">{comment.content}</p>
        <div className="mt-2 flex items-center gap-2 text-zinc-400">
          <button className="transition duration-200 hover:text-red-500 max-md:text-sm">
            <Heart className="h-4 w-4 md:h-5 md:w-5" />
          </button>
          <p className="font-semibold">0 likes</p>
          <button className="ml-1.5 font-semibold max-md:text-sm">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
