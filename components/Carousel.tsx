import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  LogIn,
  SendHorizonal,
  Tv,
  UserPlus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { SignInButton, useAuth } from "@clerk/nextjs";

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

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <div className="flex">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={page}
          className="pointer-events-none absolute bottom-0 left-0 right-0 top-0 grid place-items-center"
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
              <p className="z-10 flex select-none flex-col gap-4 py-8 text-center font-karla text-8xl font-bold tracking-tighter text-background text-white opacity-100 md:text-[10rem]">
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
              <p className="text-center text-lg text-white">
                Note: This is just the first iteration of deployment. Things may
                and will most likely break!
              </p>
            </div>
          )}

          {page === 3 && (
            <div className="pointer-events-auto mx-4 flex max-w-screen-sm flex-col items-center justify-center gap-6 rounded-lg bg-black/30 px-4 py-8 text-center backdrop-blur-sm">
              <p className="w-fit font-karla text-4xl font-bold text-white ">
                Let&rsquo;s get started!
              </p>

              <div className="flex w-full flex-col gap-4">
                <div className="space-y-4">
                  <>
                    <Link
                      href="/submit"
                      className="group flex w-full justify-between rounded-sm bg-gradient-to-tr from-red-600 to-rose-500 px-4 py-2 text-white shadow-[0_0_10px] shadow-rose-600/50 transition hover:bg-rose-600 hover:shadow-[0_0_25px_2px] hover:shadow-rose-500/50"
                    >
                      {!userId ? (
                        <SignInButton afterSignInUrl="/submit">
                          Submit A Post
                        </SignInButton>
                      ) : (
                        "Submit A Post"
                      )}
                      <SendHorizonal className="transition group-hover:translate-x-2" />
                    </Link>
                    <Link
                      href="/collage"
                      className="group flex w-full justify-between rounded-sm border border-white px-4 py-2 text-white transition hover:bg-zinc-100 hover:text-black"
                    >
                      View All Submissions
                      <Tv className="transition group-hover:translate-x-2" />
                    </Link>
                  </>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="fixed bottom-20 left-0 right-0 z-10 flex justify-center gap-40 md:bottom-36">
        {page > 1 && (
          <button
            className="next"
            onClick={() => (page === 1 ? null : paginate(-1))}
          >
            <ArrowLeft className="h-16 w-16 text-white" />
          </button>
        )}
        {page < 3 && (
          <button
            className="prev"
            onClick={() => (page === 3 ? null : paginate(1))}
          >
            <ArrowRight className="h-16 w-16 text-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
