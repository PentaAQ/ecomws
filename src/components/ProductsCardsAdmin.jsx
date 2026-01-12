import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useMostrarProductosQuery,
  useBuscarProductoQQuery,
} from "../stacks/ProductosStack";
import { useModalStore } from "../stores/ModalStore";
import { useProductosStore } from "../stores/ProductosStore";

export const ProductsCardsAdmin = () => {
  const { buscador, setItemSelect, setAccion } = useProductosStore();
  const { setActiveModalEliminar, setActiveModalForm } = useModalStore();

  const { data: todosLosProductos } = useMostrarProductosQuery();
  const { data: productosBuscados } = useBuscarProductoQQuery();

  const data = buscador.trim() ? productosBuscados : todosLosProductos;

  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 9;

  // Calcular productos a mostrar
  const { productosPaginados, totalPaginas } = useMemo(() => {
    if (!data || data.length === 0)
      return { productosPaginados: [], totalPaginas: 0 };

    const indexInicio = (paginaActual - 1) * productosPorPagina;
    const indexFin = indexInicio + productosPorPagina;

    return {
      productosPaginados: data.slice(indexInicio, indexFin),
      totalPaginas: Math.ceil(data.length / productosPorPagina),
    };
  }, [data, paginaActual]);

  // Resetear página cuando cambia el buscador
  useMemo(() => {
    setPaginaActual(1);
  }, [buscador]);

  // Funciones de navegación
  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) irAPagina(paginaActual - 1);
  };

  const paginaSiguiente = () => {
    if (paginaActual < totalPaginas) irAPagina(paginaActual + 1);
  };

  // Generar números de página a mostrar
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
    <article className="md:col-span-2 text-neutral-900 flex flex-col h-[75vh] md:h-[85vh] max-md:order-2">
      {/* Contenedor de productos con scroll */}
      <div
        className="flex flex-wrap gap-6 max-md:justify-center  md:justify-start content-start p-0 flex-1 overflow-y-auto
        scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-neutral-900 scrollbar-track-neutral-100 scrollbar-thin"
      >
        {data?.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full text-neutral-500">
            {buscador.trim()
              ? `No se encontraron productos con "${buscador}"`
              : "No hay productos"}
          </div>
        ) : null}

        {productosPaginados?.map((item) => (
          <div
            key={item.id}
            className="bg-white w-full max-w-xs rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:-translate-y-0.5 flex flex-col"
          >
            <div className="relative h-[200px] bg-neutral-50 overflow-hidden flex items-center justify-center">
              <img
                src={item.imagen || "/placeholder.svg"}
                width={200}
                height={100}
                className="object-cover w-full group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                alt={item.nombre}
              />
            </div>

            <div className="p-4 flex flex-col gap-3">
              <h1 className="text-lg font-semibold text-neutral-900 line-clamp-2">
                {item.nombre}
              </h1>

              <p className="text-sm text-neutral-600 line-clamp-2 inline-block w-full truncate align-top">
                {item.descripcion}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
                <p className="font-semibold text-lg text-neutral-900">
                  $ {item.precio_unidad}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  className="flex-1 h-10 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-semibold shadow-sm hover:bg-neutral-50 transition-colors active:scale-[0.99]"
                  onClick={() => {
                    setItemSelect(item);
                    setActiveModalEliminar();
                  }}
                >
                  Eliminar
                </button>
                <button
                  className="flex-1 h-10 rounded-xl bg-neutral-900 text-white font-semibold shadow-sm hover:bg-neutral-800 transition-colors active:scale-[0.99]"
                  onClick={() => {
                    setItemSelect(item);
                    setAccion("Editar");
                    setActiveModalForm();
                  }}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        ))}
        {/* Controles de paginación */}
        {data && data.length > 0 && totalPaginas > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4 px-2 border-t border-neutral-200 bg-white w-full">
            {/* Información de página */}
            <p className="text-sm text-neutral-600">
              Mostrando {(paginaActual - 1) * productosPorPagina + 1} -{" "}
              {Math.min(paginaActual * productosPorPagina, data.length)} de{" "}
              {data.length} productos
            </p>

            {/* Botones de navegación */}
            <div className="flex items-center gap-2">
              {/* Botón anterior */}
              <button
                onClick={paginaAnterior}
                disabled={paginaActual === 1}
                className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Números de página */}
              <div className="flex items-center gap-1">
                {obtenerNumerosPagina().map((numero, index) =>
                  numero === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="px-3 py-2 text-neutral-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={numero}
                      onClick={() => irAPagina(numero)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all text-sm ${
                        paginaActual === numero
                          ? "bg-neutral-900 text-white"
                          : "border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      {numero}
                    </button>
                  )
                )}
              </div>

              {/* Botón siguiente */}
              <button
                onClick={paginaSiguiente}
                disabled={paginaActual === totalPaginas}
                className="p-2 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Página siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
