"use client";

import { cn } from "@/lib/utils";
import { Post } from "@prisma/client";
import Image from "next/image";
import { FC, useState } from "react";
import DashboardPostInfo from "./DashboardPostInfo";
import { ArrowRight, Trash } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { useToast } from "../ui/useToast";
import { useRouter } from "next/navigation";

interface UserPostProps {
  post: Post;
}

const UserPost: FC<UserPostProps> = ({ post }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/post/${post.id}`);
      toast({ title: "Post deleted" });
      router.refresh();
    } catch (error) {
      toast({ title: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      key={post.id}
      className="flex flex-col gap-4 rounded-sm border border-zinc-700 bg-zinc-800 p-2"
    >
      <div
        className={cn("flex flex-col gap-2 md:gap-4", {
          "md:flex-row":
            post.contentType === "VIDEO" || post.contentType === "IMAGE",
        })}
      >
        {post.contentType === "IMAGE" && (
          <>
            <div className="relative aspect-[4/3] w-full md:max-w-[300px]">
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

        {post.contentType === "TEXT" && <DashboardPostInfo post={post} />}

        {post.contentType === "VIDEO" && (
          <>
            <div className="relative aspect-video max-h-[40vh] w-full rounded-md md:max-w-[300px]">
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
          onClick={handleDelete}
          disabled={isLoading}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-center tracking-wide text-zinc-400 transition hover:bg-red-600 hover:text-white"
        >
          <Trash className="h-5 w-5" /> Delete Post
        </button>
        <Link
          href={`/post/${post.slug}`}
          className="flex items-center gap-2 rounded-md bg-rose-500 px-2 py-1 text-center font-semibold tracking-wide text-zinc-900 transition duration-200 hover:bg-rose-600"
        >
          View Post
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
};

export default UserPost;
