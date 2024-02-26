"use client";

import { useModal } from "@/hooks/useModal";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { FC } from "react";
import FadeInX from "./FadeInX";

interface LandingPageClientProps {}

const LandingPageClient: FC<LandingPageClientProps> = ({}) => {
  const { userId } = useAuth();
  const { onOpen } = useModal();

  return (
    <div className="flex gap-16 pb-8 pt-12 max-xl:gap-12 max-lg:gap-8 max-md:flex-col max-md:gap-4">
      <FadeInX distance={-100}>
        <Link className="relative block" href="/submit">
          <button
            onClick={(e) => {
              if (!userId) {
                e.preventDefault();
                onOpen("submitAuthModal");
              }
            }}
            className={
              "relative w-56 rounded-md bg-green-500 px-4 py-2.5 font-medium tracking-wide text-zinc-800 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-black active:translate-x-1 active:translate-y-1 md:text-lg"
            }
          >
            Submit A Post
          </button>
          <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-950" />
        </Link>
      </FadeInX>

      <FadeInX distance={100}>
        <Link className="relative block" href="/home">
          <button
            className={
              "relative w-56 rounded-md bg-green-500 px-4 py-2.5 font-medium tracking-wide text-zinc-800 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-black active:translate-x-1 active:translate-y-1 md:text-lg"
            }
          >
            View Submissions
          </button>
          <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-950" />
        </Link>
      </FadeInX>
    </div>
  );
};

export default LandingPageClient;
