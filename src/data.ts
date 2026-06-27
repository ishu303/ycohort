export interface ExamTwin {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarBg: string;
  matchPercentage: number;
  distance: string;
  exam: string;
  helpWithTopic: string;
  strongSubject: string;
  needHelpWithTopic: string;
  weakSubject: string;
  peerStreak: number;
  helpsYouScore: number;
}

export interface StudyRoom {
  id: string;
  name: string;
  exam: string;
  subject: string;
  topic: string;
  studyingCount: number;
  maxCount: number;
  activeSpeakers: {
    name: string;
    avatar: string;
    avatarBg: string;
    isSpeaking: boolean;
    role: string;
  }[];
}

export interface LeaderboardUser {
  id: string;
  name: string;
  username: string;
  points: number;
  avatar: string;
  avatarBg: string;
  badge: string;
  isCurrentUser?: boolean;
}

export interface StudyBuddy {
  id: string;
  name: string;
  username: string;
  avatar: string;
  avatarBg: string;
  similarityScore: number;
  targetExam: string;
  activeTopic: string;
  studyHabit: string; // e.g. "Early Bird", "Night Owl", "Weekend Warrior"
  matchReason: string;
  status: "Online" | "Offline" | "Studying";
}

export const initialTwins: ExamTwin[] = [
  {
    id: "1",
    name: "Ishu Singh",
    username: "@ishu_new",
    avatar: "I",
    avatarBg: "bg-amber-800",
    matchPercentage: 92,
    distance: "within 2 km",
    exam: "JEE (Advanced)",
    helpWithTopic: "Rotational Mechanics (Torque & MOI)",
    strongSubject: "Physics",
    needHelpWithTopic: "Definite integration of non-symmetric structures",
    weakSubject: "Mathematics",
    peerStreak: 12,
    helpsYouScore: 30,
  },
  {
    id: "2",
    name: "Aditya Verma",
    username: "@aditya_v",
    avatar: "A",
    avatarBg: "bg-indigo-800",
    matchPercentage: 88,
    distance: "within 5 km",
    exam: "NEET (Medical)",
    helpWithTopic: "Prophase I Meiosis stage mnemonics",
    strongSubject: "Biology",
    needHelpWithTopic: "Weak acid buffer pH Henderson formulas",
    weakSubject: "Chemistry",
    peerStreak: 8,
    helpsYouScore: 45,
  },
  {
    id: "3",
    name: "Meera Nair",
    username: "@meera_n",
    avatar: "M",
    avatarBg: "bg-emerald-800",
    matchPercentage: 84,
    distance: "within 10 km",
    exam: "UPSC (Civil Services)",
    helpWithTopic: "Kesavananda Bharati basic structure timeline",
    strongSubject: "Polity",
    needHelpWithTopic: "Commercial lending CRR/SLR mechanics",
    weakSubject: "Economics",
    peerStreak: 15,
    helpsYouScore: 35,
  },
  {
    id: "4",
    name: "Anjali Mehta",
    username: "@anj_m",
    avatar: "A",
    avatarBg: "bg-rose-800",
    matchPercentage: 79,
    distance: "within 20 km",
    exam: "SAT / GRE",
    helpWithTopic: "Sentence equivalence vocabulary",
    strongSubject: "Verbal Tactics",
    needHelpWithTopic: "Overlapping circles probability geometry",
    weakSubject: "Mathematics",
    peerStreak: 5,
    helpsYouScore: 40,
  }
];

export const initialRooms: StudyRoom[] = [
  {
    id: "room-1",
    name: "Newton's Cradle",
    exam: "JEE (Advanced)",
    subject: "Physics",
    topic: "Moment of Inertia Integration limits",
    studyingCount: 4,
    maxCount: 12,
    activeSpeakers: [
      { name: "Ishu Singh", avatar: "I", avatarBg: "bg-amber-800", isSpeaking: true, role: "Calculus Mentor" },
      { name: "Mateo", avatar: "M", avatarBg: "bg-blue-800", isSpeaking: false, role: "Physics Seeker" },
      { name: "Sofia", avatar: "S", avatarBg: "bg-purple-800", isSpeaking: true, role: "Maths Expert" },
      { name: "You", avatar: "R", avatarBg: "bg-slate-700", isSpeaking: false, role: "Aspirant" }
    ]
  },
  {
    id: "room-2",
    name: "DNA Helix Lounge",
    exam: "NEET (Medical)",
    subject: "Biology",
    topic: "Recombination & Crossing Over in Meiosis",
    studyingCount: 3,
    maxCount: 8,
    activeSpeakers: [
      { name: "Aditya Verma", avatar: "Y", avatarBg: "bg-indigo-800", isSpeaking: true, role: "Bio Ranker" },
      { name: "Sora", avatar: "S", avatarBg: "bg-pink-800", isSpeaking: false, role: "Anatomy Peer" },
      { name: "You", avatar: "R", avatarBg: "bg-slate-700", isSpeaking: false, role: "Aspirant" }
    ]
  },
  {
    id: "room-3",
    name: "Chanakya's Court",
    exam: "UPSC (Civil Services)",
    subject: "Polity",
    topic: "Judicial Review boundaries & basic structure",
    studyingCount: 1,
    maxCount: 6,
    activeSpeakers: [
      { name: "Meera Nair", avatar: "L", avatarBg: "bg-emerald-800", isSpeaking: false, role: "Polity Mentor" }
    ]
  }
];

export const initialLeaderboard: LeaderboardUser[] = [
  { id: "lead-1", name: "Ishu Singh", username: "@ishu_new", points: 15, avatar: "I", avatarBg: "bg-amber-800", badge: "Calculus Master" },
  { id: "lead-2", name: "Rama (you)", username: "@rama", points: 10, avatar: "R", avatarBg: "bg-slate-700", badge: "Consistent Rookie", isCurrentUser: true },
  { id: "lead-3", name: "Meera Nair", username: "@meera_n", points: 5, avatar: "M", avatarBg: "bg-purple-800", badge: "Polity Captain" },
  { id: "lead-4", name: "Aditya Verma", username: "@aditya_v", points: 5, avatar: "A", avatarBg: "bg-indigo-800", badge: "Bio Crusader" },
  { id: "lead-5", name: "Anjali Mehta", username: "@anj_m", points: 5, avatar: "A", avatarBg: "bg-rose-800", badge: "GRE Ninja" },
  { id: "lead-6", name: "Nilaksh", username: "@nilaksh", points: 5, avatar: "N", avatarBg: "bg-teal-800", badge: "Chemistry Wiz" }
];

export const mockWeaknessMatchups = [
  {
    seeker: "JEE (Advanced) Seeker",
    weakSubject: "Rotational Mechanics",
    strongSubject: "Calculus",
    reciprocity: "98% Sync"
  },
  {
    seeker: "NEET (Medical) Seeker",
    weakSubject: "Organic Mechanisms",
    strongSubject: "Genetics & Meiosis",
    reciprocity: "94% Sync"
  },
  {
    seeker: "UPSC Civil Seeker",
    weakSubject: "Modern India History",
    strongSubject: "Indian Constitution",
    reciprocity: "91% Sync"
  },
  {
    seeker: "SAT / GRE Seeker",
    weakSubject: "Overlapping Probability",
    strongSubject: "Verbal Analogies",
    reciprocity: "89% Sync"
  }
];

export const initialStudyBuddies: StudyBuddy[] = [
  {
    id: "sb-1",
    name: "Devansh Roy",
    username: "@dev_codes",
    avatar: "D",
    avatarBg: "bg-sky-700",
    similarityScore: 97,
    targetExam: "JEE (Advanced)",
    activeTopic: "Rotational Mechanics (Torque)",
    studyHabit: "Night Owl",
    matchReason: "Also studying Rotational Mechanics right now & active past midnight",
    status: "Studying"
  },
  {
    id: "sb-2",
    name: "Riya Sharma",
    username: "@riya_neet",
    avatar: "R",
    avatarBg: "bg-fuchsia-700",
    similarityScore: 94,
    targetExam: "NEET (Medical)",
    activeTopic: "Organic chemistry naming rules",
    studyHabit: "Early Bird",
    matchReason: "Shares same weak chapters & study schedule",
    status: "Online"
  },
  {
    id: "sb-3",
    name: "Rahul Verma",
    username: "@rahul_v",
    avatar: "R",
    avatarBg: "bg-amber-700",
    similarityScore: 91,
    targetExam: "UPSC (Civil Services)",
    activeTopic: "Modern History and timelines",
    studyHabit: "Weekend Warrior",
    matchReason: "Matches your exact study intensity metrics & exam focus",
    status: "Offline"
  },
  {
    id: "sb-4",
    name: "Karan Johar",
    username: "@karan_gre",
    avatar: "K",
    avatarBg: "bg-teal-700",
    similarityScore: 88,
    targetExam: "SAT / GRE",
    activeTopic: "Sentence equivalence vocab drill",
    studyHabit: "Early Bird",
    matchReason: "Practicing the same verbal cards currently",
    status: "Studying"
  },
  {
    id: "sb-5",
    name: "Tanvi Gupta",
    username: "@tanvi_jee",
    avatar: "T",
    avatarBg: "bg-violet-700",
    similarityScore: 95,
    targetExam: "JEE (Advanced)",
    activeTopic: "Rotational Mechanics limits",
    studyHabit: "Night Owl",
    matchReason: "Solving identical syllabus questions on active boards",
    status: "Online"
  }
];
