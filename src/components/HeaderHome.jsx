import { Icon } from "@iconify/react";
import { useCarritoStore } from "../stores/CarritoStore";

export const HeaderHome = () => {
  const { carrito, setStateCarrito } = useCarritoStore();
  const cantidadTotal = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  return (
    <div className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="bg-white w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-widest text-black">Stride</h1>
        <button
          onClick={setStateCarrito}
          className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          aria-label="Abrir carrito"
        >
          <Icon icon="meteor-icons:cart-shopping" width="24" height="24" />
          {cantidadTotal > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {cantidadTotal}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
