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
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";

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
          <DialogTitle>
            Manager User <b className="tracking-wider">{user.name}</b>
          </DialogTitle>
          <DialogDescription>
            Manage this user&apos;s activity or account.
          </DialogDescription>
        </DialogHeader>
        <hr className="border-zinc-700" />

        <div className="flex w-full gap-4 max-sm:flex-col max-sm:px-4">
          <Button
            onClick={() => toast("Feature coming soon.")}
            variant="destructive"
            className="w-full"
          >
            DELETE THIS USER
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
      </DialogContent>
    </Dialog>
  );
};

export default ManageUserModal;
