import { FC } from "react";
import { comments } from "./CommentSection";
import Comment from "./Comment";

interface ReplySectionProps {
  commentId: string;
}

const ReplySection: FC<ReplySectionProps> = ({ commentId }) => {
  return (
    <div className="mt-2 divide-y border-t border-t-zinc-800 divide-zinc-800">
      {comments.map((comment, index) => (
        <Comment
          key={comment.id}
          user={null}
          reply={true}
          comment={comment}
        />
      ))}
    </div>
  );
};

export default ReplySection;
