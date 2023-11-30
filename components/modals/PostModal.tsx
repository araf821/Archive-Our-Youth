import { Dialog, DialogContent } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import DynamicImage from "../DynamicImage";
import Link from "next/link";
import LikeButton from "../LikeButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollArea } from "../ui/ScrollArea";
import { cn } from "@/lib/utils";

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
      <div className="px-4">
        <DialogContent className="max-h-[90vh] max-w-screen-sm border-none bg-transparent text-zinc-100 outline-none">
          <div className="h-full w-full rounded-sm bg-[#202020] px-4 py-4 md:rounded-md md:p-6">
            {(post.contentType === "TEXT" || post.contentType === "PDF") && (
              <div className="mb-2 w-fit rounded-sm bg-zinc-700 px-2.5 py-1 font-bold max-md:text-sm">
                {post.contentType === "PDF"
                  ? "PDF File"
                  : post.contentType === "TEXT"
                  ? "Written"
                  : null}
              </div>
            )}

            {post.contentType === "IMAGE" && (
              <div className="mx-auto">
                <DynamicImage src={post.postContent} />
              </div>
            )}

            {post.contentType === "VIDEO" && (
              <div className="relative my-4 border border-zinc-800 aspect-video w-full overflow-hidden">
                <video
                  src={post.postContent}
                  className="h-full w-full"
                  controls
                />
              </div>
            )}

            {post.contentType === "AUDIO" && (
              <div className="relative my-4 w-full overflow-hidden">
                <audio
                  src={post.postContent}
                  controls
                  className="w-full py-0.5"
                />
              </div>
            )}

            <div
              className={`flex flex-col gap-3 ${
                post.contentType === "TEXT" || post.contentType === "PDF"
                  ? "flex-col-reverse"
                  : ""
              }`}
            >
              <div className="flex w-full justify-between gap-1.5 rounded-md bg-zinc-800 px-2 py-1.5 max-sm:flex-col">
                <LikeButton
                  postId={post.id}
                  likes={post.likes}
                  currentUser={data.currentUser}
                  modal={true}
                />
                <p className="text-zinc-400">
                  {post.user
                    ? `Posted by ${post.user.name}`
                    : "Posted Anonymously"}
                  {/* Posted by {post.user?.name || "Anonymous"} */}
                </p>
              </div>

              <p
                className={cn(
                  "balance break-words text-3xl font-medium tracking-wide text-zinc-100 sm:text-4xl md:text-5xl",
                )}
              >
                {post.title}
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onClose()}
                className="w-32 rounded-md bg-zinc-800 px-2.5 py-1.5 text-white transition hover:bg-zinc-700"
              >
                Close
              </button>
              <Link
                href={`/post/${post.slug}`}
                className="w-32 rounded-md bg-green-500 px-2.5 py-1.5 text-center font-semibold text-zinc-900 transition duration-300 hover:bg-green-600 hover:shadow-[0_0_15px_8px] hover:shadow-green-500/20"
              >
                View Post
              </Link>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PostModal;
