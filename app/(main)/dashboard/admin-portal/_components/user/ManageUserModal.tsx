"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { User, UserType } from "@prisma/client";
import Link from "next/link";
import { useState } from "react";
import ConfirmDeletion from "./ConfirmDeletion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { updateUserRole } from "@/actions/update-user";
import { toast } from "sonner";

interface ManageUserModalProps {
  user: User;
  open: boolean;
  onOpenChange: () => void;
}

const ManageUserModal = ({
  user,
  open,
  onOpenChange,
}: ManageUserModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentRole, setCurrentRole] = useState(user.role);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-sm rounded-2xl border-background-surface bg-[#1c1c1c] py-6 shadow-md focus:outline-none">
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
        <hr className="border-background-surface" />

        <div className="grid grid-cols-2 items-center justify-between gap-8 max-md:px-4 sm:grid-cols-3">
          <p className="w-full text-zinc-200 sm:col-span-2">Current Role</p>
          <Select
            disabled={user.role === "ADMIN"}
            value={currentRole}
            onValueChange={(value) => setCurrentRole(value as UserType)}
          >
            <SelectTrigger className="bg-zinc-800 font-medium">
              {currentRole}
            </SelectTrigger>
            <SelectContent className="border-background-surface bg-zinc-800 text-zinc-200">
              <SelectItem value={UserType.MEMBER}>MEMBER</SelectItem>
              <SelectItem value={UserType.ADMIN}>ADMIN</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <hr className="border-background-surface max-md:px-4" />

        {isDeleting ? (
          <ConfirmDeletion
            cancel={() => setIsDeleting(false)}
            userId={user.id}
            imageUrl={user.imageUrl!}
          />
        ) : currentRole !== user.role ? (
          <>
            <p className="font-medium text-red-500 max-md:text-sm">
              You have unsaved changes.
            </p>
            <div className="flex w-full gap-4 max-sm:flex-col max-sm:px-4">
              <Button
                onClick={() => setCurrentRole(user.role)}
                variant="ghost"
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={async () => {
                  await updateUserRole(currentRole, user.id)
                    .then((data) => {
                      if (data.error) toast.error(data.error);
                      if (data.success) {
                        onOpenChange();
                        toast.success(data.success);
                      }
                    })
                    .catch(() => {
                      toast.error("Something went wrong.");
                    });
                }}
                variant="outline"
                className="w-full"
              >
                Save Changes
              </Button>
            </div>
          </>
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
