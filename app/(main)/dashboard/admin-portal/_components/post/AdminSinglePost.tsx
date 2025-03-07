import Image from "next/image";
import { Post, User } from "@prisma/client";

import { dateFormat } from "@/lib/dateFormat";
import { cn } from "@/lib/utils";

import PostDropdown from "./PostDropdown";

interface AdminSinglePostProps {
  post: Post & { user: User | null; _count: { comments: number } };
}

const AdminSinglePost = ({ post }: AdminSinglePostProps) => {
  return (
    <div className="grid grid-cols-4 items-center gap-4 bg-[#2f2f2f] px-4 py-3">
      <div className="col-span-2 flex items-center gap-2 md:gap-4">
        <div className="relative aspect-square w-12 shrink-0 overflow-hidden rounded-md">
          <Image
            src={
              post.contentType === "IMAGE"
                ? post.postContent || "/placeholder_post_image.svg"
                : post.thumbnail || "/placeholder_post_image.svg"
            }
            alt="post thumbnail"
            fill
            sizes="48px"
            className="shrink-0 object-cover"
          />
        </div>
        <div className="truncate">
          <p className="truncate tracking-wide">{post.title}</p>
          <p className="text-sm font-light text-zinc-400">
            <span className="max-sm:hidden">Published on </span>
            {dateFormat(post.createdAt.toISOString())}
          </p>
        </div>
      </div>
      <p
        className={cn(
          "text-center text-xs font-semibold sm:text-sm md:text-base",
          {
            "text-pink-400": post.contentType === "VIDEO",
            "text-yellow-400": post.contentType === "IMAGE",
            "text-red-400": post.contentType === "AUDIO",
            "text-emerald-400": post.contentType === "PDF",
            "text-sky-400": post.contentType === "TEXT",
          },
        )}
      >
        {post.contentType}
      </p>
      <PostDropdown post={post} />
    </div>
  );
};

export default AdminSinglePost;
