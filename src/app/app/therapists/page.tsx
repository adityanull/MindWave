'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { therapists } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, Badge, SectionHeader } from '@/components/ui';
import { Search, Star, Globe, Clock, DollarSign, Video, MapPin, ChevronRight, X, Calendar, Check } from 'lucide-react';
import Link from 'next/link';

export default function TherapistsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);

  const filtered = therapists.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.specialization.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || (filter === 'online' && t.online) || (filter === 'offline' && !t.online);
    return matchesSearch && matchesFilter;
  });

  const selected = therapists.find(t => t.id === selectedTherapist);

  return (
    <div className="space-y-6">
      {/* Therapist Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelectedTherapist(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{selected.name}</h3>
                <button onClick={() => setSelectedTherapist(null)} className="p-1.5 rounded-lg hover:bg-white/10"><X size={18} className="text-mw-400" /></button>
              </div>

              <div className="text-4xl mb-3">{selected.image}</div>
              <Badge color="#00d4ff">{selected.specialization}</Badge>

              <p className="text-sm text-mw-300 leading-relaxed mt-4 mb-6">{selected.bio}</p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <GlassCard className="p-3 text-center">
                  <p className="text-xs text-mw-400 mb-1">Experience</p>
                  <p className="text-lg font-bold">{selected.experience} years</p>
                </GlassCard>
                <GlassCard className="p-3 text-center">
                  <p className="text-xs text-mw-400 mb-1">Rating</p>
                  <p className="text-lg font-bold text-wave-amber">⭐ {selected.rating}</p>
                </GlassCard>
                <GlassCard className="p-3 text-center">
                  <p className="text-xs text-mw-400 mb-1">Per Session</p>
                  <p className="text-lg font-bold">${selected.price}</p>
                </GlassCard>
                <GlassCard className="p-3 text-center">
                  <p className="text-xs text-mw-400 mb-1">Availability</p>
                  <p className="text-sm font-bold">{selected.availability}</p>
                </GlassCard>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {selected.specializations.map(s => <Badge key={s} color="#8b5cf6">{s}</Badge>)}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {selected.languages.map(l => <Badge key={l} color="#14b8a6">{l}</Badge>)}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {selected.online ? <Badge color="#22c55e"><Video size={12} className="inline mr-1" /> Online</Badge> : <Badge color="#f59e0b"><MapPin size={12} className="inline mr-1" /> In-Person</Badge>}
              </div>

              <Link href="/app/appointments">
                <GlowButton variant="cyan" className="w-full">
                  <Calendar size={16} className="mr-1" /> Book Session
                </GlowButton>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <FadeIn>
        <h1 className="text-2xl font-bold">Find a Therapist</h1>
        <p className="text-sm text-mw-400 mt-1">Licensed professionals ready to support you</p>
      </FadeIn>

      {/* Search & Filters */}
      <FadeIn delay={0.1}>
        <div className="flex gap-3 flex-col sm:flex-row">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mw-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or specialization..."
              className="w-full pl-10 pr-4 py-3 rounded-xl glass text-sm text-mw-100 placeholder-mw-500 outline-none focus:ring-1 focus:ring-wave-cyan/30"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'online', 'offline'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  filter === f ? 'bg-wave-cyan/20 text-wave-cyan border border-wave-cyan/30' : 'glass text-mw-400'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Therapist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((therapist, i) => (
          <motion.div
            key={therapist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-5 cursor-pointer" onClick={() => setSelectedTherapist(therapist.id)}>
              <div className="flex items-start gap-3 mb-3">
                <span className="text-3xl">{therapist.image}</span>
                <div className="flex-1">
                  <h3 className="font-bold">{therapist.name}</h3>
                  <p className="text-xs text-wave-cyan">{therapist.specialization}</p>
                </div>
                {therapist.online && <Badge color="#22c55e">Online</Badge>}
              </div>

              <p className="text-xs text-mw-400 line-clamp-2 mb-3">{therapist.bio}</p>

              <div className="flex items-center gap-4 text-xs text-mw-400">
                <span className="flex items-center gap-1"><Star size={12} className="text-wave-amber" /> {therapist.rating}</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {therapist.experience}yr</span>
                <span className="flex items-center gap-1"><DollarSign size={12} /> ${therapist.price}</span>
              </div>

              <div className="flex flex-wrap gap-1 mt-3">
                {therapist.languages.map(l => <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-mw-400">{l}</span>)}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
