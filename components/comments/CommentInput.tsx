"use client";

import { openSans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CommentValidator } from "@/lib/validators/comment";
import Link from "next/link";

interface CommentInputProps {
  user: User | null;
  postId: string;
  replyToId?: string;
  refresh?: () => void;
}

const CommentInput: FC<CommentInputProps> = ({
  user,
  postId,
  replyToId,
  refresh,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const validatedInput = CommentValidator.safeParse({
        content: input,
        postId,
        replyToId,
      });

      if (!validatedInput.success) {
        return toast.error("Comment cannot be empty.");
      }

      await axios.post("/api/comment", {
        content: validatedInput.data.content,
        postId: postId,
        replyToId: replyToId,
        isReply: replyToId ? true : false,
      });

      toast.success("Thanks for your contribution!");
      router.refresh();
      refresh ? refresh() : null;
      setInput("");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Comment could not be added.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <p className="mt-2 text-zinc-400 max-md:text-sm">
        Please{" "}
        <Link
          href="/sign-in"
          className="text-green-500 underline underline-offset-2"
        >
          sign in
        </Link>{" "}
        to leave a reply.
      </p>
    );
  }

  return (
    <div className="flex items-center gap-2 text-zinc-200 md:gap-4">
      <div className="relative h-8 w-8 self-start overflow-hidden rounded-full md:h-12 md:w-12">
        <Image
          src={user.imageUrl || "/placeholder-image.png"}
          alt="user profile picture"
          fill
          sizes="50px"
          className="object-cover"
        />
      </div>
      <div className="w-full space-y-0">
        <textarea
          placeholder="Add a comment..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={cn(
            "min-h-[6rem] w-full rounded-lg border-none bg-zinc-800 px-3 py-1.5 text-zinc-50 outline-none focus:outline-zinc-600 md:text-lg",
            openSans.className,
          )}
        />
        <div className="flex items-center gap-2 pt-2">
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="morph-sm border-zinc-800 bg-zinc-800 text-zinc-200 hover:bg-zinc-800 hover:text-green-500"
            size="sm"
          >
            Post
          </Button>
          <p className="text-sm text-zinc-400">Posting as {user.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
