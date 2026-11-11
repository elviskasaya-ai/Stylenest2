import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Bus, 
  Clock, 
  AlertCircle, 
  Calendar as CalendarIcon, 
  FileText, 
  Plus, 
  Check, 
  Upload, 
  X, 
  Filter
} from 'lucide-react';
import { Student, AttendanceRecord, AbsenceExcuseRequest, AttendanceEventType } from '../types';

interface Props {
  student: Student;
  attendanceRecords: AttendanceRecord[];
  excuseRequests: AbsenceExcuseRequest[];
  onSubmitExcuse: (excuse: Omit<AbsenceExcuseRequest, 'id' | 'submittedAt' | 'status'>) => void;
  isExcuseModalOpen: boolean;
  setIsExcuseModalOpen: (open: boolean) => void;
}

export function AttendanceView({
  student,
  attendanceRecords,
  excuseRequests,
  onSubmitExcuse,
  isExcuseModalOpen,
  setIsExcuseModalOpen
}: Props) {
  const [filterType, setFilterType] = useState<'all' | 'gate' | 'bus' | 'tardy'>('all');
  const [selectedCalendarDay, setSelectedCalendarDay] = useState<number>(11);

  // Excuse Form State
  const [excuseDate, setExcuseDate] = useState('2026-11-12');
  const [excuseReason, setExcuseReason] = useState<AbsenceExcuseRequest['reason']>('Illness / Medical');
  const [excuseNote, setExcuseNote] = useState('');
  const [hasDoctorNote, setHasDoctorNote] = useState(false);

  const studentRecords = attendanceRecords.filter((r) => r.studentId === student.id);
  const studentExcuses = excuseRequests.filter((e) => e.studentId === student.id);

  const filteredRecords = studentRecords.filter((rec) => {
    if (filterType === 'gate') return rec.type === 'check_in' || rec.type === 'check_out';
    if (filterType === 'bus') return rec.type === 'bus_boarding' || rec.type === 'bus_dropoff';
    if (filterType === 'tardy') return rec.type === 'period_tardy' || rec.type === 'unexcused_absence';
    return true;
  });

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!excuseNote.trim()) return;

    onSubmitExcuse({
      studentId: student.id,
      studentName: student.name,
      date: excuseDate,
      reason: excuseReason,
      note: excuseNote,
      hasDoctorNoteAttachment: hasDoctorNote
    });

    setExcuseNote('');
    setHasDoctorNote(false);
    setIsExcuseModalOpen(false);
  };

  // Calendar days generation for November 2026 (Nov 1 is Sunday)
  const daysInNov = 30;
  // Let's create calendar day statuses
  const getDayStatus = (day: number) => {
    // Weekends (Nov 1, 7, 8, 14, 15, 21, 22, 28, 29)
    const isWeekend = [1, 7, 8, 14, 15, 21, 22, 28, 29].includes(day);
    if (isWeekend) return 'weekend';
    if (day > 11) return 'upcoming';
    if (day === 5) return 'excused'; // Doctor appt
    if (day === 9 && student.id === 'student-leo') return 'tardy';
    return 'present';
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Attendance Header & Quick Summary */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Real-Time Attendance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Instant campus gate scans, bus telematics & absence records
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsExcuseModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            File Excuse Note
          </button>
        </div>

        {/* 4 Attendance Metrics */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-[10px] uppercase font-semibold text-emerald-700 dark:text-emerald-300">
              Rate
            </span>
            <div className="text-lg font-black text-emerald-800 dark:text-emerald-200 tabular-nums">
              {student.attendanceRate}%
            </div>
            <span className="text-[9px] text-emerald-600 dark:text-emerald-400">On Track</span>
          </div>

          <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
            <span className="text-[10px] uppercase font-semibold text-indigo-700 dark:text-indigo-300">
              Present
            </span>
            <div className="text-lg font-black text-indigo-800 dark:text-indigo-200 tabular-nums">
              60 Days
            </div>
            <span className="text-[9px] text-indigo-600 dark:text-indigo-400">Enrolled 62</span>
          </div>

          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-[10px] uppercase font-semibold text-amber-700 dark:text-amber-300">
              Tardy
            </span>
            <div className="text-lg font-black text-amber-800 dark:text-amber-200 tabular-nums">
              1
            </div>
            <span className="text-[9px] text-amber-600 dark:text-amber-400">Excused</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-semibold text-slate-600 dark:text-slate-400">
              Absences
            </span>
            <div className="text-lg font-black text-slate-800 dark:text-slate-200 tabular-nums">
              1
            </div>
            <span className="text-[9px] text-slate-500 dark:text-slate-400">Doctor Note</span>
          </div>
        </div>
      </div>

      {/* November 2026 Interactive Attendance Calendar Heatmap */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              November 2026 Attendance Heatmap
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Term 2
          </span>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-semibold text-slate-500 uppercase mb-1">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Calendar days grid */}
        <div className="grid grid-cols-7 gap-1.5">
          {Array.from({ length: daysInNov }).map((_, idx) => {
            const dayNum = idx + 1;
            const status = getDayStatus(dayNum);
            const isSelected = selectedCalendarDay === dayNum;

            let bgColor = 'bg-slate-50 dark:bg-slate-700/30 text-slate-400';
            if (status === 'present') {
              bgColor = 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 font-semibold';
            } else if (status === 'tardy') {
              bgColor = 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200 border border-amber-300 font-bold';
            } else if (status === 'excused') {
              bgColor = 'bg-sky-100 dark:bg-sky-950/60 text-sky-800 dark:text-sky-200 border border-sky-300 font-bold';
            } else if (status === 'weekend') {
              bgColor = 'bg-slate-100/50 dark:bg-slate-800/40 text-slate-400 opacity-60';
            }

            return (
              <button
                key={dayNum}
                type="button"
                onClick={() => setSelectedCalendarDay(dayNum)}
                className={`h-9 rounded-lg flex flex-col items-center justify-center text-xs transition-all ${bgColor} ${
                  isSelected ? 'ring-2 ring-indigo-600 ring-offset-1 dark:ring-offset-slate-900 shadow-xs' : ''
                }`}
              >
                <span className="tabular-nums">{dayNum}</span>
                {status === 'present' && <span className="w-1 h-1 rounded-full bg-emerald-500 mt-0.5" />}
                {status === 'tardy' && <span className="w-1 h-1 rounded-full bg-amber-500 mt-0.5" />}
                {status === 'excused' && <span className="w-1 h-1 rounded-full bg-sky-500 mt-0.5" />}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Present (On-time)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
            <span>Excused Absence</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Tardy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>Weekend/Holiday</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Real-Time Event Stream */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            All Activity
          </button>
          <button
            type="button"
            onClick={() => setFilterType('gate')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
              filterType === 'gate'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Campus RFID Gates
          </button>
          <button
            type="button"
            onClick={() => setFilterType('bus')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
              filterType === 'bus'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Bus Transit
          </button>
          <button
            type="button"
            onClick={() => setFilterType('tardy')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
              filterType === 'tardy'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Tardies & Flags
          </button>
        </div>
      </div>

      {/* Real-Time Live Feed List */}
      <div className="space-y-2.5">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs text-slate-500">No attendance events matching this filter.</p>
          </div>
        ) : (
          filteredRecords.map((rec) => {
            const isBus = rec.type === 'bus_boarding' || rec.type === 'bus_dropoff';
            const isTardy = rec.type === 'period_tardy';
            const isExcused = rec.type === 'excused_absence';

            return (
              <div
                key={rec.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                      isBus
                        ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800'
                        : isTardy
                        ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                        : isExcused
                        ? 'bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800'
                        : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                    }`}
                  >
                    {isBus ? (
                      <Bus className="w-4 h-4" />
                    ) : isTardy ? (
                      <Clock className="w-4 h-4" />
                    ) : isExcused ? (
                      <FileText className="w-4 h-4" />
                    ) : (
                      <ShieldCheck className="w-4 h-4" />
                    )}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {rec.title}
                      </h4>
                      {rec.status === 'verified' && (
                        <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                          RFID Verified
                        </span>
                      )}
                      {rec.status === 'flagged' && (
                        <span className="text-[10px] font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-1.5 py-0.5 rounded">
                          Flagged
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                      {rec.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <span>{rec.location}</span>
                      {rec.rfidScannerId && (
                        <>
                          <span>·</span>
                          <span className="font-mono">{rec.rfidScannerId}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">
                    {rec.timestamp}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {rec.date}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Submitted Absence Excuse Requests */}
      {studentExcuses.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Parent Absence Excuse Requests ({studentExcuses.length})
          </h3>
          <div className="space-y-2">
            {studentExcuses.map((exc) => (
              <div
                key={exc.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-700/30 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {exc.reason}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-200 dark:border-emerald-800">
                      {exc.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                    {exc.note}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Date of Absence: <span className="font-medium text-slate-700 dark:text-slate-300">{exc.date}</span> · Submitted: {exc.submittedAt}
                  </p>
                </div>

                {exc.hasDoctorNoteAttachment && (
                  <span className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1 shrink-0">
                    <FileText className="w-3.5 h-3.5" /> Note Attached
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* File Absence Excuse Modal */}
      {isExcuseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Submit Student Absence Excuse
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Transmits medical or excused absence directly to Dean of Students
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExcuseModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Student
                </label>
                <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold text-slate-900 dark:text-white">
                  {student.name} ({student.grade} - {student.section})
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Date of Absence
                  </label>
                  <input
                    type="date"
                    required
                    value={excuseDate}
                    onChange={(e) => setExcuseDate(e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Absence Reason
                  </label>
                  <select
                    value={excuseReason}
                    onChange={(e) => setExcuseReason(e.target.value as AbsenceExcuseRequest['reason'])}
                    className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Illness / Medical">Illness / Medical</option>
                    <option value="Doctor Appointment">Doctor Appointment</option>
                    <option value="Family Emergency">Family Emergency</option>
                    <option value="Bereavement">Bereavement</option>
                    <option value="Other">Other Excused Reason</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Explanation / Symptoms
                </label>
                <textarea
                  rows={3}
                  required
                  value={excuseNote}
                  onChange={(e) => setExcuseNote(e.target.value)}
                  placeholder="Please state details regarding the illness or appointment..."
                  className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white p-3 focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Doctor Note Attachment simulator toggle */}
              <div
                onClick={() => setHasDoctorNote(!hasDoctorNote)}
                className={`p-3 rounded-xl border cursor-pointer transition-colors flex items-center justify-between ${
                  hasDoctorNote
                    ? 'border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Upload className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white">
                      Attach Medical Certification
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {hasDoctorNote ? 'dr_signature_verification.pdf attached' : 'Click to attach photo or PDF note'}
                    </div>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    hasDoctorNote
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-600'
                  }`}
                >
                  {hasDoctorNote && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Submit Official Absence Excuse
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
