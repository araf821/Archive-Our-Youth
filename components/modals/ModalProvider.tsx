"use client";

import { useEffect, useState } from "react";

import AuthModal from "./AuthModal";
import DeletePostModal from "./DeletePostModal";
import { LanguageSwitcherModal } from "./LanguageSwitcherModal";
import ShareModal from "./ShareModal";
import SubmitAuthModal from "./SubmitAuthModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <AuthModal />
      <ShareModal />
      <DeletePostModal />
      <SubmitAuthModal />
      <LanguageSwitcherModal />
    </>
  );
};
