"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

interface CommentFiltersProps {}

const CommentFilters = ({}: CommentFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 px-4 max-[500px]:grid-cols-2">
      <button
        onClick={() => router.push("comments")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider transition hover:bg-background-surface active:scale-90 max-md:text-sm max-[500px]:col-span-2",
          searchParams.get("type") === null &&
            "bg-primary text-black hover:bg-primary",
        )}
      >
        Comments
      </button>
      <button
        onClick={() => router.push("?type=replies")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider transition hover:bg-background-surface active:scale-90 max-md:text-sm",
          searchParams.get("type") === "replies" &&
            "bg-primary text-black hover:bg-primary",
        )}
      >
        Replies
      </button>
      <button
        onClick={() => router.push("?type=deleted")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider transition hover:bg-background-surface active:scale-90 max-md:text-sm",
          searchParams.get("type") === "deleted" &&
            "bg-primary text-black hover:bg-primary",
        )}
      >
        Deleted
      </button>
    </div>
  );
};

export default CommentFilters;
