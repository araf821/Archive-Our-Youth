"use client";

import { Post, User } from "@prisma/client";
import LikeButton from "../LikeButton";
import DynamicImage from "../DynamicImage";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import PostModalTriggerContent from "./PostModalTriggerContent";

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
        className="group relative aspect-square cursor-pointer overflow-hidden border-zinc-800 outline-none transition duration-500 focus-visible:z-[9999] focus-visible:outline focus-visible:outline-4 focus-visible:outline-green-600"
      >
        <PostModalTriggerContent post={post} currentUser={currentUser} />
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        scrollBehavior="outside"
        hideCloseButton
        classNames={{
          backdrop: "backdrop-blur-md bg-black/20",
        }}
      >
        <ModalContent className="w-full max-w-lg rounded-md border-2 border-zinc-800 bg-[#18181b] p-4 text-zinc-100 shadow-[0_0_20px_5px_black] md:rounded-lg md:p-6">
          {(onClose) => (
            <>
              <div className="flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="morph-sm w-fit max-w-[128px] rounded-md p-1 text-sm text-zinc-400 transition hover:text-zinc-100 max-md:text-xs"
                >
                  <span className="sr-only">close modal</span>
                  <X />
                </button>
                <div className="relative">
                  <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-green-800"></span>
                  <Link
                    href={`/post/${post.slug}`}
                    className="relative z-10 flex rounded-md bg-green-500 px-2 py-1 text-center font-medium tracking-wide text-zinc-950 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-600 hover:text-white focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 active:translate-x-1 active:translate-y-1"
                  >
                    View Post
                  </Link>
                </div>
              </div>

              <hr className="my-4 rounded-full border-t-2 border-zinc-800" />

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
                  <video
                    src={post.postContent}
                    className="h-full w-full"
                    controls
                  />
                </div>
              )}

              {post.contentType === "AUDIO" && (
                <div className="relative w-full overflow-hidden">
                  <audio
                    src={post.postContent}
                    controls
                    className="w-full py-0.5"
                  />
                </div>
              )}

              <div
                className={`mt-4 flex flex-col gap-3 ${
                  post.contentType === "TEXT" || post.contentType === "PDF"
                    ? "flex-col-reverse"
                    : ""
                }`}
              >
                <div className="flex w-full justify-between gap-2.5 rounded-md bg-zinc-800 px-2 py-1.5">
                  <LikeButton
                    postId={post.id}
                    likes={post.likes}
                    currentUser={currentUser}
                    modal={true}
                  />
                  <p className="truncate text-zinc-400 max-md:text-sm max-sm:text-xs">
                    {post.user
                      ? `Posted by ${post.user.name}`
                      : "Posted Anonymously"}
                    {/* Posted by {post.user?.name || "Anonymous"} */}
                  </p>
                </div>

                <p
                  className={cn(
                    "break-words text-2xl font-medium tracking-wide text-zinc-100 sm:text-3xl",
                  )}
                >
                  {post.title}
                </p>
              </div>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PostModal;
