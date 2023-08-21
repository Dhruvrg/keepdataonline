import { create } from "zustand";

interface AddNoteModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddNoteModal = create<AddNoteModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddNoteModal;
