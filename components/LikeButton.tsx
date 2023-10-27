"use client";

import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import { FC, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { toast } from "sonner";

interface LikeButtonProps {
  postId: string;
  likes: number;
  currentUser: User | null | undefined;
  modal?: boolean;
}

const LikeButton: FC<LikeButtonProps> = ({
  modal,
  currentUser,
  postId,
  likes = 0,
}) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(
    currentUser?.likedPostIds.includes(postId) ? true : false,
  );

  const handleClick = async () => {
    if (!currentUser) {
      return onOpen("authModal");
    }

    setLiked((liked) => !liked);
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/post/${postId}/like`);

      if (modal) {
        router.refresh();
        onOpen("postModal", { post: response.data, currentUser });
      } else {
        router.refresh();
      }
    } catch (error) {
      setLiked((liked) => !liked);
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="flex items-center gap-1.5 text-zinc-400 outline-white transition hover:text-zinc-100 focus-visible:outline-2 disabled:cursor-not-allowed disabled:opacity-75"
    >
      <Heart
        className={cn("h-5 w-5", {
          "fill-rose-500 text-rose-500": liked,
        })}
      />{" "}
      {likes} Likes
    </button>
  );
};

export default LikeButton;
