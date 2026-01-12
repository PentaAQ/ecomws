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

      <div className="bg-white relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[99%] flex flex-col gap-6 p-8 items-center animate-in zoom-in-95 duration-300 border border-neutral-200">
        <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-200">
          <svg className="w-8 h-8 text-neutral-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v2m0 4v2m0-10a9 9 0 110 18 9 9 0 010-18z"
              
            />
          </svg>
        </div>

        <div className="text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">Confirmación</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900 mb-2">¿Eliminar producto?</h1>
          <p className="text-neutral-600 text-sm">
            Esta acción no se puede deshacer. El producto será eliminado permanentemente.
          </p>
        </div>

        <div className="flex gap-3 w-full pt-4">
          <button
            className="flex-1 bg-white hover:bg-neutral-50 text-neutral-900 font-semibold px-4 py-3 rounded-xl border border-neutral-200 transition-colors duration-200 active:scale-[0.99]"
            onClick={setActiveModalEliminar}
          >
            Cancelar
          </button>
          <button
            className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-4 py-3 rounded-xl transition-colors duration-200 active:scale-[0.99] shadow-sm"
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
