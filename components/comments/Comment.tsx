"use client";

import { openSans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { Heart, Reply } from "lucide-react";
import Image from "next/image";
import { FC, useState } from "react";
import ReplySection from "./ReplySection";
import { motion } from "framer-motion";
import CommentInput from "./CommentInput";
import { User, Comment as CommentModel } from "@prisma/client";

interface CommentProps {
  reply?: boolean;
  user: User | null;
  comment: CommentModel & { user: User; _count: { replies: number } };
}

const Comment: FC<CommentProps> = ({ comment, reply, user }) => {
  const [openReplyInput, setOpenReplyInput] = useState(false);
  const [openReplySection, setOpenReplySection] = useState(false);

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
            src={comment.user.imageUrl || "/placeholder-image.png"}
            alt="user profile picture"
            fill
          />
        </div>
        {/* <div className="h-full w-1 bg-zinc-300" /> */}
      </div>
      <div className="flex flex-1 flex-col gap-1">
        <p className="flex items-center gap-1.5 break-words md:text-lg">
          {comment.user.name}
          <span className="mx-1 text-zinc-500">•</span>
          <span className="text-xs text-zinc-500 md:text-sm">
            {comment.createdAt.toISOString()}
          </span>
        </p>
        <p
          className={cn(
            "break-words tracking-wide md:text-lg",
            openSans.className,
          )}
        >
          {comment.content}
        </p>
        <div className="mt-2 flex items-center gap-2 text-zinc-400">
          <button className="transition duration-200 hover:text-red-500 max-md:text-sm">
            <Heart strokeWidth={3} className="h-4 w-4 pb-0.5 md:h-5 md:w-5" />
            <span className="sr-only">like button</span>
          </button>
          <p className="font-semibold">{comment.likes} likes</p>
          {!reply && (
            <>
              <span className="mx-1">•</span>
              <button
                onClick={() => setOpenReplyInput((open) => !open)}
                className="transition duration-200 hover:text-green-500 max-md:text-sm"
              >
                <span className="sr-only">reply button</span>
                <Reply strokeWidth={3} className="h-4 w-4 pb-1 md:h-5 md:w-5" />
              </button>
              <button
                onClick={() => {
                  if (comment._count.replies > 0) {
                    setOpenReplySection((open) => !open);
                  }
                }}
                className="font-semibold"
              >
                {comment._count.replies} replies
              </button>
            </>
          )}
        </div>
        {openReplyInput && (
          <div className="pt-4">
            <CommentInput
              postId={"123"}
              user={user}
              replyToId={comment.id.toString()}
            />
          </div>
        )}
        {openReplySection && <ReplySection commentId={comment.id.toString()} />}
      </div>
    </motion.div>
  );
};

export default Comment;
