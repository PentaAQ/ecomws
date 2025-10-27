// components/BuscadorProductos.jsx
import { useProductosStore } from "../stores/ProductosStore";
import { Icon } from "@iconify/react";

export const BuscadorProductos = () => {
  const { buscador, setBuscador } = useProductosStore();

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        {/* Icono de búsqueda */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <Icon
            icon="material-symbols:search"
            className="w-5 h-5 text-gray-400"
          />
        </div>

        {/* Input de búsqueda */}
        <input
          type="search"
          className="w-full border border-gray-300 rounded-lg pl-12 pr-5 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 focus:outline-none shadow-sm hover:shadow-md"
          placeholder="Buscar productos por nombre..."
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
      </div>

      {/* Indicador de resultados */}
      {buscador && (
        <p className="text-sm text-gray-600 mt-2">
          Buscando: <span className="font-semibold">"{buscador}"</span>
        </p>
      )}
    </div>
  );
};
