"use client";

import { kobata } from "@/app/fonts";
import { useModal } from "@/hooks/useModal";
import { useAuth } from "@clerk/nextjs";
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
        <p className="mx-4 rounded-sm bg-black/30 px-1.5 py-0.5 max-md:text-sm text-zinc-50">
          Fueling our youth&rsquo;s creativity for a brighter future through a
          dynamic digital archive.
        </p>
        {/* buttons */}
        <div className="flex flex-col gap-4 pb-8 pt-12">
          <Link href="/submit">
            <button
              onClick={(e) => {
                if (!userId) {
                  e.preventDefault();
                  onOpen("submitAuthModal");
                }
              }}
              className="relative w-56 rounded-xl border border-green-500 bg-black/20 px-3 py-1.5 font-semibold text-green-500 backdrop-blur-md transition duration-200 hover:bg-green-500 hover:text-black active:scale-95 md:text-lg"
            >
              <span className="absolute inset-0 rounded-xl transition duration-200 hover:shadow-2xl hover:shadow-green-500/60"></span>
              Submit A Post
            </button>
          </Link>

          <Link href="/home">
            <button
              //   onClick={(e) => e.preventDefault()}
              className="relative w-56 rounded-xl border border-green-500 bg-black/20 px-3 py-1.5 font-semibold text-green-500 backdrop-blur-md transition duration-200 hover:bg-green-500 hover:text-black active:scale-95 md:text-lg"
            >
              <span className="absolute inset-0 rounded-xl transition duration-200 hover:shadow-2xl hover:shadow-green-500/60"></span>
              View Submissions
            </button>
          </Link>
        </div>
      </div>

      {/* Landing page footer */}
      <div className="flex h-fit w-full max-w-3xl items-center justify-center gap-8 overflow-hidden rounded-t-3xl px-4 pb-8 md:pb-16">
        <div className="relative mx-auto aspect-video w-full max-w-[300px]">
          <Image
            src="/ylrl-logo.svg"
            alt="ylrl logo"
            fill
            className="object-contain"
          />
        </div>
        <div className="relative mx-auto aspect-video w-full max-w-[300px]">
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
