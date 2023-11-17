"use client";

import { FC, FormEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/Dialog";
import { Edit2, Loader2 } from "lucide-react";
import { Input } from "../ui/input";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { EditProfileValidator } from "@/lib/validators/edit-profile";
import { ZodError } from "zod";

interface EditProfileModalProps {
  name: string;
  imageUrl: string;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ imageUrl, name }) => {
  const router = useRouter();

  const [input, setInput] = useState(name);
  const [image, setImage] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const values = EditProfileValidator.parse({ input, image });
      if (input === name && image === imageUrl) {
        return toast.error("No changes made.");
      }
      await axios.put("/api/user/update-profile", values);
      toast.success("Updated profile successfully!");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        toast.error("Validation error.");
      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger>
        <Edit2 className="h-4 w-4 focus:outline-none md:h-5 md:w-5" />
      </DialogTrigger>
      <DialogContent className="max-w-xl bg-zinc-900 px-4 py-4 text-zinc-100">
        <DialogHeader className="space-y-0">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Change your name or profile picture (coming soon).
          </DialogDescription>
        </DialogHeader>
        <hr className="-mt-2 border-zinc-700" />

        <form onSubmit={onSubmit} className="-mt-2 space-y-4">
          <div>
            <p>Your name</p>
            <Input
              placeholder="Your name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <hr className="border-zinc-700" />

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-md px-3 py-1 text-zinc-400 transition hover:bg-zinc-800 md:text-lg"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              className="rounded-md border-2 border-zinc-300 px-3 py-1 text-zinc-100 ring-zinc-300 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:ring-4 disabled:opacity-60"
              type="submit"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
