import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Hero from '../components/Hero';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('categoria') || 'ALL';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const catalogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (cat) {
      setActiveCategory(cat);
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [searchParams]);

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

  return (
    <main>
      <Hero />

      <section
        id="catalogo"
        ref={catalogRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-500 text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-wider uppercase">
            Día de la Madre 2025
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Nuestro Catálogo
          </h2>
          <p className="text-stone-500 text-lg max-w-xl mx-auto">
            Dulces hechos con amor artesanal para celebrar a la mujer más especial
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
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-rose-100 focus:outline-none focus:ring-2 focus:ring-rose-200 focus:border-rose-300 text-sm bg-white shadow-sm"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌸</div>
            <h3 className="text-xl font-semibold text-stone-600 mb-2">
              No encontramos productos
            </h3>
            <p className="text-stone-400">Intenta con otra categoría o término de búsqueda</p>
          </div>
        ) : (
          <>
            <p className="text-stone-400 text-sm mb-6">
              Mostrando{' '}
              <span className="font-semibold text-stone-600">{filtered.length}</span>{' '}
              {filtered.length === 1 ? 'producto' : 'productos'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="bg-rose-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2
            className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¿Lista tu sorpresa para mamá?
          </h2>
          <p className="text-stone-500 mb-8 text-lg">
            Escríbenos por WhatsApp y con gusto te ayudamos a elegir el dulce perfecto
          </p>
          <a
            href={`https://wa.me/51946499493?text=${encodeURIComponent('Hola, quisiera hacer un pedido de Dlilycias para el Día de la Madre.')}`}
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
