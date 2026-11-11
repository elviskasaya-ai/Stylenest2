import { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Radio, 
  Send, 
  Check, 
  Search
} from 'lucide-react';
import { Student } from '../types';
import { soundEffects } from '../utils/audio';

interface RosterStudent {
  id: string;
  name: string;
  rollNumber: string;
  avatar: string;
  status: 'present' | 'tardy' | 'absent' | 'excused';
}

interface Props {
  students: Student[];
  onBroadcastAlert: (title: string, message: string) => void;
}

export function TeacherView({ students, onBroadcastAlert }: Props) {
  // Class roster for Grade 8-Alpha
  const [roster, setRoster] = useState<RosterStudent[]>([
    { id: 'student-maya', name: 'Maya Lin', rollNumber: 'SN-0814', avatar: '/src/assets/images/student_avatar_maya_1794385234499.jpg', status: 'present' },
    { id: 'r-2', name: 'Liam Taylor', rollNumber: 'SN-0815', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80', status: 'present' },
    { id: 'r-3', name: 'Zoe Zhang', rollNumber: 'SN-0816', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80', status: 'present' },
    { id: 'r-4', name: 'Caleb Rivera', rollNumber: 'SN-0817', avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&q=80', status: 'tardy' },
    { id: 'r-5', name: 'Emma Davis', rollNumber: 'SN-0818', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80', status: 'present' },
    { id: 'r-6', name: 'Oliver White', rollNumber: 'SN-0819', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80', status: 'absent' }
  ]);

  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleStatusChange = (id: string, newStatus: RosterStudent['status']) => {
    setRoster((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
    );
    soundEffects.playAttendanceChime();
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    onBroadcastAlert(broadcastTitle, broadcastMessage);
    soundEffects.playAttendanceChime();
    setIsSent(true);
    setBroadcastTitle('');
    setBroadcastMessage('');
    setTimeout(() => setIsSent(false), 3000);
  };

  const filteredRoster = roster.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = roster.filter((s) => s.status === 'present').length;
  const tardyCount = roster.filter((s) => s.status === 'tardy').length;
  const absentCount = roster.filter((s) => s.status === 'absent').length;

  return (
    <div className="space-y-4 pb-6">
      {/* Teacher Console Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                Faculty Portal
              </span>
              <span className="text-xs text-slate-400">Ms. Sarah Henderson</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Homeroom Advisory 8-Alpha Attendance
            </h2>
          </div>

          <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
            Period 1 · Math Lab
          </span>
        </div>

        {/* Quick Summary Pill Bar */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-semibold">
            {presentCount} Present
          </div>
          <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-semibold">
            {tardyCount} Tardy
          </div>
          <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 font-semibold">
            {absentCount} Absent
          </div>
        </div>
      </div>

      {/* Class Roll Call */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Daily Roll Call ({roster.length} Students)
          </h3>

          <div className="relative w-40">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            />
          </div>
        </div>

        <div className="space-y-2">
          {filteredRoster.map((item) => (
            <div
              key={item.id}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30 flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-300 dark:border-slate-600"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.name}
                  </div>
                  <div className="text-[10px] font-mono text-slate-400 truncate">
                    {item.rollNumber}
                  </div>
                </div>
              </div>

              {/* Status toggles */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'present')}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                    item.status === 'present'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  P
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'tardy')}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                    item.status === 'tardy'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  T
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'absent')}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                    item.status === 'absent'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(item.id, 'excused')}
                  className={`px-2 py-1 rounded text-[11px] font-bold transition-all ${
                    item.status === 'excused'
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  E
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Broadcast Urgent Alert to Parents */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Broadcast Real-Time Alert to Parents
          </h3>
        </div>

        {isSent && (
          <div className="mb-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
            <Check className="w-4 h-4" />
            Alert dispatched to all 28 registered parent devices!
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Alert Subject
            </label>
            <input
              type="text"
              required
              value={broadcastTitle}
              onChange={(e) => setBroadcastTitle(e.target.value)}
              placeholder="e.g. Science Lab Project Extended by 48 Hours"
              className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
              Message Content
            </label>
            <textarea
              rows={2}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Enter message for parent notification push..."
              className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 text-slate-900 dark:text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            Dispatch Broadcast Alert to Parents
          </button>
        </form>
      </div>
    </div>
  );
}
