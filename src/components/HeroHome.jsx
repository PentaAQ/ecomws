import { Icon } from "@iconify/react";

export const HeroHome = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById("productos");
    productsSection?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <section className="relative overflow-hidden pt-20 sm:pt-24">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-neutral-100" />
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-neutral-200/60 blur-3xl" />
      <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-neutral-300/50 blur-3xl" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs sm:text-sm font-semibold tracking-[0.18em] text-neutral-500 uppercase">
              Catálogo
            </p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900">
              Productos elegantes para un sistema moderno
            </h1>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 max-w-xl">
              Explora el catálogo, busca rápidamente y agrega al carrito con una experiencia clara y minimalista.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center h-11 px-5 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
              >
                Ver productos
              </button>
              <button
                onClick={scrollToProducts}
                className="inline-flex items-center justify-center h-11 px-4 rounded-xl border border-neutral-200 bg-white text-neutral-900 font-semibold hover:bg-neutral-50 transition-colors"
                aria-label="Ir a productos"
              >
                <Icon icon="weui:arrow-filled" width="16" height="16" className="rotate-90" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-white" />
              <div className="relative p-4 sm:p-6">
                <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-50">
                  <img
                    src="/heroImg-artguru.png"
                    alt="Imagen Hero"
                    className="w-full h-[260px] sm:h-[320px] object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-900">Selección destacada</p>
                  <p className="text-sm text-neutral-500">Entrega rápida</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
