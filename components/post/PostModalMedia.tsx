"use client";

import { Post } from "@prisma/client";
import DynamicImage from "../DynamicImage";

interface PostModalMediaProps {
  post: Post;
}

export default function PostModalMedia({ post }: PostModalMediaProps) {
  if (post.contentType === "TEXT" || post.contentType === "PDF") {
    return (
      <div className="w-fit rounded-sm bg-zinc-700 px-2.5 py-1 font-bold max-md:text-sm">
        {post.contentType === "PDF" ? "PDF File" : "Written"}
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
      <div className="relative aspect-video w-full overflow-hidden border border-zinc-800">
        <video src={post.postContent} className="h-full w-full" controls />
      </div>
    );
  }

  if (post.contentType === "AUDIO") {
    return (
      <div className="relative w-full overflow-hidden">
        <audio src={post.postContent} controls className="w-full py-0.5" />
      </div>
    );
  }

  return null;
}
