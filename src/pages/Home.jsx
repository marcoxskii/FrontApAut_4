import { Link } from 'react-router-dom';
import { ArrowRight, Cpu, Laptop, Recycle, ShieldCheck, Camera } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-slate-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">Laptops de segunda vida</span>{' '}
                  <span className="block text-blue-500 xl:inline">calidad de primera</span>
                </h1>
                <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Dale una segunda oportunidad a la tecnología. Laptops empresariales y de alto rendimiento a una fracción de su precio original.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-3">
                  <div className="rounded-md shadow">
                    <Link
                      to="/catalogo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Ver Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-slate-800 flex items-center justify-center">
            {/* Placeholder for Hero Image */}
            <div className="text-slate-600">
                <Laptop size={300} strokeWidth={0.5} />
            </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Economía Circular</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Tecnología Sustentable en Cuenca
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Laptop className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Equipos Grado A</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Seleccionamos solo equipos en excelentes condiciones estéticas y funcionales (ThinkPads, Dell Latitude, HP EliteBook).
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <Recycle className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Eco-Friendly</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Reducimos la huella de carbono extendiendo la vida útil de equipos corporativos de alta gama.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <ShieldCheck className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Garantía de 6 Meses</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Todos nuestros equipos seminuevos pasan por 20 puntos de control y cuentan con garantía local.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
