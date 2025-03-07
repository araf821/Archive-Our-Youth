import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModal";
import { kobata } from "@/app/fonts";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Carousel = ({}) => {
  const [[slide, direction], setSlide] = useState([1, 0]);
  const router = useRouter();
  const { userId } = useAuth();
  const { onOpen } = useModal();

  const paginate = (newDirection: number) => {
    setSlide([slide + newDirection, newDirection]);
  };

  let slide1, slide2, slide3, slide4;

  slide1 = (
    <div className="max-w-screen-lg">
      <p
        className={`${kobata.className} neon-text relative z-10 my-8 flex select-none flex-col gap-4 py-16 text-center text-[5rem] font-semibold leading-none text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:top-0 after:-z-20 after:my-auto after:hidden after:origin-right after:scale-x-0 after:bg-primary-dark after:transition after:duration-300 hover:after:origin-left hover:after:scale-x-100 sm:px-4 md:px-8 md:text-[6rem] lg:text-[7rem]`}
      >
        Archive Our Youth
      </p>
    </div>
  );

  slide2 = (
    <div className="mx-4 flex max-w-screen-sm flex-col items-center justify-center gap-3 rounded-lg bg-black/40 p-4 backdrop-blur-sm md:p-8">
      <p className="text-center text-lg font-semibold text-zinc-100 max-md:text-base">
        Welcome to{" "}
        <span className="font-bold text-green-500">Archive Our Youth</span> on
        Youth and Planetary Wellbeing! You&rsquo;re invited to contribute to the
        Archive and/or explore the multimedia and artifacts preserved here.
      </p>
      <p className="text-center text-lg font-semibold text-zinc-100 max-md:text-base">
        The <span className="font-bold text-green-500">Archive</span> explores
        dream futures, perspectives on wellbeing, and resources both real and
        desired that support personal to planetary wellbeing. We welcome youth,
        youth groups and engaged collectives from all over the world to
        contribute!
      </p>
    </div>
  );

  slide3 = (
    <div className="mx-4 flex max-w-screen-sm flex-col items-center justify-center gap-3 rounded-lg bg-black/40 p-4 backdrop-blur-sm md:p-8">
      <p className="text-center text-lg font-semibold text-zinc-100 max-md:text-base">
        <span className="font-bold text-green-500">Archive Our Youth</span> was
        launched as part of the international research study: Partnership for
        Youth and Planetary Wellbeing, led by the{" "}
        <a
          className="font-bold text-blue-400 underline"
          href="https://younglivesresearch.org"
          target="_blank"
        >
          Young Lives Research Lab
        </a>
        , and 4 Youth Advisory Councils (YACs) in Canada, Chile, Costa Rica and
        Belize.
      </p>
      <p className="text-center text-lg font-semibold text-zinc-100 max-md:text-base">
        The Archive was launched in the Fall of 2023 by Canada&rsquo;s YAC, but
        the submission portal remains open for continual submissions.
      </p>
      <button
        onClick={() => {
          if (!userId) {
            onOpen("submitAuthModal");
          } else {
            router.push("/submit");
          }
        }}
        className="relative mt-2 w-full rounded-md border-2 border-green-500 bg-primary/20 px-4 py-2 font-semibold text-green-500 shadow-[inset_0_0_10px] shadow-green-500 backdrop-blur-sm transition [text-shadow:0_0_4px_black] before:absolute before:inset-0 before:transition before:duration-200 before:content-[''] before:hover:shadow-[0_0_20px_2px] before:hover:shadow-green-500/75 md:text-lg"
      >
        Submit A Post
      </button>
    </div>
  );

  slide4 = (
    <div className="pointer-events-auto flex w-full flex-col items-center justify-center gap-10 text-center">
      <p
        className={cn(
          "neon-text text-6xl font-semibold uppercase tracking-widest text-white md:text-7xl lg:text-8xl",
          kobata.className,
        )}
      >
        WELCOME
      </p>
      {/* <WelcomeText /> */}
      {/* <p className="-mt-6 font-bold text-white [text-shadow:0px_0px_2px_black] md:text-lg">
        Let&rsquo;s <span className="text-green-500">dive</span> in!
      </p> */}

      <div className="flex w-full max-w-xl items-center max-md:flex-col max-md:gap-4 md:justify-between">
        <button
          onClick={() => router.push("/home")}
          className="relative w-64 rounded-md border-2 border-white bg-white/20 px-4 py-2 font-semibold text-white shadow-[inset_0_0_10px] shadow-white backdrop-blur-md transition [text-shadow:0_0_4px_black] before:absolute before:inset-0 before:transition before:duration-200 before:content-[''] before:hover:shadow-[0_0_20px_2px] md:text-lg"
        >
          View Submissions
        </button>
        <button
          onClick={() => {
            if (!userId) {
              onOpen("submitAuthModal");
            } else {
              router.push("/submit");
            }
          }}
          className="relative w-64 rounded-md border-2 border-green-500 bg-primary/20 px-4 py-2 font-semibold text-green-500 shadow-[inset_0_0_10px] shadow-green-500 backdrop-blur-sm transition [text-shadow:0_0_4px_black] before:absolute before:inset-0 before:transition before:duration-200 before:content-[''] before:hover:shadow-[0_0_20px_2px] before:hover:shadow-green-500/75 md:text-lg"
        >
          Submit A Post
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[90vh]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide}
          className="absolute bottom-0 left-0 right-0 top-0 grid place-items-center px-4"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 25 },
            opacity: { duration: 0.2 },
          }}
        >
          {slide === 1 ? slide1 : null}
          {slide === 2 ? slide2 : null}
          {slide === 3 ? slide3 : null}
          {slide === 4 ? slide4 : null}
        </motion.div>
      </AnimatePresence>
      <div className="z-20 mb-10 mt-auto space-x-28 md:mb-20 md:space-x-40">
        {slide > 1 && (
          <button
            className="next rounded-full bg-black/40 p-1.5 text-zinc-400 transition duration-300 hover:bg-background-muted hover:text-white active:scale-90"
            onClick={() => (slide === 1 ? null : paginate(-1))}
          >
            <ArrowLeftCircle
              strokeWidth={1}
              className="small-on-landscape h-12 w-12 text-white"
            />
          </button>
        )}
        {slide < 4 && (
          <button
            className="prev rounded-full bg-black/40 p-1.5 text-zinc-400 transition duration-300 hover:bg-background-muted hover:text-white active:scale-90"
            onClick={() => (slide === 4 ? null : paginate(1))}
          >
            <ArrowRightCircle
              strokeWidth={1}
              className="small-on-landscape h-12 w-12 text-white"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
