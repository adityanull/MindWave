'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, type ChatMessage } from '@/lib/store';
import { aiSuggestedPrompts } from '@/lib/mock-data';
import { ChatBubble, TypingIndicator, GlowButton, GlassCard, CrisisBanner } from '@/components/ui';
import { Send, Trash2, Mic, MicOff, Volume2, VolumeX, Brain, Sparkles, AlertTriangle, Copy, Check } from 'lucide-react';

const aiResponses: Record<string, string> = {
  "I'm feeling anxious today.": "I hear you. Anxiety can feel overwhelming, but acknowledging it is a powerful first step. Let's explore what's behind it. Can you tell me what specifically triggered this feeling today?\n\nIn the meantime, here's something that might help: Try placing both feet firmly on the ground and noticing 3 things you can see right now. This simple grounding technique can help calm your nervous system.",
  "I can't focus.": "Difficulty focusing is really common, especially when there's a lot on your mind. It's often your brain's way of saying it needs a reset.\n\nHere are a few things to try:\n• Try the 5-4-3-2-1 grounding technique in our Self-Care Center\n• Set a timer for just 10 minutes of focused work — starting small builds momentum\n• Check if you've eaten, hydrated, or rested recently — basic needs affect focus more than we realize\n\nWhat's been on your mind when you try to focus?",
  "I had a really difficult day.": "I'm sorry to hear that. Difficult days happen, and they're valid. You don't have to carry it alone right now.\n\nWhen you're ready, it might help to:\n1. Acknowledge what made it hard — you've already started by telling me\n2. Ask yourself: \"What's one small thing I can do for myself tonight?\"\n3. Remember that tomorrow is a new day with new possibilities\n\nWould you like to talk about what happened, or would you prefer some self-care suggestions?",
  "Help me calm down.": "Let's bring you back to center. Follow along:\n\n🌬️ **Breathe with me:**\n• Inhale slowly through your nose — 4 seconds\n• Hold gently — 4 seconds\n• Exhale through your mouth — 6 seconds\n• Repeat 3 times\n\nYou can also try our guided breathing exercises in the Self-Care Center for a more immersive experience.\n\nHow are you feeling after those breaths? Even a tiny shift counts.",
  "I don't understand what I'm feeling.": "That's actually more common than you might think, and it's okay. Sometimes emotions are complex or mixed, and putting words to them takes time.\n\nLet's try to untangle it together:\n• Where in your body do you feel it? (chest, stomach, head, shoulders?)\n• Is it one feeling or several layered together?\n• Does it feel heavy, light, tight, or fluttery?\n\nSometimes just describing the physical sensation can help identify the emotion. There's no rush — take your time.",
};

const defaultResponse = "Thank you for sharing that with me. I'm here to listen and support you.\n\nBased on what you've told me, it sounds like you're navigating some real challenges. Would you like to explore this further, or would you prefer some practical self-care suggestions?\n\nRemember, I'm a wellness companion — not a therapist. If you're dealing with something serious, I can help you find professional support.";

export default function ChatPage() {
  const { chatMessages, addChatMessage, clearChat } = useAppStore();
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => { scrollToBottom(); }, [chatMessages, isTyping]);

  const handleSend = (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: msg,
      timestamp: new Date(),
    };
    addChatMessage(userMsg);
    setInput('');

    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'dont want to live', "don't want to live", 'self-harm', 'hurt myself'];
    if (crisisKeywords.some(k => msg.toLowerCase().includes(k))) {
      setShowCrisis(true);
    }

    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const response = aiResponses[msg] || defaultResponse;
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      addChatMessage(aiMsg);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  };

  const handleReaction = (id: string, reaction: 'helpful' | 'not-helpful') => {
    // Placeholder for reaction handling
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(content);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-6rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wave-cyan to-wave-purple flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold">MIND WAVE AI</h1>
            <p className="text-xs text-mw-400">Your wellness companion</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setVoiceOn(!voiceOn)} className="p-2 rounded-xl hover:bg-white/5 text-mw-400 hover:text-mw-200 transition">
            {voiceOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button onClick={() => setListening(!listening)} className={`p-2 rounded-xl transition ${listening ? 'bg-wave-red/20 text-wave-red' : 'hover:bg-white/5 text-mw-400 hover:text-mw-200'}`}>
            {listening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>
          {chatMessages.length > 0 && (
            <button onClick={clearChat} className="p-2 rounded-xl hover:bg-white/5 text-mw-400 hover:text-mw-200 transition" title="Clear conversation">
              <Trash2 size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Crisis banner */}
      <AnimatePresence>
        {showCrisis && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <CrisisBanner />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar space-y-1 mb-4">
        {chatMessages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center mb-8"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wave-cyan/20 to-wave-purple/20 flex items-center justify-center mx-auto mb-4">
                <Brain size={32} className="text-wave-cyan" />
              </div>
              <h2 className="text-xl font-bold mb-2">Hi, I&apos;m MIND WAVE AI</h2>
              <p className="text-sm text-mw-400 max-w-sm mx-auto">
                I&apos;m here to listen, support, and help you understand your emotions. What&apos;s on your mind?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg w-full"
            >
              {aiSuggestedPrompts.map((prompt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSend(prompt)}
                  className="glass-card p-4 text-left text-sm text-mw-300 hover:text-mw-100"
                >
                  <Sparkles size={14} className="text-wave-cyan mb-2" />
                  {prompt}
                </motion.button>
              ))}
            </motion.div>
          </div>
        ) : (
          <>
            {chatMessages.filter(m => m.role !== 'system').map((msg) => (
              <ChatBubble key={msg.id} message={msg as { id: string; role: 'user' | 'assistant'; content: string; reaction?: 'helpful' | 'not-helpful'; timestamp: Date }} onReaction={handleReaction} onCopy={handleCopy} />
            ))}
            {isTyping && <TypingIndicator />}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Disclaimer */}
      <p className="text-[10px] text-mw-500 text-center mb-2">
        MIND WAVE AI is a wellness companion, not a licensed therapist. Not for medical diagnosis or emergency. If in crisis, call 988.
      </p>

      {/* Input */}
      <div className="glass rounded-2xl p-2 flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Share what's on your mind..."
          rows={1}
          className="flex-1 bg-transparent border-none outline-none text-sm text-mw-100 placeholder-mw-500 resize-none min-h-[40px] max-h-[120px] p-2"
          style={{ height: 'auto' }}
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleSend()}
          disabled={!input.trim()}
          className="p-2.5 rounded-xl bg-gradient-to-r from-wave-cyan to-wave-purple text-white disabled:opacity-30 transition"
        >
          <Send size={16} />
        </motion.button>
      </div>
    </div>
  );
}
