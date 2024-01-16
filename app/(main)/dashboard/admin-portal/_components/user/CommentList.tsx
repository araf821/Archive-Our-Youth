import Comment from "@/components/comments/Comment";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/getCurrentUser";

interface CommentListProps {
  userId: string;
}

const CommentList = async ({ userId }: CommentListProps) => {
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

export default CommentList;
