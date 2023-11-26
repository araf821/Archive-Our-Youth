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
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -500, transition: { duration: 0.5 } }}
      key={post.id}
      className="flex flex-col gap-4 rounded-sm border border-zinc-700 bg-zinc-800 p-2"
    >
      <div
        className={cn("flex max-md:flex-col max-md:gap-2 md:gap-4", {
          "md:flex-row":
            post.contentType === "VIDEO" || post.contentType === "IMAGE",
          "flex-col":
            post.contentType === "TEXT" || post.contentType === "AUDIO",
        })}
      >
        {post.contentType === "IMAGE" && (
          <>
            <div className="relative border border-zinc-700 aspect-[4/3] w-full md:max-w-[300px]">
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
            <div className="relative border border-zinc-700 aspect-video max-h-[40vh] w-full rounded-md md:max-w-[300px]">
              <video
                src={`${post.postContent}#t=15`}
                className="h-full w-full "
              />
            </div>
            <DashboardPostInfo post={post} />
          </>
        )}

        {post.contentType === "AUDIO" && (
          <>
            <div className="relative m-2">
              <audio src={post.postContent} controls className="w-full" />
            </div>
            <DashboardPostInfo post={post} />
          </>
        )}
      </div>
      <hr className="border-zinc-700" />
      <div className="flex items-center justify-between pb-2">
        <button
          onClick={() => onOpen("deletePostModal", { postWithoutUser: post })}
          className="flex items-center font-semibold gap-1 rounded-md px-2 py-1 text-center tracking-wide text-zinc-400 transition hover:bg-red-600 hover:text-white"
        >
          Delete Post
          <Trash className="h-5 w-5 pb-0.5" />
        </button>
        <Link
          href={`/post/${post.slug}`}
          className="flex items-center gap-1 rounded-md bg-green-500 px-2 py-1 text-center font-semibold tracking-wide text-zinc-900 transition duration-200 hover:bg-green-600"
        >
          View Post
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </motion.div>
  );
};

export default UserPost;
