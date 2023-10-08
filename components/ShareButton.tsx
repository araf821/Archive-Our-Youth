"use client";

import { useModal } from "@/hooks/useModal";
import { Share } from "lucide-react";
import { FC } from "react";

interface ShareButtonProps {
  link: string;
}

const ShareButton: FC<ShareButtonProps> = ({}) => {
  const { onOpen } = useModal();

  return (
    <button
      onClick={() => onOpen("shareModal")}
      className="flex items-center gap-1 text-emerald-500"
    >
      <Share className="h-5 w-5" /> Share
    </button>
  );
};

export default ShareButton;
