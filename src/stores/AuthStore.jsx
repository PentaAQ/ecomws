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
      throw error;
    }
    
    if (!data.user) {
      throw new Error("No se pudo iniciar sesión");
    }
    
    return data.user;
  },
  
  cerrarSesion: async () => {
    try {
      // Usa scope: 'local' para evitar el error de sesión faltante
      const { error } = await supabase.auth.signOut({ scope: 'local' });
      
      // Solo lanza el error si NO es "Auth session missing"
      if (error && !error.message.includes('Auth session missing')) {
        throw error;
      }
    } catch (error) {
      // Si el error no es "Auth session missing", lo lanzamos
      if (!error.message?.includes('Auth session missing')) {
        console.error('Error al cerrar sesión:', error);
        throw error;
      }
      // Si es "Auth session missing", lo ignoramos y continuamos
      console.log('Sesión ya cerrada o no existe');
    } finally {
      // Limpia el estado local siempre, independientemente del resultado
      set({ credenciales: null });
    }
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