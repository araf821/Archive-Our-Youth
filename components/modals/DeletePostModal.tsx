"use client";

import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/Dialog";
import axios from "axios";
import { useToast } from "../ui/useToast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const DeletePostModal = () => {
  const { onClose, type, data, isOpen } = useModal();
  const { postWithoutUser } = data;

  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deletePostModal";
  // if (!postWithoutUser) onClose();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/post/${postWithoutUser?.id}`);
      toast({ title: "Post deleted" });
      router.refresh();
      onClose();
    } catch (error) {
      toast({ title: "Something went wrong" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4 bg-zinc-800 px-4 py-8 outline-none">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-zinc-200">
            Are you sure you want to delete{" "}
            <span className="font-bold text-white">
              {postWithoutUser?.title}?
            </span>
          </DialogTitle>
          <p className="mx-auto pt-4 text-white">
            The post will be deleted{" "}
            <span className="text-red-500">permanently</span>.
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <button
            onClick={onClose}
            className="rounded-md border border-rose-500 py-2 text-rose-500 transition hover:border-rose-700 hover:text-rose-700 md:text-lg"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="rounded-md bg-rose-500 py-2 text-black transition hover:bg-rose-700 md:text-lg"
          >
            {isLoading ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : (
              "Delete Post"
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default DeletePostModal;
