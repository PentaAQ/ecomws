import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCarritoStore = create(
  persist(
    (set, get) => ({
      carrito: [],
      stateCarrito: false,

      // Agregar producto al carrito
      agregarAlCarrito: (producto) =>
        set((state) => {
          // Normalizar el producto asegurando tipos correctos
          const productoNormalizado = {
            ...producto,
            id: producto.id,
            nombre: producto.nombre || "",
            imagen: producto.imagen || "",
            precio_unidad: Number(producto.precio_unidad) || 0,
            stock: Number(producto.stock) || 0,
          };

          const productoExistente = state.carrito.find(
            (item) => item.id === producto.id
          );

          if (productoExistente) {
            // Si ya existe, aumentar cantidad
            return {
              carrito: state.carrito.map((item) =>
                item.id === producto.id
                  ? {
                      ...item,
                      cantidad: Math.min(
                        item.cantidad + 1,
                        item.stock || Infinity
                      ),
                    }
                  : item
              ),
            };
          } else {
            // Si no existe, agregarlo con cantidad 1
            return {
              carrito: [
                ...state.carrito,
                { ...productoNormalizado, cantidad: 1 },
              ],
            };
          }
        }),

      // Aumentar cantidad de un producto
      aumentarCantidad: (productoId) =>
        set((state) => ({
          carrito: state.carrito.map((item) => {
            if (item.id === productoId) {
              const nuevaCantidad = item.cantidad + 1;
              // Validar stock si existe
              if (item.stock && nuevaCantidad > item.stock) {
                alert(`Stock máximo disponible: ${item.stock}`);
                return item;
              }
              return { ...item, cantidad: nuevaCantidad };
            }
            return item;
          }),
        })),

      // Disminuir cantidad de un producto
      disminuirCantidad: (productoId) =>
        set((state) => ({
          carrito: state.carrito
            .map((item) =>
              item.id === productoId
                ? { ...item, cantidad: item.cantidad - 1 }
                : item
            )
            .filter((item) => item.cantidad > 0),
        })),

      // Eliminar producto del carrito
      eliminarDelCarrito: (productoId) =>
        set((state) => ({
          carrito: state.carrito.filter((item) => item.id !== productoId),
        })),

      // Vaciar carrito completo
      vaciarCarrito: () => set({ carrito: [] }),

      // Calcular total del carrito
      calcularTotal: () => {
        const { carrito } = get();
        return carrito.reduce((total, item) => {
          const precio = Number(item.precio_unidad) || 0;
          const cantidad = Number(item.cantidad) || 0;
          return total + precio * cantidad;
        }, 0);
      },

      // Calcular cantidad total de items
      calcularCantidadTotal: () => {
        const { carrito } = get();
        return carrito.reduce((total, item) => {
          return total + (Number(item.cantidad) || 0);
        }, 0);
      },

      // Toggle del estado del carrito (abrir/cerrar)
      setStateCarrito: () =>
        set((state) => ({ stateCarrito: !state.stateCarrito })),

      // Abrir carrito
      abrirCarrito: () => set({ stateCarrito: true }),

      // Cerrar carrito
      cerrarCarrito: () => set({ stateCarrito: false }),
    }),
    {
      name: "carrito-storage", // Nombre para localStorage
      partialize: (state) => ({ carrito: state.carrito }), // Solo persistir el carrito
    }
  )
);
