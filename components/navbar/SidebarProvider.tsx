"use client";

import { useEffect, useState } from "react";

import MobileMenu from "./MobileMenu";

const SidebarProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <MobileMenu />
    </>
  );
};

export default SidebarProvider;
