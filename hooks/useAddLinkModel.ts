import { create } from "zustand";

interface AddLinkModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddLinkModal = create<AddLinkModalStore>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddLinkModal;
