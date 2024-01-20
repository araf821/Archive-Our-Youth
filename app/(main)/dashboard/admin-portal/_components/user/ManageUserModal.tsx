"use client";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { User } from "@prisma/client";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmDeletion from "./ConfirmDeletion";
import { cn } from "@/lib/utils";

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
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-sm rounded-2xl border-zinc-700 bg-[#1c1c1c] py-6 shadow-md focus:outline-none">
        <DialogHeader>
          <DialogTitle className={cn(isDeleting && "text-rose-500")}>
            {isDeleting ? "Delete User" : "Manager User"}{" "}
            <b className="tracking-wider">&quot;{user.name}&quot;</b>
          </DialogTitle>
          <DialogDescription>
            {isDeleting
              ? "This action cannot be undone."
              : "Manage this user's activity or account."}
          </DialogDescription>
        </DialogHeader>
        <hr className="border-zinc-700" />

        {isDeleting ? (
          <ConfirmDeletion
            cancel={() => setIsDeleting(false)}
            userId={user.id}
            imageUrl={user.imageUrl!}
          />
        ) : (
          <div className="flex w-full gap-4 max-sm:flex-col max-sm:px-4">
            <Button
              onClick={() => setIsDeleting(true)}
              variant="destructive"
              className="w-full"
            >
              Delete This User
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link
                className="w-full"
                href={`/dashboard/admin-portal/users/${user.id}`}
              >
                View User Info
              </Link>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserModal;
