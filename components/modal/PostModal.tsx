import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import DynamicImage from "../DynamicImage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const PostModal = ({}) => {
  const { onClose, data, type, isOpen, onOpen } = useModal();
  const router = useRouter();
  const { post } = data;
  if (!post) {
    return null;
  }

  const isModalOpen = isOpen && type === "postModal";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <div className="px-4">
        <DialogContent className="max-h-[80vh] max-w-screen-md bg-transparent px-4 text-zinc-100 outline-none">
          <div className="h-full max-h-[80vh] w-full overflow-hidden overflow-y-auto rounded-sm bg-[#202020] py-2 px-4 pb-8 md:rounded-md md:p-6">
            <div className="flex h-8 w-full items-center justify-between border-b-2 border-zinc-700">
              <span className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-zinc-200">
                Expand Post{" "}
                <ExternalLink className="h-4 w-4 -translate-y-0.5" />
              </span>
              <X
                onClick={onClose}
                className="h-5 w-5 cursor-pointer text-zinc-400 transition duration-200 hover:rotate-90 hover:text-zinc-200"
              />
            </div>
            {post.contentType === "IMAGE" && (
              <DynamicImage src={post.postContent} />
            )}

            {post.contentType === "VIDEO" && (
              <div className="relative mb-10 mt-4 aspect-video w-full overflow-hidden">
                <video src={post.postContent} className="w-full" controls />
              </div>
            )}

            {post.contentType === "AUDIO" && (
              <div className="relative mb-10 mt-8 w-full overflow-hidden">
                <audio
                  src={post.postContent}
                  controls
                  className="w-full py-0.5"
                ></audio>
              </div>
            )}

            {/* Post info */}
            <div className="flex flex-col gap-4">
              <p className="font-karla mt-4 break-words text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
                Jelly sweet roll jelly beans biscuit pie
              </p>
              <div className="flex items-center gap-2 text-zinc-300 md:text-lg">
                <div className="relative h-10 w-10 rounded-full">
                  <Image
                    src={post.user.imageUrl ?? ""}
                    fill
                    alt=""
                    className="rounded-full object-cover"
                  />
                </div>
                <p>Posted by {post.user.name}</p>
              </div>
              <div
                className={`${
                  post.contentType !== "TEXT" && !post.description && "hidden"
                }`}
              >
                <hr className="border-zinc-700" />
                <ReactMarkdown className="prose-headings:font-josefin prose h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
                  {post.contentType === "TEXT"
                    ? post.postContent
                    : post.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PostModal;
