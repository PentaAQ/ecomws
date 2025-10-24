import { Icon } from "@iconify/react";
import { useCarritoStore } from "../stores/CarritoStore";
const WHATSAPP_NUMBER = "51906047287";

export const CarritonNavbar = () => {
  const {
    carrito,
    stateCarrito,
    setStateCarrito,
    eliminarDelCarrito,
    aumentarCantidad,
    disminuirCantidad,
    calcularTotal,
  } = useCarritoStore();
  const total = carrito.reduce(
    (sum, item) => sum + item.precio_unidad * item.cantidad,
    0
  );
  const handleWhatsAppCheckout = () => {
    const message = carrito
      .map(
        (item) =>
          `- ${item.nombre} x${item.cantidad} - $${(
            item.precio_unidad * item.cantidad
          ).toFixed(2)}`
      )
      .join("%0A");

    const totalMessage = `Total: $${total.toFixed(2)}`;
    const fullMessage = `Hola, me gustaría comprar:%0A${message}%0A%0A${totalMessage}`;

    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${fullMessage}`,
      "_blank"
    );
  };

  return (
    <div
      className={`fixed top-0 right-0 ${
        stateCarrito ? "-translate-x-0" : "translate-x-full"
      }  w-full max-w-80 bg-white border-l border-l-neutral-300 text-black z-80 h-screen transition-transform duration-300 flex flex-col`}
    >
      <div className="flex items-center justify-between py-5 border-b border-b-neutral-300 px-4">
        <h1 className="font-semibold text-2xl">Tu carrito</h1>
        <button
          onClick={setStateCarrito}
          className="p-2 rounded-full h-10 w-10 hover:bg-black hover:text-white flex items-center justify-center text-black transition-all duration-300"
        >
          <Icon icon="ic:sharp-close" width="24" height="24" />
        </button>
      </div>

      <ul className="p-2 flex flex-col gap-1 flex-1 overflow-y-auto">
        {carrito.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-neutral-400">
            <Icon icon="mdi:cart-outline" width="64" height="64" />
            <p className="mt-2">Tu carrito está vacío</p>
          </div>
        ) : (
          carrito.map((item) => (
            <li
              key={item.id}
              className="h-20 w-full flex gap-2 items-center px-2 rounded-lg bg-neutral-100"
            >
              <img
                src={item.imagen}
                alt={item.nombre}
                className="w-15 h-15 rounded-lg"
              />
              <div className="flex-1">
                <h1 className="font-medium text-sm">{item.nombre}</h1>
                <p className="text-xs text-neutral-500 font-medium">
                  ${item.precio_unidad}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => disminuirCantidad(item.id)}
                    className="w-5 h-5 flex items-center justify-center bg-neutral-200 rounded hover:bg-neutral-300 transition-colors"
                  >
                    <Icon icon="ic:round-minus" width="14" height="14" />
                  </button>
                  <span className="text-sm font-medium min-w-[20px] text-center">
                    {item.cantidad}
                  </span>
                  <button
                    onClick={() => aumentarCantidad(item.id)}
                    className="w-5 h-5 flex items-center justify-center bg-neutral-200 rounded hover:bg-neutral-300 transition-colors"
                  >
                    <Icon icon="ic:round-plus" width="14" height="14" />
                  </button>
                </div>
              </div>
              <button
                onClick={() => eliminarDelCarrito(item.id)}
                className="ml-auto hover:scale-110 transition-transform"
              >
                <Icon
                  icon="cil:trash"
                  width="17"
                  height="17"
                  className="text-red-500"
                />
              </button>
            </li>
          ))
        )}
      </ul>

      {/* Sección del Total */}
      {carrito.length > 0 && (
        <div className="border-t border-neutral-300 p-4 bg-neutral-50">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-semibold">Total:</span>
            <span className="text-2xl font-bold">
              ${calcularTotal().toFixed(2)}
            </span>
          </div>
          <button
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-neutral-800 transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={handleWhatsAppCheckout}
          >
            Proceder al pago
          </button>
        </div>
      )}
    </div>
  );
};
