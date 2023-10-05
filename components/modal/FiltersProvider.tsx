"use client";

import { useEffect, useState } from "react";
import Filters from "../Filters";

const FiltersProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Filters />
    </>
  );
};

export default FiltersProvider;
