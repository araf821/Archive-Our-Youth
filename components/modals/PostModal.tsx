import { Dialog, DialogContent } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import DynamicImage from "../DynamicImage";
import Link from "next/link";
import LikeButton from "../LikeButton";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
      <div className="px-4">
        <DialogContent className="max-h-[80vh] max-w-screen-md border-none bg-transparent text-zinc-100 outline-none">
          {/* <button
            onClick={() => onClose()}
            className="absolute right-4 top-4 text-zinc-400 outline-none"
          >
            <X className="h-4 w-4" />
          </button> */}
          <div className="h-full max-h-[80vh] w-full overflow-hidden overflow-y-auto rounded-sm bg-[#202020] px-4 py-4 md:rounded-md md:p-6">
            {post.contentType === "IMAGE" && (
              <div className="mx-auto">
                <DynamicImage src={post.postContent} />
              </div>
            )}

            {post.contentType === "VIDEO" && (
              <div className="relative my-4 aspect-video w-full overflow-hidden">
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
              className={`flex flex-col ${
                post.contentType === "TEXT" ? "flex-col-reverse" : ""
              }`}
            >
              <div className="flex w-full justify-between rounded-md bg-zinc-800 px-2 max-sm:flex-col gap-1.5 py-1.5">
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

              <p className="mt-2 break-words text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
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
                className="w-32 rounded-md bg-rose-600 px-2.5 py-1.5 text-center font-bold text-white transition duration-300 hover:bg-rose-700 hover:shadow-[0_0_15px_8px] hover:shadow-red-500/10"
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
