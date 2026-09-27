'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { knowledgeArticles, knowledgeCategories } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, Badge, SectionHeader } from '@/components/ui';
import { Search, BookOpen, Clock, Star, Brain, ChevronRight, Sparkles } from 'lucide-react';

export default function KnowledgePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = knowledgeArticles.filter(a => {
    const matchSearch = a.title.toLowerCase().includes(search.toLowerCase()) || a.summary.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    return matchSearch && matchCat;
  });

  const featured = knowledgeArticles.filter(a => a.featured);

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold">Knowledge Hub</h1>
        <p className="text-sm text-mw-400 mt-1">Evidence-based mental health education</p>
      </FadeIn>

      {/* AI Search */}
      <FadeIn delay={0.1}>
        <GlassCard className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Brain size={18} className="text-wave-cyan" />
            <span className="text-sm font-semibold text-wave-cyan">AI-Powered Search</span>
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mw-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Ask anything about mental health..."
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-mw-100 placeholder-mw-500 outline-none focus:border-wave-cyan/30"
            />
          </div>
        </GlassCard>
      </FadeIn>

      {/* Categories */}
      <FadeIn delay={0.15}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['All', ...knowledgeCategories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                activeCategory === cat ? 'bg-wave-teal/20 text-wave-teal border border-wave-teal/30' : 'glass text-mw-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Featured */}
      {activeCategory === 'All' && search === '' && (
        <FadeIn delay={0.2}>
          <SectionHeader title="Featured" subtitle="Recommended reading" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((article, i) => (
              <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <GlassCard className="p-5 cursor-pointer" hover>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={12} className="text-wave-amber" />
                    <Badge color="#14b8a6">{article.category}</Badge>
                  </div>
                  <h3 className="font-bold mb-2">{article.title}</h3>
                  <p className="text-xs text-mw-400 line-clamp-2 mb-3">{article.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-mw-500 flex items-center gap-1"><Clock size={12} /> {article.readTime}</span>
                    <span className="text-xs text-wave-teal">Read →</span>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      )}

      {/* All Articles */}
      <div className="grid gap-4">
        {filtered.map((article, i) => (
          <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
            <GlassCard className="p-5 cursor-pointer" hover>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-wave-teal/10 flex items-center justify-center shrink-0">
                  <BookOpen size={18} className="text-wave-teal" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge color="#14b8a6">{article.category}</Badge>
                    <span className="text-xs text-mw-500 flex items-center gap-1"><Clock size={10} /> {article.readTime}</span>
                    {article.featured && <Star size={10} className="text-wave-amber" />}
                  </div>
                  <h3 className="font-semibold mb-1">{article.title}</h3>
                  <p className="text-xs text-mw-400 line-clamp-1">{article.summary}</p>
                </div>
                <ChevronRight size={16} className="text-mw-500 shrink-0" />
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* RAG architecture note */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-wave-purple" />
            <span className="text-xs font-semibold text-wave-purple">AI Knowledge Architecture</span>
          </div>
          <p className="text-xs text-mw-400">This hub is designed for future integration with a RAG system and vector database for AI-powered knowledge retrieval.</p>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
