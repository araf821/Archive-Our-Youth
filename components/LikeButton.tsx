import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import { FC, useState } from "react";
import { useToast } from "./ui/useToast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";

interface LikeButtonProps {
  postId: string;
  likes: number;
  currentUser: User | null | undefined;
}

const LikeButton: FC<LikeButtonProps> = ({
  currentUser,
  postId,
  likes = 0,
}) => {
  const { toast } = useToast();
  const { onOpen } = useModal();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(
    currentUser?.likedPostIds.includes(postId) ? true : false,
  );
  console.log(currentUser?.likedPostIds);

  const handleClick = async () => {
    if (!currentUser) {
      return toast({
        title: "You must be signed in to like posts.",
        variant: "destructive",
      });
    }

    setLiked((liked) => !liked);
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/post/${postId}/like`);

      onOpen("postModal", { post: response.data, currentUser });
      router.refresh();
    } catch (error) {
      setLiked((liked) => !liked);
      toast({ title: "Something went wrong." });
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      disabled={isLoading}
      onClick={handleClick}
      className="flex items-center gap-1.5 text-zinc-400 transition hover:text-zinc-100"
    >
      <Heart
        className={cn("h-5 w-5", {
          "fill-red-600": liked,
        })}
      />{" "}
      {likes} Likes
    </button>
  );
};

export default LikeButton;
