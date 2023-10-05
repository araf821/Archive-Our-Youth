import { Post, User } from "@prisma/client";
import { FC } from "react";
import DynamicImage from "./DynamicImage";
import { dateFormat } from "@/lib/dateFormat";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { cn } from "@/lib/utils";
import LikeButton from "./LikeButton";
import ShareButton from "./ShareButton";

interface SinglePostProps {
  currentUser: User | null;
  post: Post & { user: User };
}

const SinglePost: FC<SinglePostProps> = ({ post }) => {
  return (
    <section className="my-8 flex flex-col gap-6">
      {post.contentType === "IMAGE" && <DynamicImage src={post.postContent} />}

      {post.contentType === "VIDEO" && (
        <div className="relative my-4 aspect-video w-full overflow-hidden">
          <video
            autoPlay
            src={post.postContent}
            className="h-full w-full"
            controls
          />
        </div>
      )}

      {post.contentType === "AUDIO" && (
        <div className="relative my-4 w-full overflow-hidden">
          <audio src={post.postContent} controls className="w-full py-0.5" />
        </div>
      )}

      {post.contentType !== "TEXT" && (
        <div className="-mt-8 flex w-full items-center justify-between rounded-md bg-zinc-800 px-2 py-1.5">
          <LikeButton
            postId={post.id}
            likes={post.likes}
            currentUser={post.user}
          />
          <ShareButton link="idk" />
        </div>
      )}

      {/* Post Info */}
      <div className="flex flex-col gap-4">
        <span className="-mb-3 w-fit rounded-md bg-zinc-700 px-1.5 py-0.5 text-sm text-zinc-300">
          {dateFormat(new Date(post.createdAt).toISOString())}
        </span>
        <p className="break-words font-karla text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
          {post.title}
        </p>

        <ul className="flex flex-wrap gap-2 pt-2">
          {post.tags.map((tag, index) => (
            <li
              key={tag}
              className={cn(
                "text-bold flex items-center justify-between gap-2 rounded-lg px-3 py-1 text-zinc-900",
                {
                  "border-2 border-rose-500 text-rose-500": index === 0,
                  "border-2 border-lime-500 text-lime-500": index === 1,
                  "border-2 border-sky-500 text-sky-500": index === 2,
                  "border-2 border-amber-500 text-amber-500": index === 3,
                  "border-2 border-fuchsia-500 text-fuchsia-500": index === 4,
                  "border-2 border-teal-400 text-teal-400": index === 5,
                  "border-2 border-red-400 text-red-400": index === 6,
                  "border-2 border-indigo-400 text-indigo-400": index === 7,
                },
              )}
            >
              {tag}
            </li>
          ))}
        </ul>

        <hr className="border-zinc-800" />
        <div className="-my-1 flex gap-2 text-zinc-300 md:text-lg">
          <div className="relative h-14 w-14 rounded-full">
            <Image
              src={post.user.imageUrl ?? ""}
              fill
              alt=""
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold tracking-wide">{post.user.name}</p>
            <p className="text-base font-normal text-zinc-400">
              Member Since:{" "}
              {dateFormat(new Date(post.user.createdAt).toISOString())}
            </p>
          </div>
        </div>
        <hr className="border-zinc-800" />

        <div
          className={`${
            post.contentType !== "TEXT" && !post.description && "hidden"
          }`}
        >
          {post.contentType !== "TEXT" && (
            <p className="mb-4 text-sm font-semibold text-zinc-400">
              DESCRIPTION
            </p>
          )}
          <ReactMarkdown className="prose-headings:font-josefin prose mb-8 h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
            {post.contentType === "TEXT" ? post.postContent : post.description}
          </ReactMarkdown>
          <hr className="border-zinc-700" />
        </div>
      </div>
    </section>
  );
};

export default SinglePost;
