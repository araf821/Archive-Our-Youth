import { db } from "@/lib/db";
import Comment from "./Comment";
import { Skeleton } from "@/components/ui/skeleton";

interface CommentListProps {
  searchParams: {
    type?: undefined | "replies" | "deleted";
  };
}

const CommentList = async ({ searchParams }: CommentListProps) => {
  let comments;

  if (searchParams.type === undefined) {
    comments = await db.comment.findMany({
      where: {
        isReply: false,
        deleted: false,
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
      orderBy: {
        createdAt: "desc",
      },
    });
  } else if (searchParams.type === "replies") {
    comments = await db.comment.findMany({
      where: {
        isReply: true,
        deleted: false,
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
      orderBy: {
        createdAt: "desc",
      },
    });
  } else {
    comments = await db.comment.findMany({
      where: {
        deleted: true,
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
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  return (
    <ul className="my-4 flex flex-col gap-2.5">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;

CommentList.Skeleton = function CommentListSkeleton() {
  return (
    <div className="my-4 flex flex-col gap-2.5">
      <Skeleton className="h-40 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-40 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-40 rounded-none bg-[#2f2f2f]" />
      <Skeleton className="h-40 rounded-none bg-[#2f2f2f]" />
    </div>
  );
};
