"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  label?: string;
  classNames?: string;
}

const BackButton: FC<BackButtonProps> = ({ classNames, label }) => {
  const router = useRouter();

  /**
   * <Link
              prefetch={false}
              href={`/post/${post.slug}`}
              className="relative z-10 flex rounded-md bg-green-500 px-2 py-1 text-center font-medium tracking-wide text-zinc-950 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-green-600 active:translate-x-1 active:translate-y-1"
            >
              View Post
            </Link>
   */

  return (
    <div className="relative w-fit">
      <button
        onClick={() => router.back()}
        className={cn(
          "relative z-10 min-w-[96px] rounded-md bg-zinc-800 px-3 py-1.5 font-medium tracking-wide text-zinc-200 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-zinc-700 hover:text-white active:translate-x-1 active:translate-y-1",
          classNames,
        )}
      >
        {label ? label : "Back"}
      </button>
      <span className="absolute inset-0 translate-x-1 translate-y-1 rounded-md bg-zinc-950"></span>
    </div>
  );
};

export default BackButton;
