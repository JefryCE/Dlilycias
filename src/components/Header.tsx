import { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { Menu, X, Heart, ShoppingBag } from 'lucide-react';
import { CATEGORIES } from '../types';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === '/';
  const { totalItems, setIsCartOpen } = useCart();
  const [cartBounce, setCartBounce] = useState(false);
  const [searchParams] = useSearchParams();
  const activeCat = searchParams.get('categoria') || 'ALL';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
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
          ? 'bg-white/95 backdrop-blur-sm shadow-lg shadow-slate-100/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-[#D4A853] transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart
                className="w-8 h-8 text-[#D4A853] fill-[#D4A853] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span
                className={`font-bold text-xl tracking-wide transition-colors duration-300 shimmer-logo ${
                  scrolled || !isHome ? 'text-stone-800' : 'text-white'
                }`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                DLILYCIAS
              </span>
              <span
                className={`text-[10px] tracking-widest font-semibold transition-colors duration-300 ${
                  scrolled || !isHome ? 'text-stone-400' : 'text-white/70'
                }`}
              >
                PASTELERÍA ARTESANAL
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1.5 bg-black/5 rounded-full p-1 border border-white/5">
            {CATEGORIES.slice(1).map((cat) => {
              const isActive = activeCat === cat.key;
              return (
                <Link
                  key={cat.key}
                  to={`/?categoria=${cat.key}`}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-[#D4A853] text-stone-950 shadow-md shadow-[#D4A853]/15'
                      : scrolled || !isHome
                      ? 'text-stone-600 hover:text-stone-950 hover:bg-stone-100/60'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* Cart button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-2.5 rounded-full transition-all duration-300 ${
                scrolled || !isHome
                  ? 'text-slate-600 hover:bg-slate-50'
                  : 'text-white hover:bg-white/20'
              } ${cartBounce ? 'cart-bounce' : ''}`}
              aria-label="Abrir carrito"
            >
              <ShoppingBag className="w-6 h-6 transition-transform hover:scale-105 active:scale-95" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A853] text-stone-950 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-md border-2 border-white animate-[pulse_2s_infinite]">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors duration-300 ${
                scrolled || !isHome
                  ? 'text-slate-600 hover:bg-slate-50'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-sm border-t border-slate-100 shadow-lg animate-[cartItemSlide_0.3s_ease]">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1.5">
            <Link
              to="/"
              className={`px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                activeCat === 'ALL'
                  ? 'bg-[#D4A853] text-stone-950'
                  : 'text-stone-700 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              Todos los productos
            </Link>
            {CATEGORIES.slice(1).map((cat) => {
              const isActive = activeCat === cat.key;
              return (
                <Link
                  key={cat.key}
                  to={`/?categoria=${cat.key}`}
                  className={`px-4 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                    isActive
                      ? 'bg-[#D4A853] text-stone-950'
                      : 'text-stone-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
