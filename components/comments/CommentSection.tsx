import Link from "next/link";
import { User } from "@prisma/client";

import { db } from "@/lib/db";

import { Skeleton } from "../ui/skeleton";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

interface CommentSectionProps {
  postId: string;
  user: User | null;
}

const CommentSection = async ({ postId, user }: CommentSectionProps) => {
  const currentPost = await db.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      comments: {
        where: {
          isReply: false,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          user: true,
          _count: {
            select: {
              replies: true,
            },
          },
        },
      },
    },
  });

  if (!currentPost) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-r from-green-500 to-lime-500" />
        <span className="text-green-600 max-md:text-sm">Comments</span>
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-l from-green-500 to-lime-500" />
      </div>
      {user && <CommentInput user={user} postId={postId} />}

      {currentPost.comments.length > 0 ? (
        <div className="-mt-2 divide-y divide-background-surface">
          {currentPost.comments.map((comment) => (
            <Comment key={comment.id} comment={comment} user={user} />
          ))}
        </div>
      ) : (
        <div className="space-y-4 pt-4">
          {!user && (
            <p className="text-center font-medium text-zinc-300 max-md:text-sm">
              Please{" "}
              <Link
                href="/sign-in"
                className="text-green-500 underline underline-offset-2"
              >
                sign in
              </Link>{" "}
              to leave a comment
            </p>
          )}
          <p className="text-center font-medium text-zinc-300 max-md:text-sm">
            {user ? "Be the first to leave a comment!" : "No comments yet"}
          </p>
        </div>
      )}
    </section>
  );
};

export default CommentSection;

CommentSection.Skeleton = function CommentSectionSkeleton() {
  return (
    <div className="space-y-4 pt-4">
      <Skeleton className="h-6 w-1/3" />

      <Skeleton className="h-px w-full" />
      <div className="flex gap-2 md:gap-4">
        <Skeleton className="aspect-square w-6 self-start rounded-full md:w-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />

      <Skeleton className="h-px w-full" />
      <div className="flex gap-2 md:gap-4">
        <Skeleton className="aspect-square w-6 self-start rounded-full md:w-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />

      <Skeleton className="h-px w-full" />
      <div className="flex gap-2 md:gap-4">
        <Skeleton className="aspect-square w-6 self-start rounded-full md:w-8" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
    </div>
  );
};
