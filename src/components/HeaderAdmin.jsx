import { Icon } from "@iconify/react";
import { useAuthStore } from "../stores/AuthStore";
import { useModalStore } from "../stores/ModalStore";
import { useProductosStore } from "../stores/ProductosStore";

export const HeaderAdmin = () => {
  const { setActiveModalForm } = useModalStore();
  const { setAccion } = useProductosStore();
  const { cerrarSesion } = useAuthStore();

  return (
    <header className="bg-black text-white justify-between px-2 md:px-8 py-5 flex items-center w-full shadow-md">
      <h1 className="max-md:text-lg  max-lg:text-xl lg:text-2xl font-bold tracking-tight">
        Bienvenido, Administrador
      </h1>
      <div className="flex gap-3 items-center">
        <button
          onClick={() => {
            setActiveModalForm();
            setAccion("Añadir");
          }}
          className="bg-white text-black px-6 py-2.5 rounded-lg font-semibold cursor-pointer transition-all duration-300 hover:bg-gray-100 active:scale-95 shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Icon icon="fluent-mdl2:circle-addition" width="25" height="25" />{" "}
          <p className="max-md:hidden">Añadir Productos</p>
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2.5 rounded-lg font-semibold cursor-pointer transition-all hover:bg-red-700 active:scale-95 shadow-md hover:shadow-lg flex items-center gap-2"
          onClick={cerrarSesion}
        >
          <Icon icon="basil:logout-solid" width="25" height="25" />
          <p className="max-md:hidden">Cerrar Sesion</p>
        </button>
      </div>
    </header>
  );
};
