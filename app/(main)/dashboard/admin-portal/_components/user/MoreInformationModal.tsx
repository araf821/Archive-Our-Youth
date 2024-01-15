"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Dispatch, SetStateAction } from "react";

interface MoreInformationModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
}

const MoreInformationModal = ({
  open,
  onOpenChange,
}: MoreInformationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-screen-sm rounded-2xl border-zinc-800 bg-zinc-900 py-6 shadow-md">
        <DialogHeader>
          <DialogTitle>More Information</DialogTitle>
          <DialogDescription>
            View the latest activity from this user.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MoreInformationModal;
