import { create } from "zustand";

interface GroupProps {
  id: string;
  name: string;
  image: string;
}

interface EditGroupModalStore {
  data: GroupProps;
  setData: (data: GroupProps) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditGroupModal = create<EditGroupModalStore>((set) => ({
  data: { id: "", name: "", image: "" },
  setData: (data) => set((state) => ({ data: (state.data = data) })),
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditGroupModal;
