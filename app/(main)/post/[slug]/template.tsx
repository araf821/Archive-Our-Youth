"use client";

import { motion } from "framer-motion";

interface templateProps {
  children: React.ReactNode;
}

const template = ({ children }: templateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.3, origin: "top" }}
      animate={{
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

export default template;
