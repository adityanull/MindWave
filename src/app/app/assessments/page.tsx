'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assessments } from '@/lib/mock-data';
import { useAppStore } from '@/lib/store';
import { GlassCard, FadeIn, GlowButton, SectionHeader, Badge, CrisisBanner } from '@/components/ui';
import { ClipboardCheck, ArrowRight, ArrowLeft, Check, AlertTriangle, Brain, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AssessmentsPage() {
  const { addAssessmentResult } = useAppStore();
  const [selectedAssessment, setSelectedAssessment] = useState<string | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [showResults, setShowResults] = useState(false);

  const assessment = assessments.find(a => a.id === selectedAssessment);

  const startAssessment = (id: string) => {
    setSelectedAssessment(id);
    setCurrentQ(0);
    setAnswers([]);
    setShowResults(false);
  };

  const selectAnswer = (qIndex: number, aIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = aIndex;
    setAnswers(newAnswers);
  };

  const nextQ = () => {
    if (!assessment) return;
    if (currentQ < assessment.questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate score
      const score = answers.reduce((sum: number, a) => sum + (a ?? 0), 0);
      const maxScore = assessment.questions.length * (assessment.questions[0].options.length - 1);
      addAssessmentResult({
        id: Date.now().toString(),
        type: assessment.name,
        score: score as number,
        maxScore,
        interpretation: (score as number) / maxScore < 0.3 ? 'Minimal' : (score as number) / maxScore < 0.5 ? 'Mild' : (score as number) / maxScore < 0.7 ? 'Moderate' : 'Severe',
        date: new Date().toISOString().split('T')[0],
      });
      setShowResults(true);
    }
  };

  if (assessment && !showResults) {
    const question = assessment.questions[currentQ];
    const progress = ((currentQ + 1) / assessment.questions.length) * 100;

    return (
      <div className="max-w-lg mx-auto">
        <button onClick={() => { setSelectedAssessment(null); }} className="text-sm text-mw-400 hover:text-mw-200 mb-4 flex items-center gap-1">
          <ArrowLeft size={14} /> Back to assessments
        </button>

        <div className="mb-6">
          <div className="flex justify-between text-xs text-mw-500 mb-2">
            <span>Question {currentQ + 1} of {assessment.questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full rounded-full"
              style={{ background: assessment.color }}
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GlassCard className="p-6">
              <h2 className="text-lg font-bold mb-6">{question.text}</h2>
              <div className="space-y-3">
                {question.options.map((option, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => selectAnswer(currentQ, i)}
                    className={`w-full p-4 rounded-xl text-left text-sm transition-all ${
                      answers[currentQ] === i
                        ? 'border-2 text-white'
                        : 'glass text-mw-300 hover:text-mw-100'
                    }`}
                    style={answers[currentQ] === i ? { borderColor: assessment.color, background: `${assessment.color}15` } : {}}
                  >
                    {answers[currentQ] === i && <Check size={14} className="inline mr-2" />}
                    {option}
                  </motion.button>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-6">
          <GlowButton variant="ghost" onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}>
            <ArrowLeft size={16} className="mr-1" /> Back
          </GlowButton>
          <GlowButton onClick={nextQ} disabled={answers[currentQ] === null} variant="cyan">
            {currentQ < assessment.questions.length - 1 ? 'Next' : 'See Results'} <ArrowRight size={16} className="ml-1" />
          </GlowButton>
        </div>
      </div>
    );
  }

  if (assessment && showResults) {
    const score: number = answers.reduce((sum: number, a) => sum + (a ?? 0), 0);
    const maxScore = assessment.questions.length * (assessment.questions[0].options.length - 1);
    const pct = score / maxScore;
    const interpretation = pct < 0.3 ? 'Minimal' : pct < 0.5 ? 'Mild' : pct < 0.7 ? 'Moderate' : 'Severe';

    return (
      <div className="max-w-lg mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="p-6 text-center">
            <div className="text-4xl mb-4">{assessment.icon}</div>
            <h2 className="text-xl font-bold mb-2">{assessment.name} Results</h2>

            <div className="my-6">
              <div className="text-5xl font-black mb-2" style={{ color: assessment.color }}>
                {score}/{maxScore}
              </div>
              <div className="h-3 rounded-full bg-white/5 overflow-hidden max-w-xs mx-auto">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct * 100}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: assessment.color }}
                />
              </div>
            </div>

            <Badge color={assessment.color}>{interpretation}</Badge>

            <div className="mt-6 bg-wave-amber/10 border border-wave-amber/20 rounded-xl p-4 text-left">
              <p className="text-xs font-semibold text-wave-amber flex items-center gap-1 mb-1">
                <AlertTriangle size={12} /> Important
              </p>
              <p className="text-xs text-mw-300">This screening result is not a medical diagnosis. It is a general indicator only. Please consult a qualified mental health professional for an accurate assessment.</p>
            </div>

            <div className="mt-6 space-y-3 text-left">
              <h4 className="font-semibold">Recommendations</h4>
              {pct >= 0.5 && <p className="text-sm text-mw-300">• Consider speaking with a mental health professional</p>}
              <p className="text-sm text-mw-300">• Practice daily self-care and mindfulness</p>
              <p className="text-sm text-mw-300">• Maintain a consistent sleep schedule</p>
              <p className="text-sm text-mw-300">• Stay connected with supportive people</p>
            </div>

            <div className="flex gap-3 mt-6">
              <Link href="/app/chat" className="flex-1">
                <GlowButton variant="cyan" className="w-full"><Brain size={14} className="mr-1" /> Talk to AI</GlowButton>
              </Link>
              <Link href="/app/therapists" className="flex-1">
                <GlowButton variant="purple" className="w-full"><Users size={14} className="mr-1" /> Find Therapist</GlowButton>
              </Link>
            </div>

            <button onClick={() => { setSelectedAssessment(null); }} className="mt-4 text-sm text-mw-400 hover:text-mw-200">
              ← Back to assessments
            </button>
          </GlassCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="text-2xl font-bold">Wellness Assessments</h1>
        <p className="text-sm text-mw-400 mt-1">Screening tools to help you understand your mental health</p>
      </FadeIn>

      <div className="bg-wave-amber/10 border border-wave-amber/20 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle size={18} className="text-wave-amber shrink-0 mt-0.5" />
        <p className="text-xs text-mw-300">These assessments are screening tools, not clinical diagnoses. Results should be discussed with a qualified professional.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {assessments.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <GlassCard className="p-6 cursor-pointer" onClick={() => startAssessment(a.id)}>
              <div className="text-3xl mb-3">{a.icon}</div>
              <h3 className="text-lg font-bold mb-1">{a.name}</h3>
              <p className="text-sm text-mw-400 mb-4">{a.description}</p>
              <div className="flex items-center justify-between">
                <Badge color={a.color}>{a.questions.length} questions</Badge>
                <span className="text-xs text-mw-500">~{a.questions.length} min</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
