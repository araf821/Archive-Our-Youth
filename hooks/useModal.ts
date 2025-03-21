import { Post, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "userMoreInformationModal"
  | "postModal"
  | "authModal"
  | "shareModal"
  | "deletePostModal"
  | "submitAuthModal"
  | "languageSwitcherModal";

interface ModalData {
  post?: Post & { user: User | null };
  postWithoutUser?: Post;
  currentUser?: User | null;
}

interface ModalStoreProps {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));
