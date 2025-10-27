import { Icon } from "@iconify/react";

export const HeroHome = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };
// bg-[#9f856f]
  return (
    <section className="h-screen flex items-center relative bg-neutral-600 overflow-hidden justify-center">
      <h1 className="max-sm:text-8xl text-9xl font-semibold mb-80 uppercase text-center font-Anton max-sm:tracking-[5px] tracking-[20px] word-spacing-title-hero text-[#eae1d1] mx-auto">
        Walk in style
      </h1>
      <div className="absolute w-full h-full bottom-0 max-sm:-mb-10 mx-auto">
        <img
          src="/heroImg-artguru.png"
          alt="Imagen Hero"
          className="w-full h-full object-cover "
        />
      </div>
      <button
        onClick={scrollToProducts}
        className="absolute bottom-10 animate-bounce flex items-center flex-col justify-center cursor-pointer hover:scale-110 transition-transform"
        aria-label="Ir a productos"
      >
        <Icon
          icon="weui:arrow-filled"
          width="20"
          height="40"
          className="rotate-90 text-white "
        />
        <p className="text-white font-semibold animate-pulse">Products</p>
      </button>
    </section>
  );
};
