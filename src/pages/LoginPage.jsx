import { useForm } from "react-hook-form";
import { useCrearUsuarioYSesionMutate } from "../stacks/LoginStack";
import { useState } from "react";
import { useAuthStore } from "../stores/AuthStore";
import { Toaster, toast } from "sonner";
import { Icon } from "@iconify/react";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setCredenciales } = useAuthStore();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm({
    mode: "onBlur"
  });
  const { isPending, mutate } = useCrearUsuarioYSesionMutate();

  const onSubmit = async (data) => {
    // Validación adicional con toast si lo necesitas
    if (!data.email || !data.password) {
      toast.error("Por favor completa todos los campos");
      return;
    }

    // Actualizar credenciales en el store
    setCredenciales({ email: data.email, password: data.password });
    
    // Ejecutar la mutación (los toast de success/error están en el hook)
    mutate();
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4 py-8">
      <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={3000}
      />
      
      <div className="w-full max-w-md">
        {/* Header elegante */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 mb-6">
            <Icon icon="lucide-lab:sneaker" width="24" height="24" className="text-white text-xl" />
          </div>
          <h1 className="text-4xl font-light tracking-tight text-slate-900 mb-2">Bienvenido</h1>
          <p className="text-sm text-slate-500 font-medium">Accede a tu cuenta para continuar</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div className="group">
            <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
              Correo electrónico
            </label>
            <input
              {...register("email", { 
                required: "El correo electrónico es obligatorio",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Formato de correo inválido"
                },
                minLength: {
                  value: 5,
                  message: "El correo debe tener al menos 5 caracteres"
                }
              })}
              placeholder="tu@email.com"
              type="email"
              autoComplete="email"
              className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent hover:border-slate-300 ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-500' 
                  : 'border-slate-200 focus:ring-slate-900'
              }`}
            />
            {errors.email && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                <span>{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="group">
            <label className="block text-xs font-semibold text-slate-700 mb-2 uppercase tracking-wide">
              Contraseña
            </label>
            <div className="relative">
              <input
                {...register("password", { 
                  required: "La contraseña es obligatoria",
                  minLength: {
                    value: 6,
                    message: "La contraseña debe tener al menos 6 caracteres"
                  },
                  maxLength: {
                    value: 50,
                    message: "La contraseña no puede exceder 50 caracteres"
                  }
                })}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`w-full px-4 py-3 bg-white border rounded-lg text-slate-900 placeholder-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:border-transparent hover:border-slate-300 ${
                  errors.password 
                    ? 'border-red-400 focus:ring-red-500' 
                    : 'border-slate-200 focus:ring-slate-900'
                }`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <Icon icon={showPassword ? "mdi:eye-off" : "mdi:eye"} className="text-lg" />
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 mt-2 text-red-600 text-xs animate-in fade-in slide-in-from-top-1 duration-200">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                <span>{errors.password.message}</span>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isPending || isSubmitting}
            className="w-full mt-8 bg-slate-900 text-white font-semibold py-3 rounded-lg hover:bg-slate-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transform shadow-sm hover:shadow-md"
          >
            {isPending || isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Icon icon="mdi:loading" className="animate-spin text-xl" />
                INICIANDO SESIÓN...
              </span>
            ) : (
              "INICIAR SESIÓN"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-200 text-center">
          <p className="text-xs text-slate-500">Modo invitado • Acceso de demostración</p>
        </div>
      </div>
    </section>
  );
};