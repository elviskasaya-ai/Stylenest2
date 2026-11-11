export type UserRole = 'parent' | 'teacher' | 'student';

export type StudentStatus = 'on_campus' | 'in_transit' | 'departed' | 'absent' | 'late';

export interface Student {
  id: string;
  name: string;
  grade: string;
  section: string;
  avatar: string;
  rollNumber: string;
  homeroomTeacher: string;
  gpa: number;
  attendanceRate: number;
  status: StudentStatus;
  currentLocation: string;
  busRoute: string;
  allergies?: string;
  emergencyContact: string;
  totalPoints: number;
  level: number;
}

export type AttendanceEventType = 
  | 'check_in' 
  | 'check_out' 
  | 'bus_boarding' 
  | 'bus_dropoff' 
  | 'period_tardy' 
  | 'unexcused_absence' 
  | 'excused_absence';

export interface AttendanceRecord {
  id: string;
  studentId: string;
  type: AttendanceEventType;
  title: string;
  description: string;
  timestamp: string; // e.g. "07:44 AM"
  date: string; // e.g. "2026-11-11"
  location: string;
  status: 'verified' | 'flagged' | 'excused';
  rfidScannerId?: string;
  busNumber?: string;
}

export interface Assignment {
  id: string;
  title: string;
  type: 'Quiz' | 'Project' | 'Homework' | 'Exam' | 'Lab';
  score: number;
  maxScore: number;
  date: string;
  feedback?: string;
  completed?: boolean;
}

export interface Subject {
  id: string;
  studentId: string;
  name: string;
  code: string;
  teacher: string;
  teacherEmail: string;
  room: string;
  currentPercentage: number;
  letterGrade: string;
  gpaPoint: number;
  trend: 'up' | 'down' | 'steady';
  period: string;
  assignments: Assignment[];
}

export interface ActivityCategory {
  id: string;
  name: string;
  color: string;
  isCustom?: boolean;
  createdBy?: string;
}

export interface Activity {
  id: string;
  studentId: string;
  name: string;
  category: string; // supports custom categories
  role: string;
  schedule: string;
  nextSession: string;
  progressPercent: number;
  coachName: string;
  recentAchievement: string;
  badges: string[];
  hoursLogged: number;
}

export type EventCategoryType = 'Exam' | 'Holiday' | 'Meeting' | 'School Event' | 'Athletics' | 'Arts';

export interface SchoolEvent {
  id: string;
  title: string;
  category: EventCategoryType | string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "09:00 AM - 11:30 AM"
  location: string;
  description: string;
  audience: 'all' | 'students' | 'parents' | 'teachers';
  addedBy: string;
  authorRole: UserRole | 'admin';
  rsvpCount?: number;
  userRsvp?: boolean;
}

export interface GamificationBadge {
  id: string;
  name: string;
  category: 'attendance' | 'academic' | 'activity' | 'milestone';
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number; // 0 to 100
  targetLabel: string;
  pointsReward: number;
}

export interface PointTransaction {
  id: string;
  title: string;
  points: number;
  timestamp: string;
  type: 'attendance' | 'assignment' | 'grade' | 'activity' | 'bonus';
  studentId: string;
}

export interface LeaderboardUser {
  rank: number;
  studentId: string;
  name: string;
  grade: string;
  avatar: string;
  points: number;
  level: number;
  levelTitle: string;
  streakDays: number;
  badgesCount: number;
  isCurrentUser: boolean;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachmentName?: string;
}

export interface ChatThread {
  id: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  subjectContext: string;
  studentId: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  online: boolean;
}

export interface SchoolAnnouncement {
  id: string;
  title: string;
  category: 'Notice' | 'Event' | 'Urgent' | 'Academic';
  date: string;
  author: string;
  authorRole: string;
  content: string;
  actionRequired?: string;
  read: boolean;
}

export interface ConferenceSlot {
  id: string;
  teacherName: string;
  subject: string;
  date: string;
  timeSlot: string;
  status: 'available' | 'booked';
  room: string;
}

export interface AbsenceExcuseRequest {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  reason: 'Illness / Medical' | 'Family Emergency' | 'Doctor Appointment' | 'Bereavement' | 'Other';
  note: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Reviewing';
  hasDoctorNoteAttachment: boolean;
}
