"use client";

import { FC } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface FadeInYProps {
  children: React.ReactNode;
  distance?: number;
  classNames?: string;
}

const FadeInY: FC<FadeInYProps> = ({ classNames, distance = 0, children }) => {
  return (
    <motion.div
      className={cn(classNames)}
      initial={{ opacity: 0, y: distance }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.3,
          delay: 0.1,
          type: "spring",
          damping: 15,
          stiffness: 200,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInY;
