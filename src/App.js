import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import Contact from './pages/Contact';
import About from './pages/About';
import Sell from './pages/Sell';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/sell" element={<Sell />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}