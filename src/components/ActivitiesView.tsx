import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Calendar, 
  Plus, 
  Sparkles, 
  Clock, 
  FolderPlus, 
  Check, 
  Flame, 
  X,
  Tag
} from 'lucide-react';
import { Student, Activity, ActivityCategory, UserRole } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  student: Student;
  activities: Activity[];
  categories: ActivityCategory[];
  onAddCategory: (category: Omit<ActivityCategory, 'id'>) => void;
  onAddActivity: (activity: Omit<Activity, 'id'>) => void;
  onLogHours: (activityId: string, hours: number) => void;
  userRole: UserRole;
}

export function ActivitiesView({
  student,
  activities,
  categories,
  onAddCategory,
  onAddActivity,
  onLogHours,
  userRole
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);

  // New Category Form
  const [catName, setCatName] = useState('');
  const [catColor, setCatColor] = useState('teal');

  // New Activity Form
  const [actName, setActName] = useState('');
  const [actCategory, setActCategory] = useState(categories[0]?.name || 'STEM & Robotics');
  const [actRole, setActRole] = useState('');
  const [actSchedule, setActSchedule] = useState('');
  const [actNextSession, setActNextSession] = useState('');
  const [actCoach, setActCoach] = useState('');
  const [actHours, setActHours] = useState(10);
  const [actAchievement, setActAchievement] = useState('');

  const studentActivities = activities.filter((a) => a.studentId === student.id);
  const filteredActivities = studentActivities.filter(
    (a) => selectedCategory === 'All' || a.category === selectedCategory
  );

  // Total badges & total hours
  const allBadges = studentActivities.flatMap((a) => a.badges);
  const totalHoursLogged = studentActivities.reduce((sum, a) => sum + (a.hoursLogged || 0), 0);

  // Hours per category summary calculation
  const categoryHoursMap: Record<string, number> = {};
  studentActivities.forEach((act) => {
    categoryHoursMap[act.category] = (categoryHoursMap[act.category] || 0) + (act.hoursLogged || 0);
  });

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    onAddCategory({
      name: catName.trim(),
      color: catColor,
      isCustom: true,
      createdBy: userRole === 'parent' ? 'Parent User' : userRole === 'teacher' ? 'Faculty' : student.name
    });

    soundEffects.playAttendanceChime();
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setCatName('');
    setIsCategoryModalOpen(false);
  };

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actName.trim()) return;

    onAddActivity({
      studentId: student.id,
      name: actName.trim(),
      category: actCategory,
      role: actRole || 'Active Member',
      schedule: actSchedule || 'Weekly Session',
      nextSession: actNextSession || 'Upcoming this week',
      progressPercent: 75,
      coachName: actCoach || 'Faculty Advisor',
      recentAchievement: actAchievement || 'Enrolled in Season Activity',
      badges: ['Active Participant'],
      hoursLogged: Number(actHours) || 0
    });

    soundEffects.playAttendanceChime();
    confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 } });

    // Reset
    setActName('');
    setActRole('');
    setActSchedule('');
    setActNextSession('');
    setActCoach('');
    setActAchievement('');
    setIsActivityModalOpen(false);
  };

  const getCategoryColorClasses = (colorName: string) => {
    switch (colorName) {
      case 'indigo': return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'emerald': return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'purple': return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      case 'amber': return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'blue': return 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 border-blue-200 dark:border-blue-800';
      case 'rose': return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      case 'teal': return 'bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-400 border-teal-200 dark:border-teal-800';
      case 'sky': return 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200 dark:border-sky-800';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Extracurriculars Header & Actions */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                Holistic Student Profile
              </span>
              <span className="text-xs text-slate-400">{student.name}</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Extracurriculars & Custom Categories
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCategoryModalOpen(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-semibold transition-colors"
              title="Add Custom Activity Category"
            >
              <FolderPlus className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden xs:inline">New Category</span>
            </button>

            <button
              type="button"
              onClick={() => setIsActivityModalOpen(true)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Activity</span>
            </button>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
              Active Clubs
            </span>
            <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums">
              {studentActivities.length}
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
              Hours Invested
            </span>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 tabular-nums">
              {totalHoursLogged} hrs
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700">
            <span className="text-[10px] uppercase font-semibold text-slate-500 dark:text-slate-400">
              Honor Badges
            </span>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 tabular-nums">
              {allBadges.length}
            </div>
          </div>
        </div>

        {/* Category Hours Tracking Bar / Dashboard Reporting */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
            Activity Category Distribution
          </span>
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(categoryHoursMap).map(([cat, hours]) => {
              const matchedCat = categories.find((c) => c.name === cat);
              const colorClass = getCategoryColorClasses(matchedCat?.color || 'indigo');
              return (
                <div
                  key={cat}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${colorClass}`}
                >
                  <Tag className="w-3 h-3" />
                  <span>{cat}:</span>
                  <strong className="font-bold tabular-nums">{hours} hrs</strong>
                  {matchedCat?.isCustom && (
                    <span className="text-[9px] opacity-75 font-mono">Custom</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Filter Chips with Custom tags */}
        <div className="mt-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setSelectedCategory('All')}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
              selectedCategory === 'All'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300'
            }`}
          >
            All Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors flex items-center gap-1 ${
                selectedCategory === cat.name
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300'
              }`}
            >
              <span>{cat.name}</span>
              {cat.isCustom && (
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Cards List */}
      <div className="space-y-3">
        {filteredActivities.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <Trophy className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No activities recorded under this category yet.</p>
            <button
              type="button"
              onClick={() => setIsActivityModalOpen(true)}
              className="mt-3 px-3 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
            >
              Log an Activity
            </button>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const matchedCat = categories.find((c) => c.name === act.category);
            const colorClass = getCategoryColorClasses(matchedCat?.color || 'indigo');

            return (
              <div
                key={act.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${colorClass}`}>
                        {act.category}
                      </span>
                      {matchedCat?.isCustom && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          User Category
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {act.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      Role: <span className="font-semibold text-slate-800 dark:text-slate-200">{act.role}</span>
                    </p>
                  </div>

                  {/* Log +2 Hours Button (Awards Points) */}
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 tabular-nums">
                      {act.hoursLogged} hrs logged
                    </span>
                    <button
                      type="button"
                      onClick={() => onLogHours(act.id, 2)}
                      className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 text-[11px] font-semibold border border-indigo-200 dark:border-indigo-800 transition-colors"
                      title="Log 2 hours of session practice & earn +40 XP"
                    >
                      +2h Log (+40 XP)
                    </button>
                  </div>
                </div>

                {/* Achievement Highlight */}
                {act.recentAchievement && (
                  <div className="my-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-slate-900 dark:text-white">Milestone: </span>
                      {act.recentAchievement}
                    </div>
                  </div>
                )}

                {/* Badges Earned in this club */}
                {act.badges && act.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 my-2">
                    {act.badges.map((b, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800"
                      >
                        <Award className="w-3 h-3 text-amber-500" />
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {/* Schedule & Coach footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700/60 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 truncate">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      {act.schedule}
                    </span>
                    <span>Supervisor: {act.coachName}</span>
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400 font-medium text-[11px]">
                    Next session: {act.nextSession}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal 1: Create Custom Activity Category */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-5 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Create Custom Activity Category
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  e.g. Debate Club Practice, Sports Training, Volunteer Work
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Debate Club Practice or Volunteer Work"
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Theme Palette Color
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'teal', label: 'Teal' },
                    { id: 'rose', label: 'Rose' },
                    { id: 'blue', label: 'Blue' },
                    { id: 'purple', label: 'Purple' },
                    { id: 'emerald', label: 'Emerald' },
                    { id: 'amber', label: 'Amber' },
                    { id: 'sky', label: 'Sky' },
                    { id: 'indigo', label: 'Indigo' }
                  ].map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setCatColor(color.id)}
                      className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                        catColor === color.id
                          ? 'border-indigo-600 ring-2 ring-indigo-500/30 font-bold'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {color.label}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Add Category to Style Nest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Log New Student Activity */}
      {isActivityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Log New Student Activity
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Track participation, practice hours, and coaching notes
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsActivityModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="p-5 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Activity Name
                </label>
                <input
                  type="text"
                  required
                  value={actName}
                  onChange={(e) => setActName(e.target.value)}
                  placeholder="e.g. Model UN Parliamentary Debate"
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Category (Standard or Custom)
                  </label>
                  <select
                    value={actCategory}
                    onChange={(e) => setActCategory(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} {c.isCustom ? '(Custom)' : ''}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Role / Position
                  </label>
                  <input
                    type="text"
                    required
                    value={actRole}
                    onChange={(e) => setActRole(e.target.value)}
                    placeholder="e.g. Lead Debater or Volunteer"
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Schedule
                  </label>
                  <input
                    type="text"
                    required
                    value={actSchedule}
                    onChange={(e) => setActSchedule(e.target.value)}
                    placeholder="e.g. Wednesdays · 04:00 PM"
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Hours Already Logged
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={actHours}
                    onChange={(e) => setActHours(Number(e.target.value))}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Coach / Advisor Name
                  </label>
                  <input
                    type="text"
                    value={actCoach}
                    onChange={(e) => setActCoach(e.target.value)}
                    placeholder="e.g. Mr. Jenkins"
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Next Session Info
                  </label>
                  <input
                    type="text"
                    value={actNextSession}
                    onChange={(e) => setActNextSession(e.target.value)}
                    placeholder="e.g. Next Wednesday in Room 210"
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Recent Milestone / Highlight
                </label>
                <input
                  type="text"
                  value={actAchievement}
                  onChange={(e) => setActAchievement(e.target.value)}
                  placeholder="e.g. 1st Place Regional Debate Semi-Finalist"
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                Save & Track Activity
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
