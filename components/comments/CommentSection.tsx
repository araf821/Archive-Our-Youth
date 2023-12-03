import { db } from "@/lib/db";
import { Comment, User } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import CommentInput from "./CommentInput";

interface CommentSectionProps {
  postId: string;
  user: User | null;
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const CommentSection: FC<CommentSectionProps> = async ({ postId, user }) => {
  // const comments = await db.post.findUnique({
  //   where: {
  //     id: postId,
  //   },
  //   select: {
  //     comments: {
  //       include: {
  //         user: true,
  //       },
  //     },
  //   },
  // });

  return (
    <section className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-r from-green-500 to-lime-500" />
        <span className="text-green-600 max-md:text-sm">Comments</span>
        <div className="mt-2.5 h-[1px] w-full bg-gradient-to-l from-green-500 to-lime-500" />
      </div>
      {user ? (
        <CommentInput />
      ) : (
        <p>
          Please <Link href="/sign-in">Sign In</Link> to leave a comment.
        </p>
      )}

      <hr className="border-zinc-700" />

      {comments.length > 20 ? null : <p className="text-zinc-300 xl:text-lg font-medium tracking-wide">Be the first to leave a comment!</p>}
    </section>
  );
};

export default CommentSection;

const comments = [
  {
    content: "hello",
    date: "1h ago",
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    content: "hello",
    date: "1h ago",
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    content: "hello",
    date: "1h ago",
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    content: "hello",
    date: "1h ago",
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
  {
    content: "hello",
    date: "1h ago",
    user: {
      name: "Minnie",
      imageUrl: "/placeholder-image.png",
    },
  },
];
