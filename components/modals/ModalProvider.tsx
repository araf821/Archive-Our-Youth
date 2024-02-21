"use client";

import { useEffect, useState } from "react";
import PostModal from "../old_components/V1PostModal";
import AuthModal from "./AuthModal";
import ShareModal from "./ShareModal";
import DeletePostModal from "./DeletePostModal";
import SubmitAuthModal from "./SubmitAuthModal";

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
      <DeletePostModal />
      <SubmitAuthModal />
    </>
  );
};

export default ModalProvider;
