export const HeroHome = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white pt-24 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-20 min-h-screen flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight text-balance">
              Camina con Estilo
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 text-balance leading-relaxed">
              Descubre nuestra colección exclusiva de zapatillas premium.
              Diseño, comodidad y calidad en cada paso.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#productos"
                className="px-6 sm:px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 active:scale-95 text-center"
              >
                Explorar Productos
              </a>
            </div>
          </div>

          <div className="relative h-64 sm:h-80 lg:h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src="/premium-sneakers-shoes-display.jpg"
                alt="Zapatillas Premium"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
