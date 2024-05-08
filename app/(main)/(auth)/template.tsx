"use client";

import { motion } from "framer-motion";

type Props = {
  children: React.ReactNode;
};

const template = ({ children }: Props) => {
  return (
    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }}>
      {children}
    </motion.div>
  );
};
export default template;
