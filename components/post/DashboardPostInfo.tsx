import { dateFormat } from "@/lib/dateFormat";
import { Post } from "@prisma/client";
import { ImageIcon, Pen, VideoIcon, Volume2Icon } from "lucide-react";
import { FC } from "react";
import Tag from "../Tag";

interface DashboardPostInfoProps {
  post: Post;
}

const DashboardPostInfo: FC<DashboardPostInfoProps> = ({ post }) => {
  return (
    <div className="relative flex w-full flex-col gap-2">
      <p className="break-words pr-8 text-xl md:text-2xl">{post.title}</p>
      {post.contentType === "TEXT" ? (
        <Pen className="absolute right-1 top-1 h-5 w-5 text-teal-500" />
      ) : post.contentType === "IMAGE" ? (
        <ImageIcon className="absolute right-1 top-1 h-6 w-6 text-amber-500" />
      ) : post.contentType === "VIDEO" ? (
        <VideoIcon className="absolute right-1 top-1 h-6 w-6 text-fuchsia-400" />
      ) : (
        <Volume2Icon className="absolute right-1 top-1 h-6 w-6 text-lime-400" />
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
