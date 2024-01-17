"use client";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import { FC } from "react";
import DashboardPostInfo from "./DashboardPostInfo";
import { ArrowRight, Trash } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";
import { motion } from "framer-motion";

interface UserPostProps {
  post: Post;
}

const UserPost: FC<UserPostProps> = ({ post }) => {
  const { onOpen } = useModal();
  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.2,
          delay: 0.1,
          type: "spring",
          damping: 20,
          stiffness: 200,
        },
      }}
      exit={{ opacity: 0, x: -500, transition: { duration: 0.5 } }}
    >
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-lg bg-gradient-to-br from-[#222222]/75 via-zinc-800/75 to-zinc-950/75 p-4 shadow-[2px_2px_16px] shadow-green-500/10 outline-none transition-all duration-300 hover:border-green-500 hover:bg-zinc-900 hover:shadow-green-500/10 hover:outline hover:outline-green-500">
        <span className="absolute bottom-0 right-0 h-20 w-20 bg-green-500/50 blur-3xl transition"></span>
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
              <div className="relative aspect-[4/3] w-full border border-zinc-700 md:max-w-[300px]">
                <Image
                  src={post.postContent}
                  alt="post image"
                  fill
                  className="rounded-sm object-cover"
                />
              </div>
              <DashboardPostInfo post={post} />
            </>
          )}

          {(post.contentType === "TEXT" || post.contentType === "PDF") && (
            <DashboardPostInfo post={post} />
          )}

          {post.contentType === "VIDEO" && (
            <>
              <div className="relative aspect-video max-h-[40vh] w-full rounded-md border border-zinc-700 md:max-w-[300px]">
                <video
                  src={`${post.postContent}#t=15`}
                  className="h-full w-full "
                />
              </div>
              <DashboardPostInfo post={post} />
            </>
          )}

          {post.contentType === "AUDIO" && (
            <div>
              <div className="relative m-2">
                <audio src={post.postContent} controls className="w-full" />
              </div>
              <DashboardPostInfo post={post} />
            </div>
          )}
        </div>
        <hr className="border-zinc-700" />
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={() => onOpen("deletePostModal", { postWithoutUser: post })}
            className="morph-md flex items-center gap-1 rounded-xl border border-zinc-900 p-2 text-center font-semibold tracking-wide text-zinc-400 transition hover:bg-amber-500 hover:text-black"
          >
            <span className="sr-only">Delete Post</span>
            <Trash strokeWidth={3} className="h-5 w-5" />
          </button>
          <div className="relative">
            <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-green-800"></span>
            <Link
              prefetch={false}
              href={`/post/${post.slug}`}
              className="relative z-10 flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-center font-medium tracking-wide text-zinc-950 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-600 active:translate-x-1 active:translate-y-1"
            >
              View Post
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UserPost;
