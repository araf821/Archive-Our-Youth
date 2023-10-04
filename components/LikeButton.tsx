import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { Heart } from "lucide-react";
import { FC, useState } from "react";
import { useToast } from "./ui/useToast";

interface LikeButtonProps {
  postId: string;
  currentUser: User | null;
}

const LikeButton: FC<LikeButtonProps> = ({ currentUser, postId }) => {
  const { toast } = useToast();

  const [liked, setLiked] = useState(
    currentUser?.likedPostIds.includes(postId) ? true : false,
  );

  const handleClick = () => {
    toast({ title: "Clicked" });
  };

  return (
    <button onClick={handleClick} className="flex text-zinc-400 transition hover:text-zinc-100 items-center gap-1.5">
      <Heart
        className={cn("h-5 w-5", {
          "fill-red-600 text-zinc-900": liked,
        })}
      />{" "}
      Like
    </button>
  );
};

export default LikeButton;
