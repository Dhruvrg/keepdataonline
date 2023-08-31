import { create } from "zustand";

interface DocumentProps {
  id: string;
  name: string;
  src: string;
}

interface EditDocumentModalStore {
  data: DocumentProps;
  setData: (data: DocumentProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditDocumentModal = create<EditDocumentModalStore>((set) => ({
  data: { id: "", name: "", src: "" },
  setData: (data) => set((state) => ({ data: (state.data = data) })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditDocumentModal;
