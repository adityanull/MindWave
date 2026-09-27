'use client';
import { ReactNode, useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Copy, Check, ThumbsUp, RotateCcw, Volume2, Search, Bell, Moon, Sun, Menu, ChevronRight, ChevronLeft, Heart, Sparkles, AlertTriangle, ExternalLink } from 'lucide-react';

// --- Fade-in wrapper ---
export function FadeIn({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay, ease: [0.25, 0.46, 0.45, 0.94] }} className={className}>
      {children}
    </motion.div>
  );
}

// --- Stagger children ---
export function Stagger({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } }, hidden: {} }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } } }} className={className}>
      {children}
    </motion.div>
  );
}

// --- Glass Card ---
export function GlassCard({ children, className = '', hover = true, onClick }: { children: ReactNode; className?: string; hover?: boolean; onClick?: () => void }) {
  return (
    <motion.div
      whileHover={hover ? { y: -3, scale: 1.01 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`glass-card p-5 ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

// --- Glow Button ---
export function GlowButton({ children, onClick, variant = 'cyan', size = 'md', className = '', disabled = false }: {
  children: ReactNode; onClick?: () => void; variant?: 'cyan' | 'purple' | 'pink' | 'teal' | 'ghost'; size?: 'sm' | 'md' | 'lg'; className?: string; disabled?: boolean;
}) {
  const colors = { cyan: 'from-wave-cyan/80 to-wave-purple/80', purple: 'from-wave-purple/80 to-wave-pink/80', pink: 'from-wave-pink/80 to-wave-red/80', teal: 'from-wave-teal/80 to-wave-cyan/80', ghost: 'from-white/10 to-white/5' };
  const glowColors = { cyan: 'rgba(0,212,255,0.3)', purple: 'rgba(139,92,246,0.3)', pink: 'rgba(236,72,153,0.3)', teal: 'rgba(20,184,166,0.3)', ghost: 'rgba(255,255,255,0.1)' };
  const sizes = { sm: 'px-3 py-1.5 text-sm', md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' };
  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.04, boxShadow: `0 0 25px ${glowColors[variant]}` } : undefined}
      whileTap={!disabled ? { scale: 0.97 } : undefined}
      onClick={onClick}
      disabled={disabled}
      className={`relative rounded-xl font-semibold bg-gradient-to-r ${colors[variant]} ${sizes[size]} text-white transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
    >
      {children}
    </motion.button>
  );
}

// --- Mood Selector ---
export function MoodSelector({ value, onChange, size = 'md' }: { value: number | null; onChange: (v: number) => void; size?: 'sm' | 'md' | 'lg' }) {
  const emojis = ['😣', '😔', '😐', '🙂', '😊', '😄'];
  const sz = { sm: 'text-xl w-9 h-9', md: 'text-2xl w-11 h-11', lg: 'text-3xl w-14 h-14' };
  return (
    <div className="flex gap-2">
      {emojis.map((emoji, i) => (
        <motion.button
          key={i}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onChange(i + 1)}
          className={`${sz[size]} rounded-xl flex items-center justify-center transition-all duration-200 ${value === i + 1 ? 'bg-wave-cyan/20 ring-2 ring-wave-cyan/50 scale-110' : 'bg-white/5 hover:bg-white/10'}`}
        >
          {emoji}
        </motion.button>
      ))}
    </div>
  );
}

// --- Animated Number ---
export function AnimatedNumber({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const diff = value - start;
    const duration = 800;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(start + diff * eased);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return <span>{display.toFixed(decimals)}</span>;
}

// --- Metric Card ---
export function MetricCard({ label, value, max, unit = '', color, icon }: { label: string; value: number; max?: number; unit?: string; color: string; icon: ReactNode }) {
  const pct = max ? (value / max) * 100 : 0;
  return (
    <GlassCard className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}20` }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-mw-400 mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-bold"><AnimatedNumber value={value} /></span>
          {unit && <span className="text-xs text-mw-400">{unit}</span>}
        </div>
        {max && (
          <div className="mt-1.5 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
              className="h-full rounded-full"
              style={{ background: color }}
            />
          </div>
        )}
      </div>
    </GlassCard>
  );
}

// --- Typing indicator ---
export function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 px-4 py-3">
      <div className="flex gap-1.5">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
      <span className="text-xs text-mw-400">MIND WAVE AI is thinking...</span>
    </div>
  );
}

// --- Chat Bubble ---
export function ChatBubble({ message, onReaction, onCopy, onRegenerate }: {
  message: { id: string; role: 'user' | 'assistant'; content: string; reaction?: 'helpful' | 'not-helpful'; timestamp: Date };
  onReaction?: (id: string, reaction: 'helpful' | 'not-helpful') => void;
  onCopy?: (content: string) => void;
  onRegenerate?: () => void;
}) {
  const isUser = message.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div className={`max-w-[80%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-3 ${isUser ? 'bg-wave-cyan/20 border border-wave-cyan/20 rounded-br-md' : 'glass rounded-bl-md'}`}>
          <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        </div>
        {!isUser && onReaction && (
          <div className="flex items-center gap-2 mt-2">
            <button onClick={() => onReaction(message.id, 'helpful')} className={`p-1 rounded-md transition ${message.reaction === 'helpful' ? 'text-wave-teal bg-wave-teal/10' : 'text-mw-400 hover:text-mw-200 hover:bg-white/5'}`}>
              <ThumbsUp size={14} />
            </button>
            <button onClick={() => onCopy?.(message.content)} className="p-1 rounded-md text-mw-400 hover:text-mw-200 hover:bg-white/5 transition">
              <Copy size={14} />
            </button>
            {onRegenerate && (
              <button onClick={onRegenerate} className="p-1 rounded-md text-mw-400 hover:text-mw-200 hover:bg-white/5 transition">
                <RotateCcw size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// --- Slider ---
export function CustomSlider({ value, onChange, min = 0, max = 10, label, color = '#00d4ff' }: { value: number; onChange: (v: number) => void; min?: number; max?: number; label?: string; color?: string }) {
  return (
    <div>
      {label && <div className="flex justify-between mb-2"><span className="text-sm text-mw-300">{label}</span><span className="text-sm font-semibold" style={{ color }}>{value}</span></div>}
      <input type="range" min={min} max={max} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer" style={{ background: `linear-gradient(to right, ${color} ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%)` }} />
    </div>
  );
}

// --- Toast ---
export function Toast({ message, type = 'success', onClose }: { message: string; type?: 'success' | 'error' | 'info'; onClose: () => void }) {
  const colors = { success: 'bg-wave-teal/20 border-wave-teal/30 text-wave-teal', error: 'bg-wave-red/20 border-wave-red/30 text-wave-red', info: 'bg-wave-cyan/20 border-wave-cyan/30 text-wave-cyan' };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, x: '-50%' }}
      animate={{ opacity: 1, y: 0, x: '-50%' }}
      exit={{ opacity: 0, y: -20, x: '-50%' }}
      className={`fixed top-6 left-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border ${colors[type]} backdrop-blur-xl`}
    >
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="p-0.5 rounded-md hover:bg-white/10 transition"><X size={14} /></button>
    </motion.div>
  );
}

// --- Section Header ---
export function SectionHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-mw-400 mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

// --- Badge ---
export function Badge({ children, color = 'cyan' }: { children: ReactNode; color?: string }) {
  return <span className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{ background: `${color}20`, color }}>{children}</span>;
}

// --- Empty State ---
export function EmptyState({ icon, title, description }: { icon: ReactNode; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 opacity-50">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-mw-400 max-w-sm">{description}</p>
    </div>
  );
}

// --- Crisis Banner ---
export function CrisisBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-wave-red/10 border border-wave-red/20 rounded-xl p-4 flex items-start gap-3"
    >
      <AlertTriangle size={20} className="text-wave-red shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-semibold text-wave-red">If you're in crisis, please reach out for help now.</p>
        <p className="text-xs text-mw-300 mt-1">Call <strong>988</strong> (Suicide & Crisis Lifeline) or text <strong>HOME</strong> to <strong>741741</strong> (Crisis Text Line). MIND WAVE is not an emergency service.</p>
      </div>
    </motion.div>
  );
}

// --- Skeleton ---
export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-shimmer rounded-lg ${className}`} />;
}
