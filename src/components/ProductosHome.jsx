import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useMostrarProductosQuery } from "../stacks/ProductosStack";
import { useCarritoStore } from "../stores/CarritoStore";

export const ProductosHome = () => {
  const { data: productos } = useMostrarProductosQuery();
  const { agregarAlCarrito } = useCarritoStore();
  
  // Estado para la paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 9; // 3x3 grid
  
  // Calcular productos a mostrar
  const { productosPaginados, totalPaginas } = useMemo(() => {
    if (!productos) return { productosPaginados: [], totalPaginas: 0 };
    
    const indexInicio = (paginaActual - 1) * productosPorPagina;
    const indexFin = indexInicio + productosPorPagina;
    
    return {
      productosPaginados: productos.slice(indexInicio, indexFin),
      totalPaginas: Math.ceil(productos.length / productosPorPagina)
    };
  }, [productos, paginaActual]);
  
  // Funciones de navegación
  const irAPagina = (numeroPagina) => {
    setPaginaActual(numeroPagina);
    // Scroll suave hacia la sección de productos
    document.getElementById('productos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      // Mostrar todas las páginas
      for (let i = 1; i <= totalPaginas; i++) {
        paginas.push(i);
      }
    } else {
      // Lógica para mostrar páginas con ellipsis
      if (paginaActual <= 3) {
        paginas.push(1, 2, 3, 4, '...', totalPaginas);
      } else if (paginaActual >= totalPaginas - 2) {
        paginas.push(1, '...', totalPaginas - 3, totalPaginas - 2, totalPaginas - 1, totalPaginas);
      } else {
        paginas.push(1, '...', paginaActual - 1, paginaActual, paginaActual + 1, '...', totalPaginas);
      }
    }
    
    return paginas;
  };
  
  if (!productos || productos.length === 0) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" id="productos">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black">Nuestros Productos</h1>
        <p className="text-center text-gray-500">No hay productos disponibles</p>
      </section>
    );
  }
  
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20" id="productos">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-black">Nuestros Productos</h1>
      
      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
        {productosPaginados.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 h-110 hover:-translate-y-1 flex flex-col"
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

              <p className="text-sm text-gray-600 line-clamp-2">{item.descripcion}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                <p className="font-bold text-lg sm:text-xl text-black">${item.precio_unidad}</p>
              </div>
            </div>
            <button
              className="text-white bg-black w-full py-3 cursor-pointer hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg font-semibold"
              onClick={() => agregarAlCarrito(item)}
            >
              Añadir al carrito
            </button>
          </div>
        ))}
      </div>
      
      {/* Controles de paginación */}
      {totalPaginas > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Información de página */}
          <p className="text-sm text-gray-600">
            Página {paginaActual} de {totalPaginas} ({productos.length} productos)
          </p>
          
          {/* Botones de navegación */}
          <div className="flex items-center gap-2">
            {/* Botón anterior */}
            <button
              onClick={paginaAnterior}
              disabled={paginaActual === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            {/* Números de página */}
            <div className="flex items-center gap-1">
              {obtenerNumerosPagina().map((numero, index) => (
                numero === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                    ...
                  </span>
                ) : (
                  <button
                    key={numero}
                    onClick={() => irAPagina(numero)}
                    className={`px-3 py-2 rounded-lg font-medium transition-all ${
                      paginaActual === numero
                        ? 'bg-black text-white'
                        : 'border border-gray-300 hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {numero}
                  </button>
                )
              ))}
            </div>
            
            {/* Botón siguiente */}
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
    </section>
  );
};