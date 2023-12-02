import { Comment, User } from "@prisma/client";
import { FC } from "react";

interface CommentProps {
  comment: Comment & { user: User };
}

const Comment: FC<CommentProps> = ({ comment }) => {
  return <div>Comment</div>;
};

export default Comment;
