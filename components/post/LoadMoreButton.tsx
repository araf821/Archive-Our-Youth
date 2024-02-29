"use client";

import { useRouter } from "next/navigation";

interface LoadMoreButtonProps {
  page: number;
  hasMore: boolean;
}

const LoadMoreButton = ({ page, hasMore }: LoadMoreButtonProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() =>
        hasMore && router.push(`?page=${page + 1}`, { scroll: false })
      }
      className="mx-auto w-fit font-medium text-zinc-400 transition hover:text-white max-md:text-sm"
    >
      ~ Load more ~
    </button>
  );
};

export default LoadMoreButton;
