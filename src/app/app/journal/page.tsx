'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type JournalEntry } from '@/lib/store';
import { GlassCard, FadeIn, GlowButton, MoodSelector, SectionHeader, Badge, AnimatedNumber } from '@/components/ui';
import { moodEmojis } from '@/lib/mock-data';
import { BookOpen, Plus, Search, Trash2, Brain, Tag, Calendar, X, Check, Sparkles } from 'lucide-react';

const tagOptions = ['anxiety', 'work', 'stress', 'growth', 'relationships', 'sleep', 'gratitude', 'self-care', 'family', 'mood', 'goals', 'reflection'];

export default function JournalPage() {
  const { journals, addJournal, deleteJournal } = useAppStore();
  const [showNew, setShowNew] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(0);
  const [tags, setTags] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const filteredJournals = journals.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.content.toLowerCase().includes(search.toLowerCase()) ||
    j.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    addJournal({
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      mood,
      tags,
      date: new Date().toISOString().split('T')[0],
    });
    setTitle('');
    setContent('');
    setMood(0);
    setTags([]);
    setShowNew(false);
  };

  const toggleTag = (tag: string) => {
    setTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      if (selectedEntry) {
        const updated: JournalEntry = {
          ...selectedEntry,
          analysis: {
            emotions: ['reflective', 'determined', 'hopeful'],
            themes: ['self-awareness', 'growth'],
            stressIndicators: ['pressure patterns'],
            positivePatterns: ['reframing', 'self-compassion'],
            reflectionPrompts: ['What would you tell a friend feeling this way?', 'What small step could you take tomorrow?'],
            suggestedActivities: ['5-min breathing exercise', 'gratitude journaling', 'self-compassion meditation'],
          },
        };
        setSelectedEntry(updated);
      }
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">AI Journal</h1>
            <p className="text-sm text-mw-400 mt-1">Write, reflect, and discover patterns</p>
          </div>
          <GlowButton variant="cyan" onClick={() => setShowNew(true)}>
            <Plus size={16} className="mr-1" /> New Entry
          </GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mw-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search entries..."
            className="w-full pl-10 pr-4 py-3 rounded-xl glass text-sm text-mw-100 placeholder-mw-500 outline-none focus:ring-1 focus:ring-wave-cyan/30"
          />
        </div>
      </FadeIn>

      {/* New Entry Modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setShowNew(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">New Journal Entry</h3>
                <button onClick={() => setShowNew(false)} className="p-1.5 rounded-lg hover:bg-white/10"><X size={18} className="text-mw-400" /></button>
              </div>

              <div className="space-y-4">
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Entry title..."
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-wave-cyan/30"
                />
                <textarea
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  placeholder="Write your thoughts..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:border-wave-cyan/30 resize-none"
                />

                <div>
                  <p className="text-sm text-mw-400 mb-2">How are you feeling?</p>
                  <MoodSelector value={mood || null} onChange={setMood} />
                </div>

                <div>
                  <p className="text-sm text-mw-400 mb-2">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {tagOptions.map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`px-3 py-1 rounded-lg text-xs transition ${
                          tags.includes(tag) ? 'bg-wave-cyan/20 text-wave-cyan border border-wave-cyan/30' : 'bg-white/5 text-mw-400 hover:text-mw-200 border border-white/5'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <GlowButton variant="cyan" onClick={handleSave} disabled={!title.trim() || !content.trim()} className="w-full">
                  <BookOpen size={16} className="mr-1" /> Save Entry
                </GlowButton>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Entry Detail Modal */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
            onClick={() => setSelectedEntry(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-strong rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">{selectedEntry.title}</h3>
                <button onClick={() => setSelectedEntry(null)} className="p-1.5 rounded-lg hover:bg-white/10"><X size={18} className="text-mw-400" /></button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl">{moodEmojis[selectedEntry.mood - 1]}</span>
                <span className="text-xs text-mw-400">{selectedEntry.date}</span>
                {selectedEntry.tags.map(t => <Badge key={t} color="#8b5cf6">{t}</Badge>)}
              </div>

              <p className="text-sm text-mw-300 leading-relaxed mb-6">{selectedEntry.content}</p>

              {/* AI Analysis */}
              {selectedEntry.analysis ? (
                <div className="space-y-4">
                  <h4 className="font-semibold text-wave-cyan flex items-center gap-2"><Brain size={16} /> AI Analysis</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <GlassCard className="p-3">
                      <p className="text-xs text-mw-400 mb-1">Emotions</p>
                      <div className="flex flex-wrap gap-1">{selectedEntry.analysis.emotions.map(e => <Badge key={e} color="#00d4ff">{e}</Badge>)}</div>
                    </GlassCard>
                    <GlassCard className="p-3">
                      <p className="text-xs text-mw-400 mb-1">Themes</p>
                      <div className="flex flex-wrap gap-1">{selectedEntry.analysis.themes.map(t => <Badge key={t} color="#8b5cf6">{t}</Badge>)}</div>
                    </GlassCard>
                    <GlassCard className="p-3">
                      <p className="text-xs text-mw-400 mb-1">Positive Patterns</p>
                      <div className="flex flex-wrap gap-1">{selectedEntry.analysis.positivePatterns.map(p => <Badge key={p} color="#22c55e">{p}</Badge>)}</div>
                    </GlassCard>
                    <GlassCard className="p-3">
                      <p className="text-xs text-mw-400 mb-1">Stress Indicators</p>
                      <div className="flex flex-wrap gap-1">{selectedEntry.analysis.stressIndicators.map(s => <Badge key={s} color="#f59e0b">{s}</Badge>)}</div>
                    </GlassCard>
                  </div>
                  {selectedEntry.analysis.reflectionPrompts.length > 0 && (
                    <GlassCard className="p-3">
                      <p className="text-xs text-mw-400 mb-2">Reflection Prompts</p>
                      {selectedEntry.analysis.reflectionPrompts.map(p => (
                        <p key={p} className="text-sm text-mw-200 mb-1">💡 {p}</p>
                      ))}
                    </GlassCard>
                  )}
                </div>
              ) : (
                <GlowButton variant="purple" onClick={handleAnalyze} className="w-full" disabled={analyzing}>
                  {analyzing ? (
                    <span className="flex items-center gap-2"><Sparkles size={14} className="animate-spin" /> Analyzing...</span>
                  ) : (
                    <span className="flex items-center gap-2"><Brain size={14} /> Analyze with MIND WAVE AI</span>
                  )}
                </GlowButton>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Journal Entries */}
      <div className="grid gap-4">
        {filteredJournals.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-5 cursor-pointer" onClick={() => setSelectedEntry(entry)}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{moodEmojis[entry.mood - 1]}</span>
                    <h3 className="font-semibold">{entry.title}</h3>
                  </div>
                  <p className="text-sm text-mw-400 line-clamp-2 mb-3">{entry.content}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-mw-500">{entry.date}</span>
                    {entry.tags.slice(0, 3).map(t => <Badge key={t} color="#8b5cf6">{t}</Badge>)}
                    {entry.analysis && <Badge color="#00d4ff">AI Analyzed</Badge>}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); deleteJournal(entry.id); }}
                  className="p-1.5 rounded-lg hover:bg-wave-red/10 text-mw-500 hover:text-wave-red transition"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {filteredJournals.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={48} className="text-mw-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No journal entries yet</h3>
          <p className="text-sm text-mw-400">Start writing to discover patterns in your thoughts</p>
        </div>
      )}
    </div>
  );
}
