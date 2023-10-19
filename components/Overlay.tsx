"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { FC } from "react";

const backgroundColors = [
  // "bg-gradient-to-r from-green-300 via-yellow-300 to-pink-300",
  // "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200",
  // "bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400",
  // "bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500",
  // "bg-gradient-to-r from-yellow-200 via-pink-200 to-pink-400",
  // "bg-gradient-to-r from-fuchsia-500 via-red-600 to-orange-400",
  // "bg-gradient-to-r from-orange-400 to-rose-400",
  // "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500",
  // "bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-rose-500 to-indigo-700",
  // "bg-gradient-to-b from-gray-900 via-purple-900 to-violet-600",
  // "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800",
  // "bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900",
  // "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-300 via-fuchsia-600 to-orange-600",

  //   "bg-gradient-to-br from-amber-500 to to-yellow-700",
  //   "bg-gradient-to-bl from-sky-500 to to-sky-700",
  //   "bg-gradient-to-tr from-rose-500 to to-rose-700",
  //   "bg-gradient-to-tl from-indigo-500 to to-indigo-700",
  //   "bg-gradient-to-br from-emerald-500 to to-emerald-700",
  //   "bg-gradient-to-bl from-pink-500 to to-pink-700",
  //   "bg-gradient-to-tr from-blue-500 to to-teal-700",
  "bg-sky-600",
  "bg-rose-600",
  "bg-indigo-600",
  "bg-blue-600",
  "bg-pink-600",
  "bg-lime-600",
  "bg-teal-600",
  "bg-red-600",
  "bg-green-600",
  "bg-emerald-600",
  "bg-purple-600",
];

interface OverlayProps {
  onClose: () => void;
}

const Overlay: FC<OverlayProps> = ({ onClose }) => {
  const randomIndex = Math.floor(Math.random() * backgroundColors.length);
  const randomBackgroundColor = backgroundColors[randomIndex];

  return (
    <motion.button
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.5 } }}
      onClick={onClose} // Call the provided callback to close the overlay.
      className={cn(
        "absolute left-0 top-0 z-20 h-full w-full",
        randomBackgroundColor,
      )}
    />
  );
};

export default Overlay;
