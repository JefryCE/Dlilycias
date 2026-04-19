import { useState, useEffect } from 'react';
import { Clock, Gift } from 'lucide-react';

// Día de la Madre en Perú 2026: segundo domingo de mayo = 10 de mayo 2026
const MOTHERS_DAY = new Date('2026-05-10T00:00:00-05:00');

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = MOTHERS_DAY.getTime() - now.getTime();

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
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="bg-white/15 backdrop-blur-sm rounded-2xl w-[72px] h-[80px] sm:w-[88px] sm:h-[96px] flex items-center justify-center border border-white/20 shadow-lg">
          <span
            className="text-3xl sm:text-4xl font-bold text-white countdown-number"
            key={value}
          >
            {String(value).padStart(2, '0')}
          </span>
        </div>
        <div className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-white/10" />
      </div>
      <span className="text-white/70 text-[11px] sm:text-xs font-medium mt-2 uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(getTimeLeft());
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const tl = getTimeLeft();
      setTimeLeft(tl);
      if (tl.days === 0 && tl.hours === 0 && tl.minutes === 0 && tl.seconds === 0) {
        setIsExpired(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isExpired) {
    return (
      <section className="relative py-12 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #be185d 0%, #e11d48 50%, #f43f5e 100%)',
          }}
        />
        <div className="relative z-10 text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-4">
            <Gift className="w-4 h-4 text-amber-200" />
            <span className="text-white/90 text-sm font-semibold">¡Hoy es el día!</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl font-bold text-white mb-2"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            ¡Feliz Día de la Madre! 🌸
          </h2>
          <p className="text-white/80 text-lg">
            ¡Celebra a mamá con los dulces más especiales!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #9f1239 0%, #be123c 30%, #e11d48 60%, #f43f5e 100%)',
        }}
      />

      {/* Decorative orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-rose-300/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-5 py-2 rounded-full mb-6 border border-white/20">
          <Clock className="w-4 h-4 text-amber-200 animate-pulse" />
          <span className="text-white/90 text-sm font-semibold tracking-wide">
            ¡No te quedes sin tu pedido!
          </span>
        </div>

        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-2"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Cuenta Regresiva
        </h2>
        <p className="text-white/70 text-base sm:text-lg mb-8">
          para el Día de la Madre 2026
        </p>

        <div className="flex justify-center gap-3 sm:gap-5 mb-8">
          <TimeUnit value={timeLeft.days} label="Días" />
          <div className="flex items-center text-white/40 text-2xl font-light self-start mt-6 sm:mt-8">:</div>
          <TimeUnit value={timeLeft.hours} label="Horas" />
          <div className="flex items-center text-white/40 text-2xl font-light self-start mt-6 sm:mt-8">:</div>
          <TimeUnit value={timeLeft.minutes} label="Min" />
          <div className="flex items-center text-white/40 text-2xl font-light self-start mt-6 sm:mt-8">:</div>
          <TimeUnit value={timeLeft.seconds} label="Seg" />
        </div>

        <p className="text-white/60 text-sm">
          Haz tu pedido con anticipación y asegura la sorpresa perfecta 🎀
        </p>
      </div>
    </section>
  );
}
