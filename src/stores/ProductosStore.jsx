import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useProductosStore = create((set) => ({
  itemSelect: null,
  setItemSelect: (p) => set({ itemSelect: p }),

  accion: "",
  setAccion: (accion) => set({ accion: accion }),

  buscador: "",
  setBuscador: (p) => set({ buscador: p }),

  buscarProducto: async (p) => {
    const { data, error } = await supabase
      .from("productos")
      .select("*,categoria:id_categoria(id,nombre)")
      .ilike("nombre", "%" + p.nombre + "%");
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  mostrarProductos: async () => {
    const { data, error } = await supabase
      .from("productos")
      .select("*,categoria:id_categoria(id,nombre)"); // Incluye datos de la categoría relacionada
    if (error) {
      throw new Error(error.message);
    }
    return data;
  },

  editarProducto: async (p) => {
    const { error } = await supabase.from("productos").update(p).eq("id", p.id);
    if (error) {
      throw new Error(error.message);
    }
  },
  insertarProducto: async (p) => {
    const { error } = await supabase.from("productos").insert(p);
    if (error) {
      throw new Error(error.message);
    }
  },

  eliminarProducto: async (p) => {
    const { error } = await supabase.from("productos").delete().eq("id", p.id);
    if (error) {
      throw new Error(error.message);
    }
  },
}));
