"use client";

import { Post, User } from "@prisma/client";
import Overlay from "../Overlay";
import { useState } from "react";
import Image from "next/image";
import { File, Pen, Video, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface PostModalTriggerContentProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

const PostModalTriggerContent = ({ post }: PostModalTriggerContentProps) => {
  const [onError, setOnError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("PostModal");

  return (
    <>
      <span className="sr-only">{t("content.openModal")}</span>
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
                alt={t("content.thumbnail")}
                sizes="(max-width: 768px) 128px, 192px"
                fill
                onError={() => setOnError(true)}
                onLoad={() => setIsLoading(false)}
                src={
                  onError
                    ? "/placeholder_post_image.svg"
                    : post.thumbnail || "/placeholder_post_image.svg"
                }
                className="object-cover"
              />
              {isLoading && (
                <Image
                  src={post.thumbnail}
                  sizes="12px"
                  fill
                  className="object-cover blur-lg"
                  alt={t("content.blur")}
                />
              )}
            </div>
          </div>
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-xs text-zinc-200">
            {post.user?.name || t("content.anonymous")}
          </span>
        </>
      )}
      <div className="absolute left-0 top-20 z-10 h-12 w-[700px] translate-x-full rotate-45 bg-white/10 blur-xl brightness-200 transition duration-700 group-hover:-translate-x-full max-md:hidden md:duration-500" />
      {post.contentType === "IMAGE" && (
        <>
          <Image
            alt={t("content.postImage")}
            src={
              onError
                ? "/placeholder_post_image.svg"
                : post.postContent || "/placeholder_post_image.svg"
            }
            sizes="(max-width: 768px) 128px, 192px"
            fill
            onLoad={() => setIsLoading(false)}
            onError={() => setOnError(true)}
            className={cn("object-cover", isLoading && "opacity-0")}
          />
          {isLoading && (
            <Image
              src={post.postContent}
              sizes="12px"
              fill
              className="object-cover blur-lg"
              alt={t("content.blur")}
            />
          )}
          <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/75 px-1.5 py-0.5 text-sm text-zinc-200">
            {post.user?.name || t("content.anonymous")}
          </span>
        </>
      )}
    </>
  );
};

export default PostModalTriggerContent;
