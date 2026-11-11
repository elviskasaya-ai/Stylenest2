import { useState, useEffect } from 'react';
import { 
  Student, 
  AttendanceRecord, 
  Subject, 
  Activity, 
  ActivityCategory,
  SchoolEvent,
  GamificationBadge,
  LeaderboardUser,
  PointTransaction,
  ChatThread, 
  ChatMessage, 
  SchoolAnnouncement, 
  ConferenceSlot, 
  AbsenceExcuseRequest, 
  UserRole,
  AttendanceEventType 
} from './types';
import { 
  INITIAL_STUDENTS, 
  INITIAL_ATTENDANCE_RECORDS, 
  INITIAL_SUBJECTS_MAYA, 
  INITIAL_SUBJECTS_LEO, 
  INITIAL_ACTIVITIES, 
  INITIAL_ACTIVITY_CATEGORIES,
  INITIAL_SCHOOL_EVENTS,
  INITIAL_GAMIFICATION_BADGES,
  INITIAL_LEADERBOARD,
  INITIAL_POINT_TRANSACTIONS,
  INITIAL_CHAT_THREADS, 
  INITIAL_CHAT_MESSAGES, 
  INITIAL_ANNOUNCEMENTS, 
  INITIAL_CONFERENCES, 
  INITIAL_EXCUSES 
} from './data/mockData';
import { soundEffects } from './utils/audio';
import confetti from 'canvas-confetti';

import { TopAppBar } from './components/TopAppBar';
import { BottomNavBar, TabId } from './components/BottomNavBar';
import { DynamicIslandNotification, DynamicAlert } from './components/DynamicIslandNotification';
import { RealtimeAlertSimulator } from './components/RealtimeAlertSimulator';
import { DashboardView } from './components/DashboardView';
import { CalendarView } from './components/CalendarView';
import { AcademicsView } from './components/AcademicsView';
import { AttendanceView } from './components/AttendanceView';
import { MessagesView } from './components/MessagesView';
import { ActivitiesView } from './components/ActivitiesView';
import { GamificationView } from './components/GamificationView';
import { TeacherView } from './components/TeacherView';

export default function App() {
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [currentStudentId, setCurrentStudentId] = useState<string>('student-maya');
  const [currentRole, setCurrentRole] = useState<UserRole>('parent');
  const [activeTab, setActiveTab] = useState<TabId>('dashboard');

  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE_RECORDS);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMessage[]>>(INITIAL_CHAT_MESSAGES);
  const [announcements, setAnnouncements] = useState<SchoolAnnouncement[]>(INITIAL_ANNOUNCEMENTS);
  const [conferences, setConferences] = useState<ConferenceSlot[]>(INITIAL_CONFERENCES);
  const [excuseRequests, setExcuseRequests] = useState<AbsenceExcuseRequest[]>(INITIAL_EXCUSES);

  // New features state
  const [events, setEvents] = useState<SchoolEvent[]>(INITIAL_SCHOOL_EVENTS);
  const [categories, setCategories] = useState<ActivityCategory[]>(INITIAL_ACTIVITY_CATEGORIES);
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [badges, setBadges] = useState<GamificationBadge[]>(INITIAL_GAMIFICATION_BADGES);
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(INITIAL_LEADERBOARD);
  const [transactions, setTransactions] = useState<PointTransaction[]>(INITIAL_POINT_TRANSACTIONS);
  const [hasClaimedDailyBonus, setHasClaimedDailyBonus] = useState(false);

  const [activeAlert, setActiveAlert] = useState<DynamicAlert | null>(null);
  const [isSimulatorOpen, setIsSimulatorOpen] = useState(false);
  const [isExcuseModalOpen, setIsExcuseModalOpen] = useState(false);

  // Appearance & Ergonomics
  const [isPhoneFrame, setIsPhoneFrame] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Sync dark mode class on document element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Adjust phone frame toggle based on viewport initially
  useEffect(() => {
    if (window.innerWidth < 640) {
      setIsPhoneFrame(false);
    }
  }, []);

  const currentStudent = students.find((s) => s.id === currentStudentId) || students[0];
  const currentSubjects: Subject[] = currentStudent.id === 'student-maya' ? INITIAL_SUBJECTS_MAYA : INITIAL_SUBJECTS_LEO;

  // Gamification: Award XP points and update student + leaderboard
  const awardPoints = (points: number, title: string, type: PointTransaction['type']) => {
    const timeStr = 'Just now';
    const newTx: PointTransaction = {
      id: `tx-${Date.now()}`,
      title,
      points,
      timestamp: timeStr,
      type,
      studentId: currentStudent.id
    };

    setTransactions((prev) => [newTx, ...prev]);

    setStudents((prev) =>
      prev.map((s) => {
        if (s.id !== currentStudent.id) return s;
        const newTotal = s.totalPoints + points;
        const newLevel = Math.floor(newTotal / 400) + 1;
        return {
          ...s,
          totalPoints: newTotal,
          level: newLevel
        };
      })
    );

    setLeaderboard((prev) =>
      prev.map((u) => {
        if (u.studentId !== currentStudent.id) return u;
        const newTotal = u.points + points;
        const newLevel = Math.floor(newTotal / 400) + 1;
        return {
          ...u,
          points: newTotal,
          level: newLevel
        };
      })
    );

    // Dynamic island notification for XP gained
    setActiveAlert({
      id: `alert-xp-${Date.now()}`,
      type: 'system',
      title: `+${points} XP Awarded!`,
      subtitle: title,
      timestamp: 'Now',
      severity: 'success'
    });
  };

  // Real-time alert trigger function
  const triggerAttendanceAlert = (preset: {
    studentId: string;
    type: AttendanceEventType;
    title: string;
    description: string;
    location: string;
    status: 'verified' | 'flagged' | 'excused';
  }) => {
    const targetStudent = students.find((s) => s.id === preset.studentId) || currentStudent;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toISOString().split('T')[0];

    const newRecord: AttendanceRecord = {
      id: `att-${Date.now()}`,
      studentId: preset.studentId,
      type: preset.type,
      title: preset.title,
      description: preset.description,
      timestamp: timeStr,
      date: dateStr,
      location: preset.location,
      status: preset.status
    };

    setAttendanceRecords((prev) => [newRecord, ...prev]);

    // Update target student's current location & status
    setStudents((prev) =>
      prev.map((st) => {
        if (st.id !== preset.studentId) return st;

        let newStatus = st.status;
        let newLocation = st.currentLocation;

        if (preset.type === 'check_in') {
          newStatus = 'on_campus';
          newLocation = `On Campus (${preset.location})`;
        } else if (preset.type === 'check_out') {
          newStatus = 'departed';
          newLocation = `Departed Campus (${preset.location})`;
        } else if (preset.type === 'bus_boarding') {
          newStatus = 'in_transit';
          newLocation = `En Route on ${st.busRoute}`;
        } else if (preset.type === 'period_tardy') {
          newStatus = 'late';
        }

        return {
          ...st,
          status: newStatus,
          currentLocation: newLocation
        };
      })
    );

    // Play chime sound
    if (preset.status === 'flagged') {
      soundEffects.playAlertWarning();
    } else {
      soundEffects.playAttendanceChime();
    }

    // Award +30 XP on valid check-in
    if (preset.type === 'check_in' && preset.status === 'verified') {
      awardPoints(30, 'Daily On-Time Check-In', 'attendance');
    }

    // Trigger Dynamic Island pop-down
    const alert: DynamicAlert = {
      id: `alert-${Date.now()}`,
      type: 'attendance',
      title: preset.title,
      subtitle: `${preset.location} · ${preset.description}`,
      timestamp: timeStr,
      studentName: targetStudent.name,
      severity: preset.status === 'flagged' ? 'warning' : 'success',
      rawRecord: newRecord
    };

    setActiveAlert(alert);

    // Auto-dismiss dynamic alert after 4.5 seconds
    setTimeout(() => {
      setActiveAlert((curr) => (curr?.id === alert.id ? null : curr));
    }, 4500);
  };

  // Chat message sending handler
  const handleSendMessage = (threadId: string, text: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentRole === 'parent' ? 'parent-elena' : 'student-maya',
      senderName: currentRole === 'parent' ? 'Elena Lin' : currentStudent.name,
      senderRole: currentRole,
      senderAvatar: currentStudent.avatar,
      text,
      timestamp: timeStr,
      read: true
    };

    setChatMessages((prev) => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), newMsg]
    }));

    setChatThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, lastMessage: text, lastTimestamp: timeStr } : t))
    );

    // Simulated Teacher Reply after 1.8 seconds
    setTimeout(() => {
      const teacherReplyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const targetThread = chatThreads.find((t) => t.id === threadId);
      const teacherName = targetThread?.participantName || 'Ms. Henderson';

      const replyMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        threadId,
        senderId: 'teacher-auto',
        senderName: teacherName,
        senderRole: 'teacher',
        senderAvatar: targetThread?.participantAvatar || '/src/assets/images/teacher_avatar_henderson_1794385238313.jpg',
        text: `Thank you for reaching out! I've noted this in ${currentStudent.name}'s academic record and we will review together during morning advisory.`,
        timestamp: teacherReplyTime,
        read: false
      };

      setChatMessages((prev) => ({
        ...prev,
        [threadId]: [...(prev[threadId] || []), replyMsg]
      }));

      setChatThreads((prev) =>
        prev.map((t) =>
          t.id === threadId
            ? { ...t, lastMessage: replyMsg.text, lastTimestamp: teacherReplyTime, unreadCount: t.unreadCount + 1 }
            : t
        )
      );

      setActiveAlert({
        id: `alert-chat-${Date.now()}`,
        type: 'message',
        title: `New Message from ${teacherName}`,
        subtitle: replyMsg.text,
        timestamp: teacherReplyTime,
        studentName: currentStudent.name,
        rawMessage: replyMsg
      });
    }, 1800);
  };

  // Submit excuse
  const handleSubmitExcuse = (excuseData: Omit<AbsenceExcuseRequest, 'id' | 'submittedAt' | 'status'>) => {
    const newExcuse: AbsenceExcuseRequest = {
      ...excuseData,
      id: `exc-${Date.now()}`,
      submittedAt: 'Just now',
      status: 'Approved'
    };

    setExcuseRequests((prev) => [newExcuse, ...prev]);

    triggerAttendanceAlert({
      studentId: excuseData.studentId,
      type: 'excused_absence',
      title: `Excuse Filed: ${excuseData.reason}`,
      description: excuseData.note,
      location: 'Parent Portal Submission',
      status: 'excused'
    });
  };

  // Event Calendar Actions
  const handleAddEvent = (eventData: Omit<SchoolEvent, 'id' | 'rsvpCount' | 'userRsvp'>) => {
    const newEvent: SchoolEvent = {
      ...eventData,
      id: `ev-${Date.now()}`,
      rsvpCount: 1,
      userRsvp: true
    };
    setEvents((prev) => [newEvent, ...prev]);
    awardPoints(25, `Event Added: ${eventData.title}`, 'activity');
  };

  const handleToggleRsvp = (eventId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;
        const newRsvp = !ev.userRsvp;
        const newCount = (ev.rsvpCount || 0) + (newRsvp ? 1 : -1);
        return {
          ...ev,
          userRsvp: newRsvp,
          rsvpCount: Math.max(0, newCount)
        };
      })
    );
    soundEffects.playAttendanceChime();
  };

  // Custom Categories Actions
  const handleAddCategory = (newCat: Omit<ActivityCategory, 'id'>) => {
    const cat: ActivityCategory = {
      ...newCat,
      id: `cat-${Date.now()}`
    };
    setCategories((prev) => [...prev, cat]);
  };

  const handleAddActivity = (newAct: Omit<Activity, 'id'>) => {
    const act: Activity = {
      ...newAct,
      id: `act-${Date.now()}`
    };
    setActivities((prev) => [act, ...prev]);
    awardPoints(50, `Activity Enrolled: ${newAct.name}`, 'activity');
  };

  const handleLogHours = (activityId: string, hours: number) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === activityId ? { ...a, hoursLogged: a.hoursLogged + hours } : a))
    );
    awardPoints(40, `Logged +${hours}h Activity Practice`, 'activity');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  // Gamification Claim Bonus
  const handleClaimDailyBonus = () => {
    setHasClaimedDailyBonus(true);
    awardPoints(25, 'Daily Login & Streak Bonus', 'bonus');
  };

  // Book conference slot
  const handleBookConference = (slotId: string) => {
    setConferences((prev) =>
      prev.map((c) => (c.id === slotId ? { ...c, status: 'booked' } : c))
    );
    soundEffects.playAttendanceChime();

    const targetSlot = conferences.find((c) => c.id === slotId);
    if (targetSlot) {
      setActiveAlert({
        id: `conf-alert-${Date.now()}`,
        type: 'system',
        title: 'Conference Slot Confirmed',
        subtitle: `${targetSlot.teacherName} · ${targetSlot.date} at ${targetSlot.timeSlot}`,
        timestamp: 'Just now'
      });
    }
  };

  // Broadcast alert from teacher console
  const handleBroadcastAlert = (title: string, message: string) => {
    triggerAttendanceAlert({
      studentId: currentStudent.id,
      type: 'check_in',
      title: `Advisory Notice: ${title}`,
      description: message,
      location: 'Campus Announcement',
      status: 'verified'
    });
  };

  const unreadMessagesCount = chatThreads.reduce((sum, t) => sum + t.unreadCount, 0);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-0 md:p-6 transition-colors">
      {/* Frame Wrapper: Realistic Mobile Device or Responsive Full Width */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isPhoneFrame
            ? 'max-w-[420px] h-[890px] rounded-[48px] ring-[12px] ring-slate-800 shadow-2xl phone-shadow overflow-hidden bg-slate-100 dark:bg-slate-900 flex flex-col'
            : 'max-w-6xl min-h-screen bg-slate-100 dark:bg-slate-900 flex flex-col shadow-xl'
        }`}
      >
        {/* Phone Speaker Slit & Hardware Notch */}
        {isPhoneFrame && (
          <div className="relative pt-3 px-6 bg-white dark:bg-slate-900 border-b border-transparent z-40 select-none flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
              9:41
            </span>
            <div className="w-24 h-5 bg-black rounded-full mx-auto flex items-center justify-end px-2">
              <span className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
            </div>
            <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200 text-[11px]">
              <span className="font-mono text-[9px] font-bold">5G</span>
              <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                <div className="h-full w-3/4 bg-current rounded-xs" />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Island Notification Banner Overlay */}
        <DynamicIslandNotification
          alert={activeAlert}
          onDismiss={() => setActiveAlert(null)}
          onSelectAlert={() => {
            setActiveTab('academics');
            setActiveAlert(null);
          }}
        />

        {/* Realtime Attendance Simulator Drawer */}
        <RealtimeAlertSimulator
          isOpen={isSimulatorOpen}
          onClose={() => setIsSimulatorOpen(false)}
          students={students}
          onTriggerPreset={triggerAttendanceAlert}
          isMuted={isMuted}
          onToggleMute={() => {
            const next = !isMuted;
            setIsMuted(next);
            soundEffects.setMuted(next);
          }}
        />

        {/* Top App Bar */}
        <TopAppBar
          students={students}
          currentStudent={currentStudent}
          onSelectStudent={(st) => setCurrentStudentId(st.id)}
          currentRole={currentRole}
          onChangeRole={(role) => setCurrentRole(role)}
          isSimulatorOpen={isSimulatorOpen}
          onOpenSimulator={() => setIsSimulatorOpen(true)}
          isPhoneFrame={isPhoneFrame}
          onTogglePhoneFrame={() => setIsPhoneFrame(!isPhoneFrame)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          unreadAlertsCount={attendanceRecords.filter((r) => r.status === 'flagged').length}
          onNavigateTab={(tab) => setActiveTab(tab)}
        />

        {/* Main Content Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto px-3.5 sm:px-5 pt-3.5 pb-20 no-scrollbar">
          {currentRole === 'teacher' ? (
            <TeacherView
              students={students}
              onBroadcastAlert={handleBroadcastAlert}
            />
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <DashboardView
                  student={currentStudent}
                  attendanceRecords={attendanceRecords}
                  subjects={currentSubjects}
                  activities={activities}
                  events={events}
                  categories={categories}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenExcuseModal={() => setIsExcuseModalOpen(true)}
                  onOpenSimulator={() => setIsSimulatorOpen(true)}
                  onClaimDailyBonus={handleClaimDailyBonus}
                  hasClaimedDailyBonus={hasClaimedDailyBonus}
                  userRole={currentRole}
                />
              )}

              {activeTab === 'calendar' && (
                <CalendarView
                  events={events}
                  onAddEvent={handleAddEvent}
                  onToggleRsvp={handleToggleRsvp}
                  userRole={currentRole}
                  student={currentStudent}
                />
              )}

              {activeTab === 'academics' && (
                <AcademicsView
                  student={currentStudent}
                  subjects={currentSubjects}
                />
              )}

              {activeTab === 'activities' && (
                <ActivitiesView
                  student={currentStudent}
                  activities={activities}
                  categories={categories}
                  onAddCategory={handleAddCategory}
                  onAddActivity={handleAddActivity}
                  onLogHours={handleLogHours}
                  userRole={currentRole}
                />
              )}

              {activeTab === 'gamification' && (
                <GamificationView
                  student={currentStudent}
                  badges={badges}
                  leaderboard={leaderboard}
                  transactions={transactions}
                  onClaimDailyBonus={handleClaimDailyBonus}
                  hasClaimedDailyBonus={hasClaimedDailyBonus}
                  onSimulatePointsEarned={(title, pts, type) => awardPoints(pts, title, type)}
                  userRole={currentRole}
                />
              )}

              {activeTab === 'messages' && (
                <MessagesView
                  threads={chatThreads}
                  messages={chatMessages}
                  announcements={announcements}
                  conferences={conferences}
                  onSendMessage={handleSendMessage}
                  onBookConference={handleBookConference}
                  userRole={currentRole}
                  student={currentStudent}
                />
              )}
            </>
          )}
        </main>

        {/* Bottom Navigation Tab Bar */}
        {currentRole !== 'teacher' && (
          <BottomNavBar
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
            unreadMessagesCount={unreadMessagesCount}
            unacknowledgedAlertsCount={attendanceRecords.filter((r) => r.date === '2026-11-11').length}
          />
        )}
      </div>
    </div>
  );
}
