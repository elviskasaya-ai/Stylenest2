import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  MessageSquare, 
  Bell, 
  Calendar, 
  CheckCheck, 
  Clock, 
  User, 
  FileText, 
  Check, 
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { ChatThread, ChatMessage, SchoolAnnouncement, ConferenceSlot, UserRole, Student } from '../types';
import { soundEffects } from '../utils/audio';

interface Props {
  threads: ChatThread[];
  messages: Record<string, ChatMessage[]>;
  announcements: SchoolAnnouncement[];
  conferences: ConferenceSlot[];
  onSendMessage: (threadId: string, text: string) => void;
  onBookConference: (slotId: string) => void;
  userRole: UserRole;
  student: Student;
}

export function MessagesView({
  threads,
  messages,
  announcements,
  conferences,
  onSendMessage,
  onBookConference,
  userRole,
  student
}: Props) {
  const [activeSubTab, setActiveSubTab] = useState<'threads' | 'announcements' | 'conferences'>('threads');
  const [activeThreadId, setActiveThreadId] = useState<string | null>(threads[0]?.id || null);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId);
  const currentMessages = activeThreadId ? messages[activeThreadId] || [] : [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeThreadId) {
      scrollToBottom();
    }
  }, [activeThreadId, currentMessages]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || !activeThreadId) return;

    const text = inputText.trim();
    setInputText('');
    onSendMessage(activeThreadId, text);
    soundEffects.playMessagePop();

    // Simulate teacher typing & auto-response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      soundEffects.playAttendanceChime();
    }, 1800);
  };

  const quickReplies = [
    'Thank you so much for the update!',
    'Can we discuss this at the upcoming conference?',
    'I just submitted the absence excuse on the portal.',
    'Understood, we will review the homework tonight.'
  ];

  return (
    <div className="space-y-4 pb-6">
      {/* Top Segmented Sub-Nav */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-1.5 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center gap-1">
        <button
          type="button"
          onClick={() => setActiveSubTab('threads')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'threads'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Faculty Chat</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('announcements')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'announcements'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Circulars ({announcements.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('conferences')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'conferences'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Conferences</span>
        </button>
      </div>

      {/* SUB-TAB 1: Faculty Direct Chat Threads */}
      {activeSubTab === 'threads' && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-xs overflow-hidden flex flex-col h-[520px]">
          {/* Thread header if active */}
          {activeThread ? (
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/80">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative">
                  <img
                    src={activeThread.participantAvatar}
                    alt={activeThread.participantName}
                    className="w-9 h-9 rounded-full object-cover border border-slate-300 dark:border-slate-600"
                    referrerPolicy="no-referrer"
                  />
                  {activeThread.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-800" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {activeThread.participantName}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {activeThread.participantRole} · {student.name}
                  </p>
                </div>
              </div>

              {/* Thread switcher menu button */}
              <div className="flex items-center gap-1.5">
                {threads.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveThreadId(t.id)}
                    title={t.participantName}
                    className={`p-1 rounded-full border transition-all ${
                      t.id === activeThreadId
                        ? 'border-indigo-600 ring-2 ring-indigo-500/30'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={t.participantAvatar}
                      alt={t.participantName}
                      className="w-6 h-6 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/30 dark:bg-slate-900/40">
            {currentMessages.map((msg) => {
              const isMe = msg.senderRole === userRole || (userRole === 'parent' && msg.senderRole === 'parent');

              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                >
                  {!isMe && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      className="w-7 h-7 rounded-full object-cover mb-1 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  <div
                    className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs ${
                      isMe
                        ? 'bg-indigo-600 text-white rounded-br-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 rounded-bl-xs'
                    }`}
                  >
                    {!isMe && (
                      <div className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 mb-0.5">
                        {msg.senderName}
                      </div>
                    )}
                    <p className="leading-relaxed">{msg.text}</p>
                    <div
                      className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                        isMe ? 'text-indigo-200' : 'text-slate-400'
                      }`}
                    >
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-indigo-200" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400 italic pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                <span>{activeThread?.participantName} is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Carousel */}
          <div className="px-3 py-1.5 border-t border-slate-100 dark:border-slate-700/60 bg-white dark:bg-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputText(qr);
                }}
                className="px-2.5 py-1 text-[11px] rounded-full border border-slate-200 dark:border-slate-700 hover:border-indigo-400 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-50 dark:bg-slate-800/80 whitespace-nowrap shrink-0 transition-colors"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeThread?.participantName || 'teacher'}...`}
              className="flex-1 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* SUB-TAB 2: Official Circulars & Announcements */}
      {activeSubTab === 'announcements' && (
        <div className="space-y-3">
          {announcements.map((ann) => (
            <div
              key={ann.id}
              className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs"
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                    ann.category === 'Urgent'
                      ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border border-rose-200'
                      : ann.category === 'Academic'
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400 border border-indigo-200'
                      : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200'
                  }`}
                >
                  {ann.category}
                </span>
                <span className="text-xs text-slate-400 font-mono">{ann.date}</span>
              </div>

              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                {ann.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ann.content}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400">
                  Issued by: <strong className="text-slate-700 dark:text-slate-300">{ann.author}</strong> ({ann.authorRole})
                </span>

                {ann.actionRequired && (
                  <button
                    type="button"
                    onClick={() => setActiveSubTab('conferences')}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold text-xs hover:bg-indigo-100 transition-colors"
                  >
                    {ann.actionRequired} →
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUB-TAB 3: 1-on-1 Parent-Teacher Conferences Scheduler */}
      {activeSubTab === 'conferences' && (
        <div className="space-y-3">
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800">
            <h4 className="text-xs font-bold text-indigo-900 dark:text-indigo-200">
              Term 2 Advisory & Subject Conferences
            </h4>
            <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 mt-1">
              Select an available 20-minute discussion slot with your student's instructors. Confirmation will be sent directly to your portal messages.
            </p>
          </div>

          <div className="space-y-2.5">
            {conferences.map((conf) => {
              const isBooked = conf.status === 'booked';

              return (
                <div
                  key={conf.id}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {conf.teacherName}
                      </span>
                      <span className="text-[10px] text-slate-500">· {conf.room}</span>
                    </div>
                    <div className="text-xs text-indigo-600 dark:text-indigo-400 font-medium truncate mt-0.5">
                      {conf.subject}
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>{conf.date}</span>
                      <span>·</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {conf.timeSlot}
                      </span>
                    </div>
                  </div>

                  <div>
                    {isBooked ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
                        <Check className="w-3.5 h-3.5" /> Confirmed
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onBookConference(conf.id)}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        Book Slot
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
