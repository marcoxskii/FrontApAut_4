import { Link, useLocation } from 'react-router-dom';
import { Monitor, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-400 font-bold" : "text-gray-300 hover:text-white";
  };

  return (
    <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Monitor className="h-8 w-8 text-blue-500" />
              <span className="font-bold text-xl tracking-tight">TecnoCuenca</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}>
                Inicio
              </Link>
              <Link to="/catalogo" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/catalogo')}`}>
                Catálogo
              </Link>
              <Link to="/nosotros" className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/nosotros')}`}>
                Nosotros
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 hover:bg-gray-700">
              Inicio
            </Link>
            <Link to="/catalogo" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Catálogo
            </Link>
            <Link to="/nosotros" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700">
              Nosotros
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
