"use client";

import { openSans } from "@/app/fonts";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/Button";
import { CommentValidator } from "@/lib/validators/comment";

interface CommentInputProps {
  user: User;
  postId: string;
}

const CommentInput: FC<CommentInputProps> = ({ user, postId }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const validatedInput = CommentValidator.parse({ content: input, postId });
      await axios.post("/api/comment", {
        content: validatedInput.content,
        postId: postId,
      });
      toast.success("Thanks for your comment!");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Comment could not be added.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2 text-zinc-200 md:gap-4">
      <div className="relative h-8 w-8 self-start overflow-hidden rounded-full md:h-12 md:w-12">
        <Image
          src={user.imageUrl || "/placeholder-image.png"}
          alt="user profile picture"
          fill
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
        <div className="flex items-center justify-between gap-2">
          <p className="self-start text-sm text-zinc-400">
            Posting as {user.name}
          </p>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommentInput;
