"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

const DeletePostModal = () => {
  const { onClose, type, data, isOpen } = useModal();
  const { postWithoutUser } = data;

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const isModalOpen = isOpen && type === "deletePostModal";
  // if (!postWithoutUser) onClose();

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/post/${postWithoutUser?.id}`);
      toast.success("Post deleted");
      router.refresh();
      onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4 bg-zinc-900 px-4 py-8 outline-none">
        <DialogTrigger className="absolute right-2 top-2  transition hover:rotate-90">
          <X className="text-zinc-500 max-md:h-5 max-md:w-5" />
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-zinc-200">
            Are you sure you want to delete{" "}
            <span className="font-bold text-white">
              {postWithoutUser?.title}?
            </span>
          </DialogTitle>
          <p className="mx-auto pt-4 text-zinc-300">
            The post will be deleted{" "}
            <span className="text-amber-500">permanently</span>.
          </p>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <button
            onClick={onClose}
            className="rounded-md py-2 text-zinc-400 transition hover:bg-zinc-800 hover:text-white md:text-lg"
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={handleDelete}
            className="rounded-md bg-amber-500 py-2 text-black transition hover:bg-amber-600 md:text-lg"
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
