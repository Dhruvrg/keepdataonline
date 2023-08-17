import { create } from "zustand";

interface SideBarModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSideBarModal = create<SideBarModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSideBarModal;
