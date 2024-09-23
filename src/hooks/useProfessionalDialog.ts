import { create } from "zustand";

interface ProfessionalDialogStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useProfessionalDialog = create<ProfessionalDialogStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useProfessionalDialog;