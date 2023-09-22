import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import { useModal } from "@/hooks/useModal";

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
      <DialogContent className="max-h-[50%] overflow-y-auto bg-white px-8">
        <DialogHeader className="">
          <DialogTitle className="text-center text-2xl">
            {post.title}
          </DialogTitle>
        </DialogHeader>
        <hr />
      </DialogContent>
    </Dialog>
  );
};

export default PostModal;
