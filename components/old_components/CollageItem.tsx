"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Post, User } from "@prisma/client";
import { File, Pen } from "lucide-react";

import { useModal } from "@/hooks/useModal";

import Overlay from "../Overlay";
import AudioItem from "./AudioItem";
import VideoItem from "./VideoItem";

interface CollageItemProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

const CollageItem: FC<CollageItemProps> = ({ post, currentUser }) => {
  const [onError, setOnError] = useState(false);
  const { onOpen } = useModal();
  const [clicked, setClicked] = useState(
    post.contentType === "IMAGE" ? true : post.thumbnail ? true : false,
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
    <button
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onOpen("postModal", { post, currentUser });
        }
      }}
      aria-label="post modal button"
      onClick={handleClick}
      className={`group relative aspect-square cursor-pointer overflow-hidden border border-border-dark outline-none transition duration-500 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-white`}
    >
      <span className="sr-only">post modal button</span>
      {(post.contentType === "TEXT" || post.contentType === "PDF") &&
        !post.thumbnail &&
        !clicked && <Overlay />}
      {post.thumbnail && (
        <>
          <div className="absolute inset-0">
            <div className="relative aspect-square">
              <Image
                alt="post thumbnail"
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
      {post.contentType === "PDF" && (
        <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
          <File className="size-4 md:h-5 md:w-5" />
        </div>
      )}
      {post.contentType === "TEXT" && (
        <div className="absolute left-0 top-0 z-20 rounded-br-md bg-black/75 p-1.5 text-zinc-100 max-sm:text-xs sm:text-sm">
          <Pen className="size-4 md:h-5 md:w-5" />
        </div>
      )}
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full md:duration-500" />
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

      {!post.thumbnail &&
        (post.contentType === "TEXT" || post.contentType === "PDF") && (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 overflow-hidden p-2 text-zinc-100">
            <div className="flex flex-col items-center justify-center gap-2 p-3 text-center text-zinc-400 transition duration-300 group-hover:text-zinc-100">
              {post.contentType === "PDF" ? (
                <File className="fill-amber-400 text-amber-400 transition group-hover:fill-amber-500 group-hover:text-amber-500 md:h-10 md:w-10" />
              ) : (
                <Pen className="fill-blue-400 text-blue-400 transition group-hover:fill-blue-500 group-hover:text-blue-500 md:h-10 md:w-10" />
              )}
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
          </div>
        )}
    </button>
  );
};

export default CollageItem;
