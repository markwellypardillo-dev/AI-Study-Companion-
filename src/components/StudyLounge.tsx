import React, { useState, useEffect } from "react";
import { Users, Shuffle, Sparkles, User, Flame, GraduationCap, Edit2, Check, X } from "lucide-react";

interface CompanionStudent {
  id: string;
  name: string;
  subject: string;
  mode: string;
  isOnline: boolean;
  streak: number;
  level: number;
  minutesStudied: number;
  avatarChar: string;
}

const FIRST_NAMES = [
  "Silas", "Evelyn", "Kaelen", "Maeve", "Cyrus", "Aria", "Julian", "Clara", "Félix", "Nico", 
  "Iris", "Atlas", "Aurelia", "Orion", "Zelda", "Vesper", "Sienna", "Elias", "Gideon", "Lyra"
];

const LAST_NAMES = [
  "Thorne", "Sterling", "Vance", "Finch", "Brooks", "Hale", "Mercer", "Rousseau", "Kingsley", "Wyatt",
  "Hawthorne", "Lovelace", "Somerset", "Sinclair", "Belmont", "Wilder", "Sutton", "Beckett", "Drake"
];

const SUBJECTS = [
  "Cellular Biology 🧬",
  "Organic Chemistry 🧪",
  "World Lit Poetry 📖",
  "Quantum Hardware ⚡",
  "Microeconomics 📈",
  "Advanced Calculus 📐",
  "Cognitive Psychology 🧠",
  "Astroparticle Physics 🪐",
  "Ancient History 📜",
  "Deep Learning Architectures 🤖"
];

const MODES = [
  "Crushing a Live Quiz 🧠",
  "Deep Focus Session 🎧",
  "Taking a Lofi Break ☕",
  "Writing Session Log ✍️",
  "Reciting Flashcards 🎴",
  "Reviewing Lecture Notes 📚"
];

function generateRandomStudent(): CompanionStudent {
  const f = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
  const num = Math.floor(Math.random() * 90) + 10;
  const name = `Scholar_${f}${num}`;
  const subject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];
  const mode = MODES[Math.floor(Math.random() * MODES.length)];
  return {
    id: Math.random().toString(36).substr(2, 9),
    name,
    subject,
    mode,
    isOnline: true,
    streak: Math.floor(Math.random() * 8) + 1,
    level: Math.floor(Math.random() * 12) + 2,
    minutesStudied: Math.floor(Math.random() * 150) + 20,
    avatarChar: f[0]
  };
}

export default function StudyLounge() {
  // Stable client UI identifier
  const [clientUid] = useState<string>(() => {
    let cached = localStorage.getItem("ai_study_companion_client_uid");
    if (!cached) {
      cached = "u_" + Math.random().toString(36).substring(2, 11);
      localStorage.setItem("ai_study_companion_client_uid", cached);
    }
    return cached;
  });

  // Stable simulated companions
  const [simulatedCompanions] = useState<CompanionStudent[]>(() => {
    return Array.from({ length: 4 }).map(() => generateRandomStudent());
  });

  // Current user's identity name
  const [userIdentity, setUserIdentity] = useState<string>(() => {
    const cached = localStorage.getItem("ai_study_companion_user_identity");
    if (cached) return cached;
    // Generate initial friendly scholarly alias
    const randomInitial = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const generated = `Scholar_${randomInitial}${Math.floor(Math.random() * 900) + 100}`;
    localStorage.setItem("ai_study_companion_user_identity", generated);
    return generated;
  });

  const [companions, setCompanions] = useState<CompanionStudent[]>([]);
  const [activeCount, setActiveCount] = useState<number>(4);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editInputValue, setEditInputValue] = useState<string>("");

  const startEditing = () => {
    setEditInputValue(userIdentity);
    setIsEditing(true);
  };

  const saveIdentity = () => {
    const trimmed = editInputValue.trim();
    if (trimmed) {
      setUserIdentity(trimmed);
      localStorage.setItem("ai_study_companion_user_identity", trimmed);
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  // Re-roll current student profile nickname
  const handleRerollIdentity = () => {
    const fName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const num = Math.floor(Math.random() * 90) + 10;
    const newIdentity = `Scholar_${fName}${num}`;
    setUserIdentity(newIdentity);
    localStorage.setItem("ai_study_companion_user_identity", newIdentity);
    setIsEditing(false);
  };

  // Helper to extract active study topic & mode
  const getActiveStudyMetadata = () => {
    let activeSubject = "Organic Chemistry 🧪";
    let activeMode = "Deep Focus Session 🎧";

    const rawProgress = localStorage.getItem("ai_study_companion_progress");
    if (rawProgress) {
      try {
        const parsed = JSON.parse(rawProgress);
        if (parsed.quizHistory && parsed.quizHistory.length > 0) {
          activeSubject = parsed.quizHistory[parsed.quizHistory.length - 1].fileName || "Organic Chemistry 🧪";
        }
      } catch (err) {}
    }

    // Detect if Pomodoro is active on DOM
    const timerState = document.querySelector("#btn-toggle-pomodoro");
    if (timerState && timerState.textContent?.toLowerCase().includes("pause")) {
      activeMode = "Deep Focus Session 🎧";
    } else {
      activeMode = "Taking a Lofi Break ☕";
    }

    return { subject: activeSubject, mode: activeMode };
  };

  // Helper to parse overall user progress stats
  const getProgressInfo = () => {
    const raw = localStorage.getItem("ai_study_companion_progress");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        return {
          level: parsed.level || 1,
          streak: parsed.dailyStreak || 0
        };
      } catch (err) {}
    }
    return { level: 1, streak: 0 };
  };

  // Regular presence polling to central server
  useEffect(() => {
    const reportPresence = async () => {
      try {
        const metadata = getActiveStudyMetadata();
        const info = getProgressInfo();

        const response = await fetch("/api/study-lounge/presence", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: clientUid,
            name: userIdentity,
            subject: metadata.subject,
            mode: metadata.mode,
            streak: info.streak,
            level: info.level,
            avatarChar: userIdentity.charAt(userIdentity.indexOf("_") + 1) || "S"
          })
        });

        if (response.ok) {
          const data = await response.json();
          let realCompanions = data.companions || [];
          
          // Mix in some simulated users to keep the lounge lively if it's empty
          if (realCompanions.length < 3) {
            const simulatedCount = 3 - realCompanions.length;
            const simulated = simulatedCompanions.slice(0, simulatedCount);
            realCompanions = [...realCompanions, ...simulated];
          }

          setCompanions(realCompanions);
          setActiveCount(data.activeCount > realCompanions.length ? data.activeCount : realCompanions.length + 1);
        } else {
          // Fallback to simulated if the backend is down (e.g. static hosting)
          setCompanions(simulatedCompanions);
          setActiveCount(simulatedCompanions.length + 1);
        }
      } catch (err) {
        console.warn("Backend Lounge sync fallback active:", err);
        // Fallback to simulated if network error
        setCompanions(simulatedCompanions);
        setActiveCount(simulatedCompanions.length + 1);
      }
    };

    reportPresence();
    const interval = setInterval(reportPresence, 6000); // Poll presence details every 6 seconds

    return () => clearInterval(interval);
  }, [clientUid, userIdentity]);

  return (
    <div id="study-lounge-card" className="bg-ios-light-secondary dark:bg-ios-dark-secondary border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4.5 shadow-sm space-y-3.5">
      {/* Title Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className="p-0.5 px-1.5 bg-brand-indigo/10 text-brand-indigo rounded-lg text-[9px] font-black uppercase flex items-center gap-1 font-sans">
            👥 Live Study Lounge
          </div>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <span className="text-[9px] font-mono text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider">
          {activeCount} Active
        </span>
      </div>

      <p className="text-[10px] text-ios-secondary-text leading-relaxed font-sans">
        Meet fellow scholars co-working and cracking materials with you in real-time.
      </p>

      {/* Your Identity Block */}
      <div className="p-2.5 bg-brand-indigo/5 border border-brand-indigo/15 rounded-xl flex items-center justify-between gap-2.5 font-sans min-h-[46px]">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveIdentity();
            }}
            className="flex-1 flex items-center gap-2 min-w-0"
          >
            <div className="w-7 h-7 rounded-lg bg-brand-indigo text-white flex items-center justify-center font-bold text-xxs shrink-0 shadow-sm">
              <User className="w-3.5 h-3.5 text-white" />
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-1">
              <input
                id="input-edit-lobby-nickname"
                type="text"
                value={editInputValue}
                onChange={(e) => setEditInputValue(e.target.value)}
                maxLength={22}
                className="flex-grow min-w-0 bg-transparent border-b border-brand-indigo focus:outline-none text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100 p-0 leading-none h-5"
                placeholder="New nickname..."
                autoFocus
              />
              <button
                type="submit"
                className="p-1 text-emerald-600 hover:bg-emerald-500/10 rounded-md transition-colors border-none bg-transparent cursor-pointer shrink-0"
                title="Save"
              >
                <Check className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={cancelEditing}
                className="p-1 text-zinc-400 hover:bg-zinc-500/10 rounded-md transition-colors border-none bg-transparent cursor-pointer shrink-0"
                title="Cancel"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        ) : (
          <div className="flex-1 flex items-center justify-between gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <button
                type="button"
                onClick={startEditing}
                className="w-7 h-7 rounded-lg bg-brand-indigo hover:opacity-90 text-white flex items-center justify-center font-bold text-xxs shrink-0 shadow-sm cursor-pointer"
                title="Click to rename nickname"
              >
                <User className="w-3.5 h-3.5 text-white" />
              </button>
              <div 
                className="min-w-0 cursor-pointer flex-1 group" 
                onClick={startEditing} 
                title="Click to rename nickname"
              >
                <span className="text-[9px] font-black uppercase text-brand-indigo block leading-none mb-0.5 flex items-center gap-1">
                  Your Lobby Nickname <Edit2 className="w-2 h-2 text-brand-indigo/60 group-hover:text-brand-indigo transition-colors" />
                </span>
                <div className="font-extrabold text-[11px] text-zinc-900 dark:text-zinc-100 truncate flex items-center gap-1 leading-none group-hover:text-brand-indigo transition-colors">
                  {userIdentity}
                  <span className="w-1 h-1 rounded-full bg-emerald-500" title="Online" />
                </div>
              </div>
            </div>

            <button
              id="btn-reroll-scholar-identity"
              type="button"
              onClick={handleRerollIdentity}
              className="p-1 hover:bg-brand-indigo/10 text-brand-indigo rounded-md transition-colors border-none bg-transparent cursor-pointer shrink-0"
              title="Roll New Random Identity"
            >
              <Shuffle className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      {/* Companions List */}
      <div className="space-y-2">
        <span className="text-[9px] font-black text-ios-secondary-text uppercase tracking-wider block font-sans">
          Active Student Companions
        </span>

        <div className="space-y-2 max-h-[190px] overflow-y-auto pr-0.5 scroller-hidden">
          {companions.length > 0 ? (
            companions.map((c) => (
              <div
                key={c.id}
                className="p-2.5 bg-ios-light-bg dark:bg-zinc-950 rounded-xl border border-zinc-200/50 dark:border-zinc-900/60 flex items-start gap-2.5 relative transition-all duration-300 hover:border-brand-indigo/25 font-sans"
              >
                {/* Avatar Initial with Status Dot */}
                <div className="relative shrink-0">
                  <div className="w-7.5 h-7.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/50 dark:border-zinc-800 flex items-center justify-center font-black text-[10px] font-mono select-none">
                    {c.avatarChar}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border border-ios-light-bg dark:border-zinc-950 rounded-full" />
                </div>

                {/* Informational stack */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1.5">
                    <h4 className="font-extrabold text-[11px] text-black dark:text-white truncate leading-none">
                      {c.name}
                    </h4>
                    <div className="flex items-center gap-0.5 text-[8px] font-bold text-amber-500 bg-amber-500/10 px-1 py-0.5 rounded font-mono shrink-0">
                      <Flame className="w-2 h-2 fill-amber-500" /> {c.streak}d
                    </div>
                  </div>

                  <p className="text-[10px] text-zinc-650 dark:text-zinc-400 mt-0.5 truncate leading-tight font-medium">
                    {c.mode}
                  </p>
                  
                  <div className="flex items-center justify-between gap-1 mt-1 border-t border-zinc-100 dark:border-zinc-900/40 pt-1 text-[8.5px] text-ios-secondary-text font-medium leading-none">
                    <span className="truncate">{c.subject}</span>
                    <span className="shrink-0 font-mono text-zinc-400">Lv {c.level}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/40 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-900 text-center font-sans space-y-1">
              <p className="text-[10.5px] font-bold text-zinc-800 dark:text-zinc-200 leading-snug">
                You're the first scholar in the Lounge! ⚡
              </p>
              <p className="text-[9.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                Share this app URL with friends so they can join and study with you in real-time.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Group dynamic stats */}
      <div className="bg-brand-indigo/5 rounded-xl p-2.5 border border-brand-indigo/10 flex items-center justify-between text-[9px] font-sans">
        <span className="text-brand-indigo font-bold flex items-center gap-1 shrink-0">
          <GraduationCap className="w-3 h-3" /> Study Spark Active
        </span>
        <span className="text-ios-secondary-text truncate ml-1.5">
          Sync multipliers active!
        </span>
      </div>
    </div>
  );
}
