import { FC } from "react";
import { User } from "@prisma/client";

import LikeButton from "../../LikeButton";
import ShareButton from "../../ShareButton";

interface PostActionsProps {
  postId: string;
  likeCount: number;
  currentUser: User | null;
  className?: string;
}

const PostActions: FC<PostActionsProps> = ({
  postId,
  likeCount,
  currentUser,
  className,
}) => {
  return (
    <div
      className={`flex w-full items-center justify-between rounded-md border border-border-dark bg-zinc-800 px-2 py-1.5 ${className}`}
    >
      <LikeButton postId={postId} likes={likeCount} currentUser={currentUser} />
      <ShareButton link="idk" />
    </div>
  );
};

export default PostActions;
