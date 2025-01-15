"use client";

import { useModal } from "@/hooks/useModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import axios from "axios";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";

const DeletePostModal = () => {
  const { onClose, type, data, isOpen } = useModal();
  const { postWithoutUser } = data;

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const isModalOpen = isOpen && type === "deletePostModal";

  const handleDelete = () => {
    setConfirmingDelete(true);
  };

  const handleConfirmDelete = () => {
    startTransition(async () => {
      try {
        await axios.delete(`/api/post/${postWithoutUser?.id}`);
        toast.success("Post deleted");
        router.refresh();
        onClose();
      } catch (error) {
        toast.error("Something went wrong");
      } finally {
        setConfirmingDelete(false);
      }
    });
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md space-y-4 bg-background-muted px-4 py-8 outline-none">
        <DialogTrigger className="absolute right-2 top-2  transition hover:rotate-90">
          <X className="text-zinc-500 max-md:h-5 max-md:w-5" />
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle className="font-normal text-zinc-200">
            Are you sure you want to delete{" "}
            <span className="font-bold text-white">
              {postWithoutUser?.title}?
            </span>
          </DialogTitle>
          <DialogDescription className="text-zinc-300">
            {confirmingDelete ? (
              "This action cannot be undone."
            ) : (
              <>
                The post will be deleted{" "}
                <span className="text-amber-500">permanently</span>.
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            confirmingDelete ? handleConfirmDelete() : handleDelete();
          }}
          className="flex flex-col gap-4"
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-zinc-700/50 bg-background-muted py-2 tracking-wider text-white transition hover:bg-zinc-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isPending}
            className={`rounded-md bg-amber-500 py-2 font-medium text-black transition hover:bg-amber-600 ${
              confirmingDelete ? "bg-red-500 hover:bg-red-600" : ""
            }`}
          >
            {isPending ? (
              <Loader2 className="mx-auto animate-spin" />
            ) : confirmingDelete ? (
              "Confirm Delete"
            ) : (
              "Delete Post"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default DeletePostModal;
