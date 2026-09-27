import { create } from 'zustand';

export interface MoodEntry {
  id: string;
  mood: number;
  stress: number;
  anxiety: number;
  sleep: number;
  energy: number;
  focus: number;
  note?: string;
  tags?: string[];
  date: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: number;
  tags: string[];
  date: string;
  analysis?: JournalAnalysis;
}

export interface JournalAnalysis {
  emotions: string[];
  themes: string[];
  stressIndicators: string[];
  positivePatterns: string[];
  reflectionPrompts: string[];
  suggestedActivities: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  reaction?: 'helpful' | 'not-helpful';
}

export interface Appointment {
  id: string;
  therapistId: string;
  therapistName: string;
  date: string;
  time: string;
  type: 'video' | 'audio' | 'chat';
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface AssessmentResult {
  id: string;
  type: string;
  score: number;
  maxScore: number;
  interpretation: string;
  date: string;
}

export interface Notification {
  id: string;
  type: 'checkin' | 'insight' | 'appointment' | 'community' | 'goal' | 'assessment';
  title: string;
  message: string;
  read: boolean;
  date: string;
}

interface AppState {
  // Mood
  currentMood: number | null;
  moodHistory: MoodEntry[];
  setCurrentMood: (mood: number) => void;
  addMoodEntry: (entry: MoodEntry) => void;

  // Journal
  journals: JournalEntry[];
  addJournal: (entry: JournalEntry) => void;
  deleteJournal: (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;

  // Appointments
  appointments: Appointment[];
  addAppointment: (apt: Appointment) => void;
  cancelAppointment: (id: string) => void;

  // Assessments
  assessmentResults: AssessmentResult[];
  addAssessmentResult: (result: AssessmentResult) => void;

  // Notifications
  notifications: Notification[];
  markNotificationRead: (id: string) => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentMood: null,
  moodHistory: [
    { id: '1', mood: 4, stress: 3, anxiety: 2, sleep: 4, energy: 4, focus: 3, date: '2026-01-09' },
    { id: '2', mood: 3, stress: 4, anxiety: 3, sleep: 3, energy: 3, focus: 2, date: '2026-01-10' },
    { id: '3', mood: 2, stress: 5, anxiety: 4, sleep: 2, energy: 2, focus: 2, date: '2026-01-11' },
    { id: '4', mood: 3, stress: 4, anxiety: 3, sleep: 3, energy: 3, focus: 3, date: '2026-01-12' },
    { id: '5', mood: 4, stress: 3, anxiety: 2, sleep: 4, energy: 4, focus: 4, date: '2026-01-13' },
    { id: '6', mood: 5, stress: 2, anxiety: 1, sleep: 5, energy: 5, focus: 4, date: '2026-01-14' },
    { id: '7', mood: 4, stress: 2, anxiety: 2, sleep: 4, energy: 4, focus: 3, date: '2026-01-15' },
  ],
  setCurrentMood: (mood) => set({ currentMood: mood }),
  addMoodEntry: (entry) => set((s) => ({ moodHistory: [...s.moodHistory, entry], currentMood: entry.mood })),

  journals: [
    {
      id: '1', title: 'Finding clarity', content: 'Today I took a step back and realized that my anxiety about work comes from perfectionism. I need to remind myself that done is better than perfect.', mood: 4, tags: ['anxiety', 'work', 'growth'], date: '2026-01-14',
      analysis: { emotions: ['reflective', 'hopeful', 'determined'], themes: ['perfectionism', 'work-life balance'], stressIndicators: ['perfectionism patterns'], positivePatterns: ['self-awareness', 'reframing thoughts'], reflectionPrompts: ['What would you tell a friend who feels this way?'], suggestedActivities: ['5-min breathing exercise', 'self-compassion meditation'] }
    },
    {
      id: '2', title: 'Difficult morning', content: 'Woke up feeling overwhelmed. The pressure of deadlines is getting to me. I need to break things into smaller steps.', mood: 2, tags: ['stress', 'work', 'overwhelm'], date: '2026-01-12',
      analysis: { emotions: ['overwhelmed', 'anxious', 'stressed'], themes: ['work pressure', 'deadline stress'], stressIndicators: ['overwhelm', 'catastrophizing'], positivePatterns: ['problem-solving approach'], reflectionPrompts: ['What is one small step you can take right now?'], suggestedActivities: ['box breathing', 'grounding exercise'] }
    },
  ],
  addJournal: (entry) => set((s) => ({ journals: [entry, ...s.journals] })),
  deleteJournal: (id) => set((s) => ({ journals: s.journals.filter((j) => j.id !== id) })),

  chatMessages: [],
  addChatMessage: (msg) => set((s) => ({ chatMessages: [...s.chatMessages, msg] })),
  clearChat: () => set({ chatMessages: [] }),

  appointments: [
    { id: '1', therapistId: '1', therapistName: 'Dr. Sarah Chen', date: '2026-01-18', time: '10:00 AM', type: 'video', status: 'upcoming' },
  ],
  addAppointment: (apt) => set((s) => ({ appointments: [...s.appointments, apt] })),
  cancelAppointment: (id) => set((s) => ({ appointments: s.appointments.map((a) => a.id === id ? { ...a, status: 'cancelled' as const } : a) })),

  assessmentResults: [
    { id: '1', type: 'Stress Assessment', score: 14, maxScore: 40, interpretation: 'Moderate stress levels', date: '2026-01-10' },
    { id: '2', type: 'Anxiety Screening', score: 8, maxScore: 21, interpretation: 'Mild anxiety', date: '2026-01-13' },
  ],
  addAssessmentResult: (result) => set((s) => ({ assessmentResults: [...s.assessmentResults, result] })),

  notifications: [
    { id: '1', type: 'checkin', title: 'Daily Check-in', message: 'How are you feeling today?', read: false, date: '2026-01-15' },
    { id: '2', type: 'insight', title: 'AI Insight', message: 'Your sleep has improved this week!', read: false, date: '2026-01-15' },
    { id: '3', type: 'appointment', title: 'Upcoming Session', message: 'Session with Dr. Chen on Jan 18', read: false, date: '2026-01-14' },
    { id: '4', type: 'goal', title: 'Goal Completed!', message: 'You finished your 5-min meditation', read: true, date: '2026-01-14' },
  ],
  markNotificationRead: (id) => set((s) => ({ notifications: s.notifications.map((n) => n.id === id ? { ...n, read: true } : n) })),

  sidebarOpen: false,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
