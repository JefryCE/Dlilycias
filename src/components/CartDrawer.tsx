import { useEffect, useRef } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Send } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    if (isCartOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isCartOpen, setIsCartOpen]);

  const buildWhatsAppMessage = () => {
    let message = '🌸 *Pedido de Dlilycias — Día de la Madre 2026* 🌸\n\n';
    items.forEach((item, index) => {
      message += `${index + 1}. *${item.product.name}* x${item.quantity}\n`;
    });
    message += `\n¡Gracias por su atención! 🎀`;
    return message;
  };

  const handleSendWhatsApp = () => {
    const message = buildWhatsAppMessage();
    const url = `https://wa.me/51946499493?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isCartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-[70] flex flex-col transition-transform duration-500 ease-out ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-rose-100 bg-gradient-to-r from-rose-50 to-pink-50">
          <div className="flex items-center gap-3">
            <div className="bg-rose-500 p-2 rounded-xl shadow-md shadow-rose-200">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2
                className="text-lg font-bold text-stone-800"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Tu Pedido
              </h2>
              <p className="text-xs text-stone-400">
                {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-rose-100 text-stone-400 hover:text-rose-600 transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-10 h-10 text-rose-300" />
              </div>
              <h3 className="text-lg font-semibold text-stone-600 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-stone-400 text-sm max-w-[250px]">
                Explora nuestro catálogo y agrega los dulces favoritos para mamá
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 bg-rose-500 text-white text-sm font-semibold rounded-full hover:bg-rose-600 transition-colors shadow-md shadow-rose-200"
              >
                Ver catálogo
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 bg-rose-50/50 rounded-2xl p-3 border border-rose-100/60 cart-item-enter"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-stone-700 truncate">
                      {item.product.name}
                    </h4>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold text-stone-700">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-rose-200 text-rose-500 hover:bg-rose-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1.5 rounded-lg text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-rose-100 px-6 py-5 bg-white">


            <button
              onClick={handleSendWhatsApp}
              className="w-full flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-green-200 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-base"
            >
              <Send className="w-5 h-5" />
              Enviar pedido por WhatsApp
            </button>

            <button
              onClick={clearCart}
              className="w-full mt-3 text-stone-400 hover:text-red-500 text-sm font-medium py-2 transition-colors"
            >
              Vaciar carrito
            </button>

            <p className="text-stone-300 text-[11px] text-center mt-2 leading-relaxed">
              Se abrirá WhatsApp con el resumen de tu pedido
            </p>
          </div>
        )}
      </div>
    </>
  );
}
