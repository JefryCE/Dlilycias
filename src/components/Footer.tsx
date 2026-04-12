import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../types';

export default function Footer() {
  return (
    <footer className="bg-rose-950 text-rose-100 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Georgia, serif' }}>
                DLILYCIAS
              </span>
            </div>
            <p className="text-rose-300/80 text-sm leading-relaxed">
              Pastelería artesanal con el amor de siempre. Creamos dulces momentos para las
              personas más especiales de tu vida.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Categorías
            </h3>
            <ul className="space-y-2">
              {CATEGORIES.slice(1).map((cat) => (
                <li key={cat.key}>
                  <Link
                    to={`/?categoria=${cat.key}`}
                    className="text-rose-300/80 hover:text-rose-200 text-sm transition-colors"
                  >
                    {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm tracking-wider uppercase">
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/51946499493"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-rose-300/80 hover:text-rose-200 transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                +51 946 499 493
              </a>
              <p className="text-rose-300/80 text-sm">
                Hacemos pedidos con anticipación.
                <br />
                ¡Contáctanos para coordinar!
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-rose-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-rose-400/60 text-sm">
            © 2026 DLILYCIAS — Pastelería Artesanal. Hecho con amor.
          </p>
          <div className="flex items-center gap-1.5 text-rose-400/60 text-sm">
            <Heart className="w-3.5 h-3.5 fill-rose-400/60 text-rose-400/60" />
            <span>Para mamá, siempre lo mejor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
