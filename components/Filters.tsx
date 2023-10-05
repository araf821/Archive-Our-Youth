import { useFilters } from "@/hooks/useFilters";
import { AnimatePresence, motion } from "framer-motion";
import { FC } from "react";

interface FiltersProps {}

const filterVariants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: "auto",
    opacity: 1,
    transition: { duration: 0.2 },
  },
};

const Filters: FC<FiltersProps> = ({}) => {
  const { onClose, isOpen } = useFilters();

  return (
    <motion.section
      initial={{ height: 0 }}
      variants={filterVariants}
      animate={isOpen ? "visible" : "hidden"}
      className="text-3xl text-white"
    >
      <p>hello</p>
      <p>hello</p>
      <p>hello</p>
      <p>hello</p>
      <p>hello</p>
    </motion.section>
  );
};

export default Filters;