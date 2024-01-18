import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { dateFormat } from "@/lib/dateFormat";
import { Post, User } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";

interface ManagePostModalProps {
  post: Post & { user: User | null; _count: { comments: number } };
  isOpen: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ManagePostModal = ({
  onOpenChange,
  isOpen,
  post,
}: ManagePostModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-md bg-zinc-900 py-6 outline-none">
        <DialogHeader>
          <DialogTitle>Manage &quot;{post.title}&quot;</DialogTitle>
          <DialogDescription>
            Manage this post, its author, comments, or delete it.
          </DialogDescription>
        </DialogHeader>
        <hr className="border-zinc-700" />

        <div className="mt-4 flex flex-col gap-2 max-md:px-4">
          <div className="flex items-center justify-between gap-8 border-b border-zinc-700 pb-2">
            <p className="text-zinc-400">Author</p>
            {post.user ? (
              <Link
                href={`/dashboard/admin-portal/users/${post.user?.id}`}
                target="_blank"
                className="flex items-center gap-2"
              >
                <p>{post.user.name}</p>
                <button>
                  <ExternalLink className="h-4 w-4" />
                </button>
              </Link>
            ) : (
              <p className="text-green-700">Anonymous</p>
            )}
          </div>

          <div className="flex items-center justify-between gap-8 border-b border-zinc-700 pb-2">
            <p className="text-zinc-400">Published</p>
            <p>{dateFormat(post.createdAt.toISOString())}</p>
          </div>

          <div className="flex items-center justify-between gap-8 border-b border-zinc-700 pb-2">
            <p className="text-zinc-400">Likes</p>
            <p>{post.likes}</p>
          </div>

          <div className="flex items-center justify-between gap-8 border-b border-zinc-700 pb-2">
            <p className="text-zinc-400">Comments</p>
            <Link
              href={`/dashboard/admin-portal/comments?post=${post.id}`}
              target="_blank"
              className="flex items-center gap-2"
            >
              <p>{post._count.comments}</p>
              <ExternalLink className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-4 flex gap-2 max-md:flex-col max-md:px-4 md:gap-4">
          <Button
            onClick={() => setIsDeleting(true)}
            variant={"destructive"}
            className="w-full"
          >
            Delete Post
          </Button>
          <Button variant={"outline"} className="w-full">
            View Full Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManagePostModal;
