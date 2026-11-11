import { 
  ShieldCheck, 
  Bus, 
  Clock, 
  ChevronRight, 
  FileText, 
  MessageSquare, 
  Radio, 
  MapPin, 
  CheckCircle2, 
  AlertCircle,
  Calendar as CalendarIcon,
  Award,
  Flame,
  Tag,
  Zap
} from 'lucide-react';
import { Student, AttendanceRecord, Subject, Activity, SchoolEvent, ActivityCategory, UserRole } from '../types';
import { TabId } from './BottomNavBar';

interface Props {
  student: Student;
  attendanceRecords: AttendanceRecord[];
  subjects: Subject[];
  activities: Activity[];
  events: SchoolEvent[];
  categories: ActivityCategory[];
  onNavigateTab: (tab: TabId) => void;
  onOpenExcuseModal: () => void;
  onOpenSimulator: () => void;
  onClaimDailyBonus: () => void;
  hasClaimedDailyBonus: boolean;
  userRole: UserRole;
}

export function DashboardView({
  student,
  attendanceRecords,
  subjects,
  activities,
  events,
  categories,
  onNavigateTab,
  onOpenExcuseModal,
  onOpenSimulator,
  onClaimDailyBonus,
  hasClaimedDailyBonus,
  userRole
}: Props) {
  const studentRecords = attendanceRecords.filter((r) => r.studentId === student.id);
  const latestRecord = studentRecords[0];

  const studentActivities = activities.filter((a) => a.studentId === student.id);
  const totalHoursLogged = studentActivities.reduce((sum, a) => sum + (a.hoursLogged || 0), 0);

  // Group hours per category for dashboard reporting
  const categoryHoursMap: Record<string, number> = {};
  studentActivities.forEach((act) => {
    categoryHoursMap[act.category] = (categoryHoursMap[act.category] || 0) + (act.hoursLogged || 0);
  });

  // Next 2 upcoming events
  const upcomingEvents = [...events]
    .filter((e) => e.date >= '2026-11-11')
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  const getStatusBadge = () => {
    switch (student.status) {
      case 'on_campus':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5" /> On Campus
          </span>
        );
      case 'in_transit':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Bus className="w-3.5 h-3.5" /> In Transit
          </span>
        );
      case 'late':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Clock className="w-3.5 h-3.5" /> Tardy Today
          </span>
        );
      case 'absent':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <AlertCircle className="w-3.5 h-3.5" /> Absent
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Departed
          </span>
        );
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Real-time Student Status Hero Card */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 rounded-2xl p-4 sm:p-5 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-sky-500/10 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-indigo-400/40 shadow-md">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {student.name}
                  </h2>
                  <span className="text-[11px] font-mono text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-700/50">
                    {student.rollNumber}
                  </span>
                </div>
                <p className="text-xs text-indigo-200/80">
                  {student.grade} · {student.section} · {student.homeroomTeacher}
                </p>
              </div>
            </div>

            <div>{getStatusBadge()}</div>
          </div>

          {/* Current verified location & check-in pulse */}
          <div className="mt-3 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase font-semibold text-indigo-200 tracking-wider">
                  Current Location
                </div>
                <div className="text-xs font-medium text-white truncate">
                  {student.currentLocation}
                </div>
              </div>
            </div>

            {latestRecord && (
              <div className="text-right shrink-0">
                <div className="text-[10px] uppercase font-semibold text-indigo-200 tracking-wider">
                  RFID Tap
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  {latestRecord.timestamp}
                </div>
              </div>
            )}
          </div>

          {/* Bus transit route info */}
          <div className="mt-2.5 flex items-center justify-between text-xs text-indigo-200/90 pt-1">
            <span className="flex items-center gap-1.5 truncate">
              <Bus className="w-3.5 h-3.5 text-indigo-300 shrink-0" />
              {student.busRoute}
            </span>
            <span className="text-emerald-400 font-medium shrink-0 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> RFID Verified
            </span>
          </div>
        </div>
      </div>

      {/* Gamification Level & Streak Bar */}
      <div 
        onClick={() => onNavigateTab('gamification')}
        className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-indigo-500/10 to-sky-500/10 border border-amber-300/50 dark:border-amber-700/40 flex items-center justify-between gap-3 cursor-pointer hover:border-amber-400 transition-all shadow-xs"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-black text-sm">
            L{student.level}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                {student.totalPoints.toLocaleString()} XP
              </span>
              <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                <Flame className="w-3 h-3" /> 14d Streak
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              Rank #1 in Class · Tap for Leaderboard & Badges
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClaimDailyBonus();
          }}
          disabled={hasClaimedDailyBonus}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            hasClaimedDailyBonus
              ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 cursor-default'
              : 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-xs active:scale-95'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          {hasClaimedDailyBonus ? 'Claimed' : '+25 XP'}
        </button>
      </div>

      {/* Quick Action Touch Bar */}
      <div className="grid grid-cols-4 gap-2">
        <button
          type="button"
          onClick={onOpenExcuseModal}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-center group flex flex-col items-center justify-center shadow-xs"
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
            Excuse Note
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('calendar')}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-center group flex flex-col items-center justify-center shadow-xs"
        >
          <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <CalendarIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
            Calendar
          </span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateTab('academics')}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-center group flex flex-col items-center justify-center shadow-xs"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
            Report Card
          </span>
        </button>

        <button
          type="button"
          onClick={onOpenSimulator}
          className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors text-center group flex flex-col items-center justify-center shadow-xs"
        >
          <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-1 group-hover:scale-105 transition-transform">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 leading-tight">
            Alert Sim
          </span>
        </button>
      </div>

      {/* Upcoming School Events & Exams Preview Strip */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Upcoming School Events & Exams
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('calendar')}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            All Events <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {upcomingEvents.map((ev) => (
            <div
              key={ev.id}
              onClick={() => onNavigateTab('calendar')}
              className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-700/30 flex items-center justify-between gap-2 cursor-pointer hover:border-indigo-300 transition-all"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.2 rounded">
                    {ev.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    {ev.date}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {ev.title}
                </h4>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard Activity Categories & Hours Reporting */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Activity Categories & Hours Tracked
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('activities')}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            Manage <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {Object.entries(categoryHoursMap).map(([categoryName, hours]) => {
            const isCustom = categories.some((c) => c.name === categoryName && c.isCustom);
            return (
              <div
                key={categoryName}
                className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-900 dark:text-white truncate">
                    {categoryName}
                  </span>
                  {isCustom && (
                    <span className="text-[9px] font-mono text-indigo-600 dark:text-indigo-400">
                      Custom
                    </span>
                  )}
                </div>
                <div className="mt-1 flex items-baseline justify-between text-xs">
                  <span className="text-[10px] text-slate-500">Total Logged:</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {hours} hrs
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
          <span>Total Extracurricular Time:</span>
          <span className="font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {totalHoursLogged} Hours
          </span>
        </div>
      </div>

      {/* Real-Time Live Attendance Stream (Last 3 events) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Live Attendance Activity
            </h3>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('academics')}
            className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-0.5"
          >
            Full Log <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2.5">
          {studentRecords.slice(0, 3).map((rec) => (
            <div
              key={rec.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  {rec.type === 'bus_boarding' || rec.type === 'bus_dropoff' ? (
                    <Bus className="w-4 h-4" />
                  ) : rec.type === 'period_tardy' ? (
                    <Clock className="w-4 h-4 text-rose-500" />
                  ) : (
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-slate-900 dark:text-white truncate">
                    {rec.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {rec.location}
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                  {rec.timestamp}
                </span>
                <span className="block text-[10px] text-slate-400 dark:text-slate-500">
                  {rec.date === '2026-11-11' ? 'Today' : rec.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
