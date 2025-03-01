"use client";

import { Post, User } from "@prisma/client";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import PostModalTriggerContent from "./PostModalTriggerContent";
import PostModalMedia from "./PostModalMedia";
import PostModalHeader from "./PostModalHeader";
import PostModalInfo from "./PostModalInfo";

interface PostModalProps {
  post: Post & { user: User | null };
  currentUser: User | null;
}

const PostModal = ({ post, currentUser }: PostModalProps) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        className="group relative aspect-square cursor-pointer overflow-hidden outline-none outline outline-4 outline-offset-0 transition-all duration-150 ease-out hover:z-50 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-green-600 lg:hover:scale-110 lg:hover:rounded-lg lg:hover:shadow-[0_0_40px] lg:hover:shadow-black lg:hover:outline-zinc-950"
      >
        <PostModalTriggerContent post={post} currentUser={currentUser} />
      </button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="normal"
        hideCloseButton
        classNames={{
          backdrop: "backdrop-blur-md bg-black/20",
          base: "border-0",
        }}
      >
        <ModalContent className="my-auto w-full max-w-lg rounded-md border-2 border-border-dark bg-[#18181b] p-4 text-zinc-100 shadow-[0_0_20px_5px_black] md:my-auto md:rounded-lg md:p-6">
          {(onClose) => (
            <div className="flex flex-col gap-4">
              <PostModalHeader onClose={onClose} slug={post.slug} />

              <hr className="rounded-full border-t-2 border-border-dark" />

              <PostModalMedia post={post} />
              <PostModalInfo post={post} currentUser={currentUser} />
            </div>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
