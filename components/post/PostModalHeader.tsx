"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";

interface PostModalHeaderProps {
  onClose: () => void;
  slug: string;
}

export default function PostModalHeader({
  onClose,
  slug,
}: PostModalHeaderProps) {
  const t = useTranslations("PostModal");

  return (
    <div className="flex items-center justify-between">
      <button
        onClick={onClose}
        className="rounded-md p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800/80 hover:text-zinc-100"
      >
        <span className="sr-only">{t("header.closeModal")}</span>
        <X className="size-5" />
      </button>
      <div className="relative">
        <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-primary-subtle"></span>
        <Link
          href={`/post/${slug}`}
          className="relative z-10 flex rounded-md bg-primary px-3 py-1.5 text-center font-medium tracking-wide text-text-inverted transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-primary-dark hover:text-text-primary focus-visible:-translate-x-0.5 focus-visible:-translate-y-0.5 active:translate-x-1 active:translate-y-1"
        >
          {t("header.viewPost")}
        </Link>
      </div>
    </div>
  );
}
