"use client";

import { useModal } from "@/hooks/useModal";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import FadeInX from "./FadeInX";
import { motion } from "framer-motion";
import { kobata } from "@/app/fonts";
import Image from "next/image";
import FadeInY from "./FadeInY";

interface LandingPageClientProps {}

const LandingPageClient: FC<LandingPageClientProps> = ({}) => {
  const { user } = useUser();
  const { onOpen } = useModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center sm:pt-28 md:pt-40">
        <motion.div className="overflow-hidden">
          <motion.h1
            initial={{ y: 50, opacity: 0, scale: 0.5 }}
            whileInView={{
              y: 0,
              opacity: 1,
              scale: 1,
              transition: { duration: 0.5 },
            }}
            viewport={{ once: true }}
            className={`${kobata.className} relative select-none pb-8 text-center text-[4.5rem] font-semibold leading-none text-white [text-shadow:2px_7px_5px_#000] sm:px-4 md:px-8 md:text-[5rem] lg:text-[6rem]`}
          >
            Archive
            <br className="hidden max-md:block" /> Our
            <br className="hidden max-md:block" /> Youth
          </motion.h1>
          <motion.p
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1, transition: { duration: 0.75 } }}
            viewport={{ once: true }}
            className="mx-4 rounded-sm px-1.5 py-0.5 text-lg font-medium tracking-wide text-white [text-shadow:0px_0px_2px_black] max-md:text-base"
          >
            Explore, Share, Inspire: Youth Perspectives on Wellbeing in the
            Digital Age
          </motion.p>
        </motion.div>
        <div className="flex gap-16 pb-8 pt-12 max-xl:gap-12 max-lg:gap-8 max-md:flex-col max-md:gap-4">
          <FadeInX distance={-100}>
            <Link
              onClick={(e) => {
                if (!user) {
                  e.preventDefault();
                  onOpen("submitAuthModal");
                }
              }}
              className="relative block"
              href="/submit"
            >
              <div className="w-56 rounded-md bg-primary px-4 py-2.5 font-medium tracking-wide text-zinc-800 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-black active:translate-x-1 active:translate-y-1 md:text-lg ">
                Submit A Post
              </div>
              <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-950" />
            </Link>
          </FadeInX>

          <FadeInX distance={100}>
            <Link className="relative block" href="/home">
              <div
                className={
                  "relative w-56 rounded-md bg-primary px-4 py-2.5 font-medium tracking-wide text-zinc-800 transition duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-black active:translate-x-1 active:translate-y-1 md:text-lg"
                }
              >
                View Submissions
              </div>
              <span className="absolute inset-0 -z-10 translate-x-1 translate-y-1 rounded-md bg-green-950" />
            </Link>
          </FadeInX>
        </div>
      </div>
      {/* Landing page footer */}
      <FadeInY
        distance={100}
        classNames="flex h-fit w-full max-w-3xl items-center justify-center gap-8 rounded-t-3xl px-4 pb-8 md:pb-16"
      >
        <Link
          href={"https://www.younglivesresearch.org"}
          target="_blank"
          className="relative mx-auto aspect-video w-full max-w-[250px]"
        >
          <Image
            src="/ylrl-logo.svg"
            alt="ylrl logo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 150px, 250px"
          />
        </Link>
        <Link
          href={"https://www.yorku.ca/edu/"}
          target="_blank"
          className="relative mx-auto aspect-video w-full max-w-[250px]"
        >
          <Image
            src="/york-logo.svg"
            alt="york logo"
            fill
            priority
            className="object-contain"
            sizes="(max-width: 768px) 150px, 25vw"
          />
        </Link>
      </FadeInY>
    </>
  );
};

export default LandingPageClient;
