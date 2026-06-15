import { useState, useEffect } from 'react';
import { Clock, Gift } from 'lucide-react';

// Día del Padre en Perú 2026: tercer domingo de junio = 21 de junio 2026
const FATHERS_DAY = new Date('2026-06-21T00:00:00-05:00');
const START_DATE = new Date('2026-06-01T00:00:00-05:00').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = FATHERS_DAY.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  const paddedValue = String(value).padStart(2, '0');
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative select-none flip-card-wrapper shadow-[0_15px_30px_-5px_rgba(0,0,0,0.5)]">
        {/* Split Card Design for mechanical flip-clock */}
        <div className="relative w-16 h-20 sm:w-20 sm:h-24 bg-stone-900/60 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden backdrop-blur-sm">
          
          {/* Card Number */}
          <span 
            className="text-3xl sm:text-4xl font-black text-[#D4A853] tracking-tight countdown-number" 
            key={value}
          >
            {paddedValue}
          </span>
          
          {/* Top half subtle dark shading for mechanical 3D depth */}
          <div className="absolute top-0 left-0 right-0 bottom-[50%] bg-black/25 pointer-events-none z-10 border-b border-black/40" />
          
          {/* Middle separator line */}
          <div className="absolute top-[50%] left-0 right-0 h-[1px] bg-black/60 z-20" />
          
          {/* Elegant overlay gloss */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none z-10" />
        </div>
      </div>
      <span className="text-white/40 text-[10px] font-bold mt-3 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [isExpired, setIsExpired] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const total = FATHERS_DAY.getTime() - START_DATE;
      const current = FATHERS_DAY.getTime() - new Date().getTime();
      const percent = Math.min(100, Math.max(0, 100 - (current / total) * 100));
      setProgressPercent(percent);
    };

    calculateProgress();

    const interval = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      calculateProgress();
      
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  if (isExpired) {
    return (
      <section className="relative py-12 overflow-hidden bg-[#120705]">
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-[#D4A853]/20 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-[#D4A853]/30">
            <Gift className="w-4 h-4 text-[#D4A853]" />
            <span className="text-white/90 text-sm font-semibold">¡Hoy es el día!</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
          >
            ¡Feliz Día del Padre! 🏆
          </h2>
          <p className="text-white/80 text-lg">
            ¡Celebra a papá con los dulces más especiales de Dlilycias!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden bg-[#120705]">
      {/* Decorative Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-red-950/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        {/* Glow pill */}
        <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/10">
          <Clock className="w-4 h-4 text-[#D4A853] animate-pulse" />
          <span className="text-white/80 text-xs font-semibold tracking-wider uppercase">
            ¡Pedidos anticipados abiertos!
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
        >
          Cuenta Regresiva
        </h2>
        <p className="text-white/50 text-sm tracking-wide mb-8 uppercase font-semibold">
          para el Día del Padre 2026
        </p>

        {/* Clock Digits Grid */}
        <div className="flex justify-center items-center gap-3 sm:gap-5 mb-8">
          <TimeUnit value={timeLeft.days} label="Días" />
          <div className="text-[#D4A853]/40 text-3xl font-light mb-5">:</div>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <div className="text-[#D4A853]/40 text-3xl font-light mb-5">:</div>
          <TimeUnit value={timeLeft.minutes} label="Minutos" />
          <div className="text-[#D4A853]/40 text-3xl font-light mb-5">:</div>
          <TimeUnit value={timeLeft.seconds} label="Segundos" />
        </div>

        {/* Time Progress Bar */}
        <div className="max-w-xs mx-auto mb-8">
          <div className="flex justify-between text-[10px] text-white/30 font-bold uppercase tracking-wider mb-2">
            <span>Inicio Campaña</span>
            <span>21 Jun (Día del Padre)</span>
          </div>
          <div className="h-1.5 w-full bg-stone-900/60 rounded-full p-0.5 border border-white/5 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-[#D4A853] rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(212,168,83,0.4)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="text-white/40 text-xs italic">
          Haz tu pedido con anticipación y asegura la sorpresa perfecta para papá 👔
        </p>
      </div>
    </section>
  );
}
