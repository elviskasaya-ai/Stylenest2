import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Plus, 
  Filter, 
  Check, 
  Users, 
  GraduationCap, 
  Sparkles, 
  X, 
  BookOpen, 
  Trophy, 
  Sun,
  ChevronLeft,
  ChevronRight,
  Share2
} from 'lucide-react';
import { SchoolEvent, UserRole, Student } from '../types';
import { soundEffects } from '../utils/audio';
import confetti from 'canvas-confetti';

interface Props {
  events: SchoolEvent[];
  onAddEvent: (event: Omit<SchoolEvent, 'id' | 'rsvpCount' | 'userRsvp'>) => void;
  onToggleRsvp: (eventId: string) => void;
  userRole: UserRole;
  student: Student;
}

export function CalendarView({
  events,
  onAddEvent,
  onToggleRsvp,
  userRole,
  student
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAudience, setSelectedAudience] = useState<string>('all');
  const [selectedDate, setSelectedDate] = useState<string>('2026-11-16');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'agenda' | 'month'>('agenda');

  // Form states for adding an event
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Exam');
  const [formDate, setFormDate] = useState('2026-11-20');
  const [formTime, setFormTime] = useState('09:00 AM - 10:30 AM');
  const [formLocation, setFormLocation] = useState('Main Academic Hall');
  const [formDescription, setFormDescription] = useState('');
  const [formAudience, setFormAudience] = useState<'all' | 'students' | 'parents' | 'teachers'>('all');

  const categories = ['All', 'Exam', 'Holiday', 'Meeting', 'School Event', 'Athletics', 'Arts'];

  const filteredEvents = events.filter((ev) => {
    const matchCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchAud = selectedAudience === 'all' || ev.audience === 'all' || ev.audience === selectedAudience;
    return matchCat && matchAud;
  });

  // Sort events chronologically
  const sortedEvents = [...filteredEvents].sort((a, b) => a.date.localeCompare(b.date));

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    onAddEvent({
      title: formTitle.trim(),
      category: formCategory,
      date: formDate,
      time: formTime,
      location: formLocation,
      description: formDescription,
      audience: formAudience,
      addedBy: userRole === 'parent' ? `Parent of ${student.name}` : userRole === 'teacher' ? 'Faculty Instructor' : student.name,
      authorRole: userRole
    });

    soundEffects.playAttendanceChime();
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });

    // Reset
    setFormTitle('');
    setFormDescription('');
    setIsAddModalOpen(false);
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Exam':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-200 dark:border-rose-800';
      case 'Holiday':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-200 dark:border-amber-800';
      case 'Meeting':
        return 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800';
      case 'Athletics':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800';
      case 'Arts':
        return 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-400 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-400 border-sky-200 dark:border-sky-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Exam':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'Holiday':
        return <Sun className="w-3.5 h-3.5" />;
      case 'Meeting':
        return <Users className="w-3.5 h-3.5" />;
      case 'Athletics':
        return <Trophy className="w-3.5 h-3.5" />;
      default:
        return <CalendarIcon className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Calendar Header Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded">
                Official School Calendar
              </span>
              <span className="text-xs text-slate-400">Term 2 (Nov–Dec 2026)</span>
            </div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1">
              Events, Exams & Holidays
            </h2>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Event</span>
          </button>
        </div>

        {/* View toggle & Audience pills */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60">
          <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-700/60 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setViewMode('agenda')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'agenda'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Agenda Feed
            </button>
            <button
              type="button"
              onClick={() => setViewMode('month')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                viewMode === 'month'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Monthly Grid
            </button>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500">
            <span>Filter for:</span>
            <select
              value={selectedAudience}
              onChange={(e) => setSelectedAudience(e.target.value)}
              className="text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 px-2 py-1"
            >
              <option value="all">Everyone</option>
              <option value="students">Students Only</option>
              <option value="parents">Parents Only</option>
              <option value="teachers">Faculty Only</option>
            </select>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Monthly Mini Grid View if selected */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-900 dark:text-white">
              November 2026 Academic Calendar
            </span>
            <span className="text-[11px] text-slate-400">
              {events.length} School Dates Scheduled
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-400 uppercase mb-1">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 30 }).map((_, idx) => {
              const day = idx + 1;
              const dateStr = `2026-11-${day < 10 ? '0' + day : day}`;
              const hasEvents = events.filter((e) => e.date === dateStr);
              const isSelected = selectedDate === dateStr;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-9 rounded-lg flex flex-col items-center justify-center text-xs transition-all relative ${
                    isSelected
                      ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-500/40'
                      : hasEvents.length > 0
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents.length > 0 && (
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick day summary if day selected */}
          {selectedDate && (
            <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Events on {selectedDate}:
              </span>
              <div className="mt-1.5 space-y-1">
                {events.filter((e) => e.date === selectedDate).length === 0 ? (
                  <p className="text-[11px] text-slate-400">No school events scheduled on this date.</p>
                ) : (
                  events.filter((e) => e.date === selectedDate).map((e) => (
                    <div key={e.id} className="text-xs font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      {e.title} ({e.time})
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Events Feed List */}
      <div className="space-y-3">
        {sortedEvents.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <CalendarIcon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No school events match your current filter.</p>
          </div>
        ) : (
          sortedEvents.map((ev) => {
            return (
              <div
                key={ev.id}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-600 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getCategoryBadge(
                          ev.category
                        )}`}
                      >
                        {getCategoryIcon(ev.category)}
                        {ev.category}
                      </span>

                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        {ev.date}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {ev.title}
                    </h3>
                  </div>

                  {/* RSVP / Attending button */}
                  <button
                    type="button"
                    onClick={() => onToggleRsvp(ev.id)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                      ev.userRsvp
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {ev.userRsvp ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Going
                      </>
                    ) : (
                      <>RSVP</>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                  {ev.description}
                </p>

                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px]">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {ev.time}
                    </span>
                    <span className="flex items-center gap-1 text-[11px] truncate max-w-[150px]">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {ev.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    {ev.rsvpCount !== undefined && ev.rsvpCount > 0 && (
                      <span className="font-medium text-slate-600 dark:text-slate-300">
                        {ev.rsvpCount} Attending
                      </span>
                    )}
                    <span>· Added by {ev.addedBy}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add School Event Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Add School Event to Calendar
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Publish dates for exams, meetings, performances, or holidays
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Winter Term Final Chemistry Exam"
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Event Type
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  >
                    <option value="Exam">Exam / Assessment</option>
                    <option value="Holiday">Holiday / Recess</option>
                    <option value="Meeting">Parent-Teacher Meeting</option>
                    <option value="School Event">School Event</option>
                    <option value="Athletics">Athletics / Match</option>
                    <option value="Arts">Arts / Performance</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Target Audience
                  </label>
                  <select
                    value={formAudience}
                    onChange={(e) => setFormAudience(e.target.value as any)}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  >
                    <option value="all">Everyone (School-Wide)</option>
                    <option value="students">Students Only</option>
                    <option value="parents">Parents Only</option>
                    <option value="teachers">Faculty Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Time / Duration
                  </label>
                  <input
                    type="text"
                    required
                    value={formTime}
                    onChange={(e) => setFormTime(e.target.value)}
                    placeholder="e.g. 09:30 AM - 11:00 AM or All Day"
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Location / Venue
                </label>
                <input
                  type="text"
                  required
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  placeholder="e.g. Main Auditorium or Room 302"
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Description & Instructions
                </label>
                <textarea
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Details, materials required, or parent instructions..."
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <CalendarIcon className="w-4 h-4" />
                Publish Event to Style Nest Calendar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
