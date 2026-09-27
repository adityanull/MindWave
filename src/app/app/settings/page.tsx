'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { GlassCard, FadeIn, GlowButton, CustomSlider, Badge, SectionHeader } from '@/components/ui';
import { User, Brain, Bell, Shield, Palette, Database, Moon, Sun, Volume2, MessageCircle, Heart, Target, AlertTriangle } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme, notifications, markNotificationRead } = useAppStore();
  const [aiStyle, setAiStyle] = useState('compassionate');
  const [notifyCheckin, setNotifyCheckin] = useState(true);
  const [notifyInsight, setNotifyInsight] = useState(true);
  const [notifyAppointment, setNotifyAppointment] = useState(true);
  const [notifyCommunity, setNotifyCommunity] = useState(false);

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button onClick={onToggle} className={`w-11 h-6 rounded-full transition-all duration-300 relative ${on ? 'bg-wave-cyan' : 'bg-white/10'}`}>
      <motion.div animate={{ x: on ? 20 : 2 }} transition={{ type: 'spring', stiffness: 500, damping: 30 }} className="w-4 h-4 rounded-full bg-white absolute top-1" />
    </button>
  );

  return (
    <div className="space-y-6 max-w-2xl">
      <FadeIn>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-mw-400 mt-1">Customize your MIND WAVE experience</p>
      </FadeIn>

      {/* Profile */}
      <FadeIn delay={0.1}>
        <GlassCard className="p-6">
          <SectionHeader title="Profile" />
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wave-cyan to-wave-purple flex items-center justify-center text-2xl">
              👤
            </div>
            <div>
              <p className="font-semibold">Welcome to MIND WAVE</p>
              <p className="text-xs text-mw-400">Sign in to save your data across devices</p>
            </div>
          </div>
          <p className="text-xs text-mw-500 italic">Authentication will be available in a future update.</p>
        </GlassCard>
      </FadeIn>

      {/* AI Preferences */}
      <FadeIn delay={0.15}>
        <GlassCard className="p-6">
          <SectionHeader title="AI Preferences" />
          <div className="space-y-4">
            <div>
              <p className="text-sm text-mw-300 mb-2">Conversation Style</p>
              <div className="flex gap-2">
                {['compassionate', 'practical', 'balanced'].map(style => (
                  <button
                    key={style}
                    onClick={() => setAiStyle(style)}
                    className={`px-4 py-2 rounded-xl text-sm capitalize transition ${
                      aiStyle === style ? 'bg-wave-cyan/20 text-wave-cyan border border-wave-cyan/30' : 'glass text-mw-400'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Volume2 size={16} className="text-mw-400" /> <span className="text-sm text-mw-300">Voice output</span></div>
              <Toggle on={false} onToggle={() => {}} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><MessageCircle size={16} className="text-mw-400" /> <span className="text-sm text-mw-300">Context memory</span></div>
              <Toggle on onToggle={() => {}} />
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Wellness Goals */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-6">
          <SectionHeader title="Wellness Goals" />
          <div className="space-y-3">
            {[
              { icon: Heart, label: 'Daily mood check-in', color: '#00d4ff' },
              { icon: Target, label: '3 journal entries per week', color: '#8b5cf6' },
              { icon: Brain, label: 'Meditate 5 min daily', color: '#14b8a6' },
              { icon: Moon, label: 'Sleep by 11 PM', color: '#f59e0b' },
            ].map((goal) => (
              <div key={goal.label} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                <div className="flex items-center gap-3">
                  <goal.icon size={16} style={{ color: goal.color }} />
                  <span className="text-sm">{goal.label}</span>
                </div>
                <Toggle on onToggle={() => {}} />
              </div>
            ))}
          </div>
        </GlassCard>
      </FadeIn>

      {/* Notifications */}
      <FadeIn delay={0.25}>
        <GlassCard className="p-6">
          <SectionHeader title="Notifications" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-mw-300">Daily check-in reminder</span>
              <Toggle on={notifyCheckin} onToggle={() => setNotifyCheckin(!notifyCheckin)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-mw-300">AI insights</span>
              <Toggle on={notifyInsight} onToggle={() => setNotifyInsight(!notifyInsight)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-mw-300">Appointment reminders</span>
              <Toggle on={notifyAppointment} onToggle={() => setNotifyAppointment(!notifyAppointment)} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-mw-300">Community activity</span>
              <Toggle on={notifyCommunity} onToggle={() => setNotifyCommunity(!notifyCommunity)} />
            </div>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Appearance */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-6">
          <SectionHeader title="Appearance" />
          <div className="flex gap-3">
            <button
              onClick={() => setTheme('dark')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl transition ${
                theme === 'dark' ? 'bg-wave-cyan/20 border border-wave-cyan/30 text-wave-cyan' : 'glass text-mw-400'
              }`}
            >
              <Moon size={18} /> Dark
            </button>
            <button
              onClick={() => setTheme('light')}
              className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl transition ${
                theme === 'light' ? 'bg-wave-cyan/20 border border-wave-cyan/30 text-wave-cyan' : 'glass text-mw-400'
              }`}
            >
              <Sun size={18} /> Light
            </button>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Privacy & Data */}
      <FadeIn delay={0.35}>
        <GlassCard className="p-6">
          <SectionHeader title="Privacy & Data" />
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Shield size={16} className="text-mw-400" /> <span className="text-sm text-mw-300">Anonymous analytics</span></div>
              <Toggle on onToggle={() => {}} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><Database size={16} className="text-mw-400" /> <span className="text-sm text-mw-300">Local data storage</span></div>
              <Badge color="#22c55e">Active</Badge>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <GlowButton variant="ghost" size="sm">Export Data</GlowButton>
            <GlowButton variant="ghost" size="sm">Delete All Data</GlowButton>
          </div>
        </GlassCard>
      </FadeIn>

      {/* Emergency */}
      <FadeIn delay={0.4}>
        <GlassCard className="p-5 border border-wave-red/20">
          <div className="flex items-start gap-3">
            <AlertTriangle size={18} className="text-wave-red shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-wave-red mb-1">Crisis Resources</p>
              <p className="text-xs text-mw-400">If you&apos;re in crisis: Call <strong className="text-mw-200">988</strong> or text <strong className="text-mw-200">HOME</strong> to <strong className="text-mw-200">741741</strong></p>
            </div>
          </div>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
