import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, ChevronDown, RefreshCw } from 'lucide-react';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PAGE_SIZE = 8;

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'ALL';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const catalogRef = useRef<HTMLElement>(null);

  const catalogReveal = useScrollReveal<HTMLDivElement>();
  const ctaReveal = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) {
      setActiveCategory(cat);
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchParams]);

  // Reset visible count when filter/search changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, searchTerm]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    if (cat === 'ALL') {
      searchParams.delete('categoria');
    } else {
      searchParams.set('categoria', cat);
    }
    setSearchParams(searchParams);
  };

  const filtered = products.filter((p) => {
    const matchesCategory = activeCategory === 'ALL' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const paginated = filtered.slice(0, visibleCount);

  return (
    <main>
      <Hero />

      <Countdown />

      <section
        id="catalogo"
        ref={catalogRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div
          ref={catalogReveal.ref}
          className={`text-center mb-12 scroll-reveal ${catalogReveal.isVisible ? 'is-visible' : ''}`}
        >
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 border border-amber-200/50 text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wider uppercase">
            Día del Padre 2026
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestro Catálogo
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Dulces hechos con amor artesanal para celebrar al hombre más especial
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <CategoryFilter active={activeCategory} onChange={handleCategoryChange} />
          </div>
          <div className="relative sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar producto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white shadow-sm transition-all"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-white/40 backdrop-blur-md border border-stone-200/50 rounded-3xl p-8 max-w-lg mx-auto shadow-sm">
            <div className="text-6xl mb-4 animate-bounce duration-1000">🔍</div>
            <h3 className="text-2xl font-bold text-stone-700 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              No encontramos productos
            </h3>
            <p className="text-stone-500 mb-6">
              Intenta buscando con otra palabra o borrando los filtros activos.
            </p>
            {(activeCategory !== 'ALL' || searchTerm !== '') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  handleCategoryChange('ALL');
                }}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold shadow-md shadow-amber-500/10 hover:shadow-lg hover:scale-105 transition-all duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-sm mb-6">
              Mostrando{' '}
              <span className="font-semibold text-stone-600">{paginated.length}</span>
              {' '}de{' '}
              <span className="font-semibold text-stone-600">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'producto' : 'productos'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginated.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filtered.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="relative group overflow-hidden px-8 py-3.5 rounded-full bg-slate-950 text-white font-bold tracking-wide shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border border-amber-500/20"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative z-10 flex items-center gap-2 group-hover:text-slate-950 transition-colors duration-300">
                    Cargar más productos
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <section className="relative py-16">
        <div
          ref={ctaReveal.ref}
          className={`max-w-4xl mx-auto px-4 text-center scroll-reveal-scale ${ctaReveal.isVisible ? 'is-visible' : ''}`}
        >
          <h2
            className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Lista tu sorpresa para papá?
          </h2>
          <p className="text-stone-500 mb-8 text-lg">
            Escríbenos por WhatsApp y con gusto te ayudamos a elegir el dulce perfecto
          </p>
          <a
            href={`https://wa.me/51946499493?text=${encodeURIComponent('Hola, quisiera hacer un pedido de Dlilycias para el Día del Padre.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-green-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 text-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
