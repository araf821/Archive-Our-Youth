import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { FC, useState } from "react";

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

enum STEPS {
  TITLE = 1,
  DESCRIPTION = 2,
  WELCOME = 3,
}

const Carousel = ({}) => {
  const [[page, direction], setPage] = useState([1, 0]);

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
            <p className="text-8xl font-bold text-white">didigigiggi</p>
          )}

          {page === 2 && (
            <p className="text-8xl font-bold text-white">DESCRIPTION</p>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-36 left-0 right-0 flex justify-center gap-40">
        <button
          className="next"
          onClick={() => (page === 1 ? null : paginate(-1))}
        >
          <ArrowLeft className="h-16 w-16 text-white" />
        </button>
        <button
          className="prev"
          onClick={() => (page === 2 ? null : paginate(1))}
        >
          <ArrowRight className="h-16 w-16 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
