import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { ExternalLink, Heart, X } from "lucide-react";
import DynamicImage from "../DynamicImage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { dateFormat } from "@/lib/dateFormat";
import ShareButton from "../ShareButton";
import Link from "next/link";
import LikeButton from "../LikeButton";

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
          <div className="h-full max-h-[80vh] w-full overflow-hidden overflow-y-auto rounded-sm bg-[#202020] px-4 py-2 pb-8 md:rounded-md md:p-6">
            <div className="flex h-8 w-full items-center justify-between border-b-2 border-zinc-700">
              <Link
                href={`/post/${post.slug}`}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-zinc-200"
              >
                Expand Post{" "}
                <ExternalLink className="h-4 w-4 -translate-y-0.5" />
              </Link>
              <button onClick={onClose}>
                <X className="h-5 w-5 cursor-pointer text-zinc-400 transition duration-200 hover:rotate-90 hover:text-zinc-200" />
              </button>
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
                />
              </div>
            )}

            {/* Post info */}
            <div className="mt-4 flex flex-col gap-4">
              <span className="-mb-3 w-fit rounded-md bg-zinc-700 px-1.5 py-0.5 text-sm text-zinc-300">
                {dateFormat(post.createdAt.toISOString())}
              </span>
              <p className="font-karla break-words text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl ">
                Jelly sweet roll jelly beans biscuit pie
              </p>
              <div className="flex gap-4">
                <LikeButton postId={post.id} likes={post.likes} currentUser={data.currentUser} />
                <ShareButton link={`/post/${post.slug}`} />
              </div>
              <hr className="border-zinc-700" />
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
              <hr className="border-zinc-700" />
              <div
                className={`${
                  post.contentType !== "TEXT" && !post.description && "hidden"
                }`}
              >
                {post.contentType !== "TEXT" && (
                  <p className="mb-4 text-sm font-semibold text-zinc-400">
                    DESCRIPTION
                  </p>
                )}
                <ReactMarkdown className="prose-headings:font-josefin prose mb-8 h-full max-w-full overflow-y-auto break-words rounded-md bg-zinc-100 p-2.5 text-start text-zinc-800 prose-headings:font-semibold prose-headings:text-zinc-950 prose-h1:m-0 prose-a:text-blue-600 prose-a:hover:text-blue-700 prose-code:whitespace-pre-wrap prose-img:rounded-md">
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
