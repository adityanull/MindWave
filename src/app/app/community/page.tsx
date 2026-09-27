'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { communityPosts, communityCategories } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, Badge } from '@/components/ui';
import { Search, Heart, MessageCircle, Flag, Plus, TrendingUp, Filter } from 'lucide-react';

export default function CommunityPage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [reactions, setReactions] = useState<Record<string, { support: number; relate: number }>>({});

  const filtered = communityPosts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.content.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  const react = (postId: string, type: 'support' | 'relate') => {
    setReactions(prev => ({
      ...prev,
      [postId]: {
        support: (prev[postId]?.support ?? communityPosts.find(p => p.id === postId)?.reactions.support ?? 0) + (type === 'support' ? 1 : 0),
        relate: (prev[postId]?.relate ?? communityPosts.find(p => p.id === postId)?.reactions.relate ?? 0) + (type === 'relate' ? 1 : 0),
      }
    }));
  };

  const getReactions = (postId: string, type: 'support' | 'relate') => {
    const post = communityPosts.find(p => p.id === postId);
    return reactions[postId]?.[type] ?? post?.reactions[type] ?? 0;
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Community</h1>
            <p className="text-sm text-mw-400 mt-1">Anonymous peer support and discussion</p>
          </div>
          <GlowButton variant="purple" size="sm"><Plus size={14} className="mr-1" /> New Post</GlowButton>
        </div>
      </FadeIn>

      {/* Search */}
      <FadeIn delay={0.1}>
        <div className="relative">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mw-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search discussions..."
            className="w-full pl-10 pr-4 py-3 rounded-xl glass text-sm text-mw-100 placeholder-mw-500 outline-none focus:ring-1 focus:ring-wave-cyan/30"
          />
        </div>
      </FadeIn>

      {/* Categories */}
      <FadeIn delay={0.15}>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {['All', ...communityCategories].map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                activeCategory === cat ? 'bg-wave-purple/20 text-wave-purple border border-wave-purple/30' : 'glass text-mw-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Trending */}
      <FadeIn delay={0.2}>
        <GlassCard className="p-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-wave-amber" />
          <span className="text-sm font-medium text-wave-amber">Trending:</span>
          <span className="text-sm text-mw-300">Morning anxiety tips • Setting boundaries • Sleep routines</span>
        </GlassCard>
      </FadeIn>

      {/* Posts */}
      <div className="grid gap-4">
        {filtered.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-5">
              <div className="flex items-center gap-2 mb-3">
                <Badge color="#8b5cf6">{post.category}</Badge>
                <span className="text-xs text-mw-500">{post.time}</span>
              </div>
              <h3 className="font-bold mb-2">{post.title}</h3>
              <p className="text-sm text-mw-400 mb-4 leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-4">
                <button onClick={() => react(post.id, 'support')} className="flex items-center gap-1.5 text-xs text-mw-400 hover:text-wave-pink transition">
                  <Heart size={14} /> {getReactions(post.id, 'support')}
                </button>
                <button onClick={() => react(post.id, 'relate')} className="flex items-center gap-1.5 text-xs text-mw-400 hover:text-wave-cyan transition">
                  <span>🤝</span> {getReactions(post.id, 'relate')}
                </button>
                <span className="flex items-center gap-1.5 text-xs text-mw-500">
                  <MessageCircle size={14} /> {post.comments}
                </span>
                <button className="ml-auto text-xs text-mw-500 hover:text-mw-300 transition flex items-center gap-1">
                  <Flag size={12} /> Report
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Community Guidelines */}
      <FadeIn delay={0.3}>
        <GlassCard className="p-5">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <span className="text-wave-teal">🛡️</span> Community Safety
          </h4>
          <ul className="text-xs text-mw-400 space-y-1">
            <li>• All posts are anonymous and moderated by AI</li>
            <li>• Be respectful — no harassment, hate speech, or toxicity</li>
            <li>• If you notice crisis-related content, please report it</li>
            <li>• This is a support space, not a substitute for professional help</li>
          </ul>
        </GlassCard>
      </FadeIn>
    </div>
  );
}
