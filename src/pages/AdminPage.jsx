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
    <main className="flex flex-col min-h-screen bg-neutral-50 text-neutral-900 font-family-sans">
      <HeaderAdmin />
      <Toaster position="bottom-center" />
      <section className="w-full max-w-7xl mx-auto grid max-md:grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 py-6">
        <ProductsCardsAdmin />
        <FiltrosAdmin />
      </section>
      {activeModalForm && <FormProducts />}
      {activeModalEliminar && <ModalEliminar />}
    </main>
  );
};
