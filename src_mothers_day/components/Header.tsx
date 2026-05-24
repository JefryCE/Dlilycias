import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../types';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { totalItems, setIsCartOpen } = useCart();
  const [cartBounce, setCartBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Bounce animation when items change
  useEffect(() => {
    if (totalItems > 0) {
      setCartBounce(true);
      const timer = setTimeout(() => setCartBounce(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-sm shadow-lg shadow-rose-100/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart
                className="w-8 h-8 text-rose-500 fill-rose-500 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-bold text-xl tracking-wide transition-colors duration-300 ${
                  scrolled || !isHome ? 'text-rose-700' : 'text-white'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                DLILYCIAS
              </span>
              <span
                className={`text-xs tracking-widest transition-colors duration-300 ${
                  scrolled || !isHome ? 'text-rose-400' : 'text-rose-100'
                }`}
              >
                PASTELERÍA ARTESANAL
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.slice(1).map((cat) => (
              <Link
                key={cat.key}
                to={`/?categoria=${cat.key}`}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-rose-50 hover:text-rose-600 ${
                  scrolled || !isHome ? 'text-stone-600' : 'text-white/90 hover:text-rose-600'
                }`}
              >
                {cat.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full transition-all duration-300 ${
                scrolled || !isHome
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-white hover:bg-white/20'
              } ${cartBounce ? 'cart-bounce' : ''}`}
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
                scrolled || !isHome
                  ? 'text-rose-600 hover:bg-rose-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-sm border-t border-rose-100 shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              to="/"
              className="px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              Todos los productos
            </Link>
            {CATEGORIES.slice(1).map((cat) => (
              <Link
                key={cat.key}
                to={`/?categoria=${cat.key}`}
                className="px-4 py-3 rounded-xl text-stone-700 font-medium hover:bg-rose-50 hover:text-rose-600 transition-colors"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
