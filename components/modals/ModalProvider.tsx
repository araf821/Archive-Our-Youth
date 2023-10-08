"use client";

import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import AuthModal from "./AuthModal";

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
      <AuthModal />
    </>
  );
};

export default ModalProvider;
