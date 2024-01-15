"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { User } from "@prisma/client";
import { Dispatch, SetStateAction } from "react";

interface ManageUserModalProps {
  user: User;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const ManageUserModal = ({
  user,
  open,
  onOpenChange,
}: ManageUserModalProps) => {
  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-sm rounded-2xl border-zinc-800 bg-[#252525] py-6 shadow-md focus:outline-none">
        <DialogHeader>
          <DialogTitle>More Information on {user.name}</DialogTitle>
          <DialogDescription>
            View the latest activity from this user.
          </DialogDescription>
        </DialogHeader>
        <hr className="border-zinc-700" />
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserModal;
