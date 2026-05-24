import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface Props {
  productName: string;
  show: boolean;
  onClose: () => void;
}

export default function AddToCartToast({ productName, show, onClose }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !visible) return null;

  return (
    <div
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-[80] transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className="flex items-center gap-3 bg-white border border-rose-100 shadow-2xl shadow-rose-200/40 rounded-2xl px-5 py-3.5">
        <div className="bg-green-100 p-1.5 rounded-full">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">¡Agregado al carrito!</p>
          <p className="text-xs text-stone-400 truncate max-w-[200px]">{productName}</p>
        </div>
      </div>
    </div>
  );
}
