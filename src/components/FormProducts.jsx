"use client"

import { useMostrarCategoriasQuery } from "../stacks/CategoriasStack"
import { useFormProducts } from "../hooks/useFormProducts"

export const FormProducts = () => {
  const { data: categorias } = useMostrarCategoriasQuery()
  const {
    formValues,
    imagenPreview,
    imagenFile,
    isEditMode,
    isLoading,
    accion,
    handleImagenChange,
    handleInputChange,
    handleSubmit,
    handleCloseModal,
  } = useFormProducts()

  const inputClass =
    "w-full px-4 py-2.5 border border-neutral-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-neutral-900/10 focus:border-neutral-300 disabled:bg-neutral-100 disabled:cursor-not-allowed transition-colors duration-200 text-neutral-900 placeholder-neutral-400 shadow-sm"

  return (
    <div className="fixed z-50 flex items-center justify-center inset-0">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
        onClick={handleCloseModal}
      />

      {/* Modal */}
      <section className="bg-white relative w-full max-w-3xl rounded-3xl shadow-2xl overflow-y-auto max-h-[99%] border border-neutral-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-neutral-200 bg-white">
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-500 uppercase">Producto</p>
          <h1 className="mt-2 text-2xl font-semibold text-neutral-900 tracking-tight">{accion} Zapatillas</h1>
          <p className="text-neutral-600 text-sm mt-1">Completa los detalles de tu producto</p>
        </div>

        {/* Formulario */}
        <form className="flex flex-col  md:grid md:grid-cols-2 gap-6 p-6 overflow-y-auto" onSubmit={handleSubmit}>
          {/* Columna Izquierda - Campos */}
          <div className="space-y-5">
            {/* Nombre */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-semibold text-sm text-neutral-900">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formValues.name}
                onChange={handleInputChange}
                placeholder="Air For One"
                required
                disabled={isLoading}
                className={inputClass}
              />
            </div>

            {/* Precio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="precio" className="font-semibold text-sm text-neutral-900">
                Precio <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                id="precio"
                name="precio"
                value={formValues.precio}
                onChange={handleInputChange}
                placeholder="99.99"
                required
                disabled={isLoading}
                className={inputClass}
              />
            </div>

            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <label htmlFor="descripcion" className="font-semibold text-sm text-neutral-900">
                Descripción <span className="text-red-500">*</span>
              </label>
              <textarea
                name="descripcion"
                id="descripcion"
                value={formValues.descripcion}
                onChange={handleInputChange}
                placeholder="Descripción del producto"
                required
                rows={4}
                disabled={isLoading}
                className={`${inputClass} resize-none`}
              />
            </div>

            {/* Categoría */}
            <div className="flex flex-col gap-2">
              <label htmlFor="categoria" className="font-semibold text-sm text-neutral-900">
                Marca <span className="text-red-500">*</span>
              </label>
              <select
                name="categoria"
                id="categoria"
                value={formValues.categoria}
                onChange={handleInputChange}
                required
                disabled={isLoading}
                className={inputClass}
              >
                <option value="">Selecciona una categoría</option>
                {categorias?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Columna Derecha - Imagen */}
          <div className="flex flex-col gap-3">
            <label className="font-semibold text-sm text-neutral-900">
              Imagen {!isEditMode && <span className="text-red-500">*</span>}
            </label>

            <label
              htmlFor="imagen"
              className={`relative flex items-center justify-center border-2 border-dashed rounded-xl py-8 cursor-pointer transition-all duration-300 ${
                isLoading
                  ? "bg-neutral-50 border-neutral-200 cursor-not-allowed opacity-50"
                  : "border-neutral-300 bg-neutral-50 hover:bg-neutral-900 hover:border-neutral-900 hover:text-white group"
              }`}
            >
              <div className="text-center">
                <svg
                  className="w-8 h-8 mx-auto mb-2 transition-transform duration-300 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="font-medium text-sm">{isEditMode ? "Cambiar Imagen" : "Subir Imagen"}</p>
                <p className="text-xs opacity-70 mt-1">PNG, JPG hasta 5MB</p>
              </div>
            </label>

            {imagenPreview && (
              <div className="relative group">
                <img
                  src={imagenPreview || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-64 object-contain rounded-2xl border border-neutral-200 bg-neutral-50 transition-transform duration-300 group-hover:scale-[1.02]"
                />
                {isEditMode && (
                  <span className="absolute top-3 right-3 bg-neutral-900 text-white text-xs px-3 py-1 rounded-full shadow-sm font-medium">
                    {imagenFile ? "Nueva" : "Actual"}
                  </span>
                )}
              </div>
            )}

            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              className="hidden"
              onChange={handleImagenChange}
              disabled={isLoading}
            />

            {isEditMode && (
              <p className="text-xs text-neutral-500 text-center italic">Deja vacío para mantener la imagen actual</p>
            )}
          </div>

          {/* Botones */}
          <div className="flex gap-3 pt-2 col-span-2">
            <button
              type="button"
              onClick={handleCloseModal}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-white text-neutral-900 font-semibold rounded-xl border border-neutral-200 hover:bg-neutral-50 transition-colors duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-neutral-900 text-white font-semibold rounded-xl hover:bg-neutral-800 transition-colors duration-200 active:scale-[0.99] shadow-sm disabled:bg-neutral-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Procesando...
                </span>
              ) : isEditMode ? (
                "Guardar Cambios"
              ) : (
                "Crear Producto"
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
