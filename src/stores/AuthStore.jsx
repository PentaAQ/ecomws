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
  try {
    // Primero verifica si hay una sesión activa
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      // Si no hay sesión, simplemente limpia el estado local
      set({ credenciales: null });
      return;
    }
    
    // Intenta cerrar sesión
    const { error } = await supabase.auth.signOut({ scope: 'local' });
    
    if (error && error.message !== 'Auth session missing!') {
      throw error;
    }
    
    // Limpia el estado local de todos modos
    set({ credenciales: null });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    // Limpia el estado local incluso si hay error
    set({ credenciales: null });
    // Limpia manualmente el localStorage si es necesario
    localStorage.removeItem('supabase.auth.token');
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