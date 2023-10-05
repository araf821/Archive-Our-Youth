"use client";

import { Share } from "lucide-react";
import { FC, useState } from "react";

interface ShareButtonProps {
  link: string;
}

const ShareButton: FC<ShareButtonProps> = ({}) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {};

  return (
    <button className="flex items-center gap-1 text-emerald-500">
      {clicked ? null : (
        <>
          <Share className="h-5 w-5" /> Share
        </>
      )}
    </button>
  );
};

export default ShareButton;
