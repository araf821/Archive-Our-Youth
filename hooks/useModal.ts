import { Post, User } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "postModal";

interface ModalData {
  post?: Post & { user: User };
  currentUser?: User | null;
}

interface ModalStoreProps {
  type: ModalType | null;
  data: ModalData;
  currentUser: User | null;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreProps>((set) => ({
  type: null,
  data: {},
  currentUser: null,
  isOpen: false,
  onOpen: (type, data = {}) => {
    set({ isOpen: true, type, data });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));
