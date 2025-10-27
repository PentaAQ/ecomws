import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCarritoStore = create(
  persist(
    (set, get) => ({
      carrito: [],
      stateCarrito: false,

      // Agregar producto al carrito con manejo de errores
      agregarAlCarrito: (producto) => {
        try {
          // Validar que el producto existe
          if (!producto || !producto.id) {
            throw new Error("Producto inválido: sin ID");
          }

          // Log para debugging
          console.log("📦 Intentando agregar producto:", {
            id: producto.id,
            nombre: producto.nombre,
            precio_unidad: producto.precio_unidad,
            tipo_precio: typeof producto.precio_unidad,
          });

          // Normalizar el producto asegurando tipos correctos
          const precioNumerico = Number(producto.precio_unidad);
          
          if (isNaN(precioNumerico)) {
            throw new Error(`Precio inválido: ${producto.precio_unidad}`);
          }

          const productoNormalizado = {
            id: producto.id,
            nombre: producto.nombre || "Sin nombre",
            imagen: producto.imagen || "",
            descripcion: producto.descripcion || "",
            precio_unidad: precioNumerico,
            stock: Number(producto.stock) || 999,
          };

          console.log("✅ Producto normalizado:", productoNormalizado);

          set((state) => {
            const productoExistente = state.carrito.find(
              (item) => item.id === producto.id
            );

            if (productoExistente) {
              console.log("♻️ Producto ya existe, aumentando cantidad");
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
              console.log("🆕 Producto nuevo, agregando al carrito");
              // Si no existe, agregarlo con cantidad 1
              return {
                carrito: [
                  ...state.carrito,
                  { ...productoNormalizado, cantidad: 1 },
                ],
              };
            }
          });

          console.log("🎉 Producto agregado exitosamente");
          return { success: true, message: "Producto agregado al carrito" };
        } catch (error) {
          console.error("❌ Error al agregar producto:", error);
          return { 
            success: false, 
            message: error.message || "Error desconocido",
            error 
          };
        }
      },

      // Aumentar cantidad de un producto
      aumentarCantidad: (productoId) => {
        try {
          set((state) => ({
            carrito: state.carrito.map((item) => {
              if (item.id === productoId) {
                const nuevaCantidad = item.cantidad + 1;
                // Validar stock si existe
                if (item.stock && nuevaCantidad > item.stock) {
                  console.warn(`⚠️ Stock máximo: ${item.stock}`);
                  return item;
                }
                return { ...item, cantidad: nuevaCantidad };
              }
              return item;
            }),
          }));
          return { success: true };
        } catch (error) {
          console.error("❌ Error al aumentar cantidad:", error);
          return { success: false, error };
        }
      },

      // Disminuir cantidad de un producto
      disminuirCantidad: (productoId) => {
        try {
          set((state) => ({
            carrito: state.carrito
              .map((item) =>
                item.id === productoId
                  ? { ...item, cantidad: item.cantidad - 1 }
                  : item
              )
              .filter((item) => item.cantidad > 0),
          }));
          return { success: true };
        } catch (error) {
          console.error("❌ Error al disminuir cantidad:", error);
          return { success: false, error };
        }
      },

      // Eliminar producto del carrito
      eliminarDelCarrito: (productoId) => {
        try {
          set((state) => ({
            carrito: state.carrito.filter((item) => item.id !== productoId),
          }));
          return { success: true };
        } catch (error) {
          console.error("❌ Error al eliminar producto:", error);
          return { success: false, error };
        }
      },

      // Vaciar carrito completo
      vaciarCarrito: () => {
        try {
          set({ carrito: [] });
          return { success: true };
        } catch (error) {
          console.error("❌ Error al vaciar carrito:", error);
          return { success: false, error };
        }
      },

      // Calcular total del carrito
      calcularTotal: () => {
        try {
          const { carrito } = get();
          const total = carrito.reduce((total, item) => {
            const precio = Number(item.precio_unidad) || 0;
            const cantidad = Number(item.cantidad) || 0;
            return total + precio * cantidad;
          }, 0);
          return total;
        } catch (error) {
          console.error("❌ Error al calcular total:", error);
          return 0;
        }
      },

      // Calcular cantidad total de items
      calcularCantidadTotal: () => {
        try {
          const { carrito } = get();
          return carrito.reduce((total, item) => {
            return total + (Number(item.cantidad) || 0);
          }, 0);
        } catch (error) {
          console.error("❌ Error al calcular cantidad total:", error);
          return 0;
        }
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
      name: "carrito-storage",
      partialize: (state) => ({ carrito: state.carrito }),
      // Agregar manejo de errores en la persistencia
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error("❌ Error al cargar carrito desde storage:", error);
        } else {
          console.log("✅ Carrito cargado desde storage:", state?.carrito?.length || 0, "items");
        }
      },
    }
  )
);