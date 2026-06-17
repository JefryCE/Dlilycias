import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Share2, Star, Plus, Minus } from 'lucide-react';
import { getProductById, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface Confetti {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
  tilt: number;
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart, items } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [confettis, setConfettis] = useState<Confetti[]>([]);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);

  const relatedReveal = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setAdded(false);
    setConfettis([]);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-stone-700 mb-2">Producto no encontrado</h2>
          <p className="text-stone-400 mb-6">El producto que buscas ya no está disponible</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-500 text-white px-6 py-3 rounded-full hover:bg-slate-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Volver al catálogo
          </Link>
        </div>
      </div>
    );
  }

  const productUrl = `${window.location.origin}/#/producto/${product.id}`;
  const cartItem = items.find((i) => i.product.id === product.id);

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({ title: `${product.name} - DLILYCIAS`, text: product.fathersDayMessage, url: productUrl });
    } else {
      await navigator.clipboard.writeText(productUrl);
      alert('¡Link copiado al portapapeles!');
    }
  };

  const triggerConfetti = () => {
    const newConfettis = Array.from({ length: 40 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: ['#D4A853', '#f39c12', '#f1c40f', '#f3d68f', '#b88d3d'][Math.floor(Math.random() * 5)],
      delay: Math.random() * 0.4,
      size: Math.random() * 8 + 6,
      tilt: Math.random() * 45,
    }));
    setConfettis(newConfettis);
    setTimeout(() => {
      setConfettis([]);
    }, 3500);
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    triggerConfetti();
    setTimeout(() => setAdded(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-50/30 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-stone-500 hover:text-slate-600 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-100/50 mb-16 border border-stone-100">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            {/* Image zoom wrapper */}
            <div
              className="relative overflow-hidden group/zoom cursor-zoom-in aspect-square lg:aspect-auto lg:min-h-[500px]"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-200 ease-out"
                style={{
                  transformOrigin: isZooming ? `${zoomPos.x}% ${zoomPos.y}%` : 'center center',
                  transform: isZooming ? 'scale(1.8)' : 'scale(1)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent pointer-events-none" />
              {product.tag && (
                <div className="absolute top-4 left-4 pointer-events-none">
                  <span className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-amber-400/30 tracking-wide uppercase">
                    {product.tag}
                  </span>
                </div>
              )}
              {/* Zoom badge helper */}
              <div className="absolute bottom-4 right-4 bg-slate-950/80 backdrop-blur text-white text-xs px-3 py-1.5 rounded-full pointer-events-none opacity-0 group-hover/zoom:opacity-100 transition-opacity duration-300">
                🔍 Mueve para ampliar
              </div>
            </div>

            <div className="p-8 sm:p-12 flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="bg-amber-50 text-amber-700 border border-amber-200/50 text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">
                    {product.category}
                  </span>
                  <button onClick={handleShare} className="p-2.5 rounded-full text-stone-400 hover:text-amber-600 hover:bg-amber-50/50 border border-transparent hover:border-amber-200/30 transition-all duration-300" title="Compartir">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>

                <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>
                  {product.name}
                </h1>

                <div className="flex items-center gap-1.5 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-stone-400 text-xs ml-1 bg-stone-50 border border-stone-200/30 px-2.5 py-0.5 rounded-full">
                    Producto artesanal
                  </span>
                </div>

                <div className="bg-amber-50/50 border border-amber-200/30 rounded-2xl p-5 mb-6 border-l-4 border-amber-500">
                  <p className="text-amber-900 text-sm font-semibold leading-relaxed italic">
                    "{product.fathersDayMessage}"
                  </p>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mb-8">
                  {product.description}
                </p>
              </div>

              <div>
                {/* Quantity + Add to cart */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-stone-50 rounded-xl p-1 border border-stone-200/40">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white text-stone-500 hover:text-stone-700 transition-colors shadow-sm active:scale-95">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-base font-bold text-stone-700">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white text-stone-500 hover:text-stone-700 transition-colors shadow-sm active:scale-95">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex-1 flex items-center justify-center gap-3 font-bold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 border relative overflow-hidden group/btn ${
                      added
                        ? 'bg-green-500 border-green-400 text-white shadow-green-200/50'
                        : 'bg-slate-950 hover:bg-slate-900 border-slate-900 text-white shadow-slate-950/20'
                    }`}
                  >
                    {!added && (
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    )}
                    <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-slate-950 transition-colors duration-300">
                      <ShoppingBag className="w-5 h-5" />
                      {added ? '¡Agregado! ✓' : 'Agregar al Carrito'}
                    </span>
                  </button>
                  <button onClick={handleShare} className="sm:w-14 py-4 sm:py-0 flex items-center justify-center gap-2 sm:gap-0 border-2 border-stone-200 text-stone-500 hover:text-amber-600 hover:bg-amber-50/20 hover:border-amber-200/50 rounded-2xl transition-all duration-300">
                    <Share2 className="w-5 h-5" />
                    <span className="sm:hidden text-sm font-semibold">Compartir</span>
                  </button>
                </div>

                {cartItem && (
                  <p className="text-amber-700 text-xs font-semibold mt-3 text-center">
                    Ya tienes {cartItem.quantity} en tu carrito
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="px-8 sm:px-12 py-8 bg-gradient-to-r from-stone-50 to-stone-50/50 border-t border-stone-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: '🎨', title: 'Hecho a Mano', desc: 'Decoración artesanal con dedicación' },
                { icon: '💝', title: 'Para Papá', desc: 'Diseñado especialmente para el Día del Padre' },
                { icon: '🚀', title: 'Pedido Rápido', desc: 'Coordina tu pedido por WhatsApp' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <div className="font-semibold text-stone-700 text-sm">{item.title}</div>
                    <div className="text-stone-400 text-xs mt-0.5">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Heart className="w-5 h-5 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>
                También te puede gustar
              </h2>
            </div>
            <div ref={relatedReveal.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger ${relatedReveal.isVisible ? 'is-visible' : ''}`}>
              {relatedProducts.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </section>
        )}
      </div>

      {/* Confetti Render */}
      {confettis.map((c) => (
        <div
          key={c.id}
          className="confetti-particle"
          style={{
            left: `${c.x}vw`,
            top: `-20px`,
            backgroundColor: c.color,
            width: `${c.size}px`,
            height: `${c.size * 1.5}px`,
            borderRadius: '2px',
            animationDelay: `${c.delay}s`,
            transform: `rotate(${c.tilt}deg)`,
          }}
        />
      ))}
    </main>
  );
}
