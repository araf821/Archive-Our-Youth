"use client";

import { kobata } from "@/app/fonts";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface LandingPageClientProps {}

const LandingPageClient: FC<LandingPageClientProps> = ({}) => {
  const router = useRouter();
  const { userId } = useAuth();
  const { onOpen } = useModal();

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-screen-xl flex-col items-center justify-center px-4 text-center">
      <div className="mt-16 flex flex-1 flex-col items-center justify-center">
        <p
          className={`${kobata.className} neon-text relative select-none pb-8 text-center text-[5rem] font-semibold leading-none text-white sm:px-4 md:px-8 md:text-[6rem] lg:text-[7rem]`}
        >
          Archive Our Youth
        </p>
        <p className="mx-4 rounded-sm px-1.5 py-0.5 text-xl font-medium tracking-wide text-white [text-shadow:0px_0px_2px_black] max-md:text-lg">
          Explore our youth&rsquo;s visions and creations for wellbeing.
        </p>
        {/* buttons */}
        <div className="flex gap-16 pb-8 pt-12 max-xl:gap-12 max-lg:gap-8 max-md:flex-col max-md:gap-4 md:flex-row-reverse">
          <Link className="relative" href="/submit">
            <button
              onClick={(e) => {
                if (!userId) {
                  e.preventDefault();
                  onOpen("submitAuthModal");
                }
              }}
              className="bg-black-30 relative w-56 rounded-xl border-2 border-white px-3 py-2.5 font-semibold text-white backdrop-blur-md transition duration-200 [text-shadow:0px_0px_2px_black] hover:border-green-500 hover:bg-green-500 hover:text-black hover:[text-shadow:none] active:scale-95 md:text-lg"
            >
              <span className="absolute inset-0 rounded-xl transition duration-200 hover:shadow-2xl hover:shadow-green-500/60"></span>
              Submit A Post
            </button>
          </Link>

          <Link
            href="/home"
            className="bg-black-30 relative w-56 rounded-xl border-2 border-white px-3 py-2.5 font-semibold text-white backdrop-blur-md transition duration-200 [text-shadow:0px_0px_2px_black] hover:border-green-500 hover:bg-green-500 hover:text-black hover:[text-shadow:none] active:scale-95 md:text-lg"
          >
            <span className="absolute inset-0 rounded-xl transition duration-200 hover:shadow-2xl hover:shadow-green-500/60"></span>
            View Submissions
          </Link>
        </div>
      </div>

      {/* Landing page footer */}
      <div className="flex h-fit w-full max-w-3xl items-center justify-center gap-8 overflow-hidden rounded-t-3xl px-4 pb-8 md:pb-16">
        <div className="relative mx-auto aspect-video w-full max-w-[250px]">
          <Image
            src="/ylrl-logo.svg"
            alt="ylrl logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-[250px]">
          <Image
            src="/york-logo.svg"
            alt="york logo"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPageClient;
