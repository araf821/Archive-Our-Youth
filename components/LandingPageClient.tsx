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
        <Link className="relative" href="/submit">
          <button
            onClick={(e) => {
              if (!userId) {
                e.preventDefault();
                onOpen("submitAuthModal");
              }
            }}
            // className="bg-black-30 relative w-56 rounded-xl border border-white px-3 py-2.5 font-semibold text-white backdrop-blur-md transition duration-200 [text-shadow:0px_0px_2px_black] hover:border-green-500 hover:bg-green-500 hover:text-black hover:[text-shadow:none] active:scale-95 max-sm:text-sm md:text-lg"
            className="group relative w-56 rounded-md bg-green-500 px-4 py-2.5 font-medium text-black transition duration-300 hover:shadow-inner hover:shadow-green-300 active:z-10 active:translate-x-1 active:translate-y-1 md:text-lg"
          >
            <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-800 transition group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="absolute inset-0 -z-10 -translate-x-0.5 -translate-y-0.5 rounded-md bg-green-300 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-green-500" />
            {/* <span className="absolute inset-0 rounded-xl transition duration-200 hover:shadow-2xl hover:shadow-green-500/60"></span> */}
            Submit A Post
          </button>
        </Link>
      </FadeInX>

      <FadeInX distance={100}>
        <Link className="relative" href="/home">
          <button className="group relative w-56 rounded-md bg-green-500 px-4 py-2.5 font-medium text-black transition duration-300 hover:shadow-inner hover:shadow-green-300 active:z-20 active:translate-x-1 active:translate-y-1 md:text-lg">
            <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-800 transition group-hover:translate-x-0 group-hover:translate-y-0" />
            <span className="absolute inset-0 -z-10 -translate-x-0.5 -translate-y-0.5 rounded-md bg-green-300 transition group-hover:translate-x-0 group-hover:translate-y-0 group-hover:bg-green-500" />
            View Submissions
          </button>
        </Link>
      </FadeInX>
    </div>
  );
};

export default LandingPageClient;
