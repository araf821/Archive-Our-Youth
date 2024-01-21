"use client";

import { openSans } from "@/app/fonts";
import { cn, formatDateString } from "@/lib/utils";
import { Heart, Reply, Trash } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import ReplySection from "./ReplySection";
import { motion } from "framer-motion";
import { User, Comment as CommentModel } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import queryString from "query-string";
import { useModal } from "@/hooks/useModal";

interface CommentProps {
  reply?: boolean;
  user: User | null;
  comment: CommentModel & { user: User; _count?: { replies: number } };
  refresh?: () => void;
}

const Comment: FC<CommentProps> = ({ comment, reply, user, refresh }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [likeState, setLikeState] = useState({
    likes: comment.likes,
    alreadyLiked: user?.likedComments.includes(comment.id),
  });

  const { onOpen } = useModal();
  const router = useRouter();

  const onLike = async () => {
    if (!user) {
      return onOpen("authModal");
    }

    try {
      setIsLoading(true);
      setLikeState((prev) => ({
        alreadyLiked: !prev.alreadyLiked,
        likes: prev.alreadyLiked ? prev.likes - 1 : prev.likes + 1,
      }));

      await axios.put("/api/comment/like", { commentId: comment.id });
    } catch (error) {
      setLikeState((prev) => ({
        alreadyLiked: !prev.alreadyLiked,
        likes: prev.alreadyLiked ? prev.likes - 1 : prev.likes + 1,
      }));
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async () => {
    try {
      const url = queryString.stringifyUrl({
        url: "/api/comment",
        query: {
          commentId: comment.id,
        },
      });
      await axios.delete(url);
      toast.success("Comment deleted!");
      router.refresh();
      refresh ? refresh() : null;
    } catch (error) {
      console.error("COMMENT DELETION ERROR", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <motion.div
      viewport={{ once: true }}
      initial={{ opacity: 0, x: -200 }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      className="flex items-center gap-4 py-6 text-zinc-100 max-md:gap-2"
    >
      <div className="flex h-full flex-col items-center gap-1 self-start">
        <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
          <Image
            src={comment.user?.imageUrl || "/placeholder-image.png"}
            alt="user profile picture"
            fill
            sizes="50px"
            className="object-cover"
          />
        </div>
        {/* <div className="h-full w-1 bg-zinc-300" /> */}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="flex items-center gap-1.5 break-words md:text-lg">
          {comment.user?.name}
          <span className="mx-1 text-zinc-500">•</span>
          <span className="text-xs text-zinc-500 md:text-sm">
            {formatDateString(comment.createdAt.toString())}
          </span>
        </p>
        <p
          className={cn(
            "break-words tracking-wide md:text-lg",
            openSans.className,
          )}
        >
          {comment.deleted ? (
            <span className="font-bold text-zinc-400">[deleted]</span>
          ) : (
            comment.content
          )}
        </p>
        <div className="mt-2 flex items-center gap-2 text-zinc-400">
          {!comment.deleted && (
            <button
              disabled={isLoading}
              onClick={onLike}
              className="flex items-center gap-1 transition duration-200 hover:text-red-500 max-md:text-sm"
            >
              <Heart
                strokeWidth={3}
                className={cn("h-4 w-4 pb-0.5 md:h-5 md:w-5", {
                  "fill-red-500 text-red-500": likeState.alreadyLiked,
                })}
              />
              <span className="sr-only">like button</span>
              <span className="font-semibold max-sm:text-sm">
                {likeState.likes} likes
              </span>
            </button>
          )}
          {!reply && (
            <>
              {!comment.deleted && <span className="mx-1">•</span>}{" "}
              <button
                onClick={() => setOpen((open) => !open)}
                className="flex gap-1 transition duration-200 hover:text-green-500 max-md:text-sm"
              >
                <span className="sr-only">reply button</span>
                <Reply strokeWidth={3} className="h-4 w-4 md:h-5 md:w-5" />
                {comment._count?.replies || 0} replies
              </button>
            </>
          )}
          {!comment.deleted && comment.userId === user?.id && (
            <>
              {!comment.deleted && <span className="mx-1">•</span>}
              <button
                onClick={deleteComment}
                className="flex gap-1 transition duration-200 hover:text-rose-500 max-md:text-sm"
              >
                <span className="sr-only">delete button</span>
                <Trash strokeWidth={3} className="h-4 w-4 md:h-5 md:w-5" />
              </button>
            </>
          )}
        </div>
        {open && (
          <ReplySection
            postId={comment.postId}
            user={user}
            replyToId={comment.id}
            commentId={comment.id.toString()}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Comment;
