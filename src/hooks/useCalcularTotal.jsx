import { useCarritoStore } from "../stores/CarritoStore"

export const useCalcularTotal = ()=>{
  const {carrito} = useCarritoStore()
  const totalAPagar = carrito.reduce((total,item)=>{
    return total+item.subTotal
  },0)
  return{totalAPagar}
}