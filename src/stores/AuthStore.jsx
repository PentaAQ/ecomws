import { create } from "zustand";
import { supabase } from "../supabase/supabase.config";

export const useAuthStore = create((set) => ({
  credenciales: null,
  setCredenciales: (p) => set({ credenciales: p }),

  crearUserLogin: async (p) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: p.email,
      password: p.password,
    });
    
    if (error) {
      throw error; // Lanzar el objeto error completo de Supabase
    }
    
    if (!data.user) {
      throw new Error("No se pudo iniciar sesión");
    }
    
    return data.user;
  },
  
  cerrarSesion: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
}));

export const useSubcription = create((set) => {
  const store = {
    user: null,
  };
  
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (session?.user) {
      set({ user: session.user });
    }
  });
  
  supabase.auth.onAuthStateChange((_event, session) => {
    set({ user: session?.user || null });
  });
  
  return store;
});