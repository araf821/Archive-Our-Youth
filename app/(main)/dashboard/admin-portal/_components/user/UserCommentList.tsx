import { db } from "@/lib/db";
import { Skeleton } from "@/components/ui/skeleton";

import Comment from "../comment/Comment";

interface UserCommentListProps {
  userId: string;
}

const UserCommentList = async ({ userId }: UserCommentListProps) => {
  let comments;
  try {
    comments = await db.comment.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
        post: true,
        _count: {
          select: {
            replies: true,
          },
        },
      },
    });
  } catch (error) {
    comments = null;
  }

  if (!comments?.length) {
    return null;
  }

  return (
    <div>
      <h2 className="pt-6 text-lg font-medium md:text-xl">
        User&apos;s Comments
      </h2>
      <hr className="mt-2 border-background-surface" />
      <ul className="mt-6 space-y-6">
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} userPage />
        ))}
      </ul>
    </div>
  );
};

export default UserCommentList;

UserCommentList.Skeleton = function UserCommentListSkeleton() {
  return (
    <div className="my-8 flex flex-col gap-6">
      <Skeleton className="h-36 rounded-none" />
      <Skeleton className="h-36 rounded-none" />
      <Skeleton className="h-36 rounded-none" />
    </div>
  );
};
