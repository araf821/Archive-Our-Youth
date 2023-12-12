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
import { ZodError, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/Form";
import FileUpload from "../FileUpload";
import { Button } from "../ui/Button";

interface EditProfileModalProps {
  name: string;
  imageUrl: string;
}

const EditProfileModal: FC<EditProfileModalProps> = ({ imageUrl, name }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof EditProfileValidator>>({
    resolver: zodResolver(EditProfileValidator),
    defaultValues: {
      newName: name,
      newImageUrl: imageUrl,
    },
  });

  async function onSubmit(values: z.infer<typeof EditProfileValidator>) {
    setIsLoading(true);

    try {
      if (values.newName === name && values.newImageUrl === imageUrl) {
        setIsOpen(false);
        return toast.error("No changes made.");
      }
      await axios.put("/api/user/update-profile", values);
      toast.success("Updated profile successfully!");
      router.refresh();
      setIsOpen(false);
    } catch (error) {
      console.error(error);
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
      <DialogTrigger className="text-zinc-400 hover:text-white transition">
        <span className="sr-only">edit button</span>
        <Edit2 className="h-4 w-4 focus:outline-none md:h-5 md:w-5" />
      </DialogTrigger>
      <DialogContent className="max-w-lg bg-zinc-900 px-4 py-6 text-zinc-100">
        <DialogHeader className="space-y-0">
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Change your name or profile picture.
          </DialogDescription>
        </DialogHeader>
        <hr className="-mt-2 border-zinc-700" />

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="-mt-2 space-y-4"
          >
            <FormField
              name="newImageUrl"
              control={form.control}
              render={({ field }) => (
                <FormItem className="mx-auto max-w-[250px] text-center">
                  <p>Upload a new profile picture</p>
                  <FormControl>
                    <FileUpload
                      endPoint="image"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="newName"
              control={form.control}
              render={({ field }) => (
                <FormItem className="space-y-0.5">
                  <p>Your name</p>
                  <FormControl>
                    <Input
                      placeholder="New display name"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <hr className="border-zinc-700" />

            <div className="flex items-center gap-4">
              <Button
                type="button"
                onClick={() => setIsOpen(false)}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                disabled={
                  isLoading ||
                  !!form.formState.errors.newImageUrl ||
                  !!form.formState.errors.newName
                }
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileModal;
