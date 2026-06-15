import { useState, useRef } from 'react';
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 12; // vertical angle
    const rotateY = (x - xc) / 12; // horizontal angle

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-in-out',
    });
  };

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      <article
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={tiltStyle}
        className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-[#D4A853]/10 border border-slate-100 transition-all duration-500 flex flex-col h-full"
      >
        <Link to={`/producto/${product.id}`} className="relative overflow-hidden block aspect-square bg-slate-50">
          {/* Shimmer skeleton for image loading */}
          {!imageLoaded && <div className="absolute inset-0 shimmer-bg z-10" />}
          
          <img
            src={product.image}
            alt={product.name}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1200ms] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {product.tag && (
            <div className="absolute top-3 left-3 z-20">
              <span className="bg-[#D4A853] text-stone-950 text-[10px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-sm bg-opacity-90">
                {product.tag}
              </span>
            </div>
          )}
          
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 bg-[#D4A853] text-stone-950 p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#b88d3d] hover:scale-110 active:scale-95 z-20"
            aria-label="Agregar al carrito"
          >
            <Plus className="w-5 h-5" />
          </button>
        </Link>
        
        <div className="p-5 flex flex-col flex-1">
          <span className="text-[#D4A853] text-[10px] font-bold tracking-widest uppercase mb-1">
            {product.category}
          </span>
          <Link to={`/producto/${product.id}`}>
            <h3 className="font-bold text-stone-800 text-base leading-tight mb-2 hover:text-[#D4A853] transition-colors line-clamp-2">
              {product.name}
            </h3>
          </Link>
          <p className="text-stone-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
            {product.description}
          </p>
          <div className="flex gap-2.5 mt-auto">
            <Link
              to={`/producto/${product.id}`}
              className="flex-1 text-center py-2.5 rounded-2xl border-2 border-stone-200 text-stone-600 text-xs font-semibold hover:border-[#D4A853] hover:text-[#D4A853] transition-colors"
            >
              Ver detalle
            </Link>
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 bg-[#D4A853] hover:bg-[#b88d3d] text-stone-950 text-xs font-bold px-4 py-2.5 rounded-2xl transition-all shadow-md shadow-[#D4A853]/15 active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              Agregar
            </button>
          </div>
        </div>
      </article>
    </>
  );
}
