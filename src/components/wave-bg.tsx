'use client';
import { useRef, useEffect } from 'react';

export function WaveBackground({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const waves = [
      { amplitude: 40, frequency: 0.008, speed: 0.02, color: 'rgba(0,212,255,0.06)', offset: 0 },
      { amplitude: 30, frequency: 0.012, speed: 0.015, color: 'rgba(139,92,246,0.05)', offset: 2 },
      { amplitude: 25, frequency: 0.006, speed: 0.025, color: 'rgba(236,72,153,0.04)', offset: 4 },
      { amplitude: 35, frequency: 0.01, speed: 0.01, color: 'rgba(20,184,166,0.05)', offset: 6 },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const h = canvas.height;

      waves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= canvas.width; x += 2) {
          const y = h * 0.6 + wave.amplitude * Math.sin(x * wave.frequency + time * wave.speed + wave.offset)
            + wave.amplitude * 0.5 * Math.sin(x * wave.frequency * 2 + time * wave.speed * 1.5 + wave.offset);
          ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, h);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      time++;
      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`fixed inset-0 pointer-events-none ${className}`} />;
}

export function HeroWaveSVG() {
  return (
    <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path d="M0,160 C240,260,480,100,720,160 C960,220,1200,80,1440,160 L1440,320 L0,320 Z" fill="url(#wave1)" opacity="0.3">
        <animateTransform attributeName="transform" type="translate" values="0,0;100,0;0,0" dur="8s" repeatCount="indefinite" />
      </path>
      <path d="M0,200 C360,120,720,280,1080,180 C1260,140,1440,220,1440,200 L1440,320 L0,320 Z" fill="url(#wave2)" opacity="0.2">
        <animateTransform attributeName="transform" type="translate" values="0,0;-80,0;0,0" dur="6s" repeatCount="indefinite" />
      </path>
      <path d="M0,240 C180,280,540,180,900,240 C1080,270,1260,200,1440,240 L1440,320 L0,320 Z" fill="url(#wave3)" opacity="0.15">
        <animateTransform attributeName="transform" type="translate" values="0,0;60,0;0,0" dur="10s" repeatCount="indefinite" />
      </path>
      <defs>
        <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="wave3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function FloatingOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute top-[20%] left-[15%] w-64 h-64 rounded-full bg-wave-cyan/5 blur-3xl animate-float" />
      <div className="absolute top-[60%] right-[20%] w-48 h-48 rounded-full bg-wave-purple/5 blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-[20%] left-[50%] w-56 h-56 rounded-full bg-wave-pink/5 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
    </div>
  );
}
