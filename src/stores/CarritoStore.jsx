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
                const cantidad = item.cantidad + 1;
                const subTotal = cantidad * item.precio_unidad;
                return {
                  ...item,
                  cantidad: cantidad,
                  subTotal: subTotal,
                };
              }
              return item;
            });
            return { carrito: carritoActualizado };
          }

          const nuevoProducto = {
            ...producto,
            cantidad: 1,
            subTotal: producto.precio_unidad,
          };

          return {
            carrito: [...state.carrito, nuevoProducto],
          };
        });
      },
      // Vaciar Carrito
      vaciarCarrito: () => set(() => ({ carrito: [] })),
      // Abrir Carrito
      abrirCarrito: () => set({ stateCarrito: true }),
      // Cerrar Carrito
      cerrarCarrito: () => set({ stateCarrito: false }),
      // Eliminar un Producto
      borrarProducto: (id) => {
        set((state) => {
          // Filtramos el carrito y mantenemos solo los productos que NO tienen ese ID

          const carritoActualizado = state.carrito.filter(
            (item) => item.id !== id
          );
          return { carrito: carritoActualizado };
        });
      },
      // Aumentamos Cantidad de ese producto en 1
      aumentarCantidad: (id) => {
        set((state) => {
          const carritoActualizado = state.carrito.map((item) => {
            if (item.id === id) {
              const nuevaCantidad = item.cantidad + 1;
              const nuevoSubTotal = nuevaCantidad * item.precio_unidad;

              return {
                ...item,
                cantidad: nuevaCantidad,
                subTotal: nuevoSubTotal,
              };
            }
            // Si no es el producto que buscamos, lo retornamos sin cambios
            return item;
          });

          return { carrito: carritoActualizado };
        });
      },
      // Disminuimos Cantidad de ese producto en 1
      disminuirCantidad: (id) => {
        set((state) => {
          const carritoActualizado = state.carrito
            .map((item) => {
              // Si encontramos el producto con el ID
              if (item.id === id) {
                const nuevaCantidad = item.cantidad - 1;

                // Si la cantidad es 0 o menor, retornamos null para eliminarlo
                if (nuevaCantidad <= 0) {
                  return null;
                }

                const nuevoSubTotal = nuevaCantidad * item.precio_unidad;

                return {
                  ...item,
                  cantidad: nuevaCantidad,
                  subTotal: nuevoSubTotal,
                };
              }
              // Si no es el producto que buscamos, lo retornamos sin cambios
              return item;
            })
            // Filtramos los productos null (los que tenían cantidad 0)
            .filter((item) => item !== null);

          return { carrito: carritoActualizado };
        });
      },
    }),

    {
      name: "carrito-store",
    }
  )
);
