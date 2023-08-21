import { create } from "zustand";

interface NoteProps {
  id: string;
  title: string;
  desc: string;
}

interface EditNoteModalStore {
  data: NoteProps;
  setData: (data: NoteProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditNoteModal = create<EditNoteModalStore>((set) => ({
  data: { id: "", title: "", desc: "" },
  setData: (data) => set((state) => ({ data: (state.data = data) })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditNoteModal;
