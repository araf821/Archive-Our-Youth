import { Comment, Post, User } from "@prisma/client";
import CommentDropdown from "./CommentDropdown";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { cn, formatDateString } from "@/lib/utils";

interface CommentProps {
  userPage?: boolean;
  comment: Comment & { user: User; post: Post; _count: { replies: number } };
}

const Comment = ({ comment, userPage }: CommentProps) => {
  return (
    <li
      className={cn("bg-[#2f2f2f] p-4", {
        "rounded-md shadow-2xl": userPage,
      })}
    >
      <div className="flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="relative aspect-square w-12 overflow-hidden rounded-md">
            <Image
              src={comment.user.imageUrl || "/placeholder-image.png"}
              alt="user image"
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div className="">
            <p>{comment.user.name}</p>
            <p className="text-xs text-zinc-400 md:text-sm">
              Commented on{" "}
              {formatDateString(comment.createdAt.toISOString(), {
                hideTime: true,
              })}
            </p>
          </div>
        </div>

        <CommentDropdown
          id={comment.id}
          userId={comment.user.id}
          content={comment.content}
          postSlug={comment.post.slug}
          deleted={comment.deleted}
        />
      </div>

      <p className="mt-2.5 text-zinc-400 max-md:text-sm">
        Likes: {comment.likes}
      </p>
      {!comment.isReply && (
        <p className="text-zinc-400 max-md:text-sm">
          Replies: {comment._count.replies}
        </p>
      )}
      <p className="flex items-start gap-1 text-sm text-zinc-400 md:text-base">
        Posted under:
        <Link
          className="flex items-center gap-1 font-medium tracking-wider text-zinc-200"
          href={`/post/${comment.post.slug}`}
        >
          {comment.post.title}
          <ExternalLink className="size-4 shrink-0" />
        </Link>
      </p>

      {comment.deleted && (
        <p className="-mb-4 mt-2 text-red-600 max-md:text-sm">
          Deleted Comment:
        </p>
      )}
      <div className="mt-4 whitespace-pre-line rounded-sm bg-[#212121] p-2 max-md:text-sm md:p-3">
        {comment.content}
      </div>
    </li>
  );
};

export default Comment;
