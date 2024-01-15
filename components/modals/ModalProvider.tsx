"use client";

import { useEffect, useState } from "react";
import PostModal from "./PostModal";
import AuthModal from "./AuthModal";
import ShareModal from "./ShareModal";
import DeletePostModal from "./DeletePostModal";
import SubmitAuthModal from "./SubmitAuthModal";
import MoreInformationModal from "@/app/(main)/dashboard/admin-portal/_components/user/ManageUserModal";

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
      <MoreInformationModal />
    </>
  );
};

export default ModalProvider;
