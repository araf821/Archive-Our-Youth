import { FC } from "react";
import Link from "next/link";
import { Edit2 } from "lucide-react";

import { cn } from "@/lib/utils";

import BackButton from "../../BackButton";
import { buttonVariants } from "../../ui/button";

interface PostHeaderProps {
  postId: string;
  slug: string;
  isAuthor: boolean;
}

const PostHeader: FC<PostHeaderProps> = ({ postId, slug, isAuthor }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <BackButton />
      {isAuthor && (
        <Link
          href={`/post/${slug}/edit`}
          className={cn("morph-md", buttonVariants({ variant: "outline" }))}
        >
          Edit Post
          <Edit2 className="ml-2 size-4" />
        </Link>
      )}
    </div>
  );
};

export default PostHeader;
