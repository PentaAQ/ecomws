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
            className="w-5 h-5 text-neutral-400"
          />
        </div>

        {/* Input de búsqueda */}
        <input
          type="search"
          className="w-full rounded-xl border border-neutral-200 bg-white pl-12 pr-4 py-3 text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-neutral-900/10 focus:border-neutral-300"
          placeholder="Buscar productos por nombre..."
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
      </div>

      {/* Indicador de resultados */}
      {buscador && (
        <p className="text-sm text-neutral-600 mt-2">
          Buscando: <span className="font-semibold text-neutral-900">"{buscador}"</span>
        </p>
      )}
    </div>
  );
};
