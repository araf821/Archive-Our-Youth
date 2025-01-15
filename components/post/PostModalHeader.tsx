"use client";

import { X } from "lucide-react";
import Link from "next/link";

interface PostModalHeaderProps {
  onClose: () => void;
  slug: string;
}

export default function PostModalHeader({
  onClose,
  slug,
}: PostModalHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onClose}
        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100"
      >
        <span className="sr-only">close modal</span>
        <X className="size-5" />
      </button>
      <div className="relative">
        <span className="bg-primary-subtle absolute inset-0 translate-x-1 translate-y-1 rounded-md"></span>
        <Link
          href={`/post/${slug}`}
          className="hover:bg-primary-dark text-text-inverted hover:text-text-primary relative z-10 flex rounded-md bg-primary px-3 py-1.5 text-center font-medium tracking-wide transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 active:translate-x-1 active:translate-y-1"
        >
          View Post
        </Link>
      </div>
    </div>
  );
}
