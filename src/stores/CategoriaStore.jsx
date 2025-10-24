import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useCategoriaStore = create((set) => ({
  mostrarCategorias: async () => {
    const { data, error } = await supabase.from("categoria").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

}));
