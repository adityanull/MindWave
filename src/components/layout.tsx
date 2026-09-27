'use client';
import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import {
  LayoutDashboard, MessageCircle, BookOpen, ClipboardCheck, Heart, Users,
  BookHeart, TrendingUp, Settings, Bell, Moon, Sun, Menu, X, Brain,
  Calendar, Shield, LogIn, Sparkles, Activity
} from 'lucide-react';

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/chat', label: 'MIND WAVE AI', icon: Brain },
  { href: '/app/checkin', label: 'Check-in', icon: Activity },
  { href: '/app/journal', label: 'Journal', icon: BookOpen },
  { href: '/app/assessments', label: 'Assessments', icon: ClipboardCheck },
  { href: '/app/selfcare', label: 'Self-Care', icon: Heart },
  { href: '/app/therapists', label: 'Therapists', icon: Users },
  { href: '/app/appointments', label: 'Appointments', icon: Calendar },
  { href: '/app/community', label: 'Community', icon: BookHeart },
  { href: '/app/knowledge', label: 'Knowledge Hub', icon: Sparkles },
  { href: '/app/progress', label: 'Progress', icon: TrendingUp },
  { href: '/app/settings', label: 'Settings', icon: Settings },
];

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { theme, setTheme, notifications } = useAppStore();
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 flex items-center justify-between">
        <Link href="/app" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-wave-cyan to-wave-purple flex items-center justify-center">
            <Brain size={20} className="text-white" />
          </div>
          <div>
            <span className="text-base font-bold text-gradient-cyan">MIND WAVE</span>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition lg:hidden">
            <X size={18} className="text-mw-400" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-wave-cyan/10 text-wave-cyan border border-wave-cyan/20'
                  : 'text-mw-400 hover:text-mw-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <item.icon size={18} className={isActive ? 'text-wave-cyan' : 'text-mw-500 group-hover:text-mw-300'} />
              <span>{item.label}</span>
              {item.label === 'Appointments' && (
                <span className="ml-auto text-[10px] bg-wave-cyan/20 text-wave-cyan px-1.5 py-0.5 rounded-full">1</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="p-4 space-y-2 border-t border-white/5">
        <Link href="/app/settings" className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-mw-400 hover:text-mw-200 hover:bg-white/5 transition">
          <Shield size={16} /> <span>Privacy & Safety</span>
        </Link>
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-mw-400 hover:text-mw-200 hover:bg-white/5 transition w-full"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
}

export function AppLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, setSidebarOpen, theme, notifications } = useAppStore();
  const [mobileNav, setMobileNav] = useState(false);
  const unread = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-mw-950 text-mw-100' : 'bg-mw-50 text-mw-900'}`}>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col glass z-40">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileNav && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-50 lg:hidden"
              onClick={() => setMobileNav(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 w-[280px] flex-col glass z-50 lg:hidden flex"
            >
              <SidebarContent onClose={() => setMobileNav(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 glass px-4 lg:px-6 py-3 flex items-center justify-between">
          <button onClick={() => setMobileNav(true)} className="p-2 rounded-xl hover:bg-white/10 transition lg:hidden">
            <Menu size={20} className="text-mw-300" />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-3">
            <Link href="/app/chat" className="p-2 rounded-xl hover:bg-white/10 transition text-mw-400 hover:text-wave-cyan" title="MIND WAVE AI">
              <Brain size={20} />
            </Link>
            <Link href="/app/checkin" className="p-2 rounded-xl hover:bg-white/10 transition text-mw-400 hover:text-wave-teal" title="Quick Check-in">
              <Activity size={20} />
            </Link>
            <button className="relative p-2 rounded-xl hover:bg-white/10 transition text-mw-400 hover:text-mw-200">
              <Bell size={20} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-wave-cyan" />
              )}
            </button>
          </div>
        </header>

        <div className="p-4 lg:p-6 pb-24 lg:pb-6">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 glass z-40 px-2 py-1.5 flex justify-around">
        {[
          { href: '/app', icon: LayoutDashboard, label: 'Home' },
          { href: '/app/chat', icon: Brain, label: 'AI' },
          { href: '/app/checkin', icon: Activity, label: 'Check-in' },
          { href: '/app/selfcare', icon: Heart, label: 'Self-Care' },
          { href: '/app/journal', icon: BookOpen, label: 'Journal' },
        ].map((item) => {
          const isActive = usePathname() === item.href;
          return (
            <Link key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition ${isActive ? 'text-wave-cyan' : 'text-mw-500'}`}>
              <item.icon size={20} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
