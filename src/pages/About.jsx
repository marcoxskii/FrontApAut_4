import { MapPin, Mail, Phone, Users, Clock } from 'lucide-react';

export default function About() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div className="bg-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Sobre Nosotros</h1>
          <p className="mt-4 text-xl text-blue-200">
            Líderes en renovación tecnológica y economía circular en Cuenca.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-6">Nuestra Misión</h2>
            <p className="text-lg text-gray-600 mb-6">
              En TecnoCuenca creemos que la mejor tecnología no tiene por qué ser nueva. Nos especializamos 
              en la recuperación, certificación y venta de laptops de segunda mano (clase empresarial) 
              para ofrecerte equipos potentes a precios accesibles.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Utilizamos Inteligencia Artificial de vanguardia para catalogar y verificar nuestros equipos, 
              garantizando transparencia total en cada compra.
            </p>
            
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                <Users className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                    <p className="font-bold text-gray-900">Equipo Experto</p>
                    <p className="text-sm text-gray-500">Asesoría técnica real</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-slate-50 rounded-lg">
                <Clock className="h-10 w-10 text-blue-500 mr-4" />
                <div>
                    <p className="font-bold text-gray-900">14 Años</p>
                    <p className="text-sm text-gray-500">De experiencia</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-100 rounded-2xl p-8 h-full flex flex-col justify-center">
             <h3 className="text-2xl font-bold text-gray-900 mb-6">Visítanos en Cuenca</h3>
             
             <div className="space-y-6">
                <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-gray-900">Dirección Principal</p>
                        <p className="text-gray-600">Av. Remigio Crespo y Agustín Cueva</p>
                        <p className="text-gray-600">Cuenca, Ecuador</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-gray-900">Teléfono</p>
                        <p className="text-gray-600">(07) 281-1234 / 099-123-4567</p>
                    </div>
                </div>

                <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-600 mt-1 mr-4 flex-shrink-0" />
                    <div>
                        <p className="font-medium text-gray-900">Email</p>
                        <p className="text-gray-600">ventas@tecnocuenca.com.ec</p>
                    </div>
                </div>
             </div>
             
             <div className="mt-8 aspect-video bg-gray-300 rounded-lg flex items-center justify-center">
                 <span className="text-gray-500 font-medium">[Mapa de Google Maps]</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
