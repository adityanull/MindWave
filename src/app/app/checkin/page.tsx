'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { GlassCard, FadeIn, GlowButton, MoodSelector, CustomSlider, AnimatedNumber } from '@/components/ui';
import { moodEmojis, moodLabels } from '@/lib/mock-data';
import { Heart, Zap, Brain, Moon, Battery, Target, Check, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';

const steps = ['mood', 'stress', 'anxiety', 'sleep', 'energy', 'factors', 'summary'] as const;
type Step = typeof steps[number];

const factors = ['Work', 'Relationships', 'Health', 'Finance', 'Family', 'Social', 'Academics', 'Sleep issues', 'Self-esteem', 'Loneliness'];

export default function CheckinPage() {
  const { addMoodEntry } = useAppStore();
  const [step, setStep] = useState(0);
  const [mood, setMood] = useState(0);
  const [stress, setStress] = useState(5);
  const [anxiety, setAnxiety] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [energy, setEnergy] = useState(5);
  const [selectedFactors, setSelectedFactors] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const toggleFactor = (f: string) => {
    setSelectedFactors(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f]);
  };

  const handleSubmit = () => {
    addMoodEntry({
      id: Date.now().toString(),
      mood, stress: Math.round(stress / 2), anxiety: Math.round(anxiety / 2),
      sleep: Math.round(sleep / 2), energy: Math.round(energy / 2), focus: 3,
      tags: selectedFactors, date: new Date().toISOString().split('T')[0],
    });
    setDone(true);
  };

  const currentStep = steps[step];
  const progress = ((step + 1) / steps.length) * 100;

  if (done) {
    return (
      <div className="max-w-lg mx-auto pt-12">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
            className="text-6xl mb-6"
          >
            {moodEmojis[mood - 1] || '😊'}
          </motion.div>
          <h2 className="text-2xl font-bold mb-3">Check-in Complete!</h2>
          <p className="text-mw-400 mb-8">Your wellness data has been recorded. Here&apos;s your snapshot:</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { label: 'Mood', value: mood, max: 6, color: '#00d4ff' },
              { label: 'Stress', value: Math.round(stress / 2), max: 5, color: '#f59e0b' },
              { label: 'Anxiety', value: Math.round(anxiety / 2), max: 5, color: '#ec4899' },
              { label: 'Sleep', value: Math.round(sleep / 2), max: 5, color: '#14b8a6' },
            ].map((item) => (
              <GlassCard key={item.label} className="p-4 text-center">
                <p className="text-xs text-mw-400 mb-1">{item.label}</p>
                <p className="text-2xl font-bold" style={{ color: item.color }}>{item.value}/{item.max}</p>
              </GlassCard>
            ))}
          </div>

          {selectedFactors.length > 0 && (
            <div className="mb-8">
              <p className="text-sm text-mw-400 mb-2">Factors affecting you:</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedFactors.map(f => (
                  <span key={f} className="px-3 py-1 rounded-full text-xs glass text-mw-200">{f}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <GlowButton variant="cyan" onClick={() => { setStep(0); setDone(false); setMood(0); }}>New Check-in</GlowButton>
            <GlowButton variant="ghost" onClick={() => window.location.href = '/app/chat'}>Talk to AI</GlowButton>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <FadeIn>
        <h1 className="text-2xl font-bold mb-2">Daily Check-in</h1>
        <p className="text-sm text-mw-400 mb-6">Take a moment to reflect on how you&apos;re doing</p>
      </FadeIn>

      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs text-mw-500 mb-2">
          <span>Step {step + 1} of {steps.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="h-full rounded-full bg-gradient-to-r from-wave-cyan to-wave-purple"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStep === 'mood' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Heart size={32} className="text-wave-cyan mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">How are you feeling?</h2>
                <p className="text-sm text-mw-400">Select the emoji that best matches your mood</p>
              </div>
              <div className="flex justify-center">
                <MoodSelector value={mood || null} onChange={setMood} size="lg" />
              </div>
              {mood > 0 && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mt-4 text-lg font-semibold text-wave-cyan">
                  {moodEmojis[mood - 1]} {moodLabels[mood - 1]}
                </motion.p>
              )}
            </GlassCard>
          )}

          {currentStep === 'stress' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Zap size={32} className="text-wave-amber mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">How stressed are you?</h2>
                <p className="text-sm text-mw-400">Rate from 1 (calm) to 10 (very stressed)</p>
              </div>
              <CustomSlider value={stress} onChange={setStress} min={1} max={10} color="#f59e0b" />
              <p className="text-center mt-3 text-2xl font-bold text-wave-amber">{stress}</p>
            </GlassCard>
          )}

          {currentStep === 'anxiety' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Brain size={32} className="text-wave-pink mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">How anxious are you?</h2>
                <p className="text-sm text-mw-400">Rate from 1 (calm) to 10 (very anxious)</p>
              </div>
              <CustomSlider value={anxiety} onChange={setAnxiety} min={1} max={10} color="#ec4899" />
              <p className="text-center mt-3 text-2xl font-bold text-wave-pink">{anxiety}</p>
            </GlassCard>
          )}

          {currentStep === 'sleep' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Moon size={32} className="text-wave-teal mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">How did you sleep?</h2>
                <p className="text-sm text-mw-400">Rate from 1 (poor) to 10 (excellent)</p>
              </div>
              <CustomSlider value={sleep} onChange={setSleep} min={1} max={10} color="#14b8a6" />
              <p className="text-center mt-3 text-2xl font-bold text-wave-teal">{sleep}</p>
            </GlassCard>
          )}

          {currentStep === 'energy' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Battery size={32} className="text-wave-green mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">How is your energy?</h2>
                <p className="text-sm text-mw-400">Rate from 1 (depleted) to 10 (energized)</p>
              </div>
              <CustomSlider value={energy} onChange={setEnergy} min={1} max={10} color="#22c55e" />
              <p className="text-center mt-3 text-2xl font-bold text-wave-green">{energy}</p>
            </GlassCard>
          )}

          {currentStep === 'factors' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Target size={32} className="text-wave-purple mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">What&apos;s affecting you today?</h2>
                <p className="text-sm text-mw-400">Select all that apply</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {factors.map(f => (
                  <motion.button
                    key={f}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleFactor(f)}
                    className={`px-4 py-2 rounded-xl text-sm transition ${
                      selectedFactors.includes(f) ? 'bg-wave-cyan/20 border border-wave-cyan/30 text-wave-cyan' : 'glass text-mw-400 hover:text-mw-200'
                    }`}
                  >
                    {selectedFactors.includes(f) && <Check size={12} className="inline mr-1" />}
                    {f}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          )}

          {currentStep === 'summary' && (
            <GlassCard className="p-6">
              <div className="text-center mb-6">
                <Sparkles size={32} className="text-wave-cyan mx-auto mb-3" />
                <h2 className="text-xl font-bold mb-2">Your Check-in Summary</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-mw-400">Mood</span>
                  <span className="font-semibold">{moodEmojis[mood - 1]} {moodLabels[mood - 1]}</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-mw-400">Stress</span>
                  <span className="font-semibold text-wave-amber">{stress}/10</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-mw-400">Anxiety</span>
                  <span className="font-semibold text-wave-pink">{anxiety}/10</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-mw-400">Sleep</span>
                  <span className="font-semibold text-wave-teal">{sleep}/10</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-xl bg-white/3">
                  <span className="text-sm text-mw-400">Energy</span>
                  <span className="font-semibold text-wave-green">{energy}/10</span>
                </div>
              </div>
            </GlassCard>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <GlowButton variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft size={16} className="mr-1" /> Back
        </GlowButton>
        {step < steps.length - 1 ? (
          <GlowButton variant="cyan" onClick={() => setStep(step + 1)} disabled={currentStep === 'mood' && mood === 0}>
            Next <ArrowRight size={16} className="ml-1" />
          </GlowButton>
        ) : (
          <GlowButton variant="cyan" onClick={handleSubmit}>
            <Check size={16} className="mr-1" /> Submit
          </GlowButton>
        )}
      </div>
    </div>
  );
}
