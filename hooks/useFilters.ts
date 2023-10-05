import { create } from "zustand";

interface FiltersStoreProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useFilters = create<FiltersStoreProps>((set) => ({
  isOpen: false,
  onOpen: () => {
    set({ isOpen: true });
  },
  onClose: () => set({ isOpen: false }),
}));
