import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../stores/AuthStore";

export const useCrearUsuarioYSesionMutate = () => {
  const { crearUserLogin, credenciales } = useAuthStore();
  
  return useMutation({
    mutationKey: ["Iniciar con email y contraseña"],
    mutationFn: async () => {
      return await crearUserLogin({
        email: credenciales.email,
        password: credenciales.password,
      });
    },
    onError: (error) => {
      // Mapear errores comunes de Supabase
      const errorMap = {
        "Invalid login credentials": "Correo o contraseña incorrectos",
        "Email not confirmed": "Por favor confirma tu correo electrónico",
        "User not found": "No existe una cuenta con ese correo",
        "Invalid email": "El formato del correo es inválido",
      };
      
      const mensaje = errorMap[error.message] || `Error al iniciar sesión: ${error.message}`;
      toast.error(mensaje);
    },
    onSuccess: (user) => {
      toast.success(`¡Bienvenido de vuelta, ${user.email}!`);
    }
  });
};