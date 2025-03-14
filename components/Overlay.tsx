"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const backgroundColors = [
  "bg-[#00294C]",
  "bg-[#007190]",
  "bg-[#347F75]",
  "bg-[#68AEA3]",
  "bg-[#C1E9E6]",
  "bg-[#F5DEC7]",
  "bg-[#FFD9B5]",
  "bg-[#FFA573]",
  "bg-[#F86641]",
  "bg-[#651309]",
  "bg-[#AB1E10]",
  "bg-[#D3232A]",
  "bg-[#DA503E]",
  "bg-[#FD7361]",
  "bg-[#E1AE82]",
  "bg-[#FFC466]",
  "bg-[#CDD6CB]",
  "bg-[#FD9747]",
  "bg-[#1AA5D0]",
  "bg-[#005371]",
  "bg-[#69D1E7]",
  "bg-[#CDEEF4]",
  "bg-[#6ABB7D]",
  "bg-[#2B906D]",
  "bg-[#F8FDE9]",
  "bg-[#AED0B0]",
  "bg-[#456034]",
  "bg-[#456034]",
  "bg-[#F7B545]",
  "bg-[#344860]",
];

interface OverlayProps {
  // onClose: () => void;
}

const Overlay: FC<OverlayProps> = (
  {
    // onClose
  },
) => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  const randomBackgroundColor = backgroundColors[randomIndex];

  return (
    // <motion.button
    //   initial={{ opacity: 0 }}
    //   exit={{ opacity: 0 }}
    //   animate={{ opacity: 1, transition: { duration: 0.5 } }}
    //   onClick={onClose}
    //   aria-label="overlay button"
    //   className={cn(
    //     "group absolute left-0 top-0 z-20 h-full w-full outline outline-white transition hover:opacity-20 focus-visible:outline-4 focus-visible:-outline-offset-8",
    //     randomBackgroundColor,
    //   )}
    // >
    //   <span className="sr-only">overlay</span>
    //   <span className="font-medium opacity-0 mix-blend-darken transition duration-1000 group-hover:opacity-30">
    //     Click To Reveal
    //   </span>
    // </motion.button>
    <span className={cn("absolute inset-0", randomBackgroundColor)} />
  );
};

export default Overlay;
