import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Pre-define background floating particles
const BACKGROUND_PARTICLES = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  size: Math.random() * 8 + 3,
  left: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 6,
  opacity: Math.random() * 0.35 + 0.15,
}));

export default function Hero() {
  const [text, setText] = useState('');
  const [loaded, setLoaded] = useState(false);
  const fullText = 'Endulza el día más especial de papá';

  useEffect(() => {
    setLoaded(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        const char = fullText[index];
        setText((prev) => prev + char);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 60);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-[#1c0f0d]">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, #3a1e17 0%, #1e0e0b 70%, #120705 100%)',
        }}
      />

      {/* Dynamic Floating Gold Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {BACKGROUND_PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute bottom-0 rounded-full bg-gradient-to-t from-amber-400 to-amber-200"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}%`,
              opacity: p.opacity,
              animation: `particleFloat ${p.duration}s infinite linear`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Decorative Blur Orbs */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[30vw] h-[30vw] rounded-full bg-amber-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[25vw] h-[25vw] rounded-full bg-red-800/10 blur-[100px]" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & Content */}
          <div 
            className={`lg:col-span-7 text-center lg:text-left transition-all duration-1000 transform ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md rounded-full px-5 py-2 border border-white/10 mb-6 shadow-lg">
              <Sparkles className="w-4 h-4 text-[#D4A853] animate-pulse" />
              <span className="text-white/80 text-xs font-semibold tracking-widest uppercase">
                Edición Especial Día del Padre
              </span>
              <Sparkles className="w-4 h-4 text-[#D4A853] animate-pulse" />
            </div>

            {/* Title */}
            <h1
              className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-4 leading-none tracking-tight"
              style={{ textShadow: '0 4px 24px rgba(0,0,0,0.4)' }}
            >
              DLILYCIAS
            </h1>

            {/* Typewriter Subtitle */}
            <div className="h-10 sm:h-12 mb-4">
              <p
                className="text-xl sm:text-2xl md:text-3xl text-amber-200/90 font-light italic typewriter-cursor inline"
              >
                {text}
              </p>
            </div>

            {/* Description */}
            <p className="text-white/70 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed font-light">
              Tortas temáticas, finos chocolates, alfajores artesanales y postres exclusivos, creados con la máxima dedicación y envueltos en detalles de lujo para celebrar a papá como se merece.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href={`https://wa.me/51946499493?text=${encodeURIComponent('Hola, quisiera hacer un pedido de Dlilycias para el Día del Padre.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 backdrop-blur-sm text-white font-medium px-8 py-4 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Diseño Personalizado
              </a>
            </div>

            {/* Stats Card */}
            <div className="mt-14 p-6 bg-white/[0.02] backdrop-blur-md rounded-3xl border border-white/[0.05] grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              {[
                { num: '7+', label: 'Categorías' },
                { num: '100%', label: 'Artesanal' },
                { num: '★ Premium', label: 'Ingredientes' },
              ].map((stat) => (
                <div key={stat.label} className="text-center border-r border-white/5 last:border-0">
                  <div className="text-xl sm:text-2xl font-bold text-[#D4A853]">{stat.num}</div>
                  <div className="text-white/50 text-[11px] sm:text-xs mt-1 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Floating Premium Image Composition */}
          <div 
            className={`lg:col-span-5 flex justify-center items-center transition-all duration-1000 delay-300 transform ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Decorative Gold Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#D4A853]/40 animate-[spin_80s_linear_infinite]" />
              
              {/* Product Card Glass Container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl animate-float">
                <img
                  src="https://res.cloudinary.com/dqcp8rmuz/image/upload/v1781493566/Gemini_Generated_Image_xw9601xw9601xw96_hjvsrl.png"
                  alt="Empanadas Rellenas Dlilycias Especial"
                  className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-[2000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
                
                {/* Overlay Text */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                  <span className="bg-[#D4A853] text-stone-950 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    Destacado
                  </span>
                  <h3 className="text-white font-bold text-lg mt-1 tracking-wide">Empanadas Rellenas</h3>
                </div>
              </div>

              {/* Float Floating Badges */}
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-stone-950 text-[10px] font-black w-14 h-14 rounded-full flex flex-col justify-center items-center shadow-lg border border-yellow-300 animate-pulse">
                <span>DÍA DEL</span>
                <span className="leading-none text-xs">PADRE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Wave bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pointer-events-none">
        <svg viewBox="0 0 1440 60" className="w-full" preserveAspectRatio="none">
          <path d="M0,60 L0,30 Q360,0 720,30 Q1080,60 1440,30 L1440,60 Z" fill="#faf6f0" />
        </svg>
      </div>
    </section>
  );
}
