'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Brain, MessageCircle, BarChart3, BookOpen, Heart, Users, Shield, Sparkles, ArrowRight, ChevronDown, Activity, ClipboardCheck, BookHeart } from 'lucide-react';
import { WaveBackground, HeroWaveSVG, FloatingOrbs } from '@/components/wave-bg';

const features = [
  { icon: Brain, title: 'MIND WAVE AI', desc: 'Your personal AI wellness companion. Context-aware conversations that understand your mood, history, and needs.', color: '#00d4ff' },
  { icon: BarChart3, title: 'Wellness Dashboard', desc: 'Track your mood, stress, anxiety, sleep, and energy with beautiful animated visualizations.', color: '#8b5cf6' },
  { icon: Activity, title: 'Daily Check-ins', desc: 'Quick mood assessments that build your wellness profile over time with personalized insights.', color: '#14b8a6' },
  { icon: BookOpen, title: 'AI Journal', desc: 'Write, reflect, and analyze. AI detects emotions, themes, and patterns in your entries.', color: '#ec4899' },
  { icon: ClipboardCheck, title: 'Assessments', desc: 'Screening tools for anxiety, depression, stress, ADHD, burnout, and sleep quality.', color: '#f59e0b' },
  { icon: Heart, title: 'Self-Care Center', desc: 'Breathing exercises, guided meditation, sleep routines, grounding, and focus sessions.', color: '#22c55e' },
  { icon: Users, title: 'Therapist Discovery', desc: 'Find and book sessions with licensed therapists. Filter by specialization, price, and availability.', color: '#00d4ff' },
  { icon: BookHeart, title: 'Community', desc: 'Anonymous peer support in moderated categories. Share, learn, and heal together.', color: '#8b5cf6' },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass-card p-6 group cursor-pointer"
    >
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: `${feature.color}15` }}>
        <feature.icon size={24} style={{ color: feature.color }} />
      </div>
      <h3 className="text-lg font-bold mb-2 group-hover:text-gradient-cyan transition">{feature.title}</h3>
      <p className="text-sm text-mw-400 leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

export default function LandingPage() {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef);

  return (
    <div className="min-h-screen bg-mw-950 overflow-x-hidden">
      <WaveBackground />
      <FloatingOrbs />

      {/* Navbar */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 glass px-6 py-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-wave-cyan to-wave-purple flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gradient-cyan">MIND WAVE</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          {['Features', 'AI', 'Community', 'Self-Care'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm text-mw-400 hover:text-mw-100 transition">{item}</a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Link href="/app" className="text-sm text-mw-300 hover:text-mw-100 transition px-3 py-2">
            Sign In
          </Link>
          <Link href="/app" className="px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-wave-cyan/80 to-wave-purple/80 text-white hover:shadow-[0_0_25px_rgba(0,212,255,0.3)] transition-all duration-300">
            Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-mw-300 mb-8"
            >
              <Sparkles size={14} className="text-wave-cyan" />
              AI-Powered Mental Wellness
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-6"
          >
            <span className="text-gradient-wave">Ride the wave</span>
            <br />
            <span className="text-mw-100">of your mind.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg md:text-xl text-mw-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            An AI-powered space to understand your emotions, build healthier habits,
            and take control of your mental wellbeing.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/app">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-wave-cyan to-wave-purple text-white shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                Start Your Journey <ArrowRight size={18} className="inline ml-2" />
              </motion.button>
            </Link>
            <Link href="/app/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-2xl text-base font-semibold glass text-mw-200 hover:text-white"
              >
                <MessageCircle size={18} className="inline mr-2" /> Talk to MIND WAVE AI
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Hero visual - animated wave circles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full border border-wave-cyan/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full border border-wave-purple/10"
          />
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-wave-cyan/20 to-wave-purple/20 blur-2xl"
          />
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={24} className="text-mw-500" />
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Your mental wellness <span className="text-gradient-cyan">ecosystem</span>
            </h2>
            <p className="text-mw-400 max-w-lg mx-auto">
              Every tool you need to understand, track, and improve your mental wellbeing — powered by AI.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((feature, i) => (
              <FeatureCard key={feature.title} feature={feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section id="ai" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-wave-cyan/10 text-wave-cyan text-sm font-medium mb-6">
                <Brain size={14} /> AI Companion
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet <span className="text-gradient-cyan">MIND WAVE AI</span>
              </h2>
              <p className="text-mw-400 mb-6 leading-relaxed">
                Not just a chatbot. A context-aware wellness companion that understands your mood patterns, remembers your concerns, and provides personalized support.
              </p>
              <ul className="space-y-3">
                {['Mood-aware conversations', 'Remembers your context', 'Personalized insights', 'Crisis-aware safety layer'].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-mw-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-wave-cyan" /> {item}
                  </li>
                ))}
              </ul>
              <Link href="/app/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="mt-8 px-6 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-wave-cyan/80 to-wave-purple/80 text-white"
                >
                  Talk to MIND WAVE AI <ArrowRight size={16} className="inline ml-1" />
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 space-y-4"
            >
              {[
                { role: 'user', msg: "I've been feeling overwhelmed with work lately." },
                { role: 'ai', msg: "I hear you. Feeling overwhelmed is a signal that something needs attention, not that something is wrong with you. What specifically has been weighing on you the most?" },
                { role: 'user', msg: "Deadlines keep piling up and I can't focus." },
                { role: 'ai', msg: "That's a pattern I've noticed in our conversations — deadline stress seems to come up regularly. Would you like to try a quick grounding exercise, or would you prefer to talk through what's on your plate?" },
              ].map((chat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    chat.role === 'user' ? 'bg-wave-cyan/15 border border-wave-cyan/20 rounded-br-md' : 'glass rounded-bl-md'
                  }`}>
                    {chat.role === 'ai' && <span className="text-xs font-medium text-wave-cyan block mb-1">MIND WAVE AI</span>}
                    {chat.msg}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Active Users', color: '#00d4ff' },
              { value: '2M+', label: 'AI Conversations', color: '#8b5cf6' },
              { value: '98%', label: 'User Satisfaction', color: '#14b8a6' },
              { value: '150+', label: 'Expert Therapists', color: '#ec4899' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-black mb-1" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-sm text-mw-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Shield size={40} className="text-wave-teal mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Your safety comes first</h3>
            <p className="text-mw-400 max-w-lg mx-auto mb-4">
              MIND WAVE includes crisis detection, content moderation, and clear pathways to professional help when needed. We never replace professional care — we complement it.
            </p>
            <p className="text-xs text-mw-500">
              If you're in crisis: Call <strong className="text-mw-300">988</strong> or text <strong className="text-mw-300">HOME</strong> to <strong className="text-mw-300">741741</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient-wave">ride the wave?</span>
            </h2>
            <p className="text-mw-400 mb-8">Start your journey toward better mental wellness today.</p>
            <Link href="/app">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,212,255,0.4)' }}
                whileTap={{ scale: 0.97 }}
                className="px-10 py-5 rounded-2xl text-lg font-bold bg-gradient-to-r from-wave-cyan to-wave-purple text-white shadow-[0_0_20px_rgba(0,212,255,0.2)]"
              >
                Start Your Journey
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-wave-cyan to-wave-purple flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="font-bold text-gradient-cyan">MIND WAVE</span>
          </div>
          <p className="text-xs text-mw-500">
            © 2026 MIND WAVE. Not a substitute for professional mental health care. If in crisis, call 988.
          </p>
        </div>
      </footer>
    </div>
  );
}
