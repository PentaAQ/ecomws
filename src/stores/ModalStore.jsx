import { create } from "zustand";

export const useModalStore = create((set) => ({
  activeModalForm: false,
  setActiveModalForm: () =>
    set((state) => ({ activeModalForm: !state.activeModalForm })),

  activeModalEliminar: false,
  setActiveModalEliminar: () =>
    set((state) => ({ activeModalEliminar: !state.activeModalEliminar })),
}));
