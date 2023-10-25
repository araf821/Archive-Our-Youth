import { useFilters } from "@/hooks/useFilters";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useCallback, useState } from "react";
import qs from "query-string";

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
  const router = useRouter();

  const searchParams = useSearchParams();
  const sort = searchParams.get("sortBy");
  const [keyword, setKeyword] = useState<string | null>(
    searchParams.get("keyword"),
  );
  const [sortBy, setSortBy] = useState<string | null>(sort);

  const handleSearch = useCallback(() => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      keyword,
      sortBy,
    };

    const url = qs.stringifyUrl(
      {
        url: "/collage",
        query: updatedQuery,
      },
      { skipNull: true },
    );

    router.push(url);
    onClose();
  }, [searchParams, keyword, sortBy, router, onClose]);

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

        <p className="md:text-lg">
          Search and filter functionality coming soon!
        </p>
        <div className="mt-8"></div>

        <input
          type="text"
          value={keyword || ""}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <select
          onChange={(e) => setSortBy(e.target.value)}
          name="sortBy"
          id="sortBy"
        >
          <option value="latest">latest</option>
          <option value="least-popular">least-popular</option>
          <option value="oldest">oldest</option>
          <option value="most-popular">most-popular</option>
        </select>
        <button onClick={handleSearch}>click me</button>
      </div>
    </motion.section>
  );
};

export default Filters;
