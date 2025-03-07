"use client";

import { Post } from "@prisma/client";
import DynamicImage from "../DynamicImage";
import { getYouTubeVideoId, isYouTubeUrl } from "@/lib/utils";
import { AudioPlayer } from "../ui/AudioPlayer";
import { useTranslations } from "next-intl";

interface PostModalMediaProps {
  post: Post;
}

export default function PostModalMedia({ post }: PostModalMediaProps) {
  const t = useTranslations("PostModal");

  if (post.contentType === "TEXT" || post.contentType === "PDF") {
    return (
      <div className="w-fit rounded-sm bg-background-surface px-2.5 py-1 max-md:text-sm">
        <p className="text-xs font-bold md:text-sm">
          {post.contentType === "PDF" ? t("media.pdfFile") : t("media.written")}
        </p>
      </div>
    );
  }

  if (post.contentType === "IMAGE") {
    return (
      <div className="relative w-full overflow-hidden">
        <DynamicImage src={post.postContent} modal />
      </div>
    );
  }

  if (post.contentType === "VIDEO") {
    return (
      <div className="relative aspect-video w-full overflow-hidden border border-border-dark">
        {isYouTubeUrl(post.postContent) ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
              post.postContent,
            )}`}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={post.postContent} className="h-full w-full" controls />
        )}
      </div>
    );
  }

  if (post.contentType === "AUDIO") {
    return <AudioPlayer src={post.postContent} />;
  }

  return null;
}
