import { Wrench, Hammer, PenTool, Ruler, Scissors, Drill } from 'lucide-react';

export default function FloatingTools() {
  const tools = [
    { Icon: Wrench, className: 'top-[15%] left-[10%] animate-float text-amber-600/40 w-12 h-12', delay: '0s' },
    { Icon: Hammer, className: 'top-[25%] right-[15%] animate-float text-amber-500/40 w-16 h-16', delay: '1s' },
    { Icon: PenTool, className: 'top-[45%] left-[5%] animate-float text-stone-500/40 w-10 h-10', delay: '2s' },
    { Icon: Ruler, className: 'top-[60%] right-[10%] animate-float text-orange-500/40 w-14 h-14', delay: '0.5s' },
    { Icon: Scissors, className: 'top-[80%] left-[20%] animate-float text-yellow-600/40 w-12 h-12', delay: '1.5s' },
    { Icon: Wrench, className: 'top-[10%] right-[5%] animate-float text-amber-400/40 w-10 h-10', delay: '2.5s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
      {tools.map((tool, i) => {
        const { Icon, className, delay } = tool;
        return (
          <div 
            key={i} 
            className={`absolute ${className}`} 
            style={{ animationDelay: delay }}
          >
            <Icon className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
}
