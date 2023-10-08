"use client";

import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import AuthModal from "./AuthModal";
import ShareModal from "./ShareModal";

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
      <ShareModal />
    </>
  );
};

export default ModalProvider;
