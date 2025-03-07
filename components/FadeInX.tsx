"use client";

import { FC } from "react";
import { motion } from "framer-motion";

interface FadeInXProps {
  children: React.ReactNode;
  distance?: number;
}

const FadeInX: FC<FadeInXProps> = ({ distance = 0, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: distance }}
      whileInView={{
        opacity: 1,
        x: 0,
        transition: {
          duration: 0.3,
          delay: 0.1,
          type: "spring",
          damping: 15,
          stiffness: 200,
        },
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInX;
