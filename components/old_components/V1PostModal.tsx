import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";

import DynamicImage from "../DynamicImage";
import LikeButton from "../LikeButton";
import { Dialog, DialogContent } from "../ui/Dialog";

const PostModal = () => {
  const { onClose, data, type, isOpen } = useModal();
  const { post } = data;
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!post) {
    return null;
  }

  const isModalOpen = isOpen && type === "postModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-screen-sm rounded-sm border border-background-surface bg-[#202020] p-4 text-zinc-100 shadow-[0_0_20px_5px_black] outline-none max-md:w-[95%] md:rounded-md md:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onClose()}
            className="morph-sm w-fit max-w-[128px] rounded-md p-1 text-sm text-zinc-400 transition hover:text-zinc-100 max-md:text-xs"
          >
            <span className="sr-only">close modal</span>
            <X />
          </button>
          <div className="relative">
            <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-green-800"></span>
            <Link
              href={`/post/${post.slug}`}
              className="relative z-10 flex rounded-md bg-primary px-2 py-1 text-center font-medium tracking-wide text-background transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-dark active:translate-x-1 active:translate-y-1"
            >
              View Post
            </Link>
          </div>
        </div>

        <hr className="border-background-surface" />

        {(post.contentType === "TEXT" || post.contentType === "PDF") && (
          <div className="w-fit rounded-sm bg-background-surface px-2.5 py-1 font-bold max-md:text-sm">
            {post.contentType === "PDF"
              ? "PDF File"
              : post.contentType === "TEXT"
                ? "Written"
                : null}
          </div>
        )}

        {post.contentType === "IMAGE" && (
          <div className="">
            <DynamicImage src={post.postContent} />
          </div>
        )}

        {post.contentType === "VIDEO" && (
          <div className="relative aspect-video w-full overflow-hidden border border-border-dark">
            <video src={post.postContent} className="h-full w-full" controls />
          </div>
        )}

        {post.contentType === "AUDIO" && (
          <div className="relative w-full overflow-hidden">
            <audio src={post.postContent} controls className="w-full py-0.5" />
          </div>
        )}

        <div
          className={`flex flex-col gap-3 ${
            post.contentType === "TEXT" || post.contentType === "PDF"
              ? "flex-col-reverse"
              : ""
          }`}
        >
          <div className="flex w-full justify-between gap-2.5 rounded-md border border-border-dark bg-zinc-800 px-2 py-1.5">
            <LikeButton
              postId={post.id}
              likes={post.likes}
              currentUser={data.currentUser}
              modal={true}
            />
            <p className="truncate text-zinc-400 max-md:text-sm max-sm:text-xs">
              {post.user ? `Posted by ${post.user.name}` : "Posted Anonymously"}
            </p>
          </div>

          <p
            className={cn(
              "mb-2 break-words text-3xl font-medium tracking-wide text-zinc-100 sm:text-4xl md:text-5xl",
            )}
          >
            {post.title}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
