import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ArrowLeft, Heart, ShoppingBag, Share2, Star, Plus, Minus } from 'lucide-react';
import { getProductById, products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const { addToCart, items, updateQuantity } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const relatedReveal = useScrollReveal<HTMLDivElement>();

  useEffect(() => {
    window.scrollTo(0, 0);
    setQty(1);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <div className="text-6xl mb-4">🌸</div>
          <h2 className="text-2xl font-bold text-stone-700 mb-2">Producto no encontrado</h2>
          <p className="text-stone-400 mb-6">El producto que buscas ya no está disponible</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-3 rounded-full hover:bg-rose-600 transition-colors">
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
      await navigator.share({ title: `${product.name} - DLILYCIAS`, text: product.mothersDayMessage, url: productUrl });
    } else {
      await navigator.clipboard.writeText(productUrl);
      alert('¡Link copiado al portapapeles!');
    }
  };

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <main className="min-h-screen bg-rose-50/30 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-stone-500 hover:text-rose-600 transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al catálogo
        </button>

        <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-rose-100/50 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-square lg:aspect-auto lg:min-h-[500px]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent" />
              {product.tag && (
                <div className="absolute top-4 left-4">
                  <span className="bg-rose-500 text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-lg">{product.tag}</span>
                </div>
              )}
            </div>

            <div className="p-8 sm:p-12 flex flex-col">
              <div className="flex items-start justify-between gap-4 mb-2">
                <span className="bg-rose-50 text-rose-500 text-xs font-bold px-3 py-1.5 rounded-full tracking-widest uppercase">{product.category}</span>
                <button onClick={handleShare} className="p-2 rounded-full text-stone-400 hover:text-rose-500 hover:bg-rose-50 transition-colors" title="Compartir">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-stone-800 mb-4 leading-tight" style={{ fontFamily: 'Georgia, serif' }}>{product.name}</h1>

              <div className="flex items-center gap-1.5 mb-4">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />))}
                <span className="text-stone-400 text-sm ml-1">Producto artesanal</span>
              </div>

              <div className="bg-rose-50 rounded-2xl p-5 mb-6 border-l-4 border-rose-400">
                <p className="text-rose-700 text-sm font-medium leading-relaxed italic">"{product.mothersDayMessage}"</p>
              </div>

              <p className="text-stone-600 leading-relaxed mb-8">{product.description}</p>

              <div className="mt-auto">
                {/* Quantity + Add to cart */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1 bg-rose-50 rounded-xl p-1 border border-rose-100">
                    <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white text-rose-500 transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-lg font-bold text-stone-700">{qty}</span>
                    <button onClick={() => setQty(qty + 1)} className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white text-rose-500 transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={handleAddToCart} className={`flex-1 flex items-center justify-center gap-3 font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 ${added ? 'bg-green-500 shadow-green-200 text-white' : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200 text-white'}`}>
                    <ShoppingBag className="w-5 h-5" />
                    {added ? '¡Agregado! ✓' : 'Agregar al Carrito'}
                  </button>
                  <button onClick={handleShare} className="sm:w-14 py-4 sm:py-0 flex items-center justify-center gap-2 sm:gap-0 border-2 border-rose-200 text-rose-500 rounded-2xl hover:bg-rose-50 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="sm:hidden text-sm font-medium">Compartir</span>
                  </button>
                </div>

                {cartItem && (
                  <p className="text-rose-400 text-xs mt-3 text-center">Ya tienes {cartItem.quantity} en tu carrito</p>
                )}
              </div>
            </div>
          </div>

          <div className="px-8 sm:px-12 py-8 bg-gradient-to-r from-rose-50 to-pink-50 border-t border-rose-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { icon: '🎨', title: 'Hecho a Mano', desc: 'Decoración artesanal con dedicación' },
                { icon: '💝', title: 'Para Mamá', desc: 'Diseñado especialmente para el Día de la Madre' },
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
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400" />
              <h2 className="text-2xl font-bold text-stone-800" style={{ fontFamily: 'Georgia, serif' }}>También te puede gustar</h2>
            </div>
            <div ref={relatedReveal.ref} className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger ${relatedReveal.isVisible ? 'is-visible' : ''}`}>
              {relatedProducts.map((p) => (<ProductCard key={p.id} product={p} />))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
