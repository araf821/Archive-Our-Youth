import { Post, User } from "@prisma/client";
import { FC } from "react";
import DynamicImage from "../DynamicImage";
import { dateFormat } from "@/lib/dateFormat";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import BackButton from "../BackButton";
import Tag from "../Tag";

interface SinglePostProps {
  currentUser: User | null;
  post: Post & { user: User | null };
}

const SinglePost: FC<SinglePostProps> = ({ post, currentUser }) => {
  return (
    <section className="my-8 flex flex-col gap-6 px-4">
      <BackButton />

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
            currentUser={currentUser}
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
            <Tag tag={tag} key={tag} index={index} />
          ))}
        </ul>

        <hr className="border-zinc-800" />
        <div className="-my-1 flex gap-2 text-zinc-300 md:text-lg">
          <div className="relative h-14 w-14 rounded-full">
            <Image
              src={
                post.user?.imageUrl ||
                "https://utfs.io/f/611b7606-d2ed-4c74-aaff-7a4d5c66d365-9w6i5v.jpg"
              }
              fill
              alt=""
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="font-semibold tracking-wide">
              {post.user?.name || "Posted Anonymously"}
            </p>
            {post.user ? (
              <p className="text-base font-normal text-zinc-400">
                Member Since:{" "}
                {dateFormat(new Date(post.user.createdAt).toISOString())}
              </p>
            ) : null}
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
          <ReactMarkdown className="prose-headings:font-josefin prose prose-xl mb-8 h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-800 p-2.5 text-start text-zinc-100 prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
            {post.contentType === "TEXT" ? post.postContent : post.description}
          </ReactMarkdown>
          <hr className="border-zinc-700" />
        </div>
      </div>

      {/* Comments */}
      <section className="flex flex-col gap-2">
        <p className="text-zinc-100 md:text-lg">Comments</p>
        <p className="text-zinc-400">Coming Soon</p>
      </section>
    </section>
  );
};

export default SinglePost;
