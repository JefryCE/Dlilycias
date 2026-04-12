import { Heart, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #be123c 0%, #e11d48 25%, #f43f5e 50%, #fb7185 75%, #fda4af 100%)',
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              opacity: 0.15 + Math.random() * 0.2,
            }}
          >
            <Heart
              className="fill-white text-white"
              style={{ width: `${12 + Math.random() * 24}px`, height: `${12 + Math.random() * 24}px` }}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30">
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span className="text-white/90 text-sm font-medium tracking-widest uppercase">
              Edición Especial Día de la Madre
            </span>
            <Sparkles className="w-4 h-4 text-amber-200" />
          </div>
        </div>

        <h1
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-tight"
          style={{ fontFamily: 'Georgia, serif', textShadow: '0 2px 20px rgba(0,0,0,0.15)' }}
        >
          DLILYCIAS
        </h1>

        <p
          className="text-2xl sm:text-3xl text-rose-100 mb-3 font-light italic"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Endulza el día más especial de mamá
        </p>

        <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Tortas, cupcakes, macetas y más, hechos con amor artesanal para celebrar a la mujer
          más importante de tu vida.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#catalogo"
            className="inline-flex items-center gap-2 bg-white text-rose-600 font-semibold px-8 py-4 rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            Ver Catálogo Completo
          </a>
          <a
            href={`https://wa.me/51946499493?text=${encodeURIComponent('Hola, quisiera ver el catálogo de Dlilycias para el Día de la Madre 💕')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold px-8 py-4 rounded-full border border-white/40 hover:bg-white/30 hover:-translate-y-1 transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Pedir por WhatsApp
          </a>
        </div>

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto">
          {[
            { num: '7+', label: 'Categorías' },
            { num: '100%', label: 'Artesanal' },
            { num: '♥', label: 'Con Amor' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.num}</div>
              <div className="text-white/70 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z" fill="#fff8f8" />
        </svg>
      </div>
    </section>
  );
}
