import { CATEGORIES } from '../types';
import { products } from '../data/products';

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

const categoryIcons: Record<string, string> = {
  ALL: '✨',
  ALFAJORES: '🍪',
  TORTA: '🎂',
  BROWNIE: '🍫',
  HABANITO: '🥖',
  CHOCOLATE: '🍬',
  MIXTO: '🎁',
  EMPANADAS: '🥟',
};

export default function CategoryFilter({ active, onChange }: Props) {
  // Dynamically calculate product counts per category
  const categoryCounts = CATEGORIES.reduce((acc, cat) => {
    if (cat.key === 'ALL') {
      acc[cat.key] = products.length;
    } else {
      acc[cat.key] = products.filter((p) => p.category === cat.key).length;
    }
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex gap-2.5 min-w-max px-1 py-1">
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => onChange(cat.key)}
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 ${
                isActive
                  ? 'bg-[#D4A853] text-stone-950 shadow-lg shadow-[#D4A853]/25 scale-105'
                  : 'bg-white text-stone-600 border border-slate-100 hover:border-slate-300 hover:text-stone-800 hover:shadow-md'
              }`}
            >
              <span className="text-sm transition-transform duration-300 group-hover:scale-125 group-hover:rotate-6">
                {categoryIcons[cat.key]}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold transition-colors duration-300 ${
                  isActive
                    ? 'bg-stone-900/10 text-stone-900'
                    : 'bg-stone-100 text-stone-400 group-hover:bg-stone-200 group-hover:text-stone-600'
                }`}
              >
                {categoryCounts[cat.key]}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
