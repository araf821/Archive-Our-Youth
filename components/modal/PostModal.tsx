import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { ExternalLink, X } from "lucide-react";
import DynamicImage from "../DynamicImage";

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
        <DialogContent className="max-w-screen-md overflow-y-auto bg-transparent px-4 outline-none">
          <div className="h-full w-full rounded-sm bg-[#202020] p-2 md:rounded-md md:p-6">
            <div className="flex h-8 w-full items-center justify-between border-b-2 border-zinc-700">
              <span className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400 transition duration-200 hover:text-zinc-200">
                Expand Post{" "}
                <ExternalLink className="h-4 w-4 -translate-y-0.5" />
              </span>
              <X
                onClick={onClose}
                className="h-6 w-6 cursor-pointer text-zinc-400 transition duration-200 hover:text-zinc-200"
              />
            </div>
            {/* <span className="absolute left-4 top-4 cursor-pointer text-sm text-zinc-400 transition duration-200 hover:text-zinc-200">
            Expand Post
          </span> */}
            {post.contentType === "IMAGE" && (
              <DynamicImage src={post.postContent} />
            )}
            <p className="text-2xl text-zinc-300">{post.title}</p>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PostModal;
