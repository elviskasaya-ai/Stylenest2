import React, { useState } from 'react';
import { Radio, X, Bus, Clock, ShieldCheck, LogOut, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { AttendanceEventType, Student } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onTriggerPreset: (preset: {
    studentId: string;
    type: AttendanceEventType;
    title: string;
    description: string;
    location: string;
    status: 'verified' | 'flagged' | 'excused';
  }) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function RealtimeAlertSimulator({
  isOpen,
  onClose,
  students,
  onTriggerPreset,
  isMuted,
  onToggleMute
}: Props) {
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || 'student-maya');
  const [customType, setCustomType] = useState<AttendanceEventType>('check_in');
  const [customLocation, setCustomLocation] = useState('North Gate RFID Turnstile A2');
  const [customTitle, setCustomTitle] = useState('Campus Arrival RFID Tap');
  const [customDesc, setCustomDesc] = useState('Student verified via Smart NFC Badge ID');

  if (!isOpen) return null;

  const currentStudent = students.find((s) => s.id === selectedStudentId) || students[0];

  const presets = [
    {
      label: 'Campus Arrival (RFID Gate)',
      studentId: 'student-maya',
      type: 'check_in' as AttendanceEventType,
      title: 'Campus Arrival Verified',
      description: 'Maya Lin scanned RFID badge at East Academic Entrance',
      location: 'East Academic Entrance Turnstile #3',
      status: 'verified' as const,
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800'
    },
    {
      label: 'Morning Bus Boarding',
      studentId: 'student-leo',
      type: 'bus_boarding' as AttendanceEventType,
      title: 'Boarded Bus #14 (North Ridge)',
      description: 'Leo Lin tapped onto morning route at 7th & Oakwood',
      location: '7th Ave & Oakwood Station Stop',
      status: 'verified' as const,
      icon: Bus,
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800'
    },
    {
      label: 'Period 3 Tardy Alert',
      studentId: 'student-maya',
      type: 'period_tardy' as AttendanceEventType,
      title: 'Tardy: Period 3 AP History',
      description: 'Arrived 7 minutes after bell. Hall pass logged.',
      location: 'History Wing Room 210',
      status: 'flagged' as const,
      icon: Clock,
      color: 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800'
    },
    {
      label: 'After-School Dismissal / Pickup',
      studentId: 'student-leo',
      type: 'check_out' as AttendanceEventType,
      title: 'Dismissal Check-Out Logged',
      description: 'Leo Lin departed campus with authorized guardian (Mother)',
      location: 'Main Reception Carpool Loop',
      status: 'verified' as const,
      icon: LogOut,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800'
    }
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onTriggerPreset({
      studentId: selectedStudentId,
      type: customType,
      title: customTitle || 'Attendance Event',
      description: customDesc || `Logged at ${customLocation}`,
      location: customLocation,
      status: customType === 'period_tardy' || customType === 'unexcused_absence' ? 'flagged' : 'verified'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
        {/* Drawer header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Radio className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Real-Time Attendance Simulator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Test live push alerts, RFID gate taps, and bus telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleMute}
              title={isMuted ? 'Unmute alerts' : 'Mute alerts'}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="p-5 overflow-y-auto space-y-5">
          {/* Quick 1-Tap Presets */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                1-Tap Instant Scenarios
              </h4>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Live Event Bus
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {presets.map((preset, idx) => {
                const IconComponent = preset.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onTriggerPreset(preset)}
                    className="p-3 text-left rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50/60 dark:bg-slate-800/40 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 transition-all flex items-start gap-3 group"
                  >
                    <div className={`p-2 rounded-lg border shrink-0 ${preset.color}`}>
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
                        {preset.label}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                        {preset.title}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Event Builder */}
          <form onSubmit={handleCustomSubmit} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-slate-500 dark:text-slate-400">
              Custom Attendance Event
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Target Student
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  {students.map((st) => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.grade})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Event Category
                </label>
                <select
                  value={customType}
                  onChange={(e) => setCustomType(e.target.value as AttendanceEventType)}
                  className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="check_in">Campus Arrival (RFID In)</option>
                  <option value="check_out">Campus Departure (RFID Out)</option>
                  <option value="bus_boarding">Bus Pick-Up Boarding</option>
                  <option value="bus_dropoff">Bus Drop-Off</option>
                  <option value="period_tardy">Period Tardy</option>
                  <option value="unexcused_absence">Absence Detected</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                Event Title
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Science Wing Turnstile Tap"
                className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location / Gate
                </label>
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="e.g. North Gate RFID #2"
                  className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description / Note
                </label>
                <input
                  type="text"
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  placeholder="e.g. Scanned badge at 07:48 AM"
                  className="w-full text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              <Radio className="w-4 h-4" />
              Dispatch Real-Time Alert for {currentStudent.name}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
