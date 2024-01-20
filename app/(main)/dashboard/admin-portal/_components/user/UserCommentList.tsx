import Comment from "@/components/comments/Comment";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface UserCommentListProps {
  userId: string;
}

const UserCommentList = async ({ userId }: UserCommentListProps) => {
  const user = await getCurrentUser();
  const comments = await db.comment.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
    },
  });

  if (!comments.length) {
    return null;
  }

  return (
    <div>
      <h2 className="pt-6 text-lg font-medium md:text-xl">
        User&apos;s Comments
      </h2>
      <hr className="mt-2 border-zinc-700" />
      {comments.map((comment) => (
        <Comment comment={comment} key={comment.id} user={user} />
      ))}
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
