"use client";

import { Post, User } from "@prisma/client";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

import LikeButton from "../LikeButton";

interface PostModalInfoProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

export default function PostModalInfo({
  post,
  currentUser,
}: PostModalInfoProps) {
  const t = useTranslations("PostModal");

  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        (post.contentType === "TEXT" || post.contentType === "PDF") &&
          "flex-col-reverse",
      )}
    >
      <div className="flex w-full justify-between gap-2.5 rounded-md bg-zinc-800/80 px-3 py-2">
        <LikeButton
          postId={post.id}
          likes={post.likes}
          currentUser={currentUser}
          modal={true}
        />
        <p className="truncate text-zinc-400 max-md:text-sm max-sm:text-xs">
          {post.user
            ? t("info.postedBy", { name: post.user.name })
            : t("info.postedAnonymously")}
        </p>
      </div>

      <h2 className="break-words text-2xl font-medium tracking-wide text-zinc-100 sm:text-3xl">
        {post.title}
      </h2>
    </div>
  );
}
