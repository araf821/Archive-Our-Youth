import { useState } from "react";
import Image from "next/image";
import { deleteUser } from "@/actions/deleteUser";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/Label";

interface ConfirmDeletionProps {
  cancel: () => void;
  userId: string;
  imageUrl: string;
}

const ConfirmDeletion = ({
  cancel,
  userId,
  imageUrl,
}: ConfirmDeletionProps) => {
  const [confirmationString, setConfirmationString] = useState("");

  const onDelete = async () => {
    deleteUser(userId, confirmationString)
      .then((data) => {
        if (data.success) {
          toast.success(data.success);
        }

        if (data.error) {
          toast.error(data.error);
        }
      })
      .catch(() => {
        toast.error("Something went wrong.");
      });
  };

  return (
    <div className="max-md:px-4">
      <div className="relative mx-auto my-6 aspect-square w-20 md:w-32">
        <Image
          src={imageUrl}
          alt="user profile picture"
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <p className="mt-8 text-center text-zinc-300 md:text-lg">
        Are you sure you want to delete this user?
      </p>
      <p className="mb-12 text-center font-semibold text-red-700 max-md:text-sm">
        You cannot undo this action!
      </p>

      <div className="w-full space-y-2">
        <Label className="select-none md:text-base">
          Type this in to confirm deletion: {userId.slice(0, 7)}
        </Label>
        <Input
          className="bg-[#2f2f2f] md:text-base"
          defaultValue={""}
          placeholder="1234567"
          onChange={(e) => setConfirmationString(e.target.value)}
        />
      </div>
      <div className="mt-4 flex w-full gap-4 max-sm:flex-col max-sm:gap-2">
        <Button onClick={cancel} variant="ghost" className="w-full">
          Cancel
        </Button>
        <Button onClick={onDelete} variant="destructive" className="w-full">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ConfirmDeletion;
