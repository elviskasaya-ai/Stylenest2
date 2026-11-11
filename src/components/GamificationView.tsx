import { useState } from 'react';
import { 
  Trophy, 
  Flame, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Star, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  GraduationCap, 
  Cpu, 
  BookOpen, 
  HeartHandshake, 
  ArrowUpRight,
  Medal,
  Zap,
  Check
} from 'lucide-react';
import { Student, GamificationBadge, LeaderboardUser, PointTransaction, UserRole } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  student: Student;
  badges: GamificationBadge[];
  leaderboard: LeaderboardUser[];
  transactions: PointTransaction[];
  onClaimDailyBonus: () => void;
  hasClaimedDailyBonus: boolean;
  onSimulatePointsEarned: (title: string, points: number, type: PointTransaction['type']) => void;
  userRole: UserRole;
}

export function GamificationView({
  student,
  badges,
  leaderboard,
  transactions,
  onClaimDailyBonus,
  hasClaimedDailyBonus,
  onSimulatePointsEarned,
  userRole
}: Props) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'badges' | 'quests'>('leaderboard');
  const [leaderboardFilter, setLeaderboardFilter] = useState<'grade8' | 'school'>('grade8');
  const [selectedBadge, setSelectedBadge] = useState<GamificationBadge | null>(null);

  // Gamification math
  const currentXp = student.totalPoints;
  const levelFloorXp = (student.level - 1) * 400;
  const levelCeilXp = student.level * 400;
  const progressInLevel = Math.min(
    100,
    Math.max(0, Math.round(((currentXp - levelFloorXp) / (levelCeilXp - levelFloorXp)) * 100))
  );
  const xpNeeded = levelCeilXp - currentXp;

  const handleClaimBonus = () => {
    if (hasClaimedDailyBonus) return;
    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.6 }
    });
    soundEffects.playAttendanceChime();
    onClaimDailyBonus();
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5 text-indigo-500" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-500" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-amber-500" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-500" />;
      case 'Trophy': return <Trophy className="w-5 h-5 text-amber-500" />;
      default: return <Award className="w-5 h-5 text-indigo-500" />;
    }
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => b.points - a.points);
  const topThree = sortedLeaderboard.slice(0, 3);
  const remainingRanks = sortedLeaderboard.slice(3);

  return (
    <div className="space-y-4 pb-6">
      {/* Student Level & XP Hero Card */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden border border-indigo-500/30">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-2xl overflow-hidden shrink-0 border-2 border-amber-400/80 shadow-md">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-500 text-slate-950 text-[10px] font-black flex items-center justify-center border border-white">
                  {student.level}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-white tracking-tight">
                    {student.name}
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> Level {student.level} Scholar
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-200/80 mt-0.5">
                  <span className="flex items-center gap-1 text-amber-400 font-semibold">
                    <Flame className="w-3.5 h-3.5" /> 14 Day Active Streak
                  </span>
                  <span>·</span>
                  <span>Rank #1 in Class</span>
                </div>
              </div>
            </div>

            {/* Daily Streak Bonus Claim Button */}
            <button
              type="button"
              disabled={hasClaimedDailyBonus}
              onClick={handleClaimBonus}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
                hasClaimedDailyBonus
                  ? 'bg-slate-800/80 text-emerald-400 border border-emerald-500/30 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 active:scale-95'
              }`}
            >
              {hasClaimedDailyBonus ? (
                <>
                  <Check className="w-3.5 h-3.5" /> Claimed (+25 XP)
                </>
              ) : (
                <>
                  <Zap className="w-3.5 h-3.5 animate-pulse" /> Claim Streak (+25 XP)
                </>
              )}
            </button>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4 pt-3 border-t border-white/10">
            <div className="flex justify-between items-center text-xs mb-1.5">
              <span className="text-indigo-200 font-medium">
                Total XP: <strong className="text-white font-black tabular-nums">{currentXp.toLocaleString()} XP</strong>
              </span>
              <span className="text-amber-300 font-mono text-[11px]">
                {xpNeeded > 0 ? `${xpNeeded} XP to Level ${student.level + 1}` : 'Max Level'}
              </span>
            </div>

            <div className="h-2 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-400 via-indigo-400 to-sky-400 transition-all duration-700 shadow-xs"
                style={{ width: `${progressInLevel}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Tabs */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('leaderboard')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'leaderboard'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('badges')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'badges'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Milestones ({badges.filter((b) => b.unlocked).length}/{badges.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('quests')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'quests'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Earn XP</span>
        </button>
      </div>

      {/* TAB 1: Student Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-4">
          {/* Top 3 Visual Podium */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                Grade 8 Scholastic Standings
              </span>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">
                Top Student Achievers
              </h3>
            </div>

            {/* Podium columns: 2nd, 1st, 3rd */}
            <div className="grid grid-cols-3 gap-2 items-end pt-4 pb-2">
              {/* 2nd Place: Liam */}
              {topThree[1] && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-1.5">
                    <img
                      src={topThree[1].avatar}
                      alt={topThree[1].name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-slate-300 dark:border-slate-600"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-slate-300 text-slate-900 text-[10px] font-black flex items-center justify-center shadow-xs">
                      2
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-full">
                    {topThree[1].name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {topThree[1].points} XP
                  </span>
                  <div className="w-full h-16 bg-slate-100 dark:bg-slate-700/60 rounded-t-xl mt-2 flex items-center justify-center text-xs font-bold text-slate-500">
                    🥈 Silver
                  </div>
                </div>
              )}

              {/* 1st Place: Maya (Center, Tallest) */}
              {topThree[0] && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-1.5">
                    <img
                      src={topThree[0].avatar}
                      alt={topThree[0].name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md ring-2 ring-amber-400/30"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1.5 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-950 text-xs font-black flex items-center justify-center shadow-sm">
                      👑 1
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white truncate max-w-full">
                    {topThree[0].name.split(' ')[0]}
                  </span>
                  <span className="text-[11px] font-mono font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                    {topThree[0].points} XP
                  </span>
                  <div className="w-full h-24 bg-gradient-to-t from-amber-500/20 to-amber-500/10 dark:from-amber-500/30 dark:to-amber-500/15 border-t-2 border-amber-400 rounded-t-2xl mt-2 flex flex-col items-center justify-center text-xs font-extrabold text-amber-700 dark:text-amber-300">
                    <span>🥇 Champion</span>
                    <span className="text-[10px] font-normal mt-0.5">Lvl {topThree[0].level}</span>
                  </div>
                </div>
              )}

              {/* 3rd Place: Zoe */}
              {topThree[2] && (
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-1.5">
                    <img
                      src={topThree[2].avatar}
                      alt={topThree[2].name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-amber-700/60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-700 text-white text-[10px] font-black flex items-center justify-center shadow-xs">
                      3
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-full">
                    {topThree[2].name.split(' ')[0]}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                    {topThree[2].points} XP
                  </span>
                  <div className="w-full h-12 bg-slate-100 dark:bg-slate-700/60 rounded-t-xl mt-2 flex items-center justify-center text-xs font-bold text-amber-800 dark:text-amber-400">
                    🥉 Bronze
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Leaderboard List */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Classmates Leaderboard ({sortedLeaderboard.length} Students)
            </h4>

            <div className="space-y-2">
              {sortedLeaderboard.map((user) => (
                <div
                  key={user.studentId}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                    user.isCurrentUser
                      ? 'border-indigo-400 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'border-slate-100 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-5 text-center font-bold text-xs text-slate-500 dark:text-slate-400 tabular-nums">
                      #{user.rank}
                    </span>

                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-300 dark:border-slate-600"
                      referrerPolicy="no-referrer"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {user.name}
                        </span>
                        {user.isCurrentUser && (
                          <span className="text-[9px] font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-100 dark:bg-indigo-900/60 px-1.5 py-0.2 rounded">
                            YOU
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        {user.levelTitle} · {user.streakDays} Day Streak 🔥
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {user.points.toLocaleString()} XP
                    </span>
                    <span className="block text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                      {user.badgesCount} Badges
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Milestones & Badges */}
      {activeTab === 'badges' && (
        <div className="space-y-3">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
              Style Nest Honors & Achievement Badges
            </h4>
            <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-1">
              Earn distinctive badges by excelling in attendance, academic assessments, homework completion, and community activities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  badge.unlocked
                    ? 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700/80 shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/60 dark:border-slate-800/60 opacity-75'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-600">
                    {getBadgeIcon(badge.icon)}
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                      +{badge.pointsReward} XP
                    </span>
                    {badge.unlocked && (
                      <span className="block text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                        ✓ Unlocked
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {badge.name}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                  {badge.description}
                </p>

                {/* Progress bar */}
                <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex justify-between items-center text-[10px] text-slate-500 mb-1">
                    <span>{badge.targetLabel}</span>
                    <span className="font-semibold">{badge.progress}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        badge.unlocked ? 'bg-emerald-500' : 'bg-indigo-500'
                      }`}
                      style={{ width: `${badge.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Points Earning Quests & Opportunities */}
      {activeTab === 'quests' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
              Daily Scholastic Quests
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Complete regular daily actions to boost your level and unlock trophies:
            </p>

            <div className="space-y-2.5">
              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Daily On-Time Attendance
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Tap RFID card before 08:00 AM
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSimulatePointsEarned('Daily RFID Check-In On-Time', 30, 'attendance')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
                >
                  +30 XP
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Complete Homework Problem Set
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Linear Inequalities Set 4
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSimulatePointsEarned('Homework Problem Set Submitted', 50, 'assignment')}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs"
                >
                  +50 XP
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Top Assessment Score (A Grade)
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Score 90%+ on quiz or midterm
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSimulatePointsEarned('Quadratic Exam A+ Score', 100, 'grade')}
                  className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-xs"
                >
                  +100 XP
                </button>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-700/30 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white">
                      Log Custom Activity / Practice
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Debate, Sports Training or Volunteer Work
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onSimulatePointsEarned('Custom Activity Practice Logged', 40, 'activity')}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs"
                >
                  +40 XP
                </button>
              </div>
            </div>
          </div>

          {/* XP History Feed */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Points Activity Log
            </h4>
            <div className="space-y-2">
              {transactions.slice(0, 5).map((tx) => (
                <div
                  key={tx.id}
                  className="p-2.5 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-700/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {tx.title}
                    </div>
                    <div className="text-[10px] text-slate-400">
                      {tx.timestamp}
                    </div>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                    +{tx.points} XP
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
