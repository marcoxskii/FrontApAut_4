import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Camera } from 'lucide-react';

const products = [
  { id: 1, name: "Lenovo ThinkPad T480", category: "Negocios", price: 350.00, image: "https://m.media-amazon.com/images/I/61s8gH5vL+L._AC_SL1500_.jpg", specs: "i5-8350U, 16GB RAM, 256GB SSD", condition: "Excelente" },
  { id: 2, name: "Dell Latitude 7490", category: "Negocios", price: 320.00, image: "https://m.media-amazon.com/images/I/71R2o5-Kq8L._AC_SL1500_.jpg", specs: "i7-8650U, 16GB RAM, 512GB SSD", condition: "Bueno" },
  { id: 3, name: "MacBook Pro 13\" 2015", category: "Diseño", price: 450.00, image: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP715/SP715-macbook_pro_13-inch_early_2015.jpg", specs: "i5 Dual-Core, 8GB RAM, 256GB SSD", condition: "Bueno" },
  { id: 4, name: "HP EliteBook 840 G5", category: "Negocios", price: 340.00, image: "https://m.media-amazon.com/images/I/71WkDPw3+DL._AC_SL1500_.jpg", specs: "i5-8250U, 16GB RAM, 256GB SSD", condition: "Como Nuevo" },
  { id: 5, name: "Dell XPS 13 9360", category: "Ultrabook", price: 400.00, image: "https://m.media-amazon.com/images/I/71O69Z-0c+L._AC_SL1500_.jpg", specs: "i7-7500U, 8GB RAM, 256GB SSD", condition: "Bueno" },
  { id: 6, name: "Lenovo Yoga 370", category: "2-en-1", price: 280.00, image: "https://m.media-amazon.com/images/I/41K-oX1-VlL._AC_.jpg", specs: "i5-7300U, 8GB RAM, 256GB SSD, Touch", condition: "Regular" },
  { id: 7, name: "HP ProBook 450 G6", category: "Estudiantes", price: 380.00, image: "https://m.media-amazon.com/images/I/61E+mlC1XbL._AC_SL1000_.jpg", specs: "i5-8265U, 16GB RAM, 500GB HDD", condition: "Excelente" },
  { id: 8, name: "MacBook Air 2017", category: "Estudiantes", price: 300.00, image: "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP753/macbook-air-2017.png", specs: "i5, 8GB RAM, 128GB SSD", condition: "Bueno" },
  { id: 9, name: "Acer Aspire 5 (Usada)", category: "Hogar", price: 250.00, image: "https://m.media-amazon.com/images/I/71+Xj+4s+0L._AC_SL1500_.jpg", specs: "Ryzen 3, 8GB RAM, 256GB SSD", condition: "Bueno" },
  { id: 10, name: "ThinkPad X1 Carbon Gen 6", category: "Premium", price: 550.00, image: "https://m.media-amazon.com/images/I/61k-g5k-0HL._AC_SL1200_.jpg", specs: "i7-8650U, 16GB RAM, 512GB SSD", condition: "Excelente" },
  { id: 11, name: "Dell Precision 5530", category: "Workstation", price: 700.00, image: "https://m.media-amazon.com/images/I/61v4uXbYtCL._AC_SL1000_.jpg", specs: "i7-8850H, 32GB RAM, Quadro P1000", condition: "Bueno" },
  { id: 12, name: "Asus ZenBook 14 (2019)", category: "Ultrabook", price: 420.00, image: "https://m.media-amazon.com/images/I/81x+r2I+4LL._AC_SL1500_.jpg", specs: "i5-8265U, 8GB RAM, 512GB SSD", condition: "Algunos rasguños" },
];

const categories = ["Todos", ...new Set(products.map(p => p.category))];

export default function Catalog() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Laptops Seminuevas</h1>
            <Link 
              to="/scan" 
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              <Camera className="h-5 w-5" />
              <span>Escanear con IA</span>
            </Link>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
          
          {/* Categories */}
          <div className="flex overflow-x-auto pb-2 md:pb-0 space-x-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-64"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="h-48 bg-gray-200 relative overflow-hidden group">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.condition}
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-sm text-blue-600 mb-1">{product.category}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 truncate" title={product.name}>{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.specs}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    <button className="p-2 bg-blue-100 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors duration-200">
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No se encontraron productos.</p>
          </div>
        )}
      </div>
    </div>
  );
}
