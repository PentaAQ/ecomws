import { Icon } from "@iconify/react";
import { useCarritoStore } from "../stores/CarritoStore";
import { useCantidadCarrito } from "../hooks/useCantidadCarrito";

export const HeaderHome = () => {
  const { abrirCarrito } = useCarritoStore();
  const {cantidad} = useCantidadCarrito()

  return (
    <header className="fixed w-full top-0 z-50 bg-gradient-to-b from-black/30 to-transparent backdrop-blur-md shadow-lg border-b border-white/10">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <a
          href="#"
          className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-white flex gap-1 items-center"
          style={{ textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}
        >
          <Icon icon="tabler:shoe" width="30" height="30" />
          Stride
        </a>
        <button
          onClick={abrirCarrito}
          className="relative p-2 hover:bg-white/20 rounded-lg transition-colors duration-200"
          aria-label="Abrir carrito"
        >
          <Icon
            icon="meteor-icons:cart-shopping"
            width="30"
            height="30"
            className="text-white"
            style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.6))" }}
          />
          {cantidad > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
              {cantidad}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
