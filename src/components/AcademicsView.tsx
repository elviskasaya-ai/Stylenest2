import { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  FileText, 
  ChevronRight, 
  CheckCircle, 
  X, 
  Printer, 
  Share2
} from 'lucide-react';
import { Student, Subject } from '../types';
import { SCHOOL_INFO } from '../data/mockData';

interface Props {
  student: Student;
  subjects: Subject[];
}

export function AcademicsView({ student, subjects }: Props) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isReportCardOpen, setIsReportCardOpen] = useState(false);
  const [termFilter, setTermFilter] = useState<'term2' | 'term1' | 'cumulative'>('term2');

  const overallAvg = Math.round(
    subjects.reduce((sum, s) => sum + s.currentPercentage, 0) / (subjects.length || 1)
  );

  const getTrendIcon = (trend: 'up' | 'down' | 'steady') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-3.5 h-3.5 text-rose-500" />;
      case 'steady':
        return <Minus className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
    if (percentage >= 80) return 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800';
    if (percentage >= 70) return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
    return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  };

  return (
    <div className="space-y-4 pb-6">
      {/* Top Academic Summary Header */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Academic Performance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {student.name} · {student.grade} ({SCHOOL_INFO.currentTerm})
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsReportCardOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors border border-indigo-200 dark:border-indigo-800"
          >
            <FileText className="w-3.5 h-3.5" />
            Report Card
          </button>
        </div>

        {/* Big Performance Gauges */}
        <div className="grid grid-cols-3 gap-2.5">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              GPA Standing
            </span>
            <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {student.gpa.toFixed(2)}
            </div>
            <span className="inline-block mt-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Top 5% of Class
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Average Score
            </span>
            <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {overallAvg}%
            </div>
            <span className="inline-block mt-0.5 text-[10px] font-medium text-indigo-600 dark:text-indigo-400">
              Honors Grade A
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 text-center">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Credits Earned
            </span>
            <div className="mt-1 text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              18 / 18
            </div>
            <span className="inline-block mt-0.5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
              On Track
            </span>
          </div>
        </div>

        {/* Term filter switcher */}
        <div className="mt-4 flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-700/60 rounded-xl">
          <button
            type="button"
            onClick={() => setTermFilter('term2')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              termFilter === 'term2'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Term 2 (Current)
          </button>
          <button
            type="button"
            onClick={() => setTermFilter('term1')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              termFilter === 'term1'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Term 1 (Past)
          </button>
          <button
            type="button"
            onClick={() => setTermFilter('cumulative')}
            className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              termFilter === 'cumulative'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Cumulative
          </button>
        </div>
      </div>

      {/* Subject Courses List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Course Performance Breakdown ({subjects.length} Subjects)
          </h3>
          <span className="text-[11px] text-slate-400">Tap to inspect grades</span>
        </div>

        {subjects.map((sub) => (
          <div
            key={sub.id}
            onClick={() => setSelectedSubject(sub)}
            className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400">
                    {sub.code}
                  </span>
                  <span className="text-xs text-slate-300 dark:text-slate-600">·</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {sub.room}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate mt-0.5">
                  {sub.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Instructor: <span className="text-slate-700 dark:text-slate-300">{sub.teacher}</span>
                </p>
              </div>

              {/* Grade Badge */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-lg font-black text-slate-900 dark:text-white tabular-nums leading-none">
                    {sub.currentPercentage}%
                  </div>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300">
                    <span>Grade {sub.letterGrade}</span>
                    {getTrendIcon(sub.trend)}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors ml-1" />
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    sub.currentPercentage >= 90
                      ? 'bg-emerald-500'
                      : sub.currentPercentage >= 80
                      ? 'bg-indigo-500'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${sub.currentPercentage}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">
                <span>{sub.period}</span>
                <span>{sub.assignments.length} assignments graded</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subject Detail Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom duration-200">
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-indigo-600 dark:text-indigo-400">
                  {selectedSubject.code} · {selectedSubject.room}
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedSubject.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Teacher: {selectedSubject.teacher} ({selectedSubject.teacherEmail})
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubject(null)}
                className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4">
              {/* Score header */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    Current Term Weighted Score
                  </div>
                  <div className="text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    {selectedSubject.currentPercentage}%
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-lg font-bold border ${getGradeColor(selectedSubject.currentPercentage)}`}>
                  Grade {selectedSubject.letterGrade}
                </div>
              </div>

              {/* Assignments / Quizzes / Exams breakdown */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                  Graded Assessments & Feedback
                </h4>

                <div className="space-y-2.5">
                  {selectedSubject.assignments.map((asg) => (
                    <div
                      key={asg.id}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">
                              {asg.type}
                            </span>
                            <span className="text-xs text-slate-400">{asg.date}</span>
                          </div>
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                            {asg.title}
                          </h5>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-slate-900 dark:text-white tabular-nums">
                            {asg.score}
                          </span>
                          <span className="text-xs text-slate-400"> / {asg.maxScore}</span>
                        </div>
                      </div>

                      {asg.feedback && (
                        <div className="mt-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-700">
                          <span className="font-semibold text-slate-700 dark:text-slate-200">Teacher note: </span>
                          "{asg.feedback}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Official Report Card Modal */}
      {isReportCardOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-h-[92vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Action Bar */}
            <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-indigo-600" /> Official Transcript & Report Card
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" /> Print
                </button>
                <button
                  type="button"
                  onClick={() => setIsReportCardOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Report Card Content */}
            <div className="p-6 overflow-y-auto space-y-5 bg-white text-slate-900">
              {/* Institution Seal Header */}
              <div className="flex items-center justify-between border-b pb-4 border-slate-300">
                <div className="flex items-center gap-3">
                  <img
                    src={SCHOOL_INFO.crest}
                    alt="School Crest"
                    className="w-14 h-14 rounded-full border border-slate-300 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="text-lg font-black text-slate-950 tracking-tight">
                      {SCHOOL_INFO.name}
                    </h3>
                    <p className="text-xs text-slate-600">
                      {SCHOOL_INFO.campusAddress} · {SCHOOL_INFO.motto}
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      Academic Year {SCHOOL_INFO.academicYear} · {SCHOOL_INFO.currentTerm}
                    </p>
                  </div>
                </div>
              </div>

              {/* Student Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Student Name</div>
                  <div className="font-bold text-slate-900">{student.name}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Student ID</div>
                  <div className="font-mono font-medium text-slate-900">{student.rollNumber}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Grade & Cohort</div>
                  <div className="font-medium text-slate-900">{student.grade} ({student.section})</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Term Cumulative GPA</div>
                  <div className="font-bold text-indigo-700 tabular-nums">{student.gpa.toFixed(2)} / 4.0</div>
                </div>
              </div>

              {/* Academic Performance Table */}
              <div>
                <table className="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Course Subject</th>
                      <th className="p-2.5">Teacher</th>
                      <th className="p-2.5 text-center">Score</th>
                      <th className="p-2.5 text-center">Letter Grade</th>
                      <th className="p-2.5 text-center">GPA Pts</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {subjects.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50">
                        <td className="p-2.5 font-medium text-slate-900">{sub.name}</td>
                        <td className="p-2.5 text-slate-600">{sub.teacher}</td>
                        <td className="p-2.5 text-center font-bold tabular-nums">{sub.currentPercentage}%</td>
                        <td className="p-2.5 text-center font-black">{sub.letterGrade}</td>
                        <td className="p-2.5 text-center font-mono tabular-nums">{sub.gpaPoint.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendance & Conduct Evaluation */}
              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Attendance Summary</span>
                  <div className="flex justify-between text-slate-600">
                    <span>Days Enrolled:</span> <span className="font-bold">62</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Attendance Rate:</span> <span className="font-bold text-emerald-700">{student.attendanceRate}%</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Excused Tardies:</span> <span className="font-bold">1</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900">Honor Commendation</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Student has maintained exemplary scholarship and citizenship, qualifying for the Style Nest Academy Dean's Honor Roll.
                  </p>
                </div>
              </div>

              {/* Signatures */}
              <div className="pt-6 border-t border-slate-200 flex justify-between items-end text-xs text-slate-600">
                <div className="text-center">
                  <div className="font-serif italic text-base text-slate-800">Evelyn Vance, Ed.D</div>
                  <div className="w-36 border-t border-slate-400 mt-1 pt-0.5">Head of School</div>
                </div>
                <div className="text-center">
                  <div className="font-serif italic text-base text-slate-800">Sarah Henderson</div>
                  <div className="w-36 border-t border-slate-400 mt-1 pt-0.5">Homeroom Advisory Dean</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
