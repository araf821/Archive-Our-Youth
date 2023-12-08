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
      <p className="break-words text-xl pr-16 md:text-2xl">{post.title}</p>
      {post.contentType === "TEXT" ? (
        <span className="absolute max-md:text-xs text-sm right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-teal-500">
          Written
        </span>
      ) : post.contentType === "IMAGE" ? (
        <span className="absolute max-md:text-xs text-sm right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-amber-500">
          Image
        </span>
      ) : post.contentType === "VIDEO" ? (
        <span className="absolute max-md:text-xs text-sm right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-fuchsia-500">
          Video
        </span>
      ) : post.contentType === "PDF" ? (
        <span className="absolute max-md:text-xs text-sm right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-rose-500">
          PDF
        </span>
      ) : (
        <span className="absolute max-md:text-xs text-sm right-0 top-0 bg-zinc-900 px-1.5 py-0.5 text-lime-500">
          Audio
        </span>
      )}
      <p className="text-zinc-400">
        Date Published: {dateFormat(new Date(post.createdAt).toISOString())}
      </p>
      <p className="flex-1 text-zinc-400">Likes: {post.likes}</p>
      <ul className="flex flex-wrap items-center gap-2.5">
        <span className="text-zinc-400">Tags</span>
        {post.tags.map((tag, index) => {
          return <Tag key={tag} small index={index} tag={tag} />;
        })}
      </ul>
    </div>
  );
};

export default DashboardPostInfo;
