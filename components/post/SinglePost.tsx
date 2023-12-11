import { Comment, Post, User } from "@prisma/client";
import { FC } from "react";
import DynamicImage from "../DynamicImage";
import { dateFormat } from "@/lib/dateFormat";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import LikeButton from "../LikeButton";
import ShareButton from "../ShareButton";
import BackButton from "../BackButton";
import Tag from "../Tag";
import PDFViewer from "../PDFViewer";
import Link from "next/link";
import AnonymousPostInfo from "../AnonymousPostInfo";
import { cn } from "@/lib/utils";
import { openSans } from "@/app/fonts";
import { buttonVariants } from "../ui/Button";
import { Edit2, MapPin } from "lucide-react";

interface SinglePostProps {
  currentUser: User | null;
  post: Post & { user: User | null; comments: (Comment & { user: User })[] };
}

const SinglePost: FC<SinglePostProps> = ({ post, currentUser }) => {
  return (
    <section className="mb-8 mt-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <BackButton />
        {post.userId === currentUser?.id && (
          <Link
            href={`/post/${post.slug}/edit`}
            className={cn(buttonVariants({ variant: "outline" }))}
          >
            Edit Post
            <Edit2 className="ml-2 h-4 w-4" />
          </Link>
        )}
      </div>

      {post.contentType === "IMAGE" && <DynamicImage src={post.postContent} />}

      {post.contentType === "VIDEO" && (
        <div className="relative aspect-video w-full overflow-hidden border border-zinc-800">
          <video src={post.postContent} className="h-full w-full" controls />
        </div>
      )}

      {post.contentType === "AUDIO" && (
        <div className="relative my-4 w-full overflow-hidden">
          <audio src={post.postContent} controls className="w-full py-0.5" />
        </div>
      )}

      {post.contentType !== "TEXT" && post.contentType !== "PDF" && (
        <div className="flex w-full items-center justify-between rounded-md bg-zinc-800 px-2 py-1.5">
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
        <p className="break-words text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
          {post.title}
        </p>

        <div className="flex items-center justify-between gap-2">
          <span className="w-fit rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm text-zinc-400">
            {dateFormat(new Date(post.createdAt).toISOString())}
          </span>
          <span className="flex items-center gap-1 rounded-md bg-zinc-800 px-1.5 py-0.5 text-sm capitalize text-zinc-400">
            <MapPin className="h-3.5 w-3.5" />
            {post.location}
          </span>
        </div>

        {(post.contentType === "TEXT" || post.contentType === "PDF") && (
          <div className="flex w-full items-center justify-between rounded-md bg-zinc-800 px-2 py-1.5">
            <LikeButton
              postId={post.id}
              likes={post.likes}
              currentUser={currentUser}
            />
            <ShareButton link="idk" />
          </div>
        )}
        <hr className="border-zinc-800" />
        <div className="-my-1 flex gap-2 text-zinc-300 md:text-lg">
          <div className="relative h-14 w-14 rounded-full">
            <Image
              src={post.user?.imageUrl || "/placeholder-image.png"}
              fill
              alt="poster profile picture"
              sizes="50px"
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="flex items-center gap-2 font-semibold tracking-wide">
              {post.user?.name || (
                <>
                  Posted Anonymously
                  <AnonymousPostInfo />
                </>
              )}
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

        {post.contentType === "PDF" && (
          <div className="space-y-2">
            <Link
              href={post.postContent}
              target="_blank"
              className="group relative w-fit text-zinc-400 transition hover:text-zinc-100"
            >
              View Externally
              <span className="absolute bottom-0 left-0 h-[1px] w-full origin-bottom-left scale-x-0 bg-zinc-400 transition group-hover:scale-x-100 group-hover:bg-zinc-100" />
            </Link>
            <PDFViewer url={post.postContent} />
          </div>
        )}

        {/* Research Question */}
        {post.researchQuestions.length > 0 ? (
          <div>
            <p className="mb-4 font-bold tracking-wide text-zinc-400 max-md:text-sm">
              This post addresses the following questions:
            </p>
            <ul>
              {post.researchQuestions.map((q) => (
                <li
                  className="ml-6 list-disc font-light text-white md:text-lg"
                  key={q}
                >
                  {q}
                </li>
              ))}
            </ul>

            <hr className="mt-4 border-zinc-700" />
          </div>
        ) : null}

        <div
          className={`${
            post.contentType !== "TEXT" && !post.description && "hidden"
          }`}
        >
          <ReactMarkdown
            className={cn(
              "prose-sm h-full max-w-full overflow-y-auto break-words rounded-md text-start tracking-wide text-zinc-50 md:prose-base xl:prose-lg prose-headings:font-semibold prose-headings:text-zinc-50 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-ol:list-decimal prose-ul:list-disc prose-img:rounded-md",
              openSans.className,
            )}
          >
            {post.contentType === "TEXT" ? post.postContent : post.description}
          </ReactMarkdown>
          <hr className="mb-2 mt-4 border-zinc-800" />
        </div>

        {/* <hr className="border-zinc-700" /> */}
        <ul className="flex -mb-4 flex-wrap gap-2">
          {post.tags.map((tag, index) => (
            <Tag tag={tag} key={tag} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SinglePost;
