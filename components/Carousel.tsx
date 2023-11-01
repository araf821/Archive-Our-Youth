import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowLeftCircle,
  ArrowRight,
  ArrowRightCircle,
  LogIn,
  SendHorizonal,
  Tv,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useModal } from "@/hooks/useModal";

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
  const [[page, direction], setPage] = useState([1, 0]);
  const { userId } = useAuth();
  const { onOpen } = useModal();

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex h-[90vh]">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 grid place-items-center px-4"
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
        >
          {page === 1 && (
            <div className="max-w-screen-sm rounded-lg p-8">
              <p className="z-10 flex select-none flex-col gap-4 py-8 text-center font-karla text-[5rem] font-bold leading-none tracking-tighter text-background text-white opacity-100 md:text-[6rem] lg:text-[7rem]">
                Digital
                <span>Archive</span>
              </p>
            </div>
          )}

          {page === 2 && (
            <div className="mx-4 flex max-w-screen-sm flex-col items-center justify-center gap-3 rounded-lg bg-black/30 px-4 py-4 backdrop-blur-sm">
              <p className="w-fit font-karla text-4xl font-bold text-white ">
                Our Story
              </p>
              <p className="text-center text-lg font-semibold text-white">
                Welcome to the Digital Archive on Youth and Planetary Wellbeing!
                You&rsquo;re invited to contribute to the Archive and/or explore
                the multimedia and artifacts preserved here.
              </p>
              <p className="text-center text-lg font-semibold text-white">
                The Digital Archive explores dream futures, perspectives on
                wellbeing, and resources both real and desired that support
                personal to planetary wellbeing. We welcome youth, youth groups
                and engaged collectives from all over the world to contribute!
              </p>
            </div>
          )}

          {page === 3 && (
            <div className="mx-4 flex max-w-screen-sm flex-col items-center justify-center gap-3 rounded-lg bg-black/30 px-4 py-4 backdrop-blur-sm">
              <p className="w-fit font-karla text-4xl font-bold text-white ">
                Our Story
              </p>
              <p className="text-center text-lg font-semibold text-white">
                The Digital Archive was launched as part of the international
                research study: Partnership for Youth and Planetary Wellbeing,
                led by the Young Lives Research Lab, and 4 Youth Advisory
                Councils (YACs) in Canada, Chile, Costa Rica and Belize.
              </p>
              <p className="text-center text-lg font-semibold text-white">
                The Archive was launched in the Fall of 2023 by Canada&rsquo;s
                YAC, but the submission portal remains open for continual
                submissions.
              </p>
            </div>
          )}

          {page === 4 && (
            <div className="pointer-events-auto flex w-full max-w-sm flex-col items-center justify-center gap-2 rounded-sm bg-black/60 px-6 py-12 text-center backdrop-blur-sm">
              <p className="w-fit font-karla text-4xl font-bold text-white ">
                Let&rsquo;s explore!
              </p>
              <p className="text-zinc-300 text-sm">
                Dive right in and showcase what you want or take a look at what
                others have posted!
              </p>

              <div className="mt-4 w-full space-y-4">
                <>
                  {userId ? (
                    <Link
                      href="/submit"
                      className="group flex w-full justify-between rounded-sm bg-gradient-to-tr from-red-600 to-rose-500 px-4 py-2 text-white shadow-[0_0_10px] shadow-rose-600/50 transition hover:bg-rose-600 hover:shadow-[0_0_25px_2px] hover:shadow-rose-500/50"
                    >
                      Submit A Post
                      <SendHorizonal className="transition group-hover:translate-x-2" />
                    </Link>
                  ) : (
                    <button
                      onClick={() => onOpen("submitAuthModal")}
                      className="group flex w-full justify-between rounded-sm bg-gradient-to-tr from-red-600 to-rose-500 px-4 py-2 text-white shadow-[0_0_10px] shadow-rose-600/50 transition hover:bg-rose-600 hover:shadow-[0_0_25px_2px] hover:shadow-rose-500/50"
                    >
                      Submit A Post
                      <SendHorizonal className="transition group-hover:translate-x-2" />
                    </button>
                  )}
                  <Link
                    href="/home"
                    className="group flex w-full justify-between rounded-sm border border-white px-4 py-2 text-white transition hover:bg-zinc-100 hover:text-black"
                  >
                    View All Submissions
                    <Tv className="transition group-hover:translate-x-2" />
                  </Link>
                </>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="carousel-btn-container z-20 order-last mt-auto space-x-28 md:mb-20 md:space-x-40">
        {page > 1 && (
          <button
            className="next"
            onClick={() => (page === 1 ? null : paginate(-1))}
          >
            <ArrowLeftCircle className="small-on-landscape h-16 w-16 text-white" />
          </button>
        )}
        {page < 4 && (
          <button
            className="prev"
            onClick={() => (page === 4 ? null : paginate(1))}
          >
            <ArrowRightCircle className="small-on-landscape h-16 w-16 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
