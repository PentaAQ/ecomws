import { useProductosStore } from "../stores/ProductosStore";

export const FiltrosAdmin = () => {
  const { buscador, setBuscador } = useProductosStore();

  return (
    <article className="bg-white rounded-2xl text-black md:p-6 shadow-md border border-gray-100 h-fit sticky top-6 max-md:order-1">
      <h2 className="max-md:hidden text-lg font-semibold mb-4 text-black">Filtros</h2>
      <div className="space-y-3">
        <label className="max-md:hidden block text-sm font-medium text-gray-700">
          Buscar productos
        </label>
        <input
          type="search"
          className="border border-gray-300 w-full rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 transition-all duration-300 focus:border-black focus:ring-2 focus:ring-black focus:ring-opacity-10 focus:outline-none"
          placeholder="Buscar por nombre..."
          value={buscador}
          onChange={(e) => setBuscador(e.target.value)}
        />
      </div>
    </article>
  );
};
