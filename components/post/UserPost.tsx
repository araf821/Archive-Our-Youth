"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Post } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowRight, Trash } from "lucide-react";

import { cn, getYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";

import { AudioPlayer } from "../ui/AudioPlayer";
import DashboardPostInfo from "./DashboardPostInfo";

interface UserPostProps {
  post: Post;
}

const UserPost: FC<UserPostProps> = ({ post }) => {
  const { onOpen } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  return (
    <motion.div>
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-[#222222]/75 via-zinc-800/75 to-background/75 p-4 shadow-[2px_2px_16px] shadow-black/50 outline-none transition-all duration-300 hover:bg-background-muted hover:shadow-[2px_2px_24px] hover:shadow-black hover:outline">
        <span className="absolute bottom-0 right-0 h-20 w-20 bg-primary/50 blur-3xl transition"></span>
        <div
          className={cn("flex max-md:flex-col max-md:gap-2 md:gap-4", {
            "md:flex-row":
              post.contentType === "VIDEO" || post.contentType === "IMAGE",
            "flex-col":
              post.contentType === "TEXT" ||
              post.contentType === "AUDIO" ||
              post.contentType === "PDF",
          })}
        >
          {post.contentType === "IMAGE" && (
            <>
              <div className="relative aspect-[4/3] w-full overflow-hidden border border-background-surface md:max-w-[300px]">
                <Image
                  src={error ? "/placeholder_post_image.svg" : post.postContent}
                  alt="post image"
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  onLoad={() => setIsLoading(false)}
                  onError={() => setError(true)}
                  className={cn(
                    "rounded-sm object-cover",
                    isLoading && "opacity-0",
                  )}
                />
                {isLoading && (
                  <Image
                    alt="blur"
                    src={
                      error ? "/placeholder_post_image.svg" : post.postContent
                    }
                    fill
                    sizes="24px"
                    className="rounded-sm object-cover blur-lg"
                  />
                )}
              </div>
              <DashboardPostInfo post={post} />
            </>
          )}

          {(post.contentType === "TEXT" || post.contentType === "PDF") && (
            <DashboardPostInfo post={post} />
          )}

          {post.contentType === "VIDEO" && (
            <>
              <div className="relative aspect-video max-h-[40vh] w-full rounded-md border border-background-surface md:max-w-[300px]">
                {isYouTubeUrl(post.postContent) ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      post.postContent,
                    )}?autoplay=0&mute=1`}
                    className="h-full w-full rounded-md"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    src={`${post.postContent}#t=15`}
                    className="h-full w-full rounded-md"
                    controls
                  />
                )}
              </div>
              <DashboardPostInfo post={post} />
            </>
          )}

          {post.contentType === "AUDIO" && (
            <div>
              <AudioPlayer src={post.postContent} className="mb-2" />
              <DashboardPostInfo post={post} />
            </div>
          )}
        </div>
        <hr className="border-border" />
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => onOpen("deletePostModal", { postWithoutUser: post })}
            className="flex items-center gap-1 rounded-md border border-border p-2 text-center font-semibold tracking-wide text-text-secondary transition hover:bg-amber-500 hover:text-black"
          >
            <span className="sr-only">Delete Post</span>
            <Trash strokeWidth={3} className="size-4" />
          </button>
          <div className="relative">
            <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-green-800"></span>
            <Link
              href={`/post/${post.slug}`}
              className="relative z-10 flex items-center gap-1 rounded-md bg-primary px-2 py-1 text-center text-sm font-medium text-text-inverted transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-dark hover:text-text-primary active:translate-x-1 active:translate-y-1"
            >
              View Post
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserPost;
