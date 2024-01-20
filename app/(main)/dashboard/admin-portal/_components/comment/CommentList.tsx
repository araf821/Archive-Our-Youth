import { db } from "@/lib/db";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import CommentDropdown from "./CommentDropdown";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Comment from "./Comment";

interface CommentListProps {}

const CommentList = async ({}: CommentListProps) => {
  const comments = await db.comment.findMany({
    where: {
      isReply: false,
      deleted: false,
    },
    include: {
      user: true,
      post: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ul className="my-4 flex flex-col gap-2.5">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </ul>
  );
};

export default CommentList;
