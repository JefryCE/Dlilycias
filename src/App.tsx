import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-rose-50/20">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/producto/:id" element={<ProductPage />} />
          </Routes>
        </div>
        <Footer />
        <WhatsAppButton />
      </div>
    </HashRouter>
  );
}
