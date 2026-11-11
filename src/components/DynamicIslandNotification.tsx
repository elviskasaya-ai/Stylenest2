import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Bus, Clock, AlertTriangle, MessageSquare, X, ChevronRight } from 'lucide-react';
import { AttendanceRecord, ChatMessage } from '../types';

export interface DynamicAlert {
  id: string;
  type: 'attendance' | 'message' | 'system';
  title: string;
  subtitle: string;
  timestamp: string;
  studentName?: string;
  severity?: 'normal' | 'warning' | 'success';
  rawRecord?: AttendanceRecord;
  rawMessage?: ChatMessage;
}

interface Props {
  alert: DynamicAlert | null;
  onDismiss: () => void;
  onSelectAlert?: (alert: DynamicAlert) => void;
}

export function DynamicIslandNotification({ alert, onDismiss, onSelectAlert }: Props) {
  if (!alert) return null;

  const getIcon = () => {
    if (alert.type === 'message') {
      return <MessageSquare className="w-4 h-4 text-sky-400" />;
    }
    if (alert.rawRecord?.type === 'bus_boarding' || alert.rawRecord?.type === 'bus_dropoff') {
      return <Bus className="w-4 h-4 text-amber-400" />;
    }
    if (alert.rawRecord?.type === 'period_tardy') {
      return <Clock className="w-4 h-4 text-rose-400" />;
    }
    if (alert.severity === 'warning') {
      return <AlertTriangle className="w-4 h-4 text-amber-400" />;
    }
    return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
  };

  return (
    <AnimatePresence>
      <div className="absolute top-2 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -30, opacity: 0, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
          className="pointer-events-auto w-full max-w-sm bg-slate-900/95 dark:bg-slate-950/95 text-white backdrop-blur-xl rounded-2xl p-3 shadow-2xl border border-slate-700/60"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700/80">
                {getIcon()}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold tracking-wide uppercase text-indigo-300">
                    {alert.studentName ? alert.studentName : 'Style Nest Alert'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {alert.timestamp}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-white truncate">
                  {alert.title}
                </h4>
                <p className="text-[11px] text-slate-300 truncate">
                  {alert.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {onSelectAlert && (
                <button
                  type="button"
                  onClick={() => onSelectAlert(alert)}
                  aria-label="View alert details"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss alert"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
