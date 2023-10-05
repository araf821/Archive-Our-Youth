"use client";

import { motion } from "framer-motion";
import { FC } from "react";

interface PageTransitionContainerProps {
  children: React.ReactNode;
}

const PageTransitionContainer: FC<PageTransitionContainerProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3 }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransitionContainer;
