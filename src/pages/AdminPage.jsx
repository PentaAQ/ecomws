import { Toaster } from "sonner";
import { FormProducts } from "../components/FormProducts";
import { HeaderAdmin } from "../components/HeaderAdmin";
import { ProductsCardsAdmin } from "../components/ProductsCardsAdmin";
import { useModalStore } from "../stores/ModalStore";
import { ModalEliminar } from "../components/ModalEliminar";
import { FiltrosAdmin } from "../components/FiltrosAdmin";

export const AdminPage = () => {
  const { activeModalForm, activeModalEliminar } = useModalStore();
  return (
    <main className="flex flex-col bg-white h-screen overflow-hidden font-family-sans">
      <HeaderAdmin />
      <Toaster position="bottom-center" />
      <section className="grid max-md:grid-cols-1 md:grid-cols-3 max-h-screen gap-6 p-6">
        <ProductsCardsAdmin />
        <FiltrosAdmin />
      </section>
      {activeModalForm && <FormProducts />}
      {activeModalEliminar && <ModalEliminar />}
    </main>
  );
};
