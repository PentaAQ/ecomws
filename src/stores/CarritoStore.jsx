import { create } from "zustand";

export const useCarritoStore = create((set, get) => ({
  carrito: [],
  
  agregarAlCarrito: (producto) =>
    set((state) => {
      const productoExistente = state.carrito.find((item) => item.id === producto.id);
      
      if (productoExistente) {
        return {
          carrito: state.carrito.map((item) =>
            item.id === producto.id
              ? { ...item, cantidad: item.cantidad + 1 }
              : item
          ),
        };
      } else {
        return {
          carrito: [...state.carrito, { ...producto, cantidad: 1 }],
        };
      }
    }),

  aumentarCantidad: (productoId) =>
    set((state) => ({
      carrito: state.carrito.map((item) =>
        item.id === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      ),
    })),

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

  eliminarDelCarrito: (productoId) =>
    set((state) => ({
      carrito: state.carrito.filter((item) => item.id !== productoId),
    })),

  // Función para calcular el total
  calcularTotal: () => {
    const { carrito } = get();
    return carrito.reduce((total, item) => {
      return total + (item.precio_unidad * item.cantidad);
    }, 0);
  },

  stateCarrito: false,
  setStateCarrito: () =>
    set((state) => ({ stateCarrito: !state.stateCarrito })),
}));