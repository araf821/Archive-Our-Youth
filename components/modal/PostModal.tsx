import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";
import Image from "next/image";
import { X } from "lucide-react";

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
        <DialogContent className="max-w-screen-md overflow-y-auto bg-transparent px-4">
          <div className="h-full w-full rounded-sm bg-[#202020] p-2 md:rounded-md md:p-6">
            <div className="flex h-12 w-full items-center justify-between border-b-2 border-zinc-700">
              <span className="cursor-pointer text-sm text-zinc-400 transition duration-200 hover:text-zinc-200">
                Expand Post
              </span>
              <X className="w-6 h-6 text-zinc-400 transition duration-200 hover:text-zinc-200"/>
            </div>
            {/* <span className="absolute left-4 top-4 cursor-pointer text-sm text-zinc-400 transition duration-200 hover:text-zinc-200">
            Expand Post
          </span> */}
            {post.contentType === "IMAGE" && (
              <div className="relative aspect-square overflow-hidden">
                <Image
                  fill
                  src={post.postContent}
                  alt="post image"
                  className="rounded-sm object-cover"
                />
              </div>
            )}
            <p className="text-2xl text-zinc-300">{post.title}</p>
          </div>
        </DialogContent>
      </div>
    </Dialog>
  );
};

export default PostModal;
