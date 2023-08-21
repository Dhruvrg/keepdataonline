import { create } from "zustand";

interface LinkProps {
  id: string;
  name: string;
  src: string;
}

interface EditLinkModalStore {
  data: LinkProps;
  setData: (data: LinkProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditLinkModal = create<EditLinkModalStore>((set) => ({
  data: { id: "", name: "", src: "" },
  setData: (data) => set((state) => ({ data: (state.data = data) })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditLinkModal;
