import { create } from "zustand";

interface MenuStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMenu = create<MenuStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => {
    // if (typeof window != "undefined" && window.document) {
    //   document.body.style.overflow = "hidden";
    // }
    set({ isOpen: true });
  },
  onClose: () => {
    // document.body.style.overflow = "unset";
    set({ isOpen: false });
  },
}));
