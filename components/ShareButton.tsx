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
      className="flex items-center gap-1 text-zinc-300 transition duration-200 hover:text-green-500"
    >
      <Share className="size-5" /> Share
    </button>
  );
};

export default ShareButton;
