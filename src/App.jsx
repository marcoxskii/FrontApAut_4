import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import About from './pages/About';
import ScanLaptop from './pages/ScanLaptop';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalogo" element={<Catalog />} />
            <Route path="/scan" element={<ScanLaptop />} />
            <Route path="/nosotros" element={<About />} />
          </Routes>
        </main>
        <footer className="bg-slate-800 text-white p-4 text-center">
          <p>&copy; 2024 TecnoCuenca. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
