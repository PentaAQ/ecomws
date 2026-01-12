import { Icon } from "@iconify/react";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import { useProductosStore } from "../stores/ProductosStore";

export const HeaderAdmin = () => {
  const { setActiveModalForm } = useModalStore();
  const { setAccion } = useProductosStore();
  const { cerrarSesion } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">Panel</p>
          <h1 className="mt-1 max-md:text-lg max-lg:text-xl lg:text-2xl font-semibold tracking-tight text-neutral-900 truncate">
            Administrador
          </h1>
        </div>

        <div className="flex gap-3 items-center">
          <button
            onClick={() => {
              setActiveModalForm();
              setAccion("Añadir");
            }}
            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl bg-neutral-900 text-white font-semibold shadow-sm hover:bg-neutral-800 transition-colors active:scale-[0.99]"
          >
            <Icon icon="fluent-mdl2:circle-addition" width="25" height="25" />{" "}
            <p className="max-md:hidden">Añadir Productos</p>
          </button>
          <button
            className="inline-flex items-center gap-2 h-11 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-semibold shadow-sm hover:bg-neutral-50 transition-colors active:scale-[0.99]"
            onClick={cerrarSesion}
          >
            <Icon icon="basil:logout-solid" width="25" height="25" />
            <p className="max-md:hidden">Cerrar Sesion</p>
          </button>
        </div>
      </div>
    </header>
  );
};
