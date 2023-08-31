import { create } from "zustand";

interface AddDocumentModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useAddDocumentModal = create<AddDocumentModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useAddDocumentModal;
