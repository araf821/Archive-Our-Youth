"use client";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import { Post, User } from "@prisma/client";

import PostModalHeader from "./PostModalHeader";
import PostModalInfo from "./PostModalInfo";
import PostModalMedia from "./PostModalMedia";
import PostModalTriggerContent from "./PostModalTriggerContent";

interface PostModalProps {
  post: Post & { user: User | null };
  currentUser: User | null;
  "data-lg-pos"?: number;
  "data-xl-pos"?: number;
  "data-lg-last-row"?: string;
  "data-xl-last-row"?: string;
  "data-lg-first-row"?: string;
  "data-xl-first-row"?: string;
}

const PostModal = ({
  post,
  currentUser,
  "data-lg-pos": lgPos,
  "data-xl-pos": xlPos,
  "data-lg-last-row": lgLastRow,
  "data-xl-last-row": xlLastRow,
  "data-lg-first-row": lgFirstRow,
  "data-xl-first-row": xlFirstRow,
}: PostModalProps) => {
  const { onOpen, onOpenChange, isOpen } = useDisclosure();

  return (
    <>
      <button
        onClick={onOpen}
        data-lg-pos={lgPos}
        data-xl-pos={xlPos}
        data-lg-last-row={lgLastRow}
        data-xl-last-row={xlLastRow}
        data-lg-first-row={lgFirstRow}
        data-xl-first-row={xlFirstRow}
        className={`group relative aspect-square cursor-pointer overflow-hidden outline-none outline outline-[3px] outline-offset-0 transition-all duration-150 ease-out hover:z-50 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-green-600 lg:shadow-xl lg:hover:scale-110 lg:hover:rounded-md lg:hover:shadow-black lg:hover:outline-zinc-950 lg:[&[data-lg-first-row="true"]]:hover:translate-y-[7%] lg:[&[data-lg-last-row="true"]]:hover:-translate-y-[7%] lg:[&[data-lg-pos="0"]]:hover:translate-x-[7%] lg:[&[data-lg-pos="4"]]:hover:-translate-x-[7%] xl:[&[data-lg-pos]]:hover:translate-x-0 xl:[&[data-xl-first-row="true"]]:hover:translate-y-[7%] xl:[&[data-xl-last-row="true"]]:hover:-translate-y-[7%] xl:[&[data-xl-pos="0"]]:hover:translate-x-[7%] xl:[&[data-xl-pos="5"]]:hover:-translate-x-[7%]`}
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
