import { CATEGORIES } from '../types';

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

const categoryIcons: Record<string, string> = {
  ALL: '✨',
  ALFAJORES: '🍪',
  CUPCAKES: '🧁',
  DONAS: '🍩',
  MACETA: '🌸',
  PIE: '🥧',
  TARTALETA: '🍓',
  TORTA: '🎂',
};

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className="w-full overflow-x-auto pb-2 hide-scrollbar">
      <div className="flex gap-2 min-w-max px-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onChange(cat.key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              active === cat.key
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-105'
                : 'bg-white text-stone-600 border border-rose-100 hover:border-rose-300 hover:text-rose-600 hover:shadow-md'
            }`}
          >
            <span>{categoryIcons[cat.key]}</span>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
