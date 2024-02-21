"use client";

import { Post, User } from "@prisma/client";
import Overlay from "../Overlay";
import { useState } from "react";
import Image from "next/image";
import { File, Pen, Video, Volume2 } from "lucide-react";

interface PostModalTriggerContentProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

const PostModalTriggerContent = ({ post }: PostModalTriggerContentProps) => {
  const [onError, setOnError] = useState(false);

  return (
    <>
      <span className="sr-only">open post modal</span>
      {post.contentType !== "IMAGE" && !post.thumbnail && (
        <>
          <Overlay />
          <div className="group absolute inset-0 z-10 grid place-items-center">
            {post.contentType === "AUDIO" && (
              <Volume2 className="text-black/50 transition-colors  hover:text-black md:h-8 md:w-8" />
            )}

            {post.contentType === "VIDEO" && (
              <Video className="text-black/50 transition-colors  hover:text-black md:h-8 md:w-8" />
            )}

            {post.contentType === "TEXT" && (
              <Pen className="text-black/50 transition-colors  hover:text-black md:h-8 md:w-8" />
            )}

            {post.contentType === "PDF" && (
              <File className="text-black/50 transition-colors  hover:text-black md:h-8 md:w-8" />
            )}
          </div>
        </>
      )}
      {post.thumbnail && (
        <>
          <div className="absolute inset-0">
            <div className="relative aspect-square">
              <Image
                alt="error placeholder"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 35vw, 25vw"
                fill
                onError={() => setOnError(true)}
                src={onError ? "/placeholder_post_image.svg" : post.thumbnail}
                className="object-cover"
              />
            </div>
          </div>
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-zinc-200 max-md:text-sm">
            {post.user?.name || "Anonymous"}
          </span>
        </>
      )}
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full max-md:hidden md:duration-500" />
      {post.contentType === "IMAGE" && (
        <>
          <Image
            src={onError ? "/placeholder_post_image.svg" : post.postContent}
            alt="post image"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 35vw, 25vw"
            fill
            onError={() => setOnError(true)}
            className="object-cover"
          />
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-zinc-200 max-md:text-sm">
            {post.user?.name || "Anonymous"}
          </span>
        </>
      )}
    </>
  );
};

export default PostModalTriggerContent;
