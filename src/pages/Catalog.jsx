import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Loader2 } from 'lucide-react';
import ChatWidget from '../components/ChatWidget';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["Todos"]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:9000/api/computers');
      if (res.ok) {
        const data = await res.json();
        // Adapt API response to Catalog UI structure
        const adaptedProducts = data.map((item, index) => ({
            id: index + 101, // arbitrary ID
            name: `${item.brand} (Ref: ${item.code})`,
            category: item.brand, // Using Brand as Category for simplicity
            price: item.price,
            image: getImageForBrand(item.brand),
            specs: item.description,
            condition: "Excelentes Condiciones"
        }));
        setProducts(adaptedProducts);
        
        const cats = ["Todos", ...new Set(adaptedProducts.map(p => p.category))];
        setCategories(cats);
        
      } else {
        throw new Error("Failed to load");
      }
    } catch (e) {
      console.warn("Using fallback inventory");
      // Fallback only if backend fails
      const fallback = [
         { id: 1, name: "Dell SKU-1", category: "Dell", price: 1200, specs: "Laptop Dell", image: getImageForBrand('Dell'), condition: "Good" },
         { id: 2, name: "HP SKU-2", category: "HP", price: 800, specs: "Laptop HP", image: getImageForBrand('HP'), condition: "Good" },
         { id: 3, name: "Apple SKU-3", category: "Apple", price: 2000, specs: "MacBook", image: getImageForBrand('Apple'), condition: "Excellent" }
      ];
      setProducts(fallback);
      setCategories(["Todos", "Dell", "HP", "Apple"]);
    } finally {
        setLoading(false);
    }
  };

  const getImageForBrand = (brand) => {
      const b = brand.toLowerCase();
      if(b.includes('dell')) return "https://m.media-amazon.com/images/I/71R2o5-Kq8L._AC_SL1500_.jpg";
      if(b.includes('hp')) return "https://m.media-amazon.com/images/I/71WkDPw3+DL._AC_SL1500_.jpg";
      if(b.includes('apple') || b.includes('mac')) return "https://support.apple.com/library/APPLE/APPLECARE_ALLGEOS/SP715/SP715-macbook_pro_13-inch_early_2015.jpg";
      return "https://m.media-amazon.com/images/I/61s8gH5vL+L._AC_SL1500_.jpg"; // Default Lenovo
  };

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
            {/* Removed the Scan button, now using ChatWidget */}
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
        {loading ? (
             <div className="flex justify-center py-20">
                <div className="flex flex-col items-center">
                    <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                    <p className="text-gray-500">Cargando inventario...</p>
                </div>
             </div>
        ) : filteredProducts.length > 0 ? (
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
      <ChatWidget />
    </div>
  );
}
