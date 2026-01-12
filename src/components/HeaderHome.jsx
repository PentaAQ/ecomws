import { Icon } from "@iconify/react";
import { useCarritoStore } from "../stores/CarritoStore";
import { useCantidadCarrito } from "../hooks/useCantidadCarrito";

export const HeaderHome = () => {
  const { abrirCarrito } = useCarritoStore();
  const {cantidad} = useCantidadCarrito()

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <a
          href="#"
          className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 flex gap-2 items-center"
        >
          <span className="flex items-center justify-center h-9 w-9 rounded-xl bg-neutral-900 text-white">
            <Icon icon="tabler:shoe" width="20" height="20" />
          </span>
          <span>Stride</span>
        </a>
        <button
          onClick={abrirCarrito}
          className="relative h-10 w-10 inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 transition-colors duration-200"
          aria-label="Abrir carrito"
        >
          <Icon
            icon="meteor-icons:cart-shopping"
            width="20"
            height="20"
            className="text-neutral-900"
          />
          {cantidad > 0 && (
            <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-[11px] font-semibold rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
              {cantidad}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
