import { Dialog, DialogContent } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import DynamicImage from "../DynamicImage";
import Link from "next/link";
import LikeButton from "../LikeButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

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
      <DialogContent className="w-full max-w-screen-sm rounded-sm border border-zinc-700 bg-[#202020] p-4 text-zinc-100 outline-none max-md:w-[95%] md:rounded-md md:p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => onClose()}
            className="w-fit max-w-[128px] rounded-md px-2.5 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 max-md:text-xs"
          >
            <span className="sr-only">close modal</span>
            <X />
          </button>
          <Link
            href={`/post/${post.slug}`}
            className="w-full max-w-[128px] rounded-md bg-green-500 px-2.5 py-1.5 text-center font-semibold text-zinc-900 transition duration-300 hover:bg-green-600 hover:shadow-[0_0_15px_8px] hover:shadow-green-500/20 max-md:text-sm"
          >
            View Post
          </Link>
        </div>

        <hr className="border-zinc-700" />

        {(post.contentType === "TEXT" || post.contentType === "PDF") && (
          <div className="w-fit rounded-sm bg-zinc-700 px-2.5 py-1 font-bold max-md:text-sm">
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
          <div className="relative aspect-video w-full overflow-hidden border border-zinc-800">
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
          <div className="flex w-full justify-between gap-2.5 rounded-md bg-zinc-800 px-2 py-1.5">
            <LikeButton
              postId={post.id}
              likes={post.likes}
              currentUser={data.currentUser}
              modal={true}
            />
            <p className="text-zinc-400 max-md:text-sm truncate max-sm:text-xs">
              {post.user ? `Posted by ${post.user.name}` : "Posted Anonymously"}
              {/* Posted by {post.user?.name || "Anonymous"} */}
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
