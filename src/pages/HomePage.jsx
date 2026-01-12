import { CarritonNavbar } from "../components/CarritonNavbar";
import { HeaderHome } from "../components/HeaderHome";
import { HeroHome } from "../components/HeroHome";
import { ProductosHome } from "../components/ProductosHome";
import { useCarritoStore } from "../stores/CarritoStore";

export const HomePage = () => {
  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 font-family-sans">
      <HeaderHome />
      <CarritonNavbar />
      <HeroHome />
      <ProductosHome />
    </main>
  );
};
