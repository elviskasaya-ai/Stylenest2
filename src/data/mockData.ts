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
  AbsenceExcuseRequest
} from '../types';

export const SCHOOL_INFO = {
  name: 'Style Nest Academy',
  crest: '/src/assets/images/stylenest_school_crest_1794385233669.jpg',
  motto: 'Excellence in Action · Inspiring Bright Futures',
  academicYear: '2025–2026',
  currentTerm: 'Term 2 (Spring Session)',
  schoolHours: '08:00 AM – 03:30 PM',
  campusAddress: '450 Innovation Parkway, Oakridge Campus',
  principal: 'Dr. Evelyn Vance, Ed.D',
  attendanceHotline: '(555) 892-4411'
};

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'student-maya',
    name: 'Maya Lin',
    grade: 'Grade 8',
    section: '8-Alpha (Honors)',
    avatar: '/src/assets/images/student_avatar_maya_1794385234499.jpg',
    rollNumber: 'SN-2026-0814',
    homeroomTeacher: 'Ms. Sarah Henderson',
    gpa: 3.92,
    attendanceRate: 98.4,
    status: 'on_campus',
    currentLocation: 'Science Discovery Lab (Room 204)',
    busRoute: 'Bus #14 (North Ridge Express)',
    allergies: 'None recorded',
    emergencyContact: 'Elena Lin (Mother) · (555) 234-9811',
    totalPoints: 2850,
    level: 7
  },
  {
    id: 'student-leo',
    name: 'Leo Lin',
    grade: 'Grade 5',
    section: '5-Beta',
    avatar: '/src/assets/images/student_avatar_leo_1794385236306.jpg',
    rollNumber: 'SN-2026-0522',
    homeroomTeacher: 'Mr. Marcus Alvarez',
    gpa: 3.78,
    attendanceRate: 95.8,
    status: 'on_campus',
    currentLocation: 'Junior Robotics Workshop (Room 108)',
    busRoute: 'Bus #14 (North Ridge Express)',
    allergies: 'Mild peanut sensitivity',
    emergencyContact: 'Elena Lin (Mother) · (555) 234-9811',
    totalPoints: 2240,
    level: 5
  }
];

export const INITIAL_ATTENDANCE_RECORDS: AttendanceRecord[] = [
  {
    id: 'att-01',
    studentId: 'student-maya',
    type: 'check_in',
    title: 'Campus Arrival Verified',
    description: 'RFID ID Card scanned at North Gate security turnstile',
    timestamp: '07:44 AM',
    date: '2026-11-11',
    location: 'North Gate Security Turnstile A2',
    status: 'verified',
    rfidScannerId: 'RFID-GATE-N2'
  },
  {
    id: 'att-02',
    studentId: 'student-maya',
    type: 'bus_boarding',
    title: 'Boarded School Bus #14',
    description: 'Tapped onto morning pickup route at Elm & 7th Avenue',
    timestamp: '07:18 AM',
    date: '2026-11-11',
    location: 'Elm St & 7th Ave Station',
    status: 'verified',
    busNumber: 'Bus #14'
  },
  {
    id: 'att-03',
    studentId: 'student-leo',
    type: 'check_in',
    title: 'Campus Arrival Verified',
    description: 'RFID ID Card scanned at North Gate security turnstile',
    timestamp: '07:45 AM',
    date: '2026-11-11',
    location: 'North Gate Security Turnstile B1',
    status: 'verified',
    rfidScannerId: 'RFID-GATE-N1'
  },
  {
    id: 'att-04',
    studentId: 'student-leo',
    type: 'bus_boarding',
    title: 'Boarded School Bus #14',
    description: 'Tapped onto morning pickup route at Elm & 7th Avenue',
    timestamp: '07:18 AM',
    date: '2026-11-11',
    location: 'Elm St & 7th Ave Station',
    status: 'verified',
    busNumber: 'Bus #14'
  },
  {
    id: 'att-05',
    studentId: 'student-maya',
    type: 'check_out',
    title: 'Afternoon Campus Dismissal',
    description: 'RFID Scanned exit after Varsity Soccer practice',
    timestamp: '04:45 PM',
    date: '2026-11-10',
    location: 'Athletics West Exit Gate',
    status: 'verified',
    rfidScannerId: 'RFID-WEST-01'
  },
  {
    id: 'att-06',
    studentId: 'student-maya',
    type: 'check_in',
    title: 'Campus Arrival Verified',
    description: 'RFID ID Card scanned at North Gate',
    timestamp: '07:42 AM',
    date: '2026-11-10',
    location: 'North Gate Security Turnstile A2',
    status: 'verified',
    rfidScannerId: 'RFID-GATE-N2'
  },
  {
    id: 'att-07',
    studentId: 'student-leo',
    type: 'period_tardy',
    title: 'Late to Period 2 (Library)',
    description: 'Arrived 6 minutes after second bell (Hall pass presented)',
    timestamp: '09:06 AM',
    date: '2026-11-09',
    location: 'Main Learning Commons',
    status: 'excused'
  },
  {
    id: 'att-08',
    studentId: 'student-maya',
    type: 'excused_absence',
    title: 'Excused Absence (Dentist Appt)',
    description: 'Doctor verification letter approved by Dean of Students',
    timestamp: '08:00 AM',
    date: '2026-11-05',
    location: 'Off Campus',
    status: 'excused'
  }
];

export const INITIAL_SUBJECTS_MAYA: Subject[] = [
  {
    id: 'subj-math-8',
    studentId: 'student-maya',
    name: 'Advanced Algebra I Honors',
    code: 'MTH-801',
    teacher: 'Ms. Sarah Henderson',
    teacherEmail: 's.henderson@stylenest.edu',
    room: 'Room 302',
    currentPercentage: 96,
    letterGrade: 'A',
    gpaPoint: 4.0,
    trend: 'up',
    period: 'Period 1 · 08:15 AM - 09:10 AM',
    assignments: [
      { id: 'asg-1', title: 'Quadratic Equations Midterm', type: 'Exam', score: 98, maxScore: 100, date: 'Nov 06, 2026', feedback: 'Flawless parabolic proof derivation!', completed: true },
      { id: 'asg-2', title: 'Polynomial Factoring Lab', type: 'Project', score: 95, maxScore: 100, date: 'Oct 28, 2026', feedback: 'Thorough step breakdown and neat presentation.', completed: true },
      { id: 'asg-3', title: 'Linear Inequality Problem Set', type: 'Homework', score: 20, maxScore: 20, date: 'Oct 20, 2026', completed: true },
      { id: 'asg-4', title: 'Graphing Functions Pop Quiz', type: 'Quiz', score: 19, maxScore: 20, date: 'Oct 14, 2026', completed: true }
    ]
  },
  {
    id: 'subj-sci-8',
    studentId: 'student-maya',
    name: 'Integrated Physical Science & Robotics',
    code: 'SCI-802',
    teacher: 'Mr. Marcus Alvarez',
    teacherEmail: 'm.alvarez@stylenest.edu',
    room: 'Room 204',
    currentPercentage: 94,
    letterGrade: 'A',
    gpaPoint: 4.0,
    trend: 'up',
    period: 'Period 2 · 09:15 AM - 10:10 AM',
    assignments: [
      { id: 'asg-5', title: 'Newtonian Dynamics Mechanics Test', type: 'Exam', score: 92, maxScore: 100, date: 'Nov 04, 2026', feedback: 'Great grasp on friction coefficients.', completed: true },
      { id: 'asg-6', title: 'Kinematics Track Experiment', type: 'Lab', score: 48, maxScore: 50, date: 'Oct 29, 2026', completed: true },
      { id: 'asg-7', title: 'Robotics Servo Controller Design', type: 'Project', score: 98, maxScore: 100, date: 'Oct 18, 2026', completed: true }
    ]
  },
  {
    id: 'subj-eng-8',
    studentId: 'student-maya',
    name: 'Literary Analysis & Composition',
    code: 'ENG-801',
    teacher: 'Mrs. Eleanor Vance',
    teacherEmail: 'e.vance@stylenest.edu',
    room: 'Room 114',
    currentPercentage: 91,
    letterGrade: 'A-',
    gpaPoint: 3.7,
    trend: 'steady',
    period: 'Period 3 · 10:25 AM - 11:20 AM',
    assignments: [
      { id: 'asg-8', title: 'Comparative Theme Essay (To Kill a Mockingbird)', type: 'Project', score: 90, maxScore: 100, date: 'Nov 02, 2026', feedback: 'Compelling thesis. Work on transitions in paragraph 4.', completed: true },
      { id: 'asg-9', title: 'Rhetorical Devices Vocabulary Quiz', type: 'Quiz', score: 18, maxScore: 20, date: 'Oct 23, 2026', completed: true }
    ]
  },
  {
    id: 'subj-hist-8',
    studentId: 'student-maya',
    name: 'World Civilizations & Modern History',
    code: 'SOC-801',
    teacher: 'Mr. Arthur Jenkins',
    teacherEmail: 'a.jenkins@stylenest.edu',
    room: 'Room 210',
    currentPercentage: 89,
    letterGrade: 'B+',
    gpaPoint: 3.3,
    trend: 'up',
    period: 'Period 4 · 11:25 AM - 12:20 PM',
    assignments: [
      { id: 'asg-10', title: 'Industrial Revolution Primary Source Analysis', type: 'Homework', score: 28, maxScore: 30, date: 'Nov 05, 2026', completed: true },
      { id: 'asg-11', title: 'Silk Road Trade Simulation', type: 'Project', score: 90, maxScore: 100, date: 'Oct 22, 2026', completed: true }
    ]
  },
  {
    id: 'subj-art-8',
    studentId: 'student-maya',
    name: 'Digital Design & UI Architecture',
    code: 'ART-805',
    teacher: 'Ms. Clara Song',
    teacherEmail: 'c.song@stylenest.edu',
    room: 'Media Lab 102',
    currentPercentage: 97,
    letterGrade: 'A+',
    gpaPoint: 4.0,
    trend: 'steady',
    period: 'Period 5 · 01:05 PM - 02:00 PM',
    assignments: [
      { id: 'asg-12', title: 'Community App Wireframing', type: 'Project', score: 100, maxScore: 100, date: 'Nov 08, 2026', feedback: 'Exceptional clarity and typography hierarchy!', completed: true }
    ]
  },
  {
    id: 'subj-pe-8',
    studentId: 'student-maya',
    name: 'Physical Conditioning & Team Athletics',
    code: 'PED-801',
    teacher: 'Coach David Daniels',
    teacherEmail: 'd.daniels@stylenest.edu',
    room: 'Gymnasium & Field',
    currentPercentage: 99,
    letterGrade: 'A+',
    gpaPoint: 4.0,
    trend: 'steady',
    period: 'Period 6 · 02:05 PM - 03:00 PM',
    assignments: [
      { id: 'asg-13', title: 'Cardio Fitness Pacer Benchmark', type: 'Exam', score: 50, maxScore: 50, date: 'Nov 01, 2026', completed: true }
    ]
  }
];

export const INITIAL_SUBJECTS_LEO: Subject[] = [
  {
    id: 'subj-math-5',
    studentId: 'student-leo',
    name: 'Elementary Mathematics & Logic',
    code: 'MTH-501',
    teacher: 'Mr. Marcus Alvarez',
    teacherEmail: 'm.alvarez@stylenest.edu',
    room: 'Room 108',
    currentPercentage: 93,
    letterGrade: 'A',
    gpaPoint: 4.0,
    trend: 'up',
    period: 'Period 1 · 08:30 AM - 09:30 AM',
    assignments: [
      { id: 'asg-l1', title: 'Fractions & Decimals Unit Assessment', type: 'Exam', score: 92, maxScore: 100, date: 'Nov 07, 2026', feedback: 'Very strong calculation speed!', completed: true },
      { id: 'asg-l2', title: 'Geometry Angle Quest', type: 'Project', score: 48, maxScore: 50, date: 'Oct 30, 2026', completed: true }
    ]
  },
  {
    id: 'subj-sci-5',
    studentId: 'student-leo',
    name: 'Junior Earth & Space Sciences',
    code: 'SCI-501',
    teacher: 'Mrs. Hannah Cole',
    teacherEmail: 'h.cole@stylenest.edu',
    room: 'Room 110',
    currentPercentage: 96,
    letterGrade: 'A',
    gpaPoint: 4.0,
    trend: 'steady',
    period: 'Period 2 · 09:40 AM - 10:40 AM',
    assignments: [
      { id: 'asg-l3', title: 'Solar System Planetary Scale Model', type: 'Project', score: 98, maxScore: 100, date: 'Nov 03, 2026', feedback: 'Outstanding enthusiasm during presentations.', completed: true }
    ]
  },
  {
    id: 'subj-eng-5',
    studentId: 'student-leo',
    name: 'Language Arts & Creative Storytelling',
    code: 'ENG-501',
    teacher: 'Mr. Marcus Alvarez',
    teacherEmail: 'm.alvarez@stylenest.edu',
    room: 'Room 108',
    currentPercentage: 88,
    letterGrade: 'B+',
    gpaPoint: 3.3,
    trend: 'up',
    period: 'Period 3 · 10:55 AM - 11:55 AM',
    assignments: [
      { id: 'asg-l4', title: 'Fantasy Adventure Short Story', type: 'Homework', score: 88, maxScore: 100, date: 'Nov 05, 2026', completed: true }
    ]
  }
];

export const INITIAL_ACTIVITY_CATEGORIES: ActivityCategory[] = [
  { id: 'cat-stem', name: 'STEM & Robotics', color: 'indigo', isCustom: false },
  { id: 'cat-ath', name: 'Athletics', color: 'emerald', isCustom: false },
  { id: 'cat-art', name: 'Arts & Music', color: 'purple', isCustom: false },
  { id: 'cat-lead', name: 'Leadership & Service', color: 'amber', isCustom: false },
  { id: 'cat-debate', name: 'Debate Club Practice', color: 'blue', isCustom: true, createdBy: 'Faculty Team' },
  { id: 'cat-training', name: 'Sports Training', color: 'rose', isCustom: true, createdBy: 'Athletics Dept' },
  { id: 'cat-volunteer', name: 'Volunteer Work', color: 'teal', isCustom: true, createdBy: 'Community Council' },
  { id: 'cat-tutoring', name: 'Peer Tutoring', color: 'sky', isCustom: true, createdBy: 'Honors Society' }
];

export const INITIAL_ACTIVITIES: Activity[] = [
  {
    id: 'act-1',
    studentId: 'student-maya',
    name: 'FIRST LEGO & VEX Robotics Club',
    category: 'STEM & Robotics',
    role: 'Lead Autonomous Systems Programmer',
    schedule: 'Tuesdays & Thursdays · 03:45 PM - 05:15 PM',
    nextSession: 'Thursday, 03:45 PM in Tech Lab',
    progressPercent: 92,
    coachName: 'Mr. Marcus Alvarez',
    recentAchievement: '1st Place Regional Autonomous Line Tracking Challenge',
    badges: ['State Qualifier 2026', 'Code Wizard', 'Hardware MVP'],
    hoursLogged: 36
  },
  {
    id: 'act-2',
    studentId: 'student-maya',
    name: 'Varsity Girls Soccer',
    category: 'Sports Training',
    role: 'Team Co-Captain / Midfielder #7',
    schedule: 'Mondays, Wednesdays & Fridays · 03:45 PM - 05:30 PM',
    nextSession: 'Wednesday, 03:45 PM on Turf Field 1',
    progressPercent: 88,
    coachName: 'Coach David Daniels',
    recentAchievement: 'Clean Sheet Victory vs. Crestview Academy (3-0)',
    badges: ['Captain 2026', 'Sportsmanship Award', 'Iron Lung 5K'],
    hoursLogged: 44
  },
  {
    id: 'act-3',
    studentId: 'student-maya',
    name: 'Oakridge Community Youth Kitchen',
    category: 'Volunteer Work',
    role: 'Weekend Volunteer Coordinator',
    schedule: 'Saturdays · 09:30 AM - 12:30 PM',
    nextSession: 'Saturday, 09:30 AM at Central Community Hall',
    progressPercent: 80,
    coachName: 'Director Sarah Vance',
    recentAchievement: 'Served 250 meals during Fall Community Drive',
    badges: ['Service Star', 'Community Builder'],
    hoursLogged: 22
  },
  {
    id: 'act-4',
    studentId: 'student-maya',
    name: 'Model United Nations & Debate',
    category: 'Debate Club Practice',
    role: 'Delegate representing France',
    schedule: 'Wednesdays · 12:30 PM - 01:00 PM',
    nextSession: 'Next Wednesday in Room 210',
    progressPercent: 78,
    coachName: 'Mr. Arthur Jenkins',
    recentAchievement: 'Outstanding Position Paper Commendation',
    badges: ['Persuasive Speaker', 'Research Scholar'],
    hoursLogged: 16
  },
  {
    id: 'act-5',
    studentId: 'student-leo',
    name: 'Junior Scratch Coding & LEGO Gears',
    category: 'STEM & Robotics',
    role: 'Robotics Builder',
    schedule: 'Tuesdays · 03:30 PM - 04:30 PM',
    nextSession: 'Tomorrow, 03:30 PM in Room 108',
    progressPercent: 85,
    coachName: 'Mr. Marcus Alvarez',
    recentAchievement: 'Built Solar Powered Rover prototype',
    badges: ['Curious Builder', 'Team Player'],
    hoursLogged: 18
  },
  {
    id: 'act-6',
    studentId: 'student-leo',
    name: 'Academy Swim Team (Dolphins)',
    category: 'Sports Training',
    role: 'Freestyle & Breaststroke Sprinter',
    schedule: 'Mondays & Thursdays · 03:45 PM - 04:45 PM',
    nextSession: 'Thursday, 03:45 PM at Aquatics Center',
    progressPercent: 80,
    coachName: 'Coach Lisa Weber',
    recentAchievement: 'Set personal best in 50m Freestyle (34.2s)',
    badges: ['Aqua Star', 'Relay Champion'],
    hoursLogged: 26
  }
];

export const INITIAL_SCHOOL_EVENTS: SchoolEvent[] = [
  {
    id: 'ev-1',
    title: 'Term 2 Midterm Mathematics Examination',
    category: 'Exam',
    date: '2026-11-16',
    time: '08:30 AM - 10:30 AM',
    location: 'Main Examination Hall A & Room 302',
    description: 'Comprehensive assessment on Quadratic Functions, Polynomial Factoring, and Rational Equations. Graphing calculators permitted.',
    audience: 'students',
    addedBy: 'Ms. Sarah Henderson',
    authorRole: 'teacher',
    rsvpCount: 64,
    userRsvp: true
  },
  {
    id: 'ev-2',
    title: 'Varsity Girls Soccer District Quarterfinal vs Crestview',
    category: 'Athletics',
    date: '2026-11-17',
    time: '04:00 PM - 06:00 PM',
    location: 'Oakridge West Turf Stadium',
    description: 'Playoffs opening round. Student body spirit rally at 03:30 PM. Concession stands will benefit the Athletics booster fund.',
    audience: 'all',
    addedBy: 'Coach David Daniels',
    authorRole: 'teacher',
    rsvpCount: 142,
    userRsvp: true
  },
  {
    id: 'ev-3',
    title: 'Term 2 Parent-Teacher Advisory Conferences',
    category: 'Meeting',
    date: '2026-11-18',
    time: '03:30 PM - 07:00 PM',
    location: 'Academic Building A (Rooms 101–305)',
    description: 'One-on-one 20-minute conferences with homeroom and subject instructors. Book your priority slot via the portal.',
    audience: 'parents',
    addedBy: 'Academic Dean Office',
    authorRole: 'admin',
    rsvpCount: 88,
    userRsvp: true
  },
  {
    id: 'ev-4',
    title: 'Integrated Physical Science & Robotics Practical Lab',
    category: 'Exam',
    date: '2026-11-19',
    time: '10:00 AM - 11:45 AM',
    location: 'Science Discovery Lab 204',
    description: 'Hands-on laboratory testing kinematics sensors and servo feedback loop calibrations.',
    audience: 'students',
    addedBy: 'Mr. Marcus Alvarez',
    authorRole: 'teacher',
    rsvpCount: 28,
    userRsvp: true
  },
  {
    id: 'ev-5',
    title: 'PTA General Assembly & Campus Safety Townhall',
    category: 'Meeting',
    date: '2026-11-20',
    time: '06:00 PM - 07:30 PM',
    location: 'Central Performing Arts Auditorium',
    description: 'Review of winter transportation routes, campus safety protocols, and upcoming fundraising drives. Refreshments served.',
    audience: 'parents',
    addedBy: 'Parent Teacher Association',
    authorRole: 'parent',
    rsvpCount: 75,
    userRsvp: false
  },
  {
    id: 'ev-6',
    title: 'Annual STEM Innovation Fair & Robotics Showcase',
    category: 'School Event',
    date: '2026-11-21',
    time: '01:00 PM - 04:30 PM',
    location: 'Main Gymnasium & Robotics Arena',
    description: 'Grades 5 through 12 showcase original robotics prototypes, environmental inventions, and interactive software demos.',
    audience: 'all',
    addedBy: 'Dr. Evelyn Vance, Head of School',
    authorRole: 'admin',
    rsvpCount: 210,
    userRsvp: true
  },
  {
    id: 'ev-7',
    title: 'Thanksgiving Recess — Campus Closed',
    category: 'Holiday',
    date: '2026-11-26',
    time: 'All Day',
    location: 'All Campuses Closed',
    description: 'School holiday observance. No classes or after-school practices. Campus reopens Monday, November 30.',
    audience: 'all',
    addedBy: 'School District Office',
    authorRole: 'admin',
    rsvpCount: 0,
    userRsvp: false
  },
  {
    id: 'ev-8',
    title: 'Thanksgiving Recess — Day 2',
    category: 'Holiday',
    date: '2026-11-27',
    time: 'All Day',
    location: 'All Campuses Closed',
    description: 'Holiday continuation. Normal bus schedules resume Monday.',
    audience: 'all',
    addedBy: 'School District Office',
    authorRole: 'admin',
    rsvpCount: 0,
    userRsvp: false
  },
  {
    id: 'ev-9',
    title: 'Junior Academy Winter Choir & Orchestra Concert',
    category: 'Arts',
    date: '2026-12-04',
    time: '07:00 PM - 08:45 PM',
    location: 'Auditorium Stage',
    description: 'Featuring the Style Nest Symphony Orchestra and Middle School Harmony Ensemble. Open to all family and friends.',
    audience: 'all',
    addedBy: 'Music & Performing Arts Guild',
    authorRole: 'teacher',
    rsvpCount: 165,
    userRsvp: false
  }
];

export const INITIAL_GAMIFICATION_BADGES: GamificationBadge[] = [
  {
    id: 'badge-attendance',
    name: 'Perfect Attendance',
    category: 'attendance',
    description: 'Attended 14 consecutive school days on-time with zero unexcused absences.',
    icon: 'ShieldCheck',
    unlocked: true,
    unlockedAt: 'Nov 10, 2026',
    progress: 100,
    targetLabel: '14 / 14 Days Active',
    pointsReward: 150
  },
  {
    id: 'badge-honor-roll',
    name: 'Honor Roll Scholar',
    category: 'academic',
    description: 'Maintained a cumulative Grade Point Average of 3.80 or higher in Term 2.',
    icon: 'GraduationCap',
    unlocked: true,
    unlockedAt: 'Nov 04, 2026',
    progress: 100,
    targetLabel: 'GPA 3.92 / 4.00',
    pointsReward: 250
  },
  {
    id: 'badge-stem-prodigy',
    name: 'STEM Prodigy',
    category: 'activity',
    description: 'Achieved 95%+ in Science Lab Experiment & Robotics Autonomous Systems.',
    icon: 'Cpu',
    unlocked: true,
    unlockedAt: 'Oct 29, 2026',
    progress: 100,
    targetLabel: '98% Lab Score',
    pointsReward: 200
  },
  {
    id: 'badge-homework-hero',
    name: 'Homework Hero',
    category: 'academic',
    description: 'Submitted 10 homework assignments before due dates with top ratings.',
    icon: 'BookOpen',
    unlocked: true,
    unlockedAt: 'Nov 06, 2026',
    progress: 100,
    targetLabel: '10 / 10 Submitted',
    pointsReward: 100
  },
  {
    id: 'badge-volunteer',
    name: 'Community Pillar',
    category: 'activity',
    description: 'Log 25+ hours in Volunteer Work or Community Service activities.',
    icon: 'HeartHandshake',
    unlocked: false,
    progress: 88,
    targetLabel: '22 / 25 Hours Logged',
    pointsReward: 300
  },
  {
    id: 'badge-sports-champ',
    name: 'Athletic Champion',
    category: 'activity',
    description: 'Demonstrated sportsmanship, teamwork, and clean sheet performance in varsity match.',
    icon: 'Trophy',
    unlocked: true,
    unlockedAt: 'Nov 08, 2026',
    progress: 100,
    targetLabel: 'Co-Captain MVP',
    pointsReward: 150
  }
];

export const INITIAL_LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    studentId: 'student-maya',
    name: 'Maya Lin',
    grade: 'Grade 8 (Honors)',
    avatar: '/src/assets/images/student_avatar_maya_1794385234499.jpg',
    points: 2850,
    level: 7,
    levelTitle: 'Master Scholar',
    streakDays: 14,
    badgesCount: 5,
    isCurrentUser: true
  },
  {
    rank: 2,
    studentId: 'st-liam',
    name: 'Liam Taylor',
    grade: 'Grade 8',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80',
    points: 2720,
    level: 7,
    levelTitle: 'Master Scholar',
    streakDays: 12,
    badgesCount: 4,
    isCurrentUser: false
  },
  {
    rank: 3,
    studentId: 'st-zoe',
    name: 'Zoe Zhang',
    grade: 'Grade 8',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    points: 2640,
    level: 6,
    levelTitle: 'Academic Explorer',
    streakDays: 15,
    badgesCount: 4,
    isCurrentUser: false
  },
  {
    rank: 4,
    studentId: 'st-emma',
    name: 'Emma Davis',
    grade: 'Grade 8',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    points: 2490,
    level: 6,
    levelTitle: 'Academic Explorer',
    streakDays: 9,
    badgesCount: 3,
    isCurrentUser: false
  },
  {
    rank: 5,
    studentId: 'st-caleb',
    name: 'Caleb Rivera',
    grade: 'Grade 8',
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=120&q=80',
    points: 2380,
    level: 5,
    levelTitle: 'Rising Pathfinder',
    streakDays: 8,
    badgesCount: 3,
    isCurrentUser: false
  },
  {
    rank: 6,
    studentId: 'student-leo',
    name: 'Leo Lin',
    grade: 'Grade 5',
    avatar: '/src/assets/images/student_avatar_leo_1794385236306.jpg',
    points: 2240,
    level: 5,
    levelTitle: 'Rising Pathfinder',
    streakDays: 11,
    badgesCount: 3,
    isCurrentUser: false
  },
  {
    rank: 7,
    studentId: 'st-oliver',
    name: 'Oliver White',
    grade: 'Grade 8',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    points: 2150,
    level: 5,
    levelTitle: 'Rising Pathfinder',
    streakDays: 6,
    badgesCount: 2,
    isCurrentUser: false
  }
];

export const INITIAL_POINT_TRANSACTIONS: PointTransaction[] = [
  {
    id: 'tx-1',
    title: 'Daily RFID Gate On-Time Check-In',
    points: 30,
    timestamp: 'Today · 07:44 AM',
    type: 'attendance',
    studentId: 'student-maya'
  },
  {
    id: 'tx-2',
    title: 'Quadratic Equations Midterm (Score 98%)',
    points: 100,
    timestamp: 'Nov 06, 2026',
    type: 'grade',
    studentId: 'student-maya'
  },
  {
    id: 'tx-3',
    title: 'Newtonian Dynamics Mechanics Test (Score 92%)',
    points: 75,
    timestamp: 'Nov 04, 2026',
    type: 'grade',
    studentId: 'student-maya'
  },
  {
    id: 'tx-4',
    title: 'FIRST LEGO Robotics Autonomous Code Completed',
    points: 50,
    timestamp: 'Nov 02, 2026',
    type: 'activity',
    studentId: 'student-maya'
  },
  {
    id: 'tx-5',
    title: 'Varsity Soccer Clean Sheet Victory vs Crestview',
    points: 60,
    timestamp: 'Oct 30, 2026',
    type: 'activity',
    studentId: 'student-maya'
  }
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: 'thread-henderson',
    participantName: 'Ms. Sarah Henderson',
    participantRole: 'Homeroom & Math Teacher (Grade 8)',
    participantAvatar: '/src/assets/images/teacher_avatar_henderson_1794385238313.jpg',
    subjectContext: 'Algebra Honors & Academic Progress',
    studentId: 'student-maya',
    lastMessage: 'Maya did fantastic on the quadratic equations midterm today!',
    lastTimestamp: '10:45 AM',
    unreadCount: 1,
    online: true
  },
  {
    id: 'thread-alvarez',
    participantName: 'Mr. Marcus Alvarez',
    participantRole: 'Robotics Coach & Science Lead',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
    subjectContext: 'State Robotics Championship & Equipment',
    studentId: 'student-maya',
    lastMessage: 'The autonomous sensor code tested cleanly on the mock arena.',
    lastTimestamp: 'Yesterday',
    unreadCount: 0,
    online: false
  },
  {
    id: 'thread-daniels',
    participantName: 'Coach David Daniels',
    participantRole: 'Varsity Soccer & Physical Education',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
    subjectContext: 'District Quarterfinals Schedule',
    studentId: 'student-maya',
    lastMessage: 'Bus departure for Friday match is moved to 02:45 PM.',
    lastTimestamp: 'Nov 09',
    unreadCount: 0,
    online: true
  }
];

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  'thread-henderson': [
    {
      id: 'msg-1',
      threadId: 'thread-henderson',
      senderId: 'parent-1',
      senderName: 'Elena Lin',
      senderRole: 'parent',
      senderAvatar: '/src/assets/images/student_avatar_maya_1794385234499.jpg',
      text: 'Good morning Ms. Henderson! Just checking in regarding Maya\'s preparations for the regional math olympiad next month.',
      timestamp: '08:32 AM',
      read: true
    },
    {
      id: 'msg-2',
      threadId: 'thread-henderson',
      senderId: 'teacher-henderson',
      senderName: 'Ms. Sarah Henderson',
      senderRole: 'teacher',
      senderAvatar: '/src/assets/images/teacher_avatar_henderson_1794385238313.jpg',
      text: 'Good morning Mrs. Lin! Maya is fully on track. We worked on polynomial proofs during tutorial hour and she grasped the concept immediately.',
      timestamp: '09:15 AM',
      read: true
    },
    {
      id: 'msg-3',
      threadId: 'thread-henderson',
      senderId: 'teacher-henderson',
      senderName: 'Ms. Sarah Henderson',
      senderRole: 'teacher',
      senderAvatar: '/src/assets/images/teacher_avatar_henderson_1794385238313.jpg',
      text: 'Maya did fantastic on the quadratic equations midterm today! She scored 98% with an extra credit proof.',
      timestamp: '10:45 AM',
      read: false
    }
  ],
  'thread-alvarez': [
    {
      id: 'msg-4',
      threadId: 'thread-alvarez',
      senderId: 'teacher-alvarez',
      senderName: 'Mr. Marcus Alvarez',
      senderRole: 'teacher',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
      text: 'Hello Mrs. Lin! The autonomous sensor code tested cleanly on the mock arena. We are ready for state qualifiers.',
      timestamp: 'Yesterday 04:30 PM',
      read: true
    }
  ]
};

export const INITIAL_ANNOUNCEMENTS: SchoolAnnouncement[] = [
  {
    id: 'ann-1',
    title: 'Term 2 Parent-Teacher Conferences Open for Booking',
    category: 'Academic',
    date: 'Nov 10, 2026',
    author: 'Academic Dean Office',
    authorRole: 'Administration',
    content: 'Booking slots for the upcoming Fall Parent-Teacher Conferences are now open. Meetings will take place November 18–19 with options for in-person in Room 302 or virtual conference via Google Meet.',
    actionRequired: 'Book Conference Slot',
    read: false
  },
  {
    id: 'ann-2',
    title: 'Campus Winter Weather Preparedness & Bus Route Tracking',
    category: 'Urgent',
    date: 'Nov 08, 2026',
    author: 'Student Transportation Services',
    authorRole: 'Operations',
    content: 'All morning and afternoon bus routes (Bus #11 through #24) are now integrated with live GPS beacons. Parents can monitor arrival timestamps directly in Style Nest real-time alerts.',
    read: true
  },
  {
    id: 'ann-3',
    title: 'Annual STEM Innovation Fair & Robotics Showcase',
    category: 'Event',
    date: 'Nov 04, 2026',
    author: 'Science Department',
    authorRole: 'Faculty',
    content: 'Students from Grades 5 to 12 will present their capstone STEM prototypes on Friday, November 21st from 01:00 PM to 04:00 PM in the Main Gymnasium. Families are cordially invited!',
    read: true
  }
];

export const INITIAL_CONFERENCES: ConferenceSlot[] = [
  {
    id: 'conf-1',
    teacherName: 'Ms. Sarah Henderson',
    subject: 'Honors Mathematics & Homeroom Advisory',
    date: 'Wednesday, Nov 18, 2026',
    timeSlot: '03:45 PM – 04:05 PM',
    status: 'booked',
    room: 'Room 302 (Building A)'
  },
  {
    id: 'conf-2',
    teacherName: 'Mr. Marcus Alvarez',
    subject: 'Integrated Physical Science & Robotics',
    date: 'Thursday, Nov 19, 2026',
    timeSlot: '04:15 PM – 04:35 PM',
    status: 'available',
    room: 'Science Lab 204'
  },
  {
    id: 'conf-3',
    teacherName: 'Mrs. Eleanor Vance',
    subject: 'Literary Composition & Critical Reading',
    date: 'Thursday, Nov 19, 2026',
    timeSlot: '05:00 PM – 05:20 PM',
    status: 'available',
    room: 'Room 114 (Building B)'
  }
];

export const INITIAL_EXCUSES: AbsenceExcuseRequest[] = [
  {
    id: 'exc-1',
    studentId: 'student-maya',
    studentName: 'Maya Lin',
    date: '2026-11-05',
    reason: 'Doctor Appointment',
    note: 'Orthodontic adjustment and routine cleaning at Oakridge Dental Care.',
    submittedAt: 'Nov 04, 2026 · 06:30 PM',
    status: 'Approved',
    hasDoctorNoteAttachment: true
  }
];
