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
      initial={{ height: 0, opacity: 0 }}
      variants={filterVariants}
      animate={isOpen ? "visible" : "hidden"}
      className="mx-auto max-w-screen-md px-4 text-zinc-100"
    >
      <div className="flex flex-col gap-4 py-8">
        <p className="text-2xl font-light md:text-3xl">Filters</p>
        <hr className="-mt-3 border-zinc-700" />

        <p className="md:text-lg">Search and filter functionality coming soon!</p>
      </div>
    </motion.section>
  );
};

export default Filters;
