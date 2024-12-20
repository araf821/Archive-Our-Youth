import React from "react";
import { type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type IconType = LucideIcon | string;

interface ShareButtonProps {
  platform: string;
  icon: IconType;
  shareUrl: string;
  caption: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({
  platform,
  icon: IconComponent,
  shareUrl,
  caption,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Link
        href={shareUrl}
        title={`Share on ${platform}`}
        target="_blank"
        rel="noopener noreferrer"
        className="morph-md flex size-9 items-center justify-center rounded-full bg-zinc-800 text-zinc-300 transition hover:bg-zinc-700 sm:size-12"
      >
        {typeof IconComponent === "string" ? (
          <Image
            src={IconComponent}
            alt={platform}
            width={24}
            height={24}
            className="max-sm:size-5"
          />
        ) : (
          <IconComponent className="size-6 max-sm:size-5" strokeWidth={2.5} />
        )}
      </Link>
      <p className="mt-1 text-sm text-zinc-400 max-sm:text-xs">{caption}</p>
    </div>
  );
};

export default ShareButton;
