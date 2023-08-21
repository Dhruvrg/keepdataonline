import { create } from "zustand";

interface CreateEditUserStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useEditUserModal = create<CreateEditUserStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useEditUserModal;
