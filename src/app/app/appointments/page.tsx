'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/lib/store';
import { therapists } from '@/lib/mock-data';
import { GlassCard, FadeIn, GlowButton, Badge } from '@/components/ui';
import { Calendar, Clock, Video, Phone, MessageCircle, ChevronRight, ChevronLeft, Check, X, User } from 'lucide-react';

const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
const sessionTypes = [
  { type: 'video', label: 'Video Call', icon: Video, price: 0 },
  { type: 'audio', label: 'Audio Call', icon: Phone, price: 0 },
  { type: 'chat', label: 'Chat Session', icon: MessageCircle, price: 0 },
] as const;

const next7Days = Array.from({ length: 7 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i);
  return { date: d.toISOString().split('T')[0], day: d.toLocaleDateString('en', { weekday: 'short' }), num: d.getDate() };
});

export default function AppointmentsPage() {
  const { appointments, addAppointment, cancelAppointment } = useAppStore();
  const [step, setStep] = useState(0); // 0=list, 1=select therapist, 2=select date, 3=select time, 4=confirm
  const [selectedTherapist, setSelectedTherapist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState<'video' | 'audio' | 'chat'>('video');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    const therapist = therapists.find(t => t.id === selectedTherapist);
    if (therapist) {
      addAppointment({
        id: Date.now().toString(),
        therapistId: selectedTherapist,
        therapistName: therapist.name,
        date: selectedDate,
        time: selectedTime,
        type: selectedType,
        status: 'upcoming',
      });
      setConfirmed(true);
    }
  };

  const resetBooking = () => {
    setStep(0);
    setSelectedTherapist('');
    setSelectedDate('');
    setSelectedTime('');
    setSelectedType('video');
    setConfirmed(false);
  };

  if (confirmed) {
    return (
      <div className="max-w-md mx-auto pt-12">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5 }} className="text-5xl mb-6">✅</motion.div>
          <h2 className="text-2xl font-bold mb-3">Appointment Booked!</h2>
          <p className="text-mw-400 mb-6">Your session has been scheduled</p>
          <GlassCard className="p-5 text-left mb-6">
            <p className="font-semibold">{therapists.find(t => t.id === selectedTherapist)?.name}</p>
            <p className="text-sm text-mw-400 mt-1">{selectedDate} at {selectedTime}</p>
            <p className="text-sm text-mw-400">{selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} session</p>
          </GlassCard>
          <GlowButton variant="cyan" onClick={resetBooking}>Back to Appointments</GlowButton>
        </motion.div>
      </div>
    );
  }

  if (step === 1) {
    return (
      <div className="space-y-4">
        <button onClick={resetBooking} className="text-sm text-mw-400 hover:text-mw-200 flex items-center gap-1"><ChevronLeft size={14} /> Back</button>
        <h2 className="text-xl font-bold">Select Therapist</h2>
        <div className="grid gap-3">
          {therapists.map(t => (
            <GlassCard key={t.id} className="p-4 cursor-pointer" onClick={() => { setSelectedTherapist(t.id); setStep(2); }}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{t.image}</span>
                <div className="flex-1">
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-xs text-mw-400">{t.specialization}</p>
                </div>
                <ChevronRight size={16} className="text-mw-500" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep(1)} className="text-sm text-mw-400 hover:text-mw-200 flex items-center gap-1"><ChevronLeft size={14} /> Back</button>
        <h2 className="text-xl font-bold">Select Date</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {next7Days.map(d => (
            <motion.button
              key={d.date}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSelectedDate(d.date); setStep(3); }}
              className={`flex flex-col items-center gap-1 p-4 rounded-xl min-w-[72px] transition ${
                selectedDate === d.date ? 'bg-wave-cyan/20 border border-wave-cyan/30' : 'glass'
              }`}
            >
              <span className="text-xs text-mw-400">{d.day}</span>
              <span className="text-lg font-bold">{d.num}</span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="space-y-4">
        <button onClick={() => setStep(2)} className="text-sm text-mw-400 hover:text-mw-200 flex items-center gap-1"><ChevronLeft size={14} /> Back</button>
        <h2 className="text-xl font-bold">Select Time & Session Type</h2>

        <div className="space-y-2">
          <p className="text-sm text-mw-400">Session Type</p>
          <div className="flex gap-2">
            {sessionTypes.map(s => (
              <button
                key={s.type}
                onClick={() => setSelectedType(s.type)}
                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl text-sm transition ${
                  selectedType === s.type ? 'bg-wave-cyan/20 border border-wave-cyan/30 text-wave-cyan' : 'glass text-mw-400'
                }`}
              >
                <s.icon size={16} /> {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-mw-400">Available Times</p>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map(t => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { setSelectedTime(t); setStep(4); }}
                className={`p-3 rounded-xl text-sm transition ${
                  selectedTime === t ? 'bg-wave-cyan/20 border border-wave-cyan/30 text-wave-cyan' : 'glass text-mw-300'
                }`}
              >
                {t}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (step === 4) {
    const therapist = therapists.find(t => t.id === selectedTherapist);
    return (
      <div className="max-w-md mx-auto space-y-4">
        <button onClick={() => setStep(3)} className="text-sm text-mw-400 hover:text-mw-200 flex items-center gap-1"><ChevronLeft size={14} /> Back</button>
        <h2 className="text-xl font-bold">Confirm Appointment</h2>
        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{therapist?.image}</span>
            <div>
              <p className="font-semibold">{therapist?.name}</p>
              <p className="text-xs text-mw-400">{therapist?.specialization}</p>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-mw-400">Date</span><span>{selectedDate}</span></div>
            <div className="flex justify-between"><span className="text-mw-400">Time</span><span>{selectedTime}</span></div>
            <div className="flex justify-between"><span className="text-mw-400">Type</span><span className="capitalize">{selectedType}</span></div>
            <div className="flex justify-between"><span className="text-mw-400">Price</span><span>${therapist?.price}</span></div>
          </div>
          <GlowButton variant="cyan" onClick={handleConfirm} className="w-full">
            <Check size={16} className="mr-1" /> Confirm Booking
          </GlowButton>
        </GlassCard>
      </div>
    );
  }

  // Step 0 - List
  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Appointments</h1>
            <p className="text-sm text-mw-400 mt-1">Manage your therapy sessions</p>
          </div>
          <GlowButton variant="cyan" onClick={() => setStep(1)}>
            <Calendar size={16} className="mr-1" /> Book New
          </GlowButton>
        </div>
      </FadeIn>

      <div className="grid gap-4">
        {appointments.map((apt, i) => {
          const therapist = therapists.find(t => t.id === apt.therapistId);
          return (
            <motion.div key={apt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <GlassCard className="p-5">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{therapist?.image || '👤'}</span>
                  <div className="flex-1">
                    <h3 className="font-semibold">{apt.therapistName}</h3>
                    <p className="text-sm text-mw-400">{apt.date} at {apt.time}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge color={apt.type === 'video' ? '#00d4ff' : apt.type === 'audio' ? '#8b5cf6' : '#14b8a6'}>
                        {apt.type.charAt(0).toUpperCase() + apt.type.slice(1)}
                      </Badge>
                      <Badge color={apt.status === 'upcoming' ? '#22c55e' : apt.status === 'cancelled' ? '#ef4444' : '#7e7ebe'}>
                        {apt.status}
                      </Badge>
                    </div>
                  </div>
                  {apt.status === 'upcoming' && (
                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="p-2 rounded-xl hover:bg-wave-red/10 text-mw-500 hover:text-wave-red transition"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {appointments.length === 0 && (
        <div className="text-center py-16">
          <Calendar size={48} className="text-mw-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No appointments yet</h3>
          <p className="text-sm text-mw-400 mb-4">Book your first therapy session</p>
          <GlowButton variant="cyan" onClick={() => setStep(1)}>Find a Therapist</GlowButton>
        </div>
      )}
    </div>
  );
}
