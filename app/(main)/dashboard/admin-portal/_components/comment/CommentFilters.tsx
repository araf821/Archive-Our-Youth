"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

interface CommentFiltersProps {}

const CommentFilters = ({}: CommentFiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 px-4 max-[500px]:grid-cols-2">
      <button
        onClick={() => router.push("comments")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider transition hover:bg-zinc-700 active:scale-90 max-md:text-sm",
          searchParams.get("type") === null &&
            "bg-green-500 text-black hover:bg-green-500",
        )}
      >
        Comments
      </button>
      <button
        onClick={() => router.push("?type=replies")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider  transition hover:bg-zinc-700 active:scale-90 max-md:text-sm",
          searchParams.get("type") === "replies" &&
            "bg-green-500 text-black hover:bg-green-500",
        )}
      >
        Replies
      </button>
      <button
        onClick={() => router.push("?type=deleted")}
        className={cn(
          "rounded-xl bg-[#2f2f2f] px-3 py-1.5 font-medium uppercase tracking-wider  transition hover:bg-zinc-700 active:scale-90 max-md:text-sm max-[500px]:col-span-2",
          searchParams.get("type") === "deleted" &&
            "bg-green-500 text-black hover:bg-green-500",
        )}
      >
        Deleted
      </button>
    </div>
  );
};

export default CommentFilters;
