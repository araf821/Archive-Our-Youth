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
      await axios.put("/api/user/update-profile", { input, image });
      toast.success("Updated profile successfully!");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
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
        <DialogHeader className="space-y-0 md:text-4xl">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Change your name or profile picture (coming soon).
          </DialogDescription>
        </DialogHeader>
        <hr className="-mt-2 border-zinc-700" />

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <p>Your name</p>
            <Input
              placeholder="Your name"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
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
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
