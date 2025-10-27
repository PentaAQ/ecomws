import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  useMostrarProductosQuery,
  useBuscarProductoQQuery 
} from "../stacks/ProductosStack";
import { useCarritoStore } from "../stores/CarritoStore";
import { useProductosStore } from "../stores/ProductosStore";
import { Icon } from "@iconify/react";
import { BuscadorProductos } from "./BuscadorProductos"; // 👈 Importar el buscador

export const ProductosHome = () => {
  // 👇 Obtener el buscador del store
  const { buscador } = useProductosStore();
  
  // 👇 Obtener todos los productos y los productos buscados
  const { data: todosLosProductos } = useMostrarProductosQuery();
  const { data: productosBuscados } = useBuscarProductoQQuery();
  
  const { agregarAlCarrito } = useCarritoStore();

  // 👇 Usar productos buscados si hay búsqueda, sino todos los productos
  const productos = buscador.trim() ? productosBuscados : todosLosProductos;

  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 9;

  // 👇 Resetear página cuando cambia el buscador
  useMemo(() => {
    setPaginaActual(1);
  }, [buscador]);

  // Calcular productos a mostrar
  const { productosPaginados, totalPaginas } = useMemo(() => {
    if (!productos) return { productosPaginados: [], totalPaginas: 0 };

    const indexInicio = (paginaActual - 1) * productosPorPagina;
    const indexFin = indexInicio + productosPorPagina;

    return {
      productosPaginados: productos.slice(indexInicio, indexFin),
      totalPaginas: Math.ceil(productos.length / productosPorPagina),
    };
  }, [productos, paginaActual]);

  // Funciones de navegación
  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    document
      .getElementById("productos")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) irAPagina(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) irAPagina(paginaActual + 1);
  };

  const obtenerNumerosPagina = () => {
    const paginas = [];
    const maxPaginasVisibles = 5;

    if (totalPaginas <= maxPaginasVisibles) {
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      if (paginaActual <= 3) {
        paginas.push(1, 2, 3, 4, "...", totalPaginas);
      } else if (paginaActual >= totalPaginas - 2) {
        paginas.push(
          1,
          "...",
          totalPaginas - 3,
          totalPaginas - 2,
          totalPaginas - 1,
          totalPaginas
        );
      } else {
        paginas.push(
          1,
          "...",
          paginaActual - 1,
          paginaActual,
          paginaActual + 1,
          "...",
          totalPaginas
        );
      }
    }

    return paginas;
  };

  return (
    <section
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 min-h-screen"
      id="productos"
    >
      {/* Título */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8 text-black">
        Nuestros Productos
      </h1>

      {/* 👇 Buscador */}
      <BuscadorProductos />

      {/* 👇 Mensaje si no hay resultados */}
      {productos && productos.length === 0 && (
        <div className="text-center py-12">
          <Icon 
            icon="material-symbols:search-off" 
            className="w-16 h-16 mx-auto text-gray-300 mb-4" 
          />
          <p className="text-gray-500 text-lg mb-2">
            No se encontraron productos
          </p>
          {buscador && (
            <p className="text-gray-400">
              No hay resultados para "{buscador}"
            </p>
          )}
        </div>
      )}

      {/* Grid de productos */}
      {productos && productos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
            {productosPaginados.map((item) => {
              return (
                <div
                  key={item.id} // 👈 Cambiado de item.nombre a item.id
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 h-110 max-sm:h-100 hover:-translate-y-1 flex flex-col"
                >
                  <div className="relative h-48 sm:h-56 bg-gray-50 overflow-hidden flex items-center justify-center">
                    <img
                      src={item.imagen || "/placeholder.svg"}
                      width={200}
                      height={100}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
                      alt={item.nombre}
                    />
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
                    <h1 className="text-base sm:text-lg font-semibold text-black line-clamp-2 group-hover:text-gray-800 transition-colors">
                      {item.nombre}
                    </h1>

                    <p className="text-sm text-gray-600 line-clamp-2 inline-block w-full truncate align-top">
                      {item.descripcion}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                      <p className="font-bold text-lg sm:text-xl text-black">
                        S/{Number(item.precio_unidad).toFixed(2)}
                      </p>
                      <button
                        className={`text-white w-fit px-2 py-3 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg font-semibold flex gap-2 rounded-lg bg-black hover:bg-gray-800`}
                        onClick={() => agregarAlCarrito(item)}
                      >
                        <Icon icon="uil:cart" width="24" height="24" />
                        <span className="max-sm:hidden">Añadir</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Controles de paginación */}
          {totalPaginas > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <p className="text-sm text-gray-600">
                Página {paginaActual} de {totalPaginas} ({productos.length}{" "}
                {buscador ? "resultados" : "productos"})
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={paginaAnterior}
                  disabled={paginaActual === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-1">
                  {obtenerNumerosPagina().map((numero, index) =>
                    numero === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-3 py-2 text-gray-400"
                      >
                        ...
                      </span>
                    ) : (
                      <button
                        key={numero}
                        onClick={() => irAPagina(numero)}
                        className={`px-3 py-2 rounded-lg font-medium transition-all ${
                          paginaActual === numero
                            ? "bg-black text-white"
                            : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {numero}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={paginaSiguiente}
                  disabled={paginaActual === totalPaginas}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label="Página siguiente"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};