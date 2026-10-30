import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Catalog from './pages/Catalog';
import BookDetail from './pages/BookDetails';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Navbar />
        <main style={{ minHeight: '80vh', background: '#F9F6F0' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/catalog/:id" element={<BookDetail />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </StoreProvider>
  );
}