import { dateFormat } from "@/lib/dateFormat";
import { Post } from "@prisma/client";
import { FC } from "react";
import Tag from "../Tag";

interface DashboardPostInfoProps {
  post: Post;
}

const DashboardPostInfo: FC<DashboardPostInfoProps> = ({ post }) => {
  return (
    <div className="relative flex w-full flex-col gap-2">
      <p className="break-words pr-16 text-xl md:text-2xl">{post.title}</p>
      {post.contentType === "TEXT" ? (
        <span className="absolute right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-sm text-teal-500 max-md:text-xs">
          Written
        </span>
      ) : post.contentType === "IMAGE" ? (
        <span className="absolute right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-sm text-amber-500 max-md:text-xs">
          Image
        </span>
      ) : post.contentType === "VIDEO" ? (
        <span className="absolute right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-sm text-fuchsia-500 max-md:text-xs">
          Video
        </span>
      ) : post.contentType === "PDF" ? (
        <span className="absolute right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-sm text-rose-500 max-md:text-xs">
          PDF
        </span>
      ) : (
        <span className="absolute right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-sm text-lime-500 max-md:text-xs">
          Audio
        </span>
      )}
      <p className="text-zinc-400">
        Date Published: {dateFormat(new Date(post.createdAt).toISOString())}
      </p>
      <p className="flex-1 text-zinc-400">Likes: {post.likes}</p>

      <div className="flex items-center gap-2">
        <span className="self-start text-zinc-400">Tags</span>
        <ul className="flex flex-wrap items-center gap-2.5">
          {post.tags.map((tag, index) => {
            return <Tag key={tag} small index={index} tag={tag} />;
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardPostInfo;
