'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { selfCareExercises } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, SectionHeader } from '@/components/ui';
import { Wind, Brain, Moon, Zap, Target, Play, Pause, RotateCcw, ChevronRight, X, Timer } from 'lucide-react';

const categories = [
  { key: 'breathe', label: 'Breathe', icon: Wind, color: '#00d4ff' },
  { key: 'meditate', label: 'Meditate', icon: Brain, color: '#8b5cf6' },
  { key: 'sleep', label: 'Sleep', icon: Moon, color: '#14b8a6' },
  { key: 'reset', label: 'Reset', icon: Zap, color: '#f59e0b' },
  { key: 'focus', label: 'Focus', icon: Target, color: '#ec4899' },
] as const;

type CategoryKey = typeof categories[number]['key'];

function BreathingExercise({ pattern, onClose }: { pattern: number[]; onClose: () => void }) {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState(0); // 0=inhale, 1=hold1, 2=exhale, 3=hold2
  const [count, setCount] = useState(0);
  const [cycle, setCycle] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phaseLabels = ['INHALE', 'HOLD', 'EXHALE', 'HOLD'];
  const phaseColors = ['#00d4ff', '#8b5cf6', '#14b8a6', '#8b5cf6'];
  const currentDuration = pattern[phase] || 1;

  useEffect(() => {
    if (active) {
      setCount(0);
      intervalRef.current = setInterval(() => {
        setCount(prev => {
          if (prev + 1 >= currentDuration) {
            setPhase(p => {
              const next = (p + 1) % 4;
              if (next === 0) setCycle(c => c + 1);
              if (pattern[next] === 0) {
                const after = (next + 1) % 4;
                if (after === 0) setCycle(c => c + 1);
                return after;
              }
              return next;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, phase, currentDuration, pattern]);

  const toggle = () => {
    if (active) {
      setActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setActive(true);
      setPhase(0);
      setCount(0);
      setCycle(0);
    }
  };

  const reset = () => {
    setActive(false);
    setPhase(0);
    setCount(0);
    setCycle(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const breathProgress = count / currentDuration;
  const breathScale = phase === 0 ? 0.6 + breathProgress * 0.4 : phase === 1 ? 1 : phase === 2 ? 1 - breathProgress * 0.4 : 0.6;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 bg-mw-950/90 flex items-center justify-center"
    >
      <div className="text-center">
        <button onClick={() => { reset(); onClose(); }} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 text-mw-400"><X size={20} /></button>

        {/* Breathing circle */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <motion.div
            animate={{ scale: breathScale, opacity: phase === 0 ? 0.3 + breathProgress * 0.7 : phase === 2 ? 1 - breathProgress * 0.7 : 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 rounded-full"
            style={{ background: `radial-gradient(circle, ${phaseColors[phase]}40 0%, transparent 70%)` }}
          />
          <div className="absolute inset-8 rounded-full glass flex items-center justify-center">
            <div>
              <p className="text-2xl font-bold" style={{ color: phaseColors[phase] }}>
                {phaseLabels[phase]}
              </p>
              <p className="text-4xl font-black mt-2 text-mw-100">
                {currentDuration - count}
              </p>
            </div>
          </div>
          {/* Wave rings */}
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{
                scale: breathScale + i * 0.15,
                opacity: (0.15 - i * 0.04)
              }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `${phaseColors[phase]}30` }}
            />
          ))}
        </div>

        <p className="text-mw-400 mb-6">Cycle {cycle + 1}</p>

        <div className="flex gap-3 justify-center">
          <GlowButton variant="cyan" onClick={toggle}>
            {active ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {active ? 'Pause' : 'Start'}
          </GlowButton>
          <GlowButton variant="ghost" onClick={reset}>
            <RotateCcw size={16} className="mr-1" /> Reset
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}

function FocusTimer({ duration, onClose }: { duration: number; onClose: () => void }) {
  const [seconds, setSeconds] = useState(duration * 60);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (active && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => Math.max(0, s - 1));
      }, 1000);
    } else if (seconds === 0) {
      setActive(false);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [active, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const progress = 1 - seconds / (duration * 60);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 bg-mw-950/90 flex items-center justify-center"
    >
      <div className="text-center">
        <button onClick={() => { setActive(false); onClose(); }} className="absolute top-6 right-6 p-2 rounded-xl hover:bg-white/10 text-mw-400"><X size={20} /></button>

        <div className="relative w-48 h-48 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#ec4899" strokeWidth="4" strokeDasharray={`${progress * 283} 283`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-black">{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
          </div>
        </div>

        {seconds === 0 && <p className="text-xl font-bold text-wave-pink mb-4">Session Complete! 🎉</p>}

        <div className="flex gap-3 justify-center">
          <GlowButton variant="pink" onClick={() => setActive(!active)}>
            {active ? <Pause size={16} className="mr-1" /> : <Play size={16} className="mr-1" />}
            {active ? 'Pause' : 'Start'}
          </GlowButton>
          <GlowButton variant="ghost" onClick={() => { setActive(false); setSeconds(duration * 60); }}>
            <RotateCcw size={16} className="mr-1" /> Reset
          </GlowButton>
        </div>
      </div>
    </motion.div>
  );
}

export default function SelfCarePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('breathe');
  const [breathingExercise, setBreathingExercise] = useState<number[] | null>(null);
  const [focusTimer, setFocusTimer] = useState<number | null>(null);

  const exercises = selfCareExercises[activeCategory];

  return (
    <div className="space-y-6">
      <AnimatePresence>
        {breathingExercise && <BreathingExercise pattern={breathingExercise} onClose={() => setBreathingExercise(null)} />}
        {focusTimer && <FocusTimer duration={focusTimer} onClose={() => setFocusTimer(null)} />}
      </AnimatePresence>

      <FadeIn>
        <h1 className="text-2xl font-bold">Self-Care Center</h1>
        <p className="text-sm text-mw-400 mt-1">Tools and exercises for your wellbeing</p>
      </FadeIn>

      {/* Category tabs */}
      <FadeIn delay={0.1}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {categories.map((cat) => (
            <motion.button
              key={cat.key}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveCategory(cat.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                activeCategory === cat.key
                  ? 'border text-white'
                  : 'glass text-mw-400 hover:text-mw-200'
              }`}
              style={activeCategory === cat.key ? { borderColor: cat.color, background: `${cat.color}15` } : {}}
            >
              <cat.icon size={16} style={{ color: activeCategory === cat.key ? cat.color : undefined }} />
              {cat.label}
            </motion.button>
          ))}
        </div>
      </FadeIn>

      {/* Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {exercises.map((exercise, i) => (
          <motion.div
            key={exercise.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-6 cursor-pointer" onClick={() => {
              if ('pattern' in exercise) setBreathingExercise(exercise.pattern as number[]);
              else if (activeCategory === 'focus') setFocusTimer(parseInt(exercise.duration));
            }}>
              <div className="flex items-center gap-2 mb-3">
                {(() => { const cat = categories.find(c => c.key === activeCategory)!; const Icon = cat.icon; return <Icon size={18} style={{ color: cat.color }} />; })()}
                <span className="text-xs font-medium" style={{ color: categories.find(c => c.key === activeCategory)!.color }}>{activeCategory}</span>
              </div>
              <h3 className="text-lg font-bold mb-1">{exercise.name}</h3>
              <p className="text-sm text-mw-400 mb-4">{exercise.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-mw-500 flex items-center gap-1"><Timer size={12} /> {exercise.duration}</span>
                <span className="text-sm font-medium" style={{ color: categories.find(c => c.key === activeCategory)!.color }}>Start →</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Wellness Tips */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-6">
          <SectionHeader title="Quick Tips" subtitle="Simple things you can do right now" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { emoji: '🌬️', tip: 'Take 3 deep breaths right now' },
              { emoji: '🚶', tip: 'Step outside for a 5-minute walk' },
              { emoji: '💧', tip: 'Drink a glass of water' },
              { emoji: '📝', tip: 'Write down one thing you\'re grateful for' },
              { emoji: '🎵', tip: 'Listen to calming music for 2 minutes' },
              { emoji: '🧘', tip: 'Stretch your neck and shoulders' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3">
                <span className="text-lg">{item.emoji}</span>
                <span className="text-sm text-mw-300">{item.tip}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
