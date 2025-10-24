"use client"

import { useEliminarProdutoMutation } from "../stacks/ProductosStack"
import { useModalStore } from "../stores/ModalStore"
import { useProductosStore } from "../stores/ProductosStore"

export const ModalEliminar = () => {
  const { setActiveModalEliminar } = useModalStore()
  const { itemSelect } = useProductosStore()
  const { mutate: eliminarProducto } = useEliminarProdutoMutation()

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0 animate-in fade-in duration-200">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition-opacity duration-200 hover:bg-black/60"
        onClick={setActiveModalEliminar}
      ></div>

      <div className="bg-white relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden max-h-[99%] flex flex-col gap-6 p-8 items-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v2m0 4v2m0-10a9 9 0 110 18 9 9 0 010-18z"
              
            />
          </svg>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-2">¿Eliminar producto?</h1>
          <p className="text-gray-600 text-sm">
            Esta acción no se puede deshacer. El producto será eliminado permanentemente.
          </p>
        </div>

        <div className="flex gap-3 w-full pt-4">
          <button
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-black font-medium px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={setActiveModalEliminar}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            onClick={() => {
              eliminarProducto(itemSelect.id), setActiveModalEliminar()
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
