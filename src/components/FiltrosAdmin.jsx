import { useProductosStore } from "../stores/ProductosStore";

export const FiltrosAdmin = () => {
  const { buscador, setBuscador } = useProductosStore();

  return (
    <article className="bg-white rounded-3xl text-neutral-900 md:p-6 shadow-sm border border-neutral-200 h-fit sticky top-20 max-md:order-1">
      <h2 className="max-md:hidden text-lg font-semibold mb-4 text-neutral-900">Filtros</h2>
      <div className="space-y-3">
        <label className="max-md:hidden block text-sm font-medium text-neutral-700">
          Buscar productos
        </label>
        <input
          type="search"
          className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder-neutral-400 shadow-sm transition-colors focus:outline-none focus:ring-4 focus:ring-neutral-900/10 focus:border-neutral-300"
          placeholder="Buscar por nombre..."
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
      </div>
    </article>
  );
};
