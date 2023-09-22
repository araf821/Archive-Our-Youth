"use client";

import { useEffect, useState } from "react";
import PostModal from "./PostModal";

const ModalProvider = ({}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PostModal />
    </>
  );
};

export default ModalProvider;
