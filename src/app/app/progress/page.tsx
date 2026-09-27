'use client';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { GlassCard, FadeIn, SectionHeader, AnimatedNumber, Badge } from '@/components/ui';
import { TrendingUp, Heart, Zap, Brain, Moon, Battery, Target, BookOpen, ClipboardCheck, Flame } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const weekData = [
  { day: 'Mon', mood: 4, stress: 3, anxiety: 2, sleep: 4 },
  { day: 'Tue', mood: 3, stress: 4, anxiety: 3, sleep: 3 },
  { day: 'Wed', mood: 2, stress: 5, anxiety: 4, sleep: 2 },
  { day: 'Thu', mood: 3, stress: 4, anxiety: 3, sleep: 3 },
  { day: 'Fri', mood: 4, stress: 3, anxiety: 2, sleep: 4 },
  { day: 'Sat', mood: 5, stress: 2, anxiety: 1, sleep: 5 },
  { day: 'Sun', mood: 4, stress: 2, anxiety: 2, sleep: 4 },
];

const activityData = [
  { day: 'Mon', activities: 3 },
  { day: 'Tue', activities: 2 },
  { day: 'Wed', activities: 1 },
  { day: 'Thu', activities: 4 },
  { day: 'Fri', activities: 3 },
  { day: 'Sat', activities: 5 },
  { day: 'Sun', activities: 4 },
];

export default function ProgressPage() {
  const { moodHistory, journals, assessmentResults } = useAppStore();

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold">Wellness Progress</h1>
        <p className="text-sm text-mw-400 mt-1">Your mental health journey over time</p>
      </FadeIn>

      {/* Streak & Summary */}
      <FadeIn delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <GlassCard className="p-4 text-center">
            <Flame size={24} className="text-wave-amber mx-auto mb-2" />
            <p className="text-2xl font-black text-wave-amber"><AnimatedNumber value={7} /></p>
            <p className="text-xs text-mw-400">Day Streak</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <Target size={24} className="text-wave-green mx-auto mb-2" />
            <p className="text-2xl font-black text-wave-green"><AnimatedNumber value={22} /></p>
            <p className="text-xs text-mw-400">Activities</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <BookOpen size={24} className="text-wave-purple mx-auto mb-2" />
            <p className="text-2xl font-black text-wave-purple"><AnimatedNumber value={journals.length} /></p>
            <p className="text-xs text-mw-400">Journal Entries</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <ClipboardCheck size={24} className="text-wave-pink mx-auto mb-2" />
            <p className="text-2xl font-black text-wave-pink"><AnimatedNumber value={assessmentResults.length} /></p>
            <p className="text-xs text-mw-400">Assessments</p>
          </GlassCard>
        </div>
      </FadeIn>

      {/* Mood History Chart */}
      <FadeIn delay={0.15}>
        <GlassCard className="p-6">
          <SectionHeader title="Mood History" subtitle="7-day mood wave" />
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weekData}>
                <defs>
                  <linearGradient id="mG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00d4ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 12 }} />
                <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 12 }} />
                <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                <Area type="monotone" dataKey="mood" stroke="#00d4ff" strokeWidth={2.5} fill="url(#mG)" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Stress & Anxiety Trends */}
      <div className="grid md:grid-cols-2 gap-4">
        <FadeIn delay={0.2}>
          <GlassCard className="p-6">
            <SectionHeader title="Stress Trend" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="sG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="stress" stroke="#f59e0b" strokeWidth={2} fill="url(#sG)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.25}>
          <GlassCard className="p-6">
            <SectionHeader title="Anxiety Trend" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="aG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ec4899" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#ec4899" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="anxiety" stroke="#ec4899" strokeWidth={2} fill="url(#aG)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Sleep & Activity */}
      <div className="grid md:grid-cols-2 gap-4">
        <FadeIn delay={0.3}>
          <GlassCard className="p-6">
            <SectionHeader title="Sleep Quality" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weekData}>
                  <defs>
                    <linearGradient id="slG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <YAxis domain={[0, 6]} axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="sleep" stroke="#14b8a6" strokeWidth={2} fill="url(#slG)" animationDuration={1500} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>

        <FadeIn delay={0.35}>
          <GlassCard className="p-6">
            <SectionHeader title="Activity Completion" />
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityData}>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#7e7ebe', fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: 'rgba(15,15,46,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#e8e8f8', fontSize: '12px' }} />
                  <Bar dataKey="activities" fill="#8b5cf6" radius={[6, 6, 0, 0]} animationDuration={1500} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </FadeIn>
      </div>

      {/* Assessment History */}
      <FadeIn delay={0.4}>
        <GlassCard className="p-6">
          <SectionHeader title="Assessment History" />
          <div className="space-y-3">
            {assessmentResults.map(result => (
              <div key={result.id} className="flex items-center gap-4 p-3 rounded-xl bg-white/3">
                <ClipboardCheck size={16} className="text-wave-pink" />
                <div className="flex-1">
                  <p className="text-sm font-medium">{result.type}</p>
                  <p className="text-xs text-mw-400">{result.date}</p>
                </div>
                <Badge color="#ec4899">{result.interpretation}</Badge>
                <span className="text-sm font-bold">{result.score}/{result.maxScore}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
