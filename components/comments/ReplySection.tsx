import { FC, useEffect, useState } from "react";
import Comment from "./Comment";
import axios from "axios";
import queryString from "query-string";
import { Comment as CommentModel, User } from "@prisma/client";
import CommentInput from "./CommentInput";
import { Loader2 } from "lucide-react";

interface ReplySectionProps {
  user: User | null;
  replyToId: string;
  postId: string;
  commentId: string;
}

const ReplySection: FC<ReplySectionProps> = ({
  commentId,
  postId,
  replyToId,
  user,
}) => {
  const [comments, setComments] = useState<
    (CommentModel & { user: User; _count: { replies: number } })[]
  >([]);
  const [isFetching, setIsFetching] = useState(false);

  const fetchComments = async (): Promise<void> => {
    setIsFetching(true);
    try {
      const url = queryString.stringifyUrl({
        url: "/api/comment",
        query: {
          commentId,
        },
      });

      const response = await axios.get(url);

      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [commentId]);

  return (
    <>
      <div className="pt-6">
        <CommentInput
          postId={postId}
          user={user}
          replyToId={replyToId}
          refresh={() => fetchComments()}
        />
      </div>
      {isFetching && (
        <div className="py-12">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-zinc-300" />
        </div>
      )}
      {comments.length > 0 ? (
        <div className="-mb-4 mt-2 divide-y divide-zinc-800 border-t border-t-zinc-800">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              user={user}
              reply={true}
              comment={comment}
              refresh={() => fetchComments()}
            />
          ))}
        </div>
      ) : null}
    </>
  );
};

export default ReplySection;
