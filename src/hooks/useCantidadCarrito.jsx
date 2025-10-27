import { useCarritoStore } from "../stores/CarritoStore";

export const useCantidadCarrito = () => {
  const { carrito } = useCarritoStore();
  const cantidadTotal = carrito.reduce((acumulador,item)=>{
    return acumulador + item.cantidad
  },0)
  return { cantidad:cantidadTotal };
};
