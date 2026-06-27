/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Compass,
  Sparkles,
  Mic,
  Volume2,
  Plus,
  Check,
  Activity,
  Flame,
  ArrowRight,
  Shield,
  Users,
  Award,
  ChevronDown,
  Zap,
  VolumeX,
  MessageCircle,
  HelpCircle,
  ArrowUpRight,
  CheckCircle2,
  Lock,
  BookOpen,
  Send,
  Smile,
  Trophy,
  Gift,
  MapPin,
  Search
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  initialTwins,
  initialRooms,
  initialLeaderboard,
  mockWeaknessMatchups,
  ExamTwin,
  StudyRoom,
  LeaderboardUser,
  initialStudyBuddies,
  StudyBuddy
} from "./data";

// Web Audio API Synthesizer to add high fidelity "life" sounds to click and event interactions!
function playAudioTone(type: "click" | "match" | "cheer" | "success") {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(580, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === "match") {
      osc.type = "triangle";
      // Arpeggio sound
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.setValueAtTime(554.37, ctx.currentTime + 0.08); // C#5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.16); // E5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.24); // A5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.45);
    } else if (type === "cheer") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(1046.50, ctx.currentTime + 0.2); // C6
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.08); // G5
      osc.frequency.setValueAtTime(987.77, ctx.currentTime + 0.16); // B5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    }
  } catch (error) {
    console.debug("Audio Context block prevented sound autoplay", error);
  }
}

export default function App() {
  // State variables
  const [selectedExam, setSelectedExam] = useState<string>("JEE (Advanced)");
  const [weakTopicText, setWeakTopicText] = useState<string>("Setting up double integrals for moment of inertia on weird structures.");
  const [customTopicInput, setCustomTopicInput] = useState<string>("");
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scanProgress, setScanProgress] = useState<number>(0);
  const [matchedTwin, setMatchedTwin] = useState<ExamTwin | null>(initialTwins[0]);

  // Study Buddy State Variables
  const [matchTab, setMatchTab] = useState<"twin" | "buddy">("twin");
  const [studyBuddies, setStudyBuddies] = useState<StudyBuddy[]>(initialStudyBuddies);
  const [connectedBuddies, setConnectedBuddies] = useState<StudyBuddy[]>([initialStudyBuddies[0], initialStudyBuddies[1]]);
  const [isBuddyScanning, setIsBuddyScanning] = useState<boolean>(false);
  const [buddyScanProgress, setBuddyScanProgress] = useState<number>(0);
  const [buddyFilter, setBuddyFilter] = useState<string>("All");
  const [buddyToast, setBuddyToast] = useState<string | null>(null);
  
  // Custom Slider and interactive pricing calculations
  const [cohortWeeks, setCohortWeeks] = useState<number>(8);
  const [priorityAccess, setPriorityAccess] = useState<boolean>(true);

  // Surprise reveal + 9-question survey state
  const [showSurpriseModal, setShowSurpriseModal] = useState<boolean>(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState<boolean>(false);
  const [surveyStep, setSurveyStep] = useState<number>(0); // 0=reveal, 1-9=questions, 10=email, 11=done
  const [surveyAnswers, setSurveyAnswers] = useState<Record<number, any>>({});
  const [surveyEmailInput, setSurveyEmailInput] = useState<string>("");
  const [surveyDone, setSurveyDone] = useState<boolean>(false);
  const [citySearchQuery, setCitySearchQuery] = useState<string>("");
  const [inviteCopied, setInviteCopied] = useState<boolean>(false);

  // Legacy compat (used by leaderboard logic)
  const [surveyExam, setSurveyExam] = useState<string>("");
  const [showSurveyModal, setShowSurveyModal] = useState<boolean>(false);
  const [surveyRhythm, setSurveyRhythm] = useState<string>("");
  const [surveyIntensity, setSurveyIntensity] = useState<string>("");
  
  // Audio rooms simulation states
  const [rooms, setRooms] = useState<StudyRoom[]>(initialRooms);
  const [selectedRoom, setSelectedRoom] = useState<StudyRoom | null>(initialRooms[0]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activeSpeakerName, setActiveSpeakerName] = useState<string>("Ishu Singh");
  const [isUserSpeaking, setIsUserSpeaking] = useState<boolean>(false);
  
  // Gamified Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>(initialLeaderboard);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number; label: string }[]>([]);
  const [heartIdCounter, setHeartIdCounter] = useState<number>(0);
  
  // Live Doubts board simulator
  const [userDoubtInput, setUserDoubtInput] = useState<string>("");
  const [doubtsHistory, setDoubtsHistory] = useState<{ id: string; question: string; category: string; answer: string; answerAuthor: string; isGenerating: boolean }[]>([
    {
      id: "d-1",
      question: "How do I calculate buffer pH if strong base is added to sodium acetate buffer?",
      category: "NEET (Medical)",
      answer: "The Henderson-Hasselbalch eq becomes pH = pKa + log([Salt + Base]/[Acid - Base]). The added base converts HA into A-, changing concentration ratios slightly. Let's draw this reaction live in our audio room!",
      answerAuthor: "Aditya Verma",
      isGenerating: false
    }
  ]);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  // Score boost simulator
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(10);
  
  // FAQ accordion state
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);

  // Ref for doubt container scroll
  const doubtsEndRef = useRef<HTMLDivElement | null>(null);

  // Predefined doubt suggestions for quick click-and-ask
  const categoryDoubts: Record<string, string[]> = {
    "JEE (Advanced)": [
      "Struggling with setting up definite integral boundaries for rotational mechanics torque.",
      "How to quickly solve multi-loop circuit equations with Kirchhoff's laws using matrices?"
    ],
    "NEET (Medical)": [
      "I keep confusing the stages of Prophase I in meiosis. Need a fast mnemonic!",
      "Confused with salt hydrolysis pH calculations for weak acids and strong bases."
    ],
    "UPSC (Civil Services)": [
      "What is the best way to write points on the basic structure doctrine of Indian Constitution?",
      "Need to discuss the actual impact of cash reserve ratio on commercial lending limits."
    ],
    "SAT / GRE": [
      "Tough geometry probability questions involving overlapping circles.",
      "Sentence equivalence questions with words like 'capricious' or 'mercurial'."
    ]
  };

  // Mock answers database for co-doubt solver
  const mockDoubtAnswers: Record<string, { author: string; answer: string }> = {
    "JEE (Advanced)": {
      author: "Ishu Singh",
      answer: "First find local dm as (density * dA). Set dA to r dr dθ if working in polar boundaries. Integral sweeps from 0 to R. Let's open our active board inside the room and crack it together!"
    },
    "NEET (Medical)": {
      author: "Aditya Verma",
      answer: "Remember: 'Leptotene Zygotene Pachytene Diplotene Diakinesis' as 'Lazy Zebra Play Double Drums'! Crossing over occurs explicitly in Pachytene. Let's do a voice test round!"
    },
    "UPSC (Civil Services)": {
      author: "Meera Nair",
      answer: "Focus on the 1973 Kesavananda Bharati judgment. Cite Article 368 vs Article 13. The court ruled parliament can amend but cannot alter the fundamental identity of constitution. Let's draft an essay together!"
    },
    "SAT / GRE": {
      author: "Anjali Mehta",
      answer: "Both words indicate quick-changing temperaments! Capricious means governed by impulse, Mercurial means volatile or animated. Let's drill 15 more flashcards over active voice today!"
    }
  };

  // Audio room active speaker simulator
  useEffect(() => {
    if (!selectedRoom || isMuted) return;
    const interval = setInterval(() => {
      const speakers = selectedRoom.activeSpeakers.filter(s => s.name !== "You");
      if (speakers.length === 0) return;
      const randomSpeaker = speakers[Math.floor(Math.random() * speakers.length)];
      setActiveSpeakerName(randomSpeaker.name);
      
      // Update room speaking animations in state
      setRooms(prev => prev.map(r => {
        if (r.id === selectedRoom.id) {
          return {
            ...r,
            activeSpeakers: r.activeSpeakers.map(s => ({
              ...s,
              isSpeaking: s.name === randomSpeaker.name && !isMuted
            }))
          };
        }
        return r;
      }));
    }, 4500);

    return () => clearInterval(interval);
  }, [selectedRoom, isMuted]);

  // Handle Match Scan Simulation
  const startMatchRadarScan = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioTone("click");
    setIsScanning(true);
    setScanProgress(5);
    setMatchedTwin(null);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 12;
      });
    }, 200);

    setTimeout(() => {
      setIsScanning(false);
      playAudioTone("match");
      // Find suitable twin based on exam
      const twin = initialTwins.find(t => t.exam.includes(selectedExam)) || initialTwins[0];
      setMatchedTwin(twin);
    }, 2200);
  };

  // Handle Study Buddy Radar Scan Simulation
  const startBuddyRadarScan = (e: React.FormEvent) => {
    e.preventDefault();
    playAudioTone("click");
    setIsBuddyScanning(true);
    setBuddyScanProgress(5);

    const interval = setInterval(() => {
      setBuddyScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 150);

    setTimeout(() => {
      setIsBuddyScanning(false);
      playAudioTone("match");
    }, 1200);
  };

  // Toggle connecting/disconnecting study buddies
  const toggleConnectBuddy = (buddy: StudyBuddy) => {
    playAudioTone("click");
    if (connectedBuddies.some((b) => b.id === buddy.id)) {
      setConnectedBuddies((prev) => prev.filter((b) => b.id !== buddy.id));
    } else {
      setConnectedBuddies((prev) => [...prev, buddy]);
      playAudioTone("success");
    }
  };

  // Handlers for cheer click + launching floating hearts / scores
  const triggerCheer = (userId: string, buttonElement: React.MouseEvent<HTMLButtonElement>) => {
    playAudioTone("cheer");
    
    // Add points to leaderboard user
    setLeaderboard(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, points: u.points + 5 };
      }
      return u;
    }));

    // Trigger visual float particle
    const rect = buttonElement.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: heartIdCounter,
      x: Math.random() * 60 - 30, // slight random offset
      label: ["🔥", "👏", "💯", "👑", "+5 XP"][Math.floor(Math.random() * 5)]
    };
    
    setFloatingHearts(prev => [...prev, newHeart]);
    setHeartIdCounter(prev => prev + 1);

    // Clean up floating particle
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1200);
  };

  // Live doubt posting simulator
  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    const query = userDoubtInput.trim();
    if (!query) return;

    playAudioTone("click");
    const newId = `d-${Date.now()}`;
    const targetCategory = selectedExam;

    // Add new user doubt as pending
    setDoubtsHistory(prev => [
      ...prev,
      {
        id: newId,
        question: query,
        category: targetCategory,
        answer: "",
        answerAuthor: "",
        isGenerating: true
      }
    ]);
    setUserDoubtInput("");
    setIsAnswering(true);

    // Simulating peer writing answer
    setTimeout(() => {
      const matchObj = mockDoubtAnswers[targetCategory] || {
        author: "Siddharth Roy",
        answer: "Interesting! Let's check the core formula first. We should solve a similar PYQ (Previous Year Question) together in the active study room right away."
      };

      setDoubtsHistory(prev => prev.map(d => {
        if (d.id === newId) {
          return {
            ...d,
            answer: matchObj.answer,
            answerAuthor: matchObj.author,
            isGenerating: false
          };
        }
        return d;
      }));
      setIsAnswering(false);
      playAudioTone("success");
      
      // Scroll to bottom
      setTimeout(() => {
        doubtsEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, 2500);
  };

  // Subscription plan pass pricing calculator
  const passCost = useMemo(() => {
    let price = cohortWeeks === 4 ? 499 : cohortWeeks === 8 ? 899 : 1299;
    if (priorityAccess) price += 149;
    return price;
  }, [cohortWeeks, priorityAccess]);

  const handleClaimPass = () => {
    playAudioTone("click");
    setShowSurpriseModal(true);
    setSurpriseRevealed(false);
    setSurveyStep(0);
  };

  // Projected score gain based on sliding hours
  const scoreGainText = useMemo(() => {
    const points = Math.min(180, Math.round(hoursPerWeek * 12));
    const confidence = Math.min(99, 40 + hoursPerWeek * 4.5);
    return { points, confidence };
  }, [hoursPerWeek]);

  return (
    <div className="min-h-screen bg-[#FFFDF6] text-slate-800 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden relative">
      
      {/* Decorative Lively Glowing Background Elements */}
      <div className="absolute top-0 right-[-10%] w-[50vw] h-[50vw] bg-radial from-yellow-200/40 via-amber-100/30 to-transparent rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[30%] left-[-15%] w-[45vw] h-[45vw] bg-radial from-orange-200/30 via-yellow-100/20 to-transparent rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-[-10%] w-[40vw] h-[40vw] bg-radial from-amber-200/30 via-orange-100/10 to-transparent rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* HEADER / NAVIGATION BAR */}
      <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-amber-100/80 shadow-xs" id="landing-navbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 shadow-lg shadow-orange-500/15">
              <span className="font-display font-black text-white text-xl tracking-tighter">yC</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-500 bg-clip-text text-transparent">
                yCohort
              </span>
              <span className="ml-1.5 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-700 border border-orange-200 uppercase tracking-wider">
                Peer Matching
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" onClick={() => playAudioTone("click")} className="hover:text-orange-600 transition-colors">How It Works</a>
            <a href="#radar-demo" onClick={() => playAudioTone("click")} className="hover:text-orange-600 transition-colors">Peer Radar</a>
            <a href="#study-rooms" onClick={() => playAudioTone("click")} className="hover:text-orange-600 transition-colors">Live Rooms</a>
            <a href="#doubt-solver" onClick={() => playAudioTone("click")} className="hover:text-orange-600 transition-colors">Doubt Solve</a>
            <a href="#pricing" onClick={() => playAudioTone("click")} className="hover:text-orange-600 transition-colors">Cohort Pass</a>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#radar-demo"
              onClick={() => playAudioTone("click")}
              className="px-4 py-2 rounded-xl bg-orange-500 text-white font-extrabold text-xs hover:bg-orange-600 transition-all shadow-md shadow-orange-500/15 hover:shadow-orange-500/35 active:scale-95 cursor-pointer"
            >
              Scan Study Twins
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Left - High-impact content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-xs text-amber-800">
              <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-bounce" />
              <span className="font-bold tracking-wide">The Active Study System for Serious Competitors</span>
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-slate-900">
              Suck at Calculus or Organic chemistry? <br />
              <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent animate-text-shine">
                Match with study twins who excel at your weakest topics.
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed font-medium">
              Ditch passive online videos and static modules. <strong>yCohort</strong> connects your study gaps with perfect peer matches. Teach the subjects you master, receive explanations for what holds you back, and clear mock test doubts live in interactive audio rooms.
            </p>

            {/* Frictionless Pricing Surprise Badge */}
            <div className="flex justify-center lg:justify-start pt-1">
              <a
                href="#pricing"
                onClick={() => playAudioTone("click")}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs sm:text-sm font-black shadow-xs hover:shadow-md hover:bg-indigo-100/50 transition-all active:scale-95 group cursor-pointer"
              >
                <Gift className="w-4.5 h-4.5 text-indigo-500 animate-pulse" />
                <span>Don't fear of price; we have a surprise</span>
                <span className="text-[10px] bg-indigo-200/60 px-1.5 py-0.5 rounded-md uppercase font-mono tracking-wider font-extrabold ml-1 group-hover:translate-x-0.5 transition-transform">Claim &rarr;</span>
              </a>
            </div>

            {/* Crucial Value Badges - Vibrant sunshine theme */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-xs hover:border-orange-200 hover:shadow-md transition-all">
                <Mic className="w-6 h-6 text-orange-500 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Live Audio Rooms</h4>
                <p className="text-xs text-slate-500 mt-1">Talk, debate, and draw diagrams on boards synchronously with zero friction.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-xs hover:border-orange-200 hover:shadow-md transition-all">
                <BookOpen className="w-6 h-6 text-amber-500 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Syllabus-Match Alignment</h4>
                <p className="text-xs text-slate-500 mt-1">Matched exclusively by target competitive exams & micro syllabus chapters.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200/50 shadow-xs hover:border-orange-200 hover:shadow-md transition-all">
                <Award className="w-6 h-6 text-yellow-500 mb-2" />
                <h4 className="font-bold text-sm text-slate-900">Reciprocal Gain Guarantee</h4>
                <p className="text-xs text-slate-500 mt-1">You clear their geometry queries; they unblock your organic mechanism bottlenecks.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 justify-center lg:justify-start">
              <a
                href="#radar-demo"
                onClick={() => playAudioTone("click")}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/35 transition-all group active:scale-95"
              >
                Launch Twin Finder Radar <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#pricing"
                onClick={() => playAudioTone("click")}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-orange-50/50 text-slate-700 hover:text-orange-600 font-extrabold text-sm flex items-center justify-center gap-2 border border-amber-200 shadow-sm transition-all"
              >
                View Pass Pricing
              </a>
            </div>

            {/* Social Proof / Metrics */}
            <div className="flex items-center gap-6 pt-5 justify-center lg:justify-start border-t border-amber-200/50">
              <div>
                <div className="text-2xl font-black text-slate-900">12 Days</div>
                <div className="text-xs text-slate-500 font-medium">Average Study Streak</div>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <div className="text-2xl font-black text-slate-900">+45 Pts</div>
                <div className="text-xs text-slate-500 font-medium">Avg Mock Test Boost</div>
              </div>
              <div className="w-px h-8 bg-amber-200" />
              <div>
                <div className="text-2xl font-black text-slate-900">98.4%</div>
                <div className="text-xs text-slate-500 font-medium">Reciprocity Match Rate</div>
              </div>
            </div>
          </div>

          {/* Hero Right - Highly Interactive Mock Platform Preview Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-yellow-400/20 rounded-3xl blur-2xl pointer-events-none -z-10 animate-float-slow" />
            
            {/* Visual Glassmorphic Mock card of active audio state */}
            <div className="bg-white border-2 border-orange-100 rounded-3xl p-5 space-y-4 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500" />
              
              <div className="flex justify-between items-center pb-2 border-b border-orange-50/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-[10px] font-mono text-orange-600 font-bold uppercase tracking-wider">LIVE CO-LEARNING LOOP</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">BATCH JEE-2027 ACTIVE</span>
              </div>

              {/* Study stream mock visualizer */}
              <div className="bg-amber-50/50 rounded-2xl p-4 border border-amber-100 space-y-3 relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  <Volume2 className="w-2.5 h-2.5" /> Math & Physics Sync
                </div>

                <div className="text-xs text-slate-500 font-semibold">Active Board Question:</div>
                <div className="font-mono text-xs text-orange-950 bg-white p-3 rounded-xl border border-amber-100/80">
                  <span className="text-orange-600 font-bold">∫</span> x³ ln(x) dx <span className="text-slate-400 font-semibold">= ?</span>
                </div>

                {/* Animated active speaker visual */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-amber-200/50 shadow-sm">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center font-display font-black text-white text-sm shadow-inner">
                      IS
                    </div>
                    <div>
                      <h4 className="font-black text-xs text-slate-800">Ishu Singh</h4>
                      <p className="text-[10px] text-slate-500">Rank #23 (Calculus Mentor)</p>
                    </div>
                  </div>
                  
                  {/* Real-time speaking waves */}
                  <div className="flex items-end gap-1 h-4 px-1">
                    <span className="w-0.5 h-2 bg-orange-500 rounded-full animate-[wave-grow_1.2s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-4 bg-orange-500 rounded-full animate-[wave-grow_0.8s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-1 bg-orange-500 rounded-full animate-[wave-grow_1s_ease-in-out_infinite]" />
                    <span className="w-0.5 h-3 bg-orange-500 rounded-full animate-[wave-grow_0.7s_ease-in-out_infinite]" />
                  </div>
                </div>

                <div className="text-[11px] text-slate-600 leading-relaxed pt-1">
                  <span className="text-orange-600 font-black">Ishu:</span> "Since we have ln(x), let's use Integration by Parts! Let <strong className="text-slate-800">u = ln(x)</strong> and <strong className="text-slate-800">dv = x³ dx</strong>. Watch me write the integration boundary on the board!"
                </div>
              </div>

              {/* Matching radar preview block */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50/40 p-3.5 rounded-2xl border border-amber-100 space-y-2">
                <div className="flex justify-between items-center text-[10px] text-slate-600 font-semibold">
                  <span>Syllabus Sync Match</span>
                  <span className="text-orange-600 font-black">96% Accuracy</span>
                </div>
                <div className="h-1.5 w-full bg-white rounded-full overflow-hidden border border-amber-100">
                  <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 w-[96%] rounded-full" />
                </div>
                <div className="flex justify-between items-center text-[9px] text-slate-500 font-mono">
                  <span>JEE Rotational Mechanics</span>
                  <span>Dist: 2 km · 12-day streak</span>
                </div>
              </div>
            </div>

            {/* Floater metrics sticker - Energetic live feel */}
            <div className="absolute -bottom-6 -left-4 bg-white border-2 border-orange-100 rounded-2xl p-3.5 shadow-xl flex items-center gap-3 animate-float-slower">
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
              </div>
              <div>
                <div className="text-xs font-black text-slate-900">Study Streak Duo</div>
                <div className="text-[10px] text-orange-600 font-bold">🔥 15 Days Consistent!</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 border-t border-b border-orange-100/60 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">THE PEER BLUEPRINT</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900" data-speakable>
              No More Studying in Isolated Silos
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              yCohort combines mutual syllabus gaps to automatically create perfect, productive study circles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            
            {/* Step 1 */}
            <div className="relative p-6 rounded-2xl bg-[#FFFDF5] border border-amber-200/50 space-y-4 hover:border-orange-300 hover:shadow-lg transition-all group">
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                01
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900">State Your Target Gaps</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Select your competitive exam and enter the subject you are weak in. Be raw this is the base of your perfect peer match.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative p-6 rounded-2xl bg-[#FFFDF5] border border-amber-200/50 space-y-4 hover:border-orange-300 hover:shadow-lg transition-all group">
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                02
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900">Aspirant Radar Search</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Our database scans other active students nearby who excel at your exact weak topic and require guidance on subjects that you find incredibly easy.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative p-6 rounded-2xl bg-[#FFFDF5] border border-amber-200/50 space-y-4 hover:border-orange-300 hover:shadow-lg transition-all group">
              <div className="absolute -top-4 -left-2 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-mono font-black text-xs shadow-md">
                03
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5" />
              </div>
              <h4 className="font-black text-base text-slate-900">Unlock Live Audio Rooms</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Jump into voice study rooms with your match. Solve practice questions, keep each other accountable, and raise your percentile.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE RADAR DEMO SECTION */}
      <section id="radar-demo" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text and quick preset selection */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
              <span>Real-Time Matching Simulator</span>
            </div>
            
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Test Drive our Match Radar
            </h2>
            
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Pick your target competitive exam, select from actual student pain-points below, or enter your own custom syllabus topic to watch our matcher search our database of active aspirants.
            </p>

            {/* Predefined Pain-Points Selector */}
            <div className="space-y-3">
              <span className="text-xs text-slate-500 font-mono block uppercase font-bold tracking-wider">Quick Preset Struggles:</span>
              <div className="flex flex-col gap-2.5">
                {mockWeaknessMatchups.map((match, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      playAudioTone("click");
                      setSelectedExam(match.seeker.includes("NEET") ? "NEET (Medical)" : match.seeker.includes("JEE") ? "JEE (Advanced)" : "UPSC (Civil Services)");
                      setWeakTopicText(`Need urgent help with ${match.weakSubject} preparation.`);
                    }}
                    className="p-3 text-left rounded-2xl bg-white border border-amber-200/60 hover:border-orange-400 hover:bg-orange-50/20 transition-all flex justify-between items-center group shadow-xs"
                  >
                    <div>
                      <span className="font-bold text-xs text-slate-800">{match.seeker}</span>
                      <p className="text-[11px] text-slate-500 mt-0.5">Weak: <strong className="text-red-500">{match.weakSubject}</strong> · Strong: <strong className="text-green-600">{match.strongSubject}</strong></p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-extrabold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">{match.reciprocity}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-orange-500 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Interactive Matcher Widget */}
          <div className="lg:col-span-7 bg-white border-2 border-orange-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative">
            <div className="absolute top-4 right-4 bg-orange-100 text-orange-800 border border-orange-200 text-[10px] font-mono px-2.5 py-0.5 rounded-md uppercase font-bold tracking-wider">
              Interactive Portal
            </div>

            {/* TAB SYSTEM SWITCHER */}
            <div className="flex p-1 bg-amber-50/50 rounded-2xl border border-amber-100">
              <button
                type="button"
                onClick={() => {
                  playAudioTone("click");
                  setMatchTab("twin");
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  matchTab === "twin"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Exam Twin Finder</span>
                <span className={`text-[8px] px-1.5 py-0.2 rounded font-bold ${matchTab === "twin" ? "bg-orange-600 text-white" : "bg-orange-100 text-orange-800"}`}>Complementary</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playAudioTone("click");
                  setMatchTab("buddy");
                }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 ${
                  matchTab === "buddy"
                    ? "bg-orange-500 text-white shadow-md"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Sparkles className="w-4 h-4 animate-pulse" />
                <span>Study Buddy Hub</span>
                <span className={`text-[8px] px-1.5 py-0.2 rounded font-bold ${matchTab === "buddy" ? "bg-orange-600 text-white" : "bg-amber-100 text-amber-800"}`}>Similarity</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {matchTab === "twin" ? (
                <motion.div
                  key="twin-tab"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="space-y-6"
                >
                  <p className="text-xs text-slate-500 leading-normal font-semibold">
                    Find your long-term, exclusive study twin. Matches are based on mutual exchange: teach chapters you excel at, receive guidance on chapters you struggle with.
                  </p>

                  <form onSubmit={startMatchRadarScan} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">Target Exam Category</label>
                        <select
                          value={selectedExam}
                          onChange={(e) => {
                            playAudioTone("click");
                            setSelectedExam(e.target.value);
                            // Update description placeholder to match exam
                            const presets = categoryDoubts[e.target.value];
                            if (presets && presets.length > 0) {
                              setWeakTopicText(presets[0]);
                            }
                          }}
                          className="w-full bg-amber-50/30 border-2 border-amber-100 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 transition-all"
                        >
                          <option value="JEE (Advanced)">JEE (Advanced) - Engineering</option>
                          <option value="NEET (Medical)">NEET (Medical) - Bio</option>
                          <option value="UPSC (Civil Services)">UPSC (Civil Services) - IAS</option>
                          <option value="SAT / GRE">SAT / GRE - Quant & Verbal</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">Your Strongest Subject</label>
                        <select
                          className="w-full bg-amber-50/30 border-2 border-amber-100 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 transition-all"
                        >
                          <option>Mathematics (Calculus/Algebra)</option>
                          <option>Physics (Mechanics/Electrodynamics)</option>
                          <option>Inorganic & Physical Chemistry</option>
                          <option>Biology (Genetics & Anatomy)</option>
                          <option>Indian Polity & Modern History</option>
                        </select>
                      </div>

                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="text-xs font-bold text-slate-700">My Weak Subject Chapter / Pain Point</label>
                        <span className="text-[10px] text-slate-500 font-mono">Input matches with active peers</span>
                      </div>
                      <textarea
                        rows={2}
                        value={weakTopicText}
                        onChange={(e) => setWeakTopicText(e.target.value)}
                        placeholder="e.g. Struggling to solve buffer pH Henderson equations, or organic chemical conversions."
                        className="w-full bg-amber-50/30 border-2 border-amber-100 rounded-2xl p-3 text-xs text-slate-800 font-medium placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-all resize-none"
                        required
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        type="submit"
                        disabled={isScanning}
                        className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs hover:bg-orange-600 transition-all disabled:opacity-50 shadow-md shadow-orange-500/15 flex items-center justify-center gap-2"
                      >
                        {isScanning ? "Scanning Database..." : "Scan Active Exam Cohort"}
                      </button>
                      {isScanning && (
                        <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full transition-all duration-200" style={{ width: `${scanProgress}%` }} />
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Radar Simulation Output Area with vibrant animation */}
                  <div className="bg-[#FFFDF9] border-2 border-dashed border-orange-200 rounded-2xl p-5 min-h-[160px] flex flex-col justify-center relative overflow-hidden">
                    <AnimatePresence mode="wait">
                      {isScanning ? (
                        <motion.div
                          key="scanning-twin"
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center space-y-3 py-4"
                        >
                          <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                            <div className="w-10 h-10 rounded-full bg-orange-100 border border-orange-400 flex items-center justify-center text-orange-600">
                              <Compass className="w-5 h-5 animate-spin text-orange-600" />
                            </div>
                          </div>
                          <p className="text-xs text-orange-800 font-bold font-mono">Aligning weak chapters with active native peers...</p>
                        </motion.div>
                      ) : matchedTwin ? (
                        <motion.div
                          key="twin-card"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="space-y-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-11 h-11 rounded-full ${matchedTwin.avatarBg} flex items-center justify-center font-display font-black text-white text-base shadow-inner`}>
                                {matchedTwin.avatar}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h4 className="font-black text-slate-800 text-sm">{matchedTwin.name}</h4>
                                  <span className="text-[9px] bg-orange-100 text-orange-800 border border-orange-200 px-1.5 py-0.2 rounded font-mono font-bold">ALIGNED TWIN</span>
                                </div>
                                <p className="text-[11px] text-slate-500 font-semibold">{matchedTwin.username} · {matchedTwin.distance}</p>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="text-sm font-black text-green-600 block">{matchedTwin.matchPercentage}% match</span>
                              <span className="text-[10px] text-orange-600 font-extrabold bg-orange-50 px-1.5 py-0.5 rounded-md border border-orange-100">🔥 {matchedTwin.peerStreak} Day Streak</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-semibold">
                            <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-xs">
                              <span className="text-[9px] font-mono text-green-600 block mb-1 uppercase tracking-wider font-extrabold">Their Strong Area (Teaches You)</span>
                              <p className="text-slate-700">{matchedTwin.helpWithTopic}</p>
                              <p className="text-[10px] text-slate-400 mt-1">Mastery: {matchedTwin.strongSubject}</p>
                            </div>
                            <div className="bg-white p-3 rounded-xl border border-orange-100 shadow-xs">
                              <span className="text-[9px] font-mono text-red-500 block mb-1 uppercase tracking-wider font-extrabold">Their Weak Area (You Teach Them)</span>
                              <p className="text-slate-700">{matchedTwin.needHelpWithTopic}</p>
                              <p className="text-[10px] text-slate-400 mt-1">Struggle: {matchedTwin.weakSubject}</p>
                            </div>
                          </div>

                          <div className="p-3 bg-orange-50/55 border border-orange-100 rounded-xl text-xs flex gap-2.5 items-start">
                            <span className="text-orange-600 font-black shrink-0">Study Plan:</span>
                            <p className="text-slate-600 leading-normal font-medium">
                              "Hey, let's open an audio study session. I can easily explain <strong className="text-slate-900">{matchedTwin.helpWithTopic}</strong> in 10 minutes if you help me crack <strong className="text-slate-900">{matchedTwin.needHelpWithTopic}</strong>."
                            </p>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-orange-50 pt-3 font-semibold">
                            <span>Potential Mock Test Gain: <strong className="text-orange-600 font-extrabold">+{matchedTwin.helpsYouScore} marks</strong></span>
                            <a href="#pricing" onClick={() => playAudioTone("click")} className="text-orange-600 hover:underline font-bold flex items-center gap-0.5">
                              Claim Pass Match <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>

                        </motion.div>
                      ) : (
                        <div className="text-center text-slate-400 text-xs py-8 font-medium">
                          Select your exam options and click "Scan Active Exam Cohort" to seek your study twin.
                        </div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="buddy-tab"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 text-xs font-semibold text-slate-700 leading-relaxed">
                    <div className="flex items-center gap-2 text-orange-600 font-black mb-1.5 uppercase tracking-wider text-[10px] font-mono">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>The Study Buddy Philosophy</span>
                    </div>
                    Unlike exclusive long-term Exam Twins, <strong>Study Buddies</strong> are lightweight, many-to-many accountability partners built purely around similarity (same schedules, same chapters, and shared company). You can connect with multiple buddies simultaneously!
                  </div>

                  {/* Similarity Scan Form */}
                  <form onSubmit={startBuddyRadarScan} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">Schedule Habit Filter</label>
                        <select
                          value={buddyFilter}
                          onChange={(e) => {
                            playAudioTone("click");
                            setBuddyFilter(e.target.value);
                          }}
                          className="w-full bg-amber-50/30 border-2 border-amber-100 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 transition-all"
                        >
                          <option value="All">All Habits (Early Bird & Night Owl)</option>
                          <option value="Night Owl">Night Owls (Late Night Sprints)</option>
                          <option value="Early Bird">Early Birds (Sunrise Accountability)</option>
                          <option value="Weekend Warrior">Weekend Warriors (Hardcore Weekends)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1.5">Focus Exam</label>
                        <select
                          value={selectedExam}
                          onChange={(e) => {
                            playAudioTone("click");
                            setSelectedExam(e.target.value);
                          }}
                          className="w-full bg-amber-50/30 border-2 border-amber-100 rounded-2xl px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-orange-500 transition-all"
                        >
                          <option value="JEE (Advanced)">JEE (Advanced) - Engineering</option>
                          <option value="NEET (Medical)">NEET (Medical) - Bio</option>
                          <option value="UPSC (Civil Services)">UPSC (Civil Services) - IAS</option>
                          <option value="SAT / GRE">SAT / GRE - Quant & Verbal</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <button
                        type="submit"
                        disabled={isBuddyScanning}
                        className="px-6 py-3 rounded-2xl bg-orange-500 text-white font-extrabold text-xs hover:bg-orange-600 transition-all disabled:opacity-50 shadow-md shadow-orange-500/15 flex items-center justify-center gap-2"
                      >
                        {isBuddyScanning ? "Scanning for Co-Study Matches..." : "Run Similarity Sweep"}
                      </button>
                      {isBuddyScanning && (
                        <div className="flex-1 h-2 bg-amber-100 rounded-full overflow-hidden">
                          <div className="h-full bg-orange-500 rounded-full transition-all duration-200" style={{ width: `${buddyScanProgress}%` }} />
                        </div>
                      )}
                    </div>
                  </form>

                  {/* Buddy Matcher Display */}
                  <div className="space-y-3.5">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">
                      {isBuddyScanning ? "Searching similar minds..." : "Top Similarity Matches:"}
                    </span>

                    <AnimatePresence mode="wait">
                      {isBuddyScanning ? (
                        <motion.div
                          key="scanning-buddies"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="bg-amber-50/30 border-2 border-dashed border-amber-200 rounded-2xl p-6 text-center space-y-3"
                        >
                          <div className="relative w-12 h-12 mx-auto flex items-center justify-center">
                            <span className="absolute inset-0 rounded-full bg-orange-500/20 animate-ping" />
                            <div className="w-8 h-8 rounded-full bg-orange-100 border border-orange-400 flex items-center justify-center text-orange-600">
                              <Sparkles className="w-4 h-4 animate-spin text-orange-600" />
                            </div>
                          </div>
                          <p className="text-xs text-orange-800 font-bold font-mono">Calibrating schedule & focus similarities...</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="buddies-list"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="grid grid-cols-1 gap-3"
                        >
                          {studyBuddies
                            .filter((b) => buddyFilter === "All" || b.studyHabit === buddyFilter)
                            .map((buddy) => {
                              const isConnected = connectedBuddies.some((c) => c.id === buddy.id);
                              return (
                                <div
                                  key={buddy.id}
                                  className="p-4 bg-amber-50/20 hover:bg-amber-50/40 rounded-2xl border border-amber-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="relative shrink-0">
                                      <div className={`w-10 h-10 rounded-full ${buddy.avatarBg} flex items-center justify-center font-display font-black text-white text-sm shadow-sm`}>
                                        {buddy.avatar}
                                      </div>
                                      <span
                                        className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                                          buddy.status === "Studying"
                                            ? "bg-orange-500"
                                            : buddy.status === "Online"
                                            ? "bg-green-500"
                                            : "bg-slate-300"
                                        }`}
                                      />
                                    </div>

                                    <div className="space-y-0.5">
                                      <div className="flex items-center gap-2">
                                        <h5 className="font-extrabold text-xs text-slate-800">{buddy.name}</h5>
                                        <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.2 rounded font-mono font-bold">
                                          {buddy.similarityScore}% Similar
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-slate-500 font-semibold font-mono">
                                        {buddy.username} · {buddy.studyHabit} · {buddy.targetExam}
                                      </p>
                                      <p className="text-xs text-slate-600 font-semibold pt-1 border-t border-amber-100/50 mt-1">
                                        Active: <strong className="text-slate-800">{buddy.activeTopic}</strong>
                                      </p>
                                      <p className="text-[10px] text-orange-600 italic font-semibold">
                                        💡 {buddy.matchReason}
                                      </p>
                                    </div>
                                  </div>

                                  <div className="flex sm:flex-col items-stretch gap-2 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => toggleConnectBuddy(buddy)}
                                      className={`px-3 py-2 rounded-xl text-xs font-extrabold transition-all text-center flex items-center justify-center gap-1 cursor-pointer ${
                                        isConnected
                                          ? "bg-green-500 text-white shadow-sm"
                                          : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                      }`}
                                    >
                                      {isConnected ? (
                                        <>
                                          <Check className="w-3.5 h-3.5" />
                                          <span>Connected</span>
                                        </>
                                      ) : (
                                        <span>Connect Buddy</span>
                                      )}
                                    </button>

                                    {buddy.status === "Studying" && (
                                      <button
                                        type="button"
                                        onClick={() => {
                                          playAudioTone("click");
                                          // Simulate jumping into a room
                                          const room = rooms.find((r) => r.exam === buddy.targetExam) || rooms[0];
                                          setSelectedRoom(room);
                                          // Scroll to room stages
                                          document.getElementById("study-rooms")?.scrollIntoView({ behavior: "smooth" });
                                        }}
                                        className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border border-amber-200 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 shadow-xs transition-colors cursor-pointer"
                                      >
                                        <Volume2 className="w-3 h-3 text-orange-500" />
                                        <span>Join Study Stage</span>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toast Notification for actions */}
                  <AnimatePresence>
                    {buddyToast && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="p-3 bg-slate-900 text-white font-extrabold text-xs rounded-xl shadow-lg text-center flex items-center justify-center gap-2 border border-slate-700"
                      >
                        <Check className="w-4 h-4 text-green-400" />
                        <span>{buddyToast}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Active Co-Study Network Dashboard */}
                  <div className="pt-4 border-t border-amber-100 mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono text-slate-500 block uppercase font-extrabold tracking-wider">
                        My Co-Study Network ({connectedBuddies.length} buddies)
                      </span>
                      <span className="text-[9px] bg-amber-100 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded font-bold font-mono">Simultaneous Active Mode</span>
                    </div>

                    {connectedBuddies.length === 0 ? (
                      <div className="p-4 rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400 font-medium">
                        Connect buddies from similarity matches above to build your co-study company!
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {connectedBuddies.map((buddy) => (
                          <div
                            key={buddy.id}
                            className="p-3.5 rounded-2xl bg-orange-50/30 border border-orange-100 flex flex-col justify-between space-y-3"
                          >
                            <div className="flex items-center gap-2">
                              <div className={`w-8 h-8 rounded-full ${buddy.avatarBg} flex items-center justify-center font-display font-black text-white text-xs shadow-inner`}>
                                {buddy.avatar}
                              </div>
                              <div className="truncate">
                                <h6 className="font-extrabold text-xs text-slate-800 truncate">{buddy.name}</h6>
                                <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono font-bold ${buddy.status === "Studying" ? "bg-orange-100 text-orange-700" : "bg-slate-100 text-slate-600"}`}>
                                  {buddy.status}
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  playAudioTone("success");
                                  setBuddyToast(`Co-Study Invite broadcasted to ${buddy.name}! They will join your active audio stage room shortly.`);
                                  setTimeout(() => setBuddyToast(null), 3000);
                                }}
                                className="flex-1 py-1.5 bg-white hover:bg-orange-100/50 text-orange-700 border border-orange-200 rounded-xl text-[10px] font-extrabold transition-colors cursor-pointer"
                              >
                                Invite to Room
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  playAudioTone("success");
                                  setBuddyToast(`25-minute Pomodoro Sprint sync request sent to ${buddy.name}! Let's focus and build accountability.`);
                                  setTimeout(() => setBuddyToast(null), 3000);
                                }}
                                className="px-2 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-[10px] font-extrabold transition-all cursor-pointer"
                                title="Start Joint Pomodoro Sprint"
                              >
                                Pomo ⏱️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* DYNAMIC SCORE BOOST SLIDER ESTIMATOR */}
      <section className="py-12 bg-gradient-to-r from-yellow-100 via-amber-50 to-orange-100 border-t border-b border-orange-100">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-1 bg-white px-3 py-1 rounded-full text-xs text-orange-700 font-bold border border-orange-200">
            <Zap className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
            <span>Interactive Percentile Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-black text-slate-900">
            Estimate Your Preparation Level Up
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto font-medium">
            Slide the hours you plan to spend per week in active peer audio study rooms to see predicted improvements in your mock test performance.
          </p>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-orange-100 shadow-md space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Weekly Peer Study Hours</span>
                <span className="text-orange-600 text-sm font-extrabold">{hoursPerWeek} Hours/Week</span>
              </div>
              <input
                type="range"
                min={2}
                max={30}
                value={hoursPerWeek}
                onChange={(e) => {
                  setHoursPerWeek(Number(e.target.value));
                  if (Number(e.target.value) % 4 === 0) {
                    playAudioTone("click");
                  }
                }}
                className="w-full h-2.5 bg-orange-100 rounded-lg appearance-none cursor-pointer accent-orange-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>2 hrs (Casual)</span>
                <span>15 hrs (Optimal)</span>
                <span>30 hrs (Hardcore Titan)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 text-center">
                <span className="text-[10px] uppercase font-bold text-orange-600 font-mono block">Estimated Score Boost</span>
                <span className="text-3xl sm:text-4xl font-black text-orange-600">+{scoreGainText.points} Marks</span>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold">in final competitive mock percentiles</p>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-center">
                <span className="text-[10px] uppercase font-bold text-amber-700 font-mono block">Syllabus Retention Confidence</span>
                <span className="text-3xl sm:text-4xl font-black text-amber-600">{scoreGainText.confidence}%</span>
                <p className="text-[11px] text-slate-500 mt-1 font-semibold">vs 22% with passive online video courses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE ACTIVE STUDY ROOMS STREAM */}
      <section id="study-rooms" className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">STUDY STREAM STAGES</div>
              <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 mt-1" data-speakable>
                Active Audio Study Rooms
              </h2>
              <p className="text-slate-600 text-sm mt-2 max-w-xl font-medium">
                Click to enter any active study stage. Practice formulas, present doubts, and consult peers in real time.
              </p>
            </div>
            
            <div className="flex items-center gap-2 bg-orange-100/70 border border-orange-200/50 px-3.5 py-1.5 rounded-full">
              <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono font-bold text-orange-800 uppercase tracking-wider">12 Stages Broadcasting</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rooms.map((room) => {
              const isCurrentSelected = selectedRoom?.id === room.id;
              return (
                <div
                  key={room.id}
                  onClick={() => {
                    playAudioTone("click");
                    setSelectedRoom(room);
                  }}
                  className={`cursor-pointer p-6 rounded-3xl border-2 transition-all relative overflow-hidden group flex flex-col justify-between min-h-[220px] ${
                    isCurrentSelected
                      ? "bg-[#FFFDF3] border-orange-400 shadow-md scale-[1.01]"
                      : "bg-white border-amber-100 hover:border-orange-200 hover:shadow-lg"
                  }`}
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="text-[10px] font-mono bg-orange-100 text-orange-800 border border-orange-200 px-2.5 py-0.5 rounded-full font-bold uppercase">
                        {room.exam}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>{room.studyingCount}/{room.maxCount}</span>
                      </div>
                    </div>

                    <h4 className="font-display font-black text-lg text-slate-900 mt-4 group-hover:text-orange-600 transition-colors">
                      {room.name}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1.5 font-semibold line-clamp-2">
                      Topic: <span className="text-slate-800">{room.topic}</span>
                    </p>
                  </div>

                  <div className="pt-4 border-t border-amber-50 mt-4 flex items-center justify-between">
                    {/* Active speakers avatars */}
                    <div className="flex -space-x-1.5">
                      {room.activeSpeakers.map((sp, i) => (
                        <div
                          key={i}
                          title={`${sp.name} (${sp.role})`}
                          className={`w-7 h-7 rounded-full ${sp.avatarBg} border-2 border-white flex items-center justify-center font-bold text-[10px] text-white`}
                        >
                          {sp.avatar}
                        </div>
                      ))}
                    </div>

                    <span className="text-[11px] font-bold text-orange-600 flex items-center gap-0.5 group-hover:underline">
                      Enter Stage <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ACTIVE SPEAKERS INTERACTIVE PORTAL DRAWER */}
          {selectedRoom && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-[#FFFDF6] border-2 border-orange-100 rounded-3xl p-6 shadow-md"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Speaker stats / Audio control */}
                <div className="lg:col-span-4 text-center lg:text-left space-y-4">
                  <div className="inline-flex items-center gap-2 bg-white text-orange-700 px-3.5 py-1 rounded-full text-xs font-bold border border-orange-100 shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span>Stage: {selectedRoom.name} ({selectedRoom.subject})</span>
                  </div>
                  
                  <h3 className="font-display font-black text-2xl text-slate-900">Live Stage Audio</h3>
                  <p className="text-slate-600 text-xs leading-relaxed font-semibold">
                    Listen to live doubt explanations, peer tips, and exam memorization drills.
                  </p>

                  <div className="flex flex-wrap items-center gap-2 justify-center lg:justify-start pt-1">
                    <button
                      onClick={() => {
                        playAudioTone("click");
                        setIsMuted(!isMuted);
                        if (isUserSpeaking) setIsUserSpeaking(false);
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isMuted
                          ? "bg-red-50 border-red-200 text-red-600"
                          : "bg-white border-amber-200 text-slate-700 hover:border-orange-500 shadow-xs"
                      }`}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-orange-500" />}
                      {isMuted ? "Audio Muted" : "Audio Connected"}
                    </button>

                    <button
                      onClick={() => {
                        if (isMuted) return;
                        playAudioTone("cheer");
                        setIsUserSpeaking(!isUserSpeaking);
                      }}
                      disabled={isMuted}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                        isUserSpeaking
                          ? "bg-orange-500 border-orange-600 text-white shadow-md shadow-orange-500/10"
                          : "bg-white border-amber-200 text-slate-700 hover:border-orange-500 disabled:opacity-55 shadow-xs"
                      }`}
                    >
                      <Mic className="w-3.5 h-3.5" />
                      {isUserSpeaking ? "You are Speaking!" : "Tap to Speak"}
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 font-mono">Uses simulated real-time peer WebAudio nodes</p>
                </div>

                {/* Simulated Wave Grid of participants */}
                <div className="lg:col-span-8 bg-white rounded-2xl p-4 sm:p-6 border border-orange-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {selectedRoom.activeSpeakers.map((sp, idx) => {
                    const isSpeakingNow = (activeSpeakerName === sp.name && !isMuted) || (sp.name === "You" && isUserSpeaking);
                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-2xl border text-center space-y-2 relative transition-all ${
                          isSpeakingNow
                            ? "bg-orange-50/40 border-orange-400 shadow-xs scale-102"
                            : "bg-[#FFFDF9] border-amber-100"
                        }`}
                      >
                        {isSpeakingNow && (
                          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
                        )}
                        <div className={`w-10 h-10 rounded-full ${sp.avatarBg} mx-auto flex items-center justify-center font-display font-black text-white text-xs shadow-sm`}>
                          {sp.avatar}
                        </div>
                        <div>
                          <div className="font-extrabold text-slate-800 text-xs truncate">{sp.name}</div>
                          <span className="text-[9px] text-slate-500 font-bold block truncate mt-0.5">
                            {sp.role.split(" ")[0]}
                          </span>
                        </div>

                        {isSpeakingNow ? (
                          <div className="flex justify-center gap-0.5 h-3.5 mt-1 px-1">
                            <span className="w-0.5 bg-orange-500 rounded-full animate-[wave-grow_1.1s_infinite]" />
                            <span className="w-0.5 bg-orange-500 rounded-full animate-[wave-grow_0.7s_infinite]" />
                            <span className="w-0.5 bg-orange-500 rounded-full animate-[wave-grow_0.9s_infinite]" />
                          </div>
                        ) : (
                          <div className="text-[9px] text-slate-400 font-semibold font-mono mt-1">🎧 Muted</div>
                        )}
                      </div>
                    );
                  })}
                </div>

              </div>
            </motion.div>
          )}

        </div>
      </section>

      {/* CO-DOUBT SOLVING SIMULATOR BOARD */}
      <section id="doubt-solver" className="py-16 bg-gradient-to-b from-white to-[#FFFDF6] border-t border-orange-100/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-bold border border-yellow-200">
              <MessageCircle className="w-4 h-4 text-orange-500" />
              <span>Co-Doubt Board Solver</span>
            </div>
            <h2 className="font-display font-black text-3xl text-slate-900">
              Instant Micro Doubt Desk
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Post any doubt question below. Our matched peer database simulates a real-time draft answer response to show you how study twins collaborate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Ask Doubt input form & predefined quick triggers */}
            <div className="lg:col-span-5 bg-white border-2 border-orange-100 rounded-3xl p-5 sm:p-6 space-y-4 shadow-sm">
              <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">Draft Your Question:</span>
              
              <form onSubmit={handlePostDoubt} className="space-y-3">
                <textarea
                  value={userDoubtInput}
                  onChange={(e) => setUserDoubtInput(e.target.value)}
                  placeholder="e.g. Help with Rotational Mechanics acceleration formulas..."
                  className="w-full bg-amber-50/20 border-2 border-amber-100 rounded-2xl p-3 text-xs text-slate-800 font-semibold placeholder-slate-400 focus:outline-none focus:border-orange-500 transition-all resize-none"
                  rows={3}
                  required
                />
                
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-slate-500 font-mono">Simulating {selectedExam} doubts</span>
                  <button
                    type="submit"
                    disabled={isAnswering}
                    className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    {isAnswering ? "Peer is Drafting..." : "Send to Active Cohort"}
                  </button>
                </div>
              </form>

              {/* Subject suggestion doubts */}
              <div className="space-y-2 pt-2 border-t border-amber-100">
                <span className="text-[10px] text-slate-500 font-mono block uppercase font-bold tracking-wider">Suggested Quick Queries:</span>
                <div className="space-y-1.5">
                  {(categoryDoubts[selectedExam] || []).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playAudioTone("click");
                        setUserDoubtInput(q);
                      }}
                      className="w-full p-2.5 rounded-xl text-left text-xs bg-amber-50/40 hover:bg-orange-50/60 border border-amber-100 hover:border-orange-200 text-slate-600 font-medium transition-all block truncate"
                    >
                      🔍 "{q}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Simulated doubting dashboard feed */}
            <div className="lg:col-span-7 bg-[#FFFDF8] border-2 border-orange-100 rounded-3xl p-5 sm:p-6 space-y-4 h-[350px] overflow-y-auto shadow-inner">
              <div className="flex justify-between items-center pb-2 border-b border-orange-100">
                <span className="text-xs font-bold text-slate-700">Doubt Solver Desk Activity</span>
                <span className="text-[10px] text-orange-600 font-mono font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">LIVE FEED</span>
              </div>

              <div className="space-y-4">
                {doubtsHistory.map((d) => (
                  <div key={d.id} className="space-y-2 bg-white p-4 rounded-2xl border border-orange-100/80 shadow-xs">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold">
                      <span className="bg-orange-100 text-orange-700 px-2 py-0.5 rounded-md font-mono font-bold">{d.category}</span>
                      <span>Asked just now</span>
                    </div>
                    <p className="text-xs font-extrabold text-slate-800">Q: {d.question}</p>

                    <div className="pt-2 border-t border-amber-50 mt-2">
                      {d.isGenerating ? (
                        <div className="flex items-center gap-2.5 py-1">
                          <div className="w-5 h-5 rounded-full bg-orange-400 animate-pulse flex items-center justify-center text-white text-[9px] font-bold">P</div>
                          <span className="text-xs text-slate-500 font-semibold font-mono animate-pulse">Study Twin is typing draft explanation...</span>
                        </div>
                      ) : (
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-[9px] font-bold shadow-sm">
                              {d.answerAuthor[0]}
                            </div>
                            <span className="text-xs font-black text-slate-700">{d.answerAuthor}</span>
                            <span className="text-[9px] text-green-600 bg-green-50 px-1.5 py-0.2 rounded font-semibold font-mono">Duo Partner Solution</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed font-semibold bg-green-50/20 p-2.5 rounded-xl border border-green-100/50">
                            {d.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={doubtsEndRef} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* GAMIFIED ASPIRANTS LEADERBOARD */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-orange-100/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left information about community & rewards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-xs text-amber-800">
              <Trophy className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 animate-bounce" />
              <span className="font-bold">Aspirant Co-Study Leaderboard</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Gamified Motivation with Real Peer Support
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              Study twins keep each other consistent. Get points for explaining tough questions, joining rooms, and maintaining your streak. Give a high-five below to top aspirants and listen to actual feedback!
            </p>

            <div className="p-4 bg-orange-50/50 border border-orange-100 rounded-3xl space-y-2 relative overflow-hidden">
              <h4 className="font-black text-xs text-slate-800 uppercase font-mono">Why Gamified Study works:</h4>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                "Knowing that someone is waiting for you in the study room at 7:00 AM to review chemical kinetics boosts mock test consistency by up to 400%."
              </p>
            </div>
          </div>

          {/* Right interactive Leaderboard card */}
          <div className="lg:col-span-7 bg-white border-2 border-orange-100 rounded-3xl p-6 sm:p-8 shadow-md relative">
            <div className="flex justify-between items-center pb-3 border-b border-orange-50">
              <span className="text-xs font-bold text-slate-600">Top Prep Cohort Performers</span>
              <span className="text-[10px] text-slate-400 font-mono">Points refresh dynamically</span>
            </div>

            {/* Floating High-Five Hearts Overlay Container */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <AnimatePresence>
                {floatingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 0, y: 150, x: heart.x, scale: 0.8 }}
                    animate={{ opacity: 1, y: -80, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-1/3 left-1/2 text-2xl font-bold select-none"
                  >
                    {heart.label}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="space-y-3.5 mt-4">
              {leaderboard.map((user, idx) => {
                const medalColors = ["bg-yellow-400 text-yellow-950", "bg-slate-300 text-slate-900", "bg-orange-400 text-orange-950"];
                return (
                  <div
                    key={user.id}
                    className={`p-3 rounded-2xl border transition-all flex items-center justify-between ${
                      user.isCurrentUser
                        ? "bg-orange-50/50 border-orange-300 shadow-sm"
                        : "bg-[#FFFDF9] border-amber-100 hover:border-orange-100"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {idx < 3 ? (
                        <span className={`w-6 h-6 rounded-full flex items-center justify-center font-display font-black text-xs ${medalColors[idx]}`}>
                          {idx + 1}
                        </span>
                      ) : (
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-mono font-bold text-[10px]">
                          {idx + 1}
                        </span>
                      )}

                      <div className={`w-8 h-8 rounded-full ${user.avatarBg} flex items-center justify-center font-display font-black text-white text-xs shadow-inner`}>
                        {user.avatar}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-xs text-slate-800">{user.name}</span>
                          {user.isCurrentUser && <span className="text-[8px] bg-orange-500 text-white px-1.5 py-0.1 rounded font-bold uppercase tracking-wider">You</span>}
                        </div>
                        <p className="text-[10px] text-slate-400 font-bold">{user.username} · <strong className="text-orange-600">{user.badge}</strong></p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-700 bg-white px-2 py-1 rounded-md border border-amber-100">{user.points} XP</span>
                      <button
                        onClick={(e) => triggerCheer(user.id, e)}
                        className="px-3 py-1.5 rounded-xl bg-orange-100 hover:bg-orange-500 text-orange-700 hover:text-white font-extrabold text-xs transition-all flex items-center gap-1 cursor-pointer"
                      >
                        <Flame className="w-3.5 h-3.5 fill-current" /> High-Five
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* NO-SLOP MANIFESTO SECTION */}
      <section id="manifesto" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-[#1e1b4b] border-2 border-orange-200/30 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-white shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-[90px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-bold">
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                <span>ANTI-AI SLOP HUMAN PREPARATION PLATFORM</span>
              </div>

              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                Our "No-AI-Slop" Human-Only Guarantee
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">
                Most modern education portals have become "AI Slop"—monotonous bots reading answers, fake accounts generated dynamically, and generic automated slide-decks. We pledge absolute human authenticity.
              </p>

              <div className="space-y-3 pt-2 text-xs font-bold">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white font-black" />
                  </div>
                  <div>
                    <strong className="text-white">100% Real Co-Study Partners</strong>
                    <p className="text-slate-400 mt-0.5 font-medium">No bots. Every study twin is a real student registered in your specific target competitive exam.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white font-black" />
                  </div>
                  <div>
                    <strong className="text-white">Reciprocal Learning Value</strong>
                    <p className="text-slate-400 mt-0.5 font-medium">You don't pay money to random tutors. You trade your specialized mastery for their syllabus strengths. Real stakes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-4 h-4 rounded bg-orange-500 text-white flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white font-black" />
                  </div>
                  <div>
                    <strong className="text-white">Live Weekly PYQ Challenges</strong>
                    <p className="text-slate-400 mt-0.5 font-medium">Every Saturday, cohort duos present previous year question walkthroughs live on stages.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4">
              <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">Verification Checklist:</span>
              
              <div className="space-y-2.5 text-xs font-bold">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-300">Pre-recorded Bots</span>
                  <span className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/30">BANNED</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-300">Fake Match Profiles</span>
                  <span className="text-red-400 bg-red-950/50 px-2 py-0.5 rounded border border-red-900/30">ABSENT</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex justify-between items-center">
                  <span className="text-slate-300">Aspirant ID Verification</span>
                  <span className="text-green-400 bg-green-950/50 px-2 py-0.5 rounded border border-green-900/30">MANDATORY</span>
                </div>
              </div>

              <div className="p-3 bg-orange-500/20 border border-orange-500/20 rounded-xl text-[11px] text-orange-300 leading-normal text-center font-bold">
                "We believe real human voice explains a math vector equation 100x better than automated AI bots ever can."
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PASS PLAN PASSPORT & PRICING CALCULATOR */}
      <section id="pricing" className="py-16 bg-[#FFFDF6] border-t border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <div className="text-xs font-mono uppercase tracking-widest text-orange-600 font-bold">COHORT PASS PLANS</div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-slate-900" data-speakable>
              Get Your Unlimited Prep Pass
            </h2>
            <p className="text-slate-600 text-sm font-medium">
              Join interactive cohorts, seek unlimited study twins, participate in study room stages, and get mentorship reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Pricing Pass Options */}
            <div className="lg:col-span-7 bg-white border-2 border-orange-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex justify-between items-center border-b border-orange-50 pb-3">
                <span className="text-sm font-black text-slate-800">Customize Your Pass Coverage</span>
                <span className="text-xs text-orange-600 font-bold uppercase bg-orange-50 px-2 py-0.5 rounded border border-orange-100">Interactive pricing calculator</span>
              </div>

              {/* Toggles */}
              <div className="space-y-4">
                
                {/* Cohort weeks selection */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block">Choose Cohort Prep Duration</span>
                  <div className="grid grid-cols-3 gap-3">
                    {[4, 8, 12].map((weeks) => (
                      <button
                        key={weeks}
                        type="button"
                        onClick={() => {
                          playAudioTone("click");
                          setCohortWeeks(weeks);
                        }}
                        className={`p-3 rounded-2xl text-xs font-extrabold border-2 transition-all cursor-pointer ${
                          cohortWeeks === weeks
                            ? "bg-orange-500 border-orange-600 text-white shadow-sm"
                            : "bg-amber-50/20 border-amber-100 text-slate-700 hover:border-orange-300"
                        }`}
                      >
                        {weeks} Weeks
                        <span className="block text-[10px] opacity-80 font-medium">
                          {weeks === 4 ? "Sprint prep" : weeks === 8 ? "Optimal buffer" : "Mastery complete"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional add-on toggles */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-bold text-slate-700 block">Optional Study Pass Add-ons</span>

                  <label className="flex items-center justify-between p-3 rounded-xl bg-[#FFFDF9] border border-amber-100 hover:border-orange-300 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={priorityAccess}
                        onChange={(e) => {
                          playAudioTone("click");
                          setPriorityAccess(e.target.checked);
                        }}
                        className="w-4 h-4 accent-orange-500 cursor-pointer"
                      />
                      <div>
                        <span className="text-xs font-black text-slate-800 block">Priority Stage Booking</span>
                        <span className="text-[10px] text-slate-500 font-medium">Get priority seating inside high-traffic study rooms & immediate access to expert moderators</span>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold text-orange-600">+₹149</span>
                  </label>

                </div>

              </div>
            </div>

            {/* Right pricing checkout preview card */}
            <div className="lg:col-span-5 bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-5">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-black text-amber-100 uppercase tracking-widest bg-white/15 px-3 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" /> Founding Cohort · Limited Seats
                  </span>
                  <h4 className="text-2xl font-black tracking-tight mt-3">Your Cohort Pass</h4>
                  <p className="text-orange-50 text-xs font-semibold leading-relaxed mt-1.5">
                    Complete access to {cohortWeeks}-week co-learning matches, PYQ board solvers, and live audio stages.
                  </p>
                </div>

                <div className="border-t border-white/20 pt-4 space-y-2">
                  <div className="flex justify-between text-xs font-bold text-orange-50">
                    <span>Base Pass ({cohortWeeks} Weeks)</span>
                    <span>₹{cohortWeeks === 4 ? 499 : cohortWeeks === 8 ? 899 : 1299}</span>
                  </div>
                  {priorityAccess && (
                    <div className="flex justify-between text-xs font-bold text-orange-50">
                      <span>Priority Stage Booking</span>
                      <span>₹149</span>
                    </div>
                  )}
                  <div className="border-t border-white/20 pt-3 flex justify-between items-center">
                    <span className="text-sm font-black uppercase text-orange-50">Total Value</span>
                    <span className="text-3xl font-black text-white">₹{passCost}</span>
                  </div>
                </div>

                {/* Surprise reveal CTA */}
                {!surveyDone ? (
                  <button
                    type="button"
                    id="surprise-seal-btn"
                    onClick={handleClaimPass}
                    className="w-full group relative overflow-hidden rounded-2xl bg-white/15 hover:bg-white/25 border border-white/30 transition-all p-4 text-left cursor-pointer active:scale-[0.98]"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none" />
                    <div className="flex items-center gap-3">
                      <div className="shrink-0 w-11 h-11 rounded-xl bg-white/20 flex items-center justify-center">
                        <Gift className="w-5 h-5 text-white" strokeWidth={2.25} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-sm leading-tight">Unlock your surprise pass</p>
                        <p className="text-[11px] text-orange-100 font-semibold mt-0.5">Tap to reveal what we&apos;ve reserved for you</p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
                    </div>
                  </button>
                ) : (
                  <div className="w-full rounded-2xl border-2 border-emerald-300/50 bg-emerald-500/20 p-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-emerald-200 shrink-0" />
                      <div>
                        <p className="font-black text-white text-sm flex items-center gap-1.5">Pass Claimed <Sparkles className="w-3.5 h-3.5" /></p>
                        <p className="text-[11px] text-orange-100 font-semibold mt-0.5">We&apos;ll reach out to your email with your access.</p>
                      </div>
                    </div>
                  </div>
                )}

                <p className="text-[10px] text-center text-amber-100 font-semibold flex items-center justify-center gap-1.5">
                  <Lock className="w-2.5 h-2.5" /> Secure · No spam · yCohort founding batch
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE FAQ ACCORDION */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <HelpCircle className="w-8 h-8 text-orange-500 mx-auto animate-bounce" />
          <h2 className="font-display font-black text-3xl text-slate-900" data-speakable>
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm font-medium">
            Everything aspirants ask before claiming their Early Bud Pass — matching, pricing, privacy, and how yCohort compares.
          </p>
        </div>

        <div className="space-y-3.5">
          {[
            {
              q: "What is a study twin on yCohort?",
              a: "A study twin is a peer matched on opposite syllabus profiles — they are strong in the chapters where you are weak, and weak in the chapters where you are strong. Every study session becomes a reciprocal trade: you teach what you have mastered while they unlock the topics you struggle with."
            },
            {
              q: "Is yCohort free to use?",
              a: "Yes. The founding cohort gets a free 1-year Early Bud Pass with no credit card required. After the pass, optional paid cohort passes start at ₹499 for a 4-week cohort and go up to ₹1,299 for 12 weeks."
            },
            {
              q: "How does yCohort match study partners?",
              a: "yCohort scans micro-chapters inside your specific exam — for example Rotational Mechanics in JEE Physics or Organic Conversions in NEET Chemistry — and pairs you with peers whose strong areas mirror your weak ones. Matching happens in under three seconds."
            },
            {
              q: "Which exams does yCohort support?",
              a: "yCohort supports JEE Mains, JEE Advanced, NEET, UPSC Civil Services, CAT, NDA, SAT and GRE. The matcher and live audio rooms update dynamically based on the exam you pick, so your study circle is always syllabus-aligned."
            },
            {
              q: "What is the difference between a Study Twin and a Study Buddy?",
              a: "A Study Twin is exclusive and long-term, matched on complementary strengths. A Study Buddy is lightweight and many-to-many, matched on similarity such as same exam, same schedule and same hobbies. You can have only one twin but many buddies."
            },
            {
              q: "Why does yCohort use voice instead of text chat?",
              a: "Explaining a chemical reaction or calculus integral out loud trains active recall and retention far better than typing. Voice study rooms also feel more accountable — partners actually show up. Text chat exists on yCohort, but only for quick coordination."
            },
            {
              q: "How is yCohort different from Unacademy, PhysicsWallah or Vedantu?",
              a: "Unacademy, PhysicsWallah and Vedantu are video-first — you watch recorded classes alone. yCohort is peer-first and voice-first — you learn by teaching another aspirant and getting live help on your weak chapters. There are no recorded lectures on yCohort."
            },
            {
              q: "How much time per week do I need to commit on yCohort?",
              a: "Most active yCohort users spend 5 to 15 hours per week in study rooms — typically two to three 60-minute sessions. There is no minimum, but consistency unlocks streak rewards and better twin matches over time."
            },
            {
              q: "Does yCohort share my phone number or real name?",
              a: "No. yCohort only needs your email to claim a pass. Inside the app you choose a display name and your city is shown as a label only — exact location is never tracked or shared. Phone numbers are never required."
            },
            {
              q: "Does yCohort work for droppers and repeat-year aspirants?",
              a: "Yes. Drop-year aspirants are one of the largest groups on yCohort because they value structured peer accountability the most. The matcher considers your preparation year and target exam date so you get paired with peers on a similar timeline."
            },
            {
              q: "Can I find a study buddy in my own city?",
              a: "Yes. yCohort covers 60+ Indian cities including Delhi, Kota, Hyderabad, Bengaluru, Mumbai, Pune, Lucknow, Patna, Jaipur and Chandigarh. You can filter buddy matches by city, by study habit (early bird or night owl) and by target exam."
            },
            {
              q: "Is there a yCohort mobile app?",
              a: "yCohort runs in any modern browser and works on mobile, tablet and desktop. You can install it to your phone home screen as a Progressive Web App — it behaves like a native app, with voice rooms working smoothly over 4G or Wi-Fi."
            }
          ].map((item, index) => {
            const isOpen = faqOpenIdx === index;
            return (
              <div
                key={index}
                className="bg-white border-2 border-orange-100/80 rounded-2xl p-4 transition-all hover:border-orange-200"
              >
                <button
                  type="button"
                  onClick={() => {
                    playAudioTone("click");
                    setFaqOpenIdx(isOpen ? null : index);
                  }}
                  className="w-full flex justify-between items-center text-left font-extrabold text-sm text-slate-900 cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-orange-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs text-slate-500 leading-relaxed font-semibold pt-2.5 mt-1 border-t border-orange-50">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1e1b4b] text-slate-400 py-12 border-t border-orange-200/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">

          <div className="space-y-4 col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center font-display font-black text-white text-base shadow-md">
                yC
              </div>
              <span className="font-display font-black text-white text-lg tracking-tight">yCohort</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-semibold">
              The active human study system for competitive exams. Swap your syllabus strengths for perfect study twin matches.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Exam Cohorts</h4>
            <ul className="mt-3 space-y-2 text-xs font-bold">
              <li><a href="/jee-study-partner" className="hover:text-white transition-colors">JEE Study Partner</a></li>
              <li><a href="/neet-study-buddy" className="hover:text-white transition-colors">NEET Study Buddy</a></li>
              <li><a href="/upsc-peer-group" className="hover:text-white transition-colors">UPSC Peer Group</a></li>
              <li><a href="/cat-mba-study-group" className="hover:text-white transition-colors">CAT MBA Group</a></li>
              <li><a href="/nda-prep-buddy" className="hover:text-white transition-colors">NDA Prep Buddy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">City Cohorts</h4>
            <ul className="mt-3 space-y-2 text-xs font-bold">
              <li><a href="/study-buddy-delhi" className="hover:text-white transition-colors">Delhi</a></li>
              <li><a href="/study-buddy-kota" className="hover:text-white transition-colors">Kota</a></li>
              <li><a href="/study-buddy-hyderabad" className="hover:text-white transition-colors">Hyderabad</a></li>
              <li><a href="/study-buddy-bengaluru" className="hover:text-white transition-colors">Bengaluru</a></li>
              <li><a href="/study-buddy-mumbai" className="hover:text-white transition-colors">Mumbai</a></li>
              <li><a href="/study-buddy-pune" className="hover:text-white transition-colors">Pune</a></li>
              <li><a href="/study-buddy-lucknow" className="hover:text-white transition-colors">Lucknow</a></li>
              <li><a href="/study-buddy-patna" className="hover:text-white transition-colors">Patna</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Platform Stages</h4>
            <ul className="mt-3 space-y-2 text-xs font-bold">
              <li><a href="#study-rooms" className="hover:text-white transition-colors">Live Audio Channels</a></li>
              <li><a href="#radar-demo" className="hover:text-white transition-colors">Peer Match Radar</a></li>
              <li><a href="#doubt-solver" className="hover:text-white transition-colors">Micro Doubt solvers</a></li>
              <li><a href="#manifesto" className="hover:text-white transition-colors">No-AI-Slop Pledge</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Aspirants Alliance</h4>
            <p className="text-xs text-slate-400 leading-normal mt-3 font-semibold">
              Designed dynamically with yellow, orange, and white warmth to breathe serious study life.
            </p>
            <div className="mt-4 flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-slate-300 font-mono font-bold uppercase tracking-wider">All systems online</span>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-bold">
          <span>&copy; {new Date().getFullYear()} yCohort Alliance. Built for serious exam preparation.</span>
          <div className="flex gap-6">
            <a href="#manifesto" className="hover:text-white transition-colors">Human Privacy</a>
            <a href="#manifesto" className="hover:text-white transition-colors">Anti-Slop Terms</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pass Policy</a>
          </div>
        </div>
      </footer>

      {/* SURPRISE REVEAL + 9-QUESTION SURVEY MODAL */}
      <AnimatePresence>
        {showSurpriseModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSurpriseModal(false)}
              className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              className="bg-white rounded-3xl border-2 border-orange-100 shadow-2xl w-full max-w-md p-6 sm:p-8 relative overflow-hidden z-10 text-slate-800 max-h-[90vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400" />

              <AnimatePresence mode="wait">

                {/* STEP 0 — Surprise Reveal */}
                {surveyStep === 0 && (
                  <motion.div key="reveal" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center space-y-5 pt-2">
                    <motion.div
                      initial={{ rotate: -10, scale: 0.8 }}
                      animate={{ rotate: [0, -8, 8, -5, 5, 0], scale: 1 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                      className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-300/40"
                    >
                      <Gift className="w-10 h-10 text-white" strokeWidth={2.25} />
                    </motion.div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-2">
                        <Sparkles className="w-3 h-3" /> Early Bud Exclusive
                      </span>
                      <h3 className="text-2xl font-black text-slate-900 leading-tight">
                        You're one of our <span className="text-orange-500">Early Buds</span> — and we've got something special locked just for you.
                      </h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed mt-3">
                        As an Early Bud, you unlock <strong className="text-slate-800">1 full year of free access</strong> to the yCohort platform — worth{" "}
                        <span className="line-through text-slate-400">₹{passCost}</span>{" "}
                        <span className="font-black text-emerald-600">₹0</span> — with zero strings attached.
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-left space-y-1.5">
                      {["Live Audio Study Rooms", "Peer Radar Matching", "Doubt Board Access", "Priority Stage Booking"].map((f) => (
                        <div key={f} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                    <div>
                      <button
                        onClick={() => { playAudioTone("success"); setSurveyStep(1); }}
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-4 rounded-2xl transition-all shadow-lg shadow-orange-300/30 active:scale-95 cursor-pointer"
                      >
                        Claim Your Free Pass →
                      </button>
                      <p className="text-[10px] text-slate-400 font-semibold mt-2">Takes 2 min · 9 quick questions · Your email at the end</p>
                    </div>
                  </motion.div>
                )}

                {/* QUESTIONS 1–9 */}
                {surveyStep >= 1 && surveyStep <= 9 && (() => {
                  type SubQ = { label: string; key: string; opts: string[] };
                  type Question = {
                    q: string;
                    sub?: string;
                    kind: "single" | "multi" | "compound" | "city";
                    opts?: string[];
                    min?: number;
                    max?: number;
                    greyOutFromQ?: number;
                    greyLabel?: string;
                    subQuestions?: SubQ[];
                    layout?: "list" | "chips";
                    optional?: boolean;
                  };

                  const getSubjectsForExam = (exam: any): string[] => {
                    switch (exam) {
                      case "NEET | Medical":
                        return ["Physics", "Chemistry", "Botany", "Zoology"];
                      case "JEE | Engineering":
                        return ["Physics", "Chemistry", "Mathematics"];
                      case "UPSC | Civil Services":
                        return ["History", "Geography", "Polity", "Economy", "Environment", "Science & Tech", "Ethics", "Current Affairs", "CSAT"];
                      case "CAT | MBA":
                        return ["Quantitative Aptitude", "Verbal Ability (VARC)", "Logical Reasoning (DILR)"];
                      case "NDA | Army":
                        return ["Mathematics", "English", "General Knowledge", "Physics", "Chemistry", "History", "Geography"];
                      default:
                        return ["Mathematics", "English", "General Studies", "Reasoning", "Aptitude"];
                    }
                  };
                  const examSubjects = getSubjectsForExam(surveyAnswers[1]);

                  const questions: Question[] = [
                    {
                      q: "Which exam are you preparing for?",
                      kind: "single",
                      opts: ["NEET | Medical", "JEE | Engineering", "UPSC | Civil Services", "CAT | MBA", "NDA | Army", "Other Exams"],
                    },
                    {
                      q: "When is your target exam?",
                      kind: "single",
                      opts: ["2026", "2027", "2028", "Not sure yet"],
                    },
                    {
                      q: "How are you preparing?",
                      kind: "single",
                      opts: ["Self study only", "Coaching classes + Self study", "Only coaching classes", "Online courses", "Hybrid | Multiple methods"],
                    },
                    {
                      q: "Your current position?",
                      kind: "single",
                      opts: ["Class 12th", "Under Graduation", "Graduated", "Drop year - 1st attempt", "Working professional"],
                    },
                    {
                      q: "Which subjects are you strong in?",
                      sub: "Pick at least one — this helps us match you.",
                      kind: "multi",
                      opts: examSubjects,
                      min: 1,
                    },
                    {
                      q: "Which subjects are you focusing on?",
                      sub: "Pick at least one — strong subjects are greyed out.",
                      kind: "multi",
                      opts: examSubjects,
                      min: 1,
                      greyOutFromQ: 5,
                      greyLabel: "Already strong",
                    },
                    {
                      q: "What are you into outside studies?",
                      sub: "Pick 3–5 — this is how we find people like you.",
                      kind: "multi",
                      opts: ["Cricket", "Football", "Gym/Fitness", "Running", "Yoga", "Music", "Singing", "Art/Drawing", "Writing", "Photography", "Anime", "Movies & Web series", "Gaming", "Reading", "Coding", "Chess", "Cooking", "Travel"],
                      min: 3,
                      max: 5,
                      layout: "chips",
                    },
                    {
                      q: "Your study style",
                      sub: "Optional — shown on your profile so buddies know how you work.",
                      kind: "compound",
                      optional: true,
                      subQuestions: [
                        { label: "When do you study best?", key: "when", opts: ["Mornings", "Nights"] },
                        { label: "How do you like to study?", key: "how", opts: ["Silent focus", "Discussion"] },
                        { label: "Your session rhythm?", key: "rhythm", opts: ["Long & deep", "Short & frequent"] },
                      ],
                    },
                    {
                      q: "Where are you based?",
                      sub: "Just a label others see — we never track your location.",
                      kind: "city",
                      opts: [
                        "Agra", "Ahmedabad", "Ajmer", "Aligarh", "Allahabad (Prayagraj)", "Amritsar", "Aurangabad",
                        "Bareilly", "Bengaluru", "Bhopal", "Bhubaneswar", "Chandigarh", "Chennai", "Coimbatore",
                        "Dehradun", "Delhi", "Faridabad", "Ghaziabad", "Gorakhpur", "Gurgaon", "Guwahati", "Gwalior",
                        "Hyderabad", "Indore", "Jabalpur", "Jaipur", "Jalandhar", "Jammu", "Jamshedpur", "Jodhpur",
                        "Kanpur", "Kochi", "Kolkata", "Kota", "Lucknow", "Ludhiana", "Madurai", "Meerut", "Mumbai",
                        "Mysuru", "Nagpur", "Nashik", "Noida", "Patna", "Pondicherry", "Pune", "Raipur", "Rajkot",
                        "Ranchi", "Salem", "Shimla", "Srinagar", "Surat", "Thane", "Thiruvananthapuram",
                        "Tiruchirappalli", "Udaipur", "Vadodara", "Varanasi", "Vijayawada", "Visakhapatnam", "Warangal",
                        "Other / Not listed",
                      ],
                    },
                  ];

                  const current = questions[surveyStep - 1];
                  const currentAnswer = surveyAnswers[surveyStep];

                  const canProceed = (): boolean => {
                    if (current.optional) return true;
                    if (current.kind === "single" || current.kind === "city") return !!currentAnswer;
                    if (current.kind === "multi") {
                      const arr = Array.isArray(currentAnswer) ? currentAnswer : [];
                      return current.min ? arr.length >= current.min : arr.length > 0;
                    }
                    return true;
                  };

                  const goNext = () => {
                    if (!canProceed()) return;
                    playAudioTone("click");
                    if (surveyStep === 9) setSurveyStep(10);
                    else setSurveyStep(surveyStep + 1);
                  };

                  const toggleMulti = (opt: string) => {
                    setSurveyAnswers(prev => {
                      const arr: string[] = Array.isArray(prev[surveyStep]) ? prev[surveyStep] : [];
                      if (arr.includes(opt)) {
                        return { ...prev, [surveyStep]: arr.filter(x => x !== opt) };
                      }
                      if (current.max && arr.length >= current.max) return prev;
                      return { ...prev, [surveyStep]: [...arr, opt] };
                    });
                  };

                  const selectionHint = () => {
                    if (current.kind !== "multi") return null;
                    const arr: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                    if (current.max) return `${arr.length}/${current.max} selected`;
                    return `${arr.length} selected`;
                  };

                  return (
                    <motion.div key={`q${surveyStep}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                      {/* Progress bar */}
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-mono font-black text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            Question {surveyStep} of 9
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold">{surveyStep}/9</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                            initial={{ width: `${((surveyStep - 1) / 9) * 100}%` }}
                            animate={{ width: `${(surveyStep / 9) * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-slate-900 leading-snug">{current.q}</h3>
                        {current.sub && (
                          <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{current.sub}</p>
                        )}
                        {current.kind === "multi" && (
                          <p className="text-[10px] font-mono font-black text-orange-500 uppercase tracking-wider mt-1.5">{selectionHint()}</p>
                        )}
                      </div>

                      {/* SINGLE-SELECT */}
                      {current.kind === "single" && current.opts && (
                        <div className="space-y-2.5">
                          {current.opts.map((opt) => {
                            const isSelected = currentAnswer === opt;
                            return (
                              <button
                                key={opt}
                                onClick={() => {
                                  playAudioTone("click");
                                  setSurveyAnswers(prev => {
                                    const updated = { ...prev, [surveyStep]: opt };
                                    if (surveyStep === 1 && prev[1] && prev[1] !== opt) {
                                      delete updated[5];
                                      delete updated[6];
                                    }
                                    return updated;
                                  });
                                }}
                                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all text-sm font-bold flex justify-between items-center cursor-pointer ${
                                  isSelected
                                    ? "border-orange-400 bg-orange-50/60 text-orange-700"
                                    : "border-slate-100 hover:border-orange-300 hover:bg-orange-50/20 text-slate-700"
                                }`}
                              >
                                <span>{opt}</span>
                                <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-orange-500 bg-orange-500" : "border-slate-300"}`}>
                                  {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* MULTI-SELECT — list or chip layout */}
                      {current.kind === "multi" && current.opts && current.layout !== "chips" && (
                        <div className="space-y-2.5">
                          {current.opts.map((opt) => {
                            const arr: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                            const isSelected = arr.includes(opt);
                            const strongPicks: string[] = current.greyOutFromQ && Array.isArray(surveyAnswers[current.greyOutFromQ]) ? surveyAnswers[current.greyOutFromQ] : [];
                            const isGreyed = strongPicks.includes(opt);
                            return (
                              <button
                                key={opt}
                                disabled={isGreyed}
                                onClick={() => {
                                  if (isGreyed) return;
                                  playAudioTone("click");
                                  toggleMulti(opt);
                                }}
                                className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all text-sm font-bold flex justify-between items-center ${
                                  isGreyed
                                    ? "border-slate-100 bg-slate-50/60 text-slate-300 cursor-not-allowed"
                                    : isSelected
                                      ? "border-orange-400 bg-orange-50/60 text-orange-700 cursor-pointer"
                                      : "border-slate-100 hover:border-orange-300 hover:bg-orange-50/20 text-slate-700 cursor-pointer"
                                }`}
                              >
                                <span>{opt}</span>
                                {isGreyed ? (
                                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{current.greyLabel}</span>
                                ) : (
                                  <span className={`w-4 h-4 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-orange-500 bg-orange-500" : "border-slate-300"}`}>
                                    {isSelected && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* MULTI-SELECT — chip layout (for hobbies) */}
                      {current.kind === "multi" && current.opts && current.layout === "chips" && (
                        <div className="flex flex-wrap gap-2">
                          {current.opts.map((opt) => {
                            const arr: string[] = Array.isArray(currentAnswer) ? currentAnswer : [];
                            const isSelected = arr.includes(opt);
                            const atMax = current.max ? arr.length >= current.max : false;
                            const isDisabled = !isSelected && atMax;
                            return (
                              <button
                                key={opt}
                                disabled={isDisabled}
                                onClick={() => {
                                  if (isDisabled) return;
                                  playAudioTone("click");
                                  toggleMulti(opt);
                                }}
                                className={`px-3 py-1.5 rounded-full border-2 text-xs font-bold transition-all ${
                                  isSelected
                                    ? "border-orange-500 bg-orange-50 text-orange-700 cursor-pointer"
                                    : isDisabled
                                      ? "border-slate-100 bg-slate-50/60 text-slate-300 cursor-not-allowed"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-orange-300 cursor-pointer"
                                }`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* COMPOUND (3 sub-questions on one screen) */}
                      {current.kind === "compound" && current.subQuestions && (
                        <div className="space-y-5">
                          {current.subQuestions.map((sq) => {
                            const compoundObj = (typeof currentAnswer === "object" && currentAnswer !== null && !Array.isArray(currentAnswer)) ? currentAnswer : {};
                            return (
                              <div key={sq.key}>
                                <span className="text-[10px] uppercase font-mono font-black text-slate-500 tracking-wider block mb-2">{sq.label}</span>
                                <div className="grid grid-cols-2 gap-2">
                                  {sq.opts.map((opt) => {
                                    const isSelected = compoundObj[sq.key] === opt;
                                    return (
                                      <button
                                        key={opt}
                                        onClick={() => {
                                          playAudioTone("click");
                                          setSurveyAnswers(prev => ({
                                            ...prev,
                                            [surveyStep]: { ...(typeof prev[surveyStep] === "object" && prev[surveyStep] !== null ? prev[surveyStep] : {}), [sq.key]: opt },
                                          }));
                                        }}
                                        className={`px-3 py-2.5 rounded-2xl border-2 text-sm font-bold transition-all cursor-pointer ${
                                          isSelected
                                            ? "border-orange-500 bg-orange-50 text-orange-700"
                                            : "border-slate-200 bg-white text-slate-700 hover:border-orange-300"
                                        }`}
                                      >
                                        {opt}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* CITY SEARCH */}
                      {current.kind === "city" && current.opts && (
                        <div className="space-y-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input
                              type="text"
                              value={citySearchQuery}
                              onChange={(e) => setCitySearchQuery(e.target.value)}
                              placeholder="Search your city"
                              className="w-full bg-slate-50 border-2 border-slate-100 focus:border-orange-400 text-slate-800 rounded-xl pl-9 pr-3 py-2.5 text-sm font-semibold placeholder-slate-400 focus:outline-none transition-all"
                            />
                          </div>
                          <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
                            {current.opts
                              .filter((c) => c.toLowerCase().includes(citySearchQuery.toLowerCase().trim()))
                              .map((city) => {
                                const isSelected = currentAnswer === city;
                                return (
                                  <button
                                    key={city}
                                    onClick={() => {
                                      playAudioTone("click");
                                      setSurveyAnswers(prev => ({ ...prev, [surveyStep]: city }));
                                    }}
                                    className={`w-full text-left p-3 rounded-xl border-2 transition-all text-sm font-bold flex justify-between items-center cursor-pointer ${
                                      isSelected
                                        ? "border-orange-400 bg-orange-50/60 text-orange-700"
                                        : "border-slate-100 hover:border-orange-300 hover:bg-orange-50/20 text-slate-700"
                                    }`}
                                  >
                                    <span>{city}</span>
                                    <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? "border-orange-500 bg-orange-500" : "border-slate-300"}`}>
                                      {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                                    </span>
                                  </button>
                                );
                              })}
                            {current.opts.filter((c) => c.toLowerCase().includes(citySearchQuery.toLowerCase().trim())).length === 0 && (
                              <p className="text-xs text-slate-400 font-semibold text-center py-4">No cities matched. Try "Other / Not listed".</p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Nav controls — Back + Next/Finish */}
                      <div className="flex items-center justify-between gap-3 pt-2">
                        {surveyStep > 1 ? (
                          <button
                            type="button"
                            onClick={() => setSurveyStep(surveyStep - 1)}
                            className="text-xs font-extrabold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer px-2 py-2"
                          >
                            ← Back
                          </button>
                        ) : <span />}
                        <button
                          type="button"
                          disabled={!canProceed()}
                          onClick={goNext}
                          className={`flex-1 max-w-[60%] px-5 py-3 rounded-2xl text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                            canProceed()
                              ? "bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-300/30 active:scale-95 cursor-pointer"
                              : "bg-slate-100 text-slate-400 cursor-not-allowed"
                          }`}
                        >
                          {surveyStep === 9 ? "Finish" : "Next"}
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* STEP 10 — Email Capture */}
                {surveyStep === 10 && (
                  <motion.div key="email" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <span className="text-[10px] font-mono font-black text-orange-600 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                        Last Step — Claim Your Pass
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mt-2 leading-tight">Where shall we send your Early Bud Pass?</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">
                        Drop your email and your <strong className="text-slate-700">free 1-year access pass</strong> will land right in your inbox. No card, no catch.
                      </p>
                    </div>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!surveyEmailInput) return;
                        playAudioTone("success");
                        // Update leaderboard with user
                        const cleanName = surveyEmailInput.split("@")[0];
                        const cleanHandle = `@${cleanName}`;
                        const styleObj = (typeof surveyAnswers[8] === "object" && surveyAnswers[8] !== null) ? surveyAnswers[8] : {};
                        const habitParts = [styleObj.when, styleObj.how, styleObj.rhythm].filter(Boolean);
                        const studyHabit = habitParts.length ? habitParts.join(" · ") : "Flexible";
                        const targetExam = (typeof surveyAnswers[1] === "string" ? surveyAnswers[1] : null) || selectedExam;
                        setStudyBuddies(prev => [{
                          id: `user-buddy-${Date.now()}`, name: cleanName, username: cleanHandle,
                          avatar: (cleanName.charAt(0) || "Y").toUpperCase(), avatarBg: "bg-orange-600",
                          similarityScore: 100, targetExam,
                          activeTopic: "Syllabus coordination", studyHabit,
                          matchReason: "Perfect 100% early-bird match", status: "Online"
                        }, ...prev]);
                        setLeaderboard(prev => {
                          const filtered = prev.filter(i => !i.isCurrentUser);
                          return [{
                            id: "lead-current-user", name: `${cleanName} (You)`, username: cleanHandle,
                            points: 150, avatar: (cleanName.charAt(0) || "Y").toUpperCase(),
                            avatarBg: "bg-slate-800", badge: "Early Bud Explorer", isCurrentUser: true
                          }, ...filtered];
                        });
                        setSurveyDone(true);
                        setSurveyStep(11);

                        // ── Send data to Apps Script → Google Sheets + email ──
                        const _styleObj = (typeof surveyAnswers[8] === "object" && surveyAnswers[8] !== null) ? surveyAnswers[8] : {} as any;
                        const _params = new URLSearchParams({
                          email:      surveyEmailInput,
                          exam:       String(surveyAnswers[1] ?? ""),
                          targetYear: String(surveyAnswers[2] ?? ""),
                          prepStyle:  String(surveyAnswers[3] ?? ""),
                          position:   String(surveyAnswers[4] ?? ""),
                          strongSubs: Array.isArray(surveyAnswers[5]) ? (surveyAnswers[5] as string[]).join(", ") : "",
                          focusSubs:  Array.isArray(surveyAnswers[6]) ? (surveyAnswers[6] as string[]).join(", ") : "",
                          hobbies:    Array.isArray(surveyAnswers[7]) ? (surveyAnswers[7] as string[]).join(", ") : "",
                          studyStyle: [_styleObj.when, _styleObj.how, _styleObj.rhythm].filter(Boolean).join(" · "),
                          city:       String(surveyAnswers[9] ?? ""),
                          passWeeks:  String(cohortWeeks),
                        });
                        fetch(
                          `https://script.google.com/macros/s/AKfycbzMmdeH1BcYVKu7oy1pl6tpg6oUC69CRpKyRtg80HkarPdQZTM0Cn1eCXRs8lP5pr5uvQ/exec?${_params.toString()}`,
                          { method: "GET", mode: "no-cors", redirect: "follow" }
                        ).catch(() => {}); // silent fail — never blocks the user
                      }}
                      className="space-y-3"
                    >
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-wider text-slate-600 block mb-1.5">Your Email Address</label>
                        <input
                          type="email"
                          required
                          value={surveyEmailInput}
                          onChange={(e) => setSurveyEmailInput(e.target.value)}
                          placeholder="aspirant@example.com"
                          className="w-full bg-slate-50 border-2 border-slate-200 focus:border-orange-400 text-slate-800 rounded-xl px-4 py-3 text-sm font-semibold placeholder-slate-400 focus:outline-none transition-all"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm py-4 rounded-2xl transition-all shadow-lg shadow-orange-300/30 active:scale-95 cursor-pointer"
                      >
                        🎁 Send My Free Access Pass
                      </button>
                      <p className="text-[10px] text-center text-slate-400 font-semibold flex items-center justify-center gap-1.5">
                        <Flame className="w-2.5 h-2.5 text-orange-500" /> Only 150 founding passes · first come, first serve
                      </p>
                    </form>
                    <button onClick={() => setSurveyStep(9)} className="text-[11px] font-black text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-wider cursor-pointer">
                      ← Back
                    </button>
                  </motion.div>
                )}

                {/* STEP 11 — Done! */}
                {surveyStep === 11 && (() => {
                  const inviteText = "I just claimed my free 1-year yCohort pass — they're only giving 150 to the founding batch. Grab yours before they're gone:";
                  const inviteUrl = typeof window !== "undefined" ? window.location.origin + "/#pricing" : "https://ycohort.app/#pricing";
                  const shareWhatsapp = () => {
                    playAudioTone("click");
                    const msg = encodeURIComponent(`${inviteText} ${inviteUrl}`);
                    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
                  };
                  const copyInvite = async () => {
                    playAudioTone("click");
                    try {
                      await navigator.clipboard.writeText(`${inviteText} ${inviteUrl}`);
                      setInviteCopied(true);
                      setTimeout(() => setInviteCopied(false), 2000);
                    } catch {
                      setInviteCopied(false);
                    }
                  };

                  return (
                    <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center py-2 space-y-5">
                      <motion.div
                        initial={{ scale: 0.5, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        className="w-20 h-20 mx-auto bg-emerald-100 rounded-full flex items-center justify-center shadow-md"
                      >
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" strokeWidth={2.25} />
                      </motion.div>
                      <div>
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase tracking-widest mb-2">
                          <Sparkles className="w-3 h-3" /> Pass Claimed
                        </span>
                        <h3 className="text-2xl font-black text-slate-900 leading-tight">You&apos;re officially an Early Bud</h3>
                        <p className="text-sm text-slate-500 font-semibold leading-relaxed mt-3 max-w-xs mx-auto">
                          Your <strong className="text-slate-800">1-year free access pass</strong> is heading to{" "}
                          <strong className="text-orange-600 underline">{surveyEmailInput}</strong>.
                        </p>
                      </div>

                      {/* SCARCITY + INVITE FRIENDS — highlighted card */}
                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="relative rounded-2xl overflow-hidden text-left border-2 border-orange-300 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 shadow-md shadow-orange-200/40"
                      >
                        <div className="absolute -top-px right-3 inline-flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest bg-red-500 text-white px-2 py-0.5 rounded-b-md shadow-sm">
                          <Flame className="w-2.5 h-2.5" /> Going Fast
                        </div>
                        <div className="p-4 pt-5">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                              <Users className="w-5 h-5" strokeWidth={2.25} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-black text-slate-900 leading-tight">
                                Invite friends — <span className="text-orange-700">first come, first serve</span>
                              </p>
                              <p className="text-[11px] text-slate-600 font-semibold mt-1 leading-relaxed">
                                Only <strong className="text-orange-700">150 founding passes</strong> are reserved this batch. Share now so your friends move up the queue with you.
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2 mt-3">
                            <button
                              onClick={shareWhatsapp}
                              className="flex items-center justify-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-[11px] font-extrabold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer shadow-sm"
                            >
                              <Send className="w-3.5 h-3.5" strokeWidth={2.5} /> Share on WhatsApp
                            </button>
                            <button
                              onClick={copyInvite}
                              className={`flex items-center justify-center gap-1.5 text-[11px] font-extrabold py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer border-2 ${
                                inviteCopied
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-700"
                                  : "bg-white border-orange-200 text-orange-700 hover:border-orange-400"
                              }`}
                            >
                              {inviteCopied ? (
                                <><Check className="w-3.5 h-3.5" strokeWidth={3} /> Link Copied</>
                              ) : (
                                <><BookOpen className="w-3.5 h-3.5" strokeWidth={2.5} /> Copy Invite Link</>
                              )}
                            </button>
                          </div>
                        </div>
                      </motion.div>

                      <button
                        onClick={() => { playAudioTone("click"); setShowSurpriseModal(false); }}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer uppercase tracking-wider"
                      >
                        Enter the Study Arena →
                      </button>
                    </motion.div>
                  );
                })()}

              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

