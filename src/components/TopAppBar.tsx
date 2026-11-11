import { useState } from 'react';
import { 
  Bell, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  ChevronDown, 
  Check, 
  UserCheck, 
  Users, 
  GraduationCap,
  Sparkles,
  Trophy
} from 'lucide-react';
import { Student, UserRole } from '../types';
import { TabId } from './BottomNavBar';
import { SCHOOL_INFO } from '../data/mockData';

interface Props {
  students: Student[];
  currentStudent: Student;
  onSelectStudent: (student: Student) => void;
  currentRole: UserRole;
  onChangeRole: (role: UserRole) => void;
  isSimulatorOpen: boolean;
  onOpenSimulator: () => void;
  isPhoneFrame: boolean;
  onTogglePhoneFrame: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  unreadAlertsCount: number;
  onNavigateTab: (tab: TabId) => void;
}

export function TopAppBar({
  students,
  currentStudent,
  onSelectStudent,
  currentRole,
  onChangeRole,
  onOpenSimulator,
  isPhoneFrame,
  onTogglePhoneFrame,
  isDarkMode,
  onToggleDarkMode,
  unreadAlertsCount,
  onNavigateTab
}: Props) {
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'parent': return 'Parent View';
      case 'teacher': return 'Teacher View';
      case 'student': return 'Student View';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'parent': return <Users className="w-3.5 h-3.5" />;
      case 'teacher': return <UserCheck className="w-3.5 h-3.5" />;
      case 'student': return <GraduationCap className="w-3.5 h-3.5" />;
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-3 sm:px-5 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-2">
        {/* Left: Brand Identity & Crest */}
        <div 
          onClick={() => onNavigateTab('dashboard')} 
          className="flex items-center gap-2.5 min-w-0 cursor-pointer group"
        >
          <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 group-hover:scale-105 transition-transform">
            <img
              src={SCHOOL_INFO.crest}
              alt="Style Nest Crest"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white truncate">
                Style Nest
              </span>
              <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 hidden sm:inline">
                {SCHOOL_INFO.currentTerm.split(' ')[0]}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {SCHOOL_INFO.name}
            </p>
          </div>
        </div>

        {/* Center: Switch Student Dropdown & Gamification Points Pill */}
        {currentRole !== 'teacher' && (
          <div className="flex items-center gap-1.5">
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsStudentDropdownOpen(!isStudentDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors text-left"
              >
                <div className="relative w-6 h-6 rounded-full overflow-hidden shrink-0 border border-slate-300 dark:border-slate-600">
                  <img
                    src={currentStudent.avatar}
                    alt={currentStudent.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-left hidden xs:block">
                  <div className="text-xs font-semibold text-slate-900 dark:text-white leading-tight">
                    {currentStudent.name}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    {currentStudent.grade}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5" />
              </button>

              {isStudentDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsStudentDropdownOpen(false)}
                  />
                  <div className="absolute right-0 sm:left-0 sm:right-auto mt-1.5 w-52 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400 tracking-wider">
                      Select Student Profile
                    </div>
                    {students.map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          onSelectStudent(st);
                          setIsStudentDropdownOpen(false);
                        }}
                        className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-700/60 transition-colors"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={st.avatar}
                            alt={st.name}
                            className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-600"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-slate-900 dark:text-white truncate">
                              {st.name}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                              {st.grade} · {st.totalPoints} XP
                            </p>
                          </div>
                        </div>
                        {st.id === currentStudent.id && (
                          <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Quick XP Gamification Pill */}
            <button
              type="button"
              onClick={() => onNavigateTab('gamification')}
              title="View Leaderboard & Badges"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:scale-105 transition-transform"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>{currentStudent.totalPoints} XP</span>
            </button>
          </div>
        )}

        {/* Right: Controls & Role Selector */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Role selector dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Change User Perspective"
            >
              {getRoleIcon(currentRole)}
              <span className="hidden md:inline">{getRoleLabel(currentRole)}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isRoleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsRoleDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-1.5 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50">
                  <div className="px-3 py-1 text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
                    Switch Perspective
                  </div>
                  {(['parent', 'teacher', 'student'] as UserRole[]).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        onChangeRole(r);
                        setIsRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60"
                    >
                      <div className="flex items-center gap-2">
                        {getRoleIcon(r)}
                        <span>{getRoleLabel(r)}</span>
                      </div>
                      {currentRole === r && (
                        <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Trigger Alert Simulator Button */}
          <button
            type="button"
            onClick={onOpenSimulator}
            title="Real-Time Attendance Simulator"
            className="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Bell className="w-4 h-4" />
            {unreadAlertsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {/* Phone Frame Toggle (Desktop helper) */}
          <button
            type="button"
            onClick={onTogglePhoneFrame}
            title={isPhoneFrame ? 'Switch to Full-Width Responsive View' : 'Switch to iPhone 16 Mockup Frame'}
            className="hidden sm:flex p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isPhoneFrame ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
          </button>

          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            title="Toggle Light / Dark mode"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}
