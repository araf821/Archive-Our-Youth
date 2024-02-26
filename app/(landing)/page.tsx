"use client";

import AnimatedGrid from "@/components/AnimatedGrid";
import LandingPageClient from "@/components/LandingPageClient";
import Image from "next/image";
import { kobata } from "../fonts";
import FadeInY from "@/components/FadeInY";
import { Fragment } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="overflow-y-hidden">
      <AnimatedGrid />
      <div className="mx-auto flex h-[100dvh] w-full flex-col items-center justify-center overflow-y-auto px-4 text-center">
        <div className="flex flex-1 flex-col items-center justify-center sm:pt-28 md:pt-40">
          {/* <FadeInY distance={-200}> */}
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
              className={`${kobata.className} neon-text relative select-none pb-8 text-center text-[4.5rem] font-semibold leading-none text-white sm:px-4 md:px-8 md:text-[5rem] lg:text-[6rem]`}
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
              Explore our youth&rsquo;s visions and creations for wellbeing.
            </motion.p>
          </motion.div>
          {/* </FadeInY> */}
          <LandingPageClient />
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
      </div>
    </div>
  );
};

export default LandingPage;
