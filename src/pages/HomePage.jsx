import { CarritonNavbar } from "../components/CarritonNavbar";
import { HeaderHome } from "../components/HeaderHome";
import { HeroHome } from "../components/HeroHome";
import { ProductosHome } from "../components/ProductosHome";
import { useCarritoStore } from "../stores/CarritoStore";

export const HomePage = () => {
  return (
    <main
      className="h-screen bg-amber-300 text-black font-family-sans relative"
    >
      <HeaderHome/>
      <CarritonNavbar />
      <HeroHome />
      <ProductosHome />
    </main>
  );
};
