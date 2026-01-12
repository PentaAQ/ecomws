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
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-neutral-50 to-neutral-100 px-4 py-10">
      <Toaster 
        position="top-right"
        richColors
        closeButton
        expand={false}
        duration={3000}
      />
      
      <div className="w-full max-w-md">
        {/* Header elegante */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-neutral-900 text-white mb-5 shadow-sm">
            <Icon icon="lucide-lab:sneaker" width="22" height="22" className="text-white" />
          </div>
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">Acceso</p>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900">Bienvenido</h1>
          <p className="mt-2 text-sm text-neutral-600">Accede a tu cuenta para continuar</p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-3xl shadow-sm p-6 sm:p-7">

          {/* Formulario */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Input */}
          <div className="group">
            <label className="block text-xs font-semibold text-neutral-700 mb-2 uppercase tracking-wide">
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
              className={`w-full px-4 py-3 bg-white border rounded-xl text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-neutral-900/10 hover:border-neutral-300 ${
                errors.email 
                  ? 'border-red-400 focus:ring-red-500/20' 
                  : 'border-neutral-200 focus:ring-neutral-900/10'
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
            <label className="block text-xs font-semibold text-neutral-700 mb-2 uppercase tracking-wide">
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
                className={`w-full px-4 py-3 bg-white border rounded-xl text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-neutral-900/10 hover:border-neutral-300 ${
                  errors.password 
                    ? 'border-red-400 focus:ring-red-500/20' 
                    : 'border-neutral-200 focus:ring-neutral-900/10'
                }`}
              />
              <button
                type="button"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-neutral-400 hover:text-neutral-600 transition-colors duration-200 cursor-pointer"
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
            className="w-full mt-6 bg-neutral-900 text-white font-semibold py-3 rounded-xl hover:bg-neutral-800 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99] shadow-sm"
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
          <div className="mt-7 pt-6 border-t border-neutral-200 text-center">
            <p className="text-xs text-neutral-500">Modo invitado • Acceso de demostración</p>
          </div>
        </div>
      </div>
    </section>
  );
};