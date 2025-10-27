import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCarritoStore = create(
  persist(
    (set) => ({
      carrito: [],
      stateCarrito: false,
      // Agregar al carrito
      agregarAlCarrito: (producto) => {
        set((state) => {
          const productoExiste = state.carrito.find(
            (item) => item.id === producto.id
          );

          if (productoExiste) {
            const carritoActualizado = state.carrito.map((item) => {
              if (item.id === producto.id) {
                const cantidad = item.cantidad+1
                const subTotal = cantidad *  item.precio_unidad
                return{
                  ...item,cantidad:cantidad,subTotal:subTotal
                }
              }
              return item;
            });
            return { carrito: carritoActualizado };
          }

          const nuevoProducto = {
            ...producto,
            cantidad: 1,
            subTotal:producto.precio_unidad
          };

          return {
            carrito: [...state.carrito, nuevoProducto],
          };
        });
      },
      // Vaciar Carrito
      vaciarCarrito: () => set(() => ({ carrito: [] })),

      abrirCarrito: () => set({ stateCarrito: true }),

      cerrarCarrito: () => set({ stateCarrito: false }),
    }),
    {
      name: "carrito-store",
    }
  )
);
