'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { moodEmojis, moodLabels, dailyGoals } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, MoodSelector, MetricCard, SectionHeader, Badge, AnimatedNumber } from '@/components/ui';
import { TrendingUp, TrendingDown, Brain, Target, BookOpen, Heart, Wind, Moon, Zap, Focus, ChevronRight, Sparkles, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const weekData = [
  { day: 'Mon', mood: 4, stress: 3, anxiety: 2 },
  { day: 'Tue', mood: 3, stress: 4, anxiety: 3 },
  { day: 'Wed', mood: 2, stress: 5, anxiety: 4 },
  { day: 'Thu', mood: 3, stress: 4, anxiety: 3 },
  { day: 'Fri', mood: 4, stress: 3, anxiety: 2 },
  { day: 'Sat', mood: 5, stress: 2, anxiety: 1 },
  { day: 'Sun', mood: 4, stress: 2, anxiety: 2 },
];

export default function Dashboard() {
  const { currentMood, setCurrentMood, moodHistory } = useAppStore();
  const [goals, setGoals] = useState(dailyGoals);
  const today = moodHistory[moodHistory.length - 1];

  const toggleGoal = (id: string) => {
    setGoals(goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Good evening <span className="text-gradient-cyan">✨</span></h1>
            <p className="text-sm text-mw-400 mt-1">Here&apos;s your wellness overview</p>
          </div>
          <Link href="/app/checkin">
            <GlowButton variant="cyan" size="sm">
              <Activity size={14} className="mr-1.5" /> Check in
            </GlowButton>
          </Link>
        </div>
      </FadeIn>

      {/* Today's Mood */}
      <FadeIn delay={0.1}>
        <GlassCard className="p-6">
          <SectionHeader title="Today's Mood" subtitle="How are you feeling right now?" />
          <div className="flex items-center gap-6">
            <MoodSelector value={currentMood} onChange={setCurrentMood} size="lg" />
            {currentMood && (
              <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <p className="text-lg font-semibold">{moodEmojis[currentMood - 1]} {moodLabels[currentMood - 1]}</p>
                <p className="text-xs text-mw-400 mt-1">Logged for today</p>
              </motion.div>
            )}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Metrics */}
      <FadeIn delay={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Mood" value={today?.mood ?? 3} max={5} color="#00d4ff" icon={<Heart size={16} className="text-wave-cyan" />} />
          <MetricCard label="Stress" value={today?.stress ?? 3} max={5} color="#f59e0b" icon={<Zap size={16} className="text-wave-amber" />} />
          <MetricCard label="Anxiety" value={today?.anxiety ?? 2} max={5} color="#ec4899" icon={<Brain size={16} className="text-wave-pink" />} />
          <MetricCard label="Sleep" value={today?.sleep ?? 4} max={5} color="#14b8a6" icon={<Moon size={16} className="text-wave-teal" />} />
          <MetricCard label="Energy" value={today?.energy ?? 4} max={5} color="#22c55e" icon={<Zap size={16} className="text-wave-green" />} />
          <MetricCard label="Focus" value={today?.focus ?? 3} max={5} color="#8b5cf6" icon={<Focus size={16} className="text-wave-purple" />} />
        </div>
      </FadeIn>

      {/* Chart + AI Insight */}
      <div className="grid lg:grid-cols-3 gap-4">
        <FadeIn delay={0.2} className="lg:col-span-2">
          <GlassCard className="p-6">
            <SectionHeader title="Weekly Mood Wave" subtitle="Your emotional pattern over 7 days" action={
              <Link href="/app/progress"><span className="text-xs text-wave-cyan hover:underline cursor-pointer">View all →</span></Link>
            } />
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="moodGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 12 }} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 12 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="mood" stroke="#00d4ff" strokeWidth={2} fill="url(#moodGrad)" animationDuration={1500} />
                  <Area type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} fill="url(#stressGrad)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.25}>
          <div className="space-y-4">
            {/* AI Insight */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Brain size={16} className="text-wave-cyan" />
                <span className="text-sm font-semibold text-wave-cyan">Your Mind Wave</span>
              </div>
              <p className="text-sm text-mw-300 leading-relaxed">
                Your stress has <span className="text-wave-green font-medium">decreased</span> over the last few days, while your sleep consistency has <span className="text-wave-teal font-medium">improved</span>. Keep it up!
              </p>
              <Link href="/app/chat">
                <button className="mt-3 text-xs text-wave-cyan hover:underline">Talk to MIND WAVE AI →</button>
              </Link>
            </GlassCard>

            {/* Recommendation */}
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-wave-purple" />
                <span className="text-sm font-semibold text-wave-purple">Recommendation</span>
              </div>
              <p className="text-sm text-mw-300 leading-relaxed">
                Try a <strong className="text-mw-100">5-minute breathing session</strong> — your stress is slightly elevated today.
              </p>
              <Link href="/app/selfcare">
                <button className="mt-3 text-xs text-wave-purple hover:underline">Start breathing →</button>
              </Link>
            </GlassCard>
          </div>
        </FadeIn>
      </div>

      {/* Daily Goals */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-6">
          <SectionHeader title="Daily Goals" subtitle={`${goals.filter(g => g.completed).length}/${goals.length} completed`} action={
            <Badge color="#22c55e">{Math.round((goals.filter(g => g.completed).length / goals.length) * 100)}%</Badge>
          } />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {goals.map((goal) => (
              <motion.button
                key={goal.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleGoal(goal.id)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  goal.completed ? 'bg-wave-teal/10 border border-wave-teal/20' : 'bg-white/3 border border-white/5 hover:border-white/10'
                }`}
              >
                <span className="text-xl">{goal.icon}</span>
                <span className={`text-sm ${goal.completed ? 'text-wave-teal line-through' : 'text-mw-200'}`}>{goal.title}</span>
              </motion.button>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Quick Actions */}
      <FadeIn delay={0.35}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { href: '/app/chat', icon: Brain, label: 'Talk to AI', color: '#00d4ff' },
            { href: '/app/journal', icon: BookOpen, label: 'Journal', color: '#8b5cf6' },
            { href: '/app/selfcare', icon: Wind, label: 'Breathe', color: '#14b8a6' },
            { href: '/app/assessments', icon: Target, label: 'Assess', color: '#ec4899' },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="glass-card p-4 flex items-center gap-3 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${action.color}15` }}>
                  <action.icon size={18} style={{ color: action.color }} />
                </div>
                <span className="text-sm font-medium">{action.label}</span>
                <ChevronRight size={14} className="ml-auto text-mw-500" />
              </motion.div>
            </Link>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
