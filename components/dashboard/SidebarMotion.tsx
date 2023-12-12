"use client";

import { motion } from "framer-motion";
import { FC, useEffect, useState } from "react";

interface SidebarMotionProps {
  children: React.ReactNode;
}

const SidebarMotion: FC<SidebarMotionProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 1, transition: { duration: 0.3 } }}
    >
      {children}
    </motion.div>
  );
};

export default SidebarMotion;
