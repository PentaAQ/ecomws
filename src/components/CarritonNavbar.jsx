import { Icon } from "@iconify/react";
import { useCarritoStore } from "../stores/CarritoStore";
import { useCalcularTotal } from "../hooks/useCalcularTotal";

const WHATSAPP_NUMBER = "51906047287";

export const CarritonNavbar = () => {
  const { carrito, stateCarrito, cerrarCarrito, vaciarCarrito } =
    useCarritoStore();
  const { totalAPagar } = useCalcularTotal();
  const handleWhatsAppCheckout = () => {
    const message = carrito
      .map((item) => {
        const precio = Number(item.precio_unidad) || 0;
        const cantidad = Number(item.cantidad) || 0;
        const subtotal = precio * cantidad;

        return `• ${
          item.nombre
        }%0A  Cantidad: ${cantidad}%0A  Precio: S/${precio.toFixed(
          2
        )}%0A  Subtotal: S/${subtotal.toFixed(2)}`;
      })
      .join("%0A%0A");

    const totalMessage = `*TOTAL: S/${totalAPagar}*`;
    const header = `Vendeme`;
    const fullMessage = `${header}${message}%0A%0A${totalMessage}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${fullMessage}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Overlay oscuro */}
      {stateCarrito && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 transition-opacity duration-300"
          onClick={cerrarCarrito}
        />
      )}

      {/* Sidebar del carrito */}
      <div
        className={`fixed top-0 right-0 ${
          stateCarrito ? "translate-x-0" : "translate-x-full"
        } w-full max-w-md bg-white text-black z-50 h-screen transition-transform duration-300 flex flex-col shadow-2xl`}
      >
        {/* Header */}
        <div className="flex items-center justify-between py-4 px-5 border-b border-neutral-200 bg-neutral-50">
          <div>
            <h1 className="font-bold text-2xl">Tu Carrito</h1>
            <p className="text-sm text-neutral-500">
              {carrito.length} {carrito.length === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            onClick={cerrarCarrito}
            className="p-2 rounded-full h-10 w-10 hover:bg-neutral-200 flex items-center justify-center transition-all duration-200"
          >
            <Icon icon="ic:sharp-close" width="24" height="24" />
          </button>
        </div>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto p-4">
          {carrito.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-neutral-400">
              <Icon icon="mdi:cart-outline" width="80" height="80" />
              <p className="mt-4 text-lg font-medium">Tu carrito está vacío</p>
              <p className="text-sm mt-1">¡Agrega productos para comenzar!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {carrito.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 p-3 rounded-xl bg-neutral-50 border border-neutral-200 hover:shadow-md transition-shadow"
                  >
                    {/* Imagen del producto */}
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="w-20 h-20 object-cover rounded-lg border border-neutral-200"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80";
                      }}
                    />

                    {/* Info del producto */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-2">
                          {item.nombre}
                        </h3>
                        <p className="text-xs text-neutral-500 mt-1">
                          S/{item.precio_unidad} c/u
                        </p>
                      </div>

                      {/* Controles de cantidad */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2 bg-white rounded-lg border border-neutral-300 px-2 py-1">
                          <span className="text-sm font-semibold min-w-[24px] text-center">
                            {item.cantidad}
                          </span>
                        </div>
                        <span className="text-sm font-semibold min-w-[24px] text-center flex gap-2">
                          <p>SubTotal:</p>
                          {item.subTotal}
                        </span>
                      </div>
                    </div>

                    {/* Botón eliminar */}
                    <button
                      onClick={() => eliminarDelCarrito(item.id)}
                      className="self-start p-2 hover:bg-red-50 rounded-lg transition-colors group"
                    >
                      <Icon
                        icon="solar:trash-bin-trash-bold"
                        width="20"
                        height="20"
                        className="text-neutral-400 group-hover:text-red-500 transition-colors"
                      />
                    </button>
                  </div>
                );
              })}

              {/* Botón vaciar carrito */}
              {carrito.length > 0 && (
                <button
                  onClick={vaciarCarrito}
                  className="w-full py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                >
                  Vaciar carrito
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer con total y botón de checkout */}
        {carrito.length > 0 && (
          <div className="border-t border-neutral-200 bg-neutral-50 p-5">
            {/* Resumen del total */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">S/{10}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Envío</span>
                <span className="font-medium text-green-600">A calcular</span>
              </div>
              <div className="h-px bg-neutral-200 my-2" />
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold text-black">S/{totalAPagar}</span>
              </div>
            </div>

            {/* Botón de WhatsApp */}
            <button
              onClick={handleWhatsAppCheckout}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Icon icon="ic:baseline-whatsapp" width="24" height="24" />
              Comprar por WhatsApp
            </button>

            <p className="text-xs text-center text-neutral-500 mt-3">
              Serás redirigido a WhatsApp para finalizar tu pedido
            </p>
          </div>
        )}
      </div>
    </>
  );
};
