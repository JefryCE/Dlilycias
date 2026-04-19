import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Plus } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import AddToCartToast from './AddToCartToast';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowToast(true);
  };

  return (
    <>
      <AddToCartToast
        productName={product.name}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
      <article className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-rose-100/60 border border-rose-50 transition-all duration-500 hover:-translate-y-2 flex flex-col">
        <Link to={`/producto/${product.id}`} className="relative overflow-hidden block aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {product.tag && (
            <div className="absolute top-3 left-3">
              <span className="bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">{product.tag}</span>
            </div>
          )}
          <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleAddToCart(); }} className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-rose-500 hover:text-white text-rose-500" aria-label="Agregar al carrito">
            <Plus className="w-5 h-5" />
          </button>
        </Link>
        <div className="p-4 flex flex-col flex-1">
          <span className="text-rose-400 text-xs font-semibold tracking-widest uppercase mb-1">{product.category}</span>
          <Link to={`/producto/${product.id}`}>
            <h3 className="font-bold text-stone-800 text-base leading-tight mb-2 hover:text-rose-600 transition-colors line-clamp-2">{product.name}</h3>
          </Link>
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 flex-1 mb-3">{product.description}</p>
          <div className="flex gap-2 mt-auto">
            <Link to={`/producto/${product.id}`} className="flex-1 text-center py-2.5 rounded-2xl border-2 border-rose-200 text-rose-600 text-sm font-medium hover:bg-rose-50 transition-colors">Ver detalle</Link>
            <button onClick={handleAddToCart} className="flex items-center gap-1.5 bg-rose-500 text-white text-sm font-semibold px-4 py-2.5 rounded-2xl hover:bg-rose-600 transition-colors shadow-md shadow-rose-200 active:scale-95">
              <ShoppingBag className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
