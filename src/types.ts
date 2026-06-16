export interface Track {
  id: string;
  name: string;
  type: "synth" | "stream";
  src?: string;
  description: string;
}

export type QuestionType = "mcq" | "tf" | "fib" | "short" | "essay" | "scenario";
export type DifficultyTier = "basic" | "medium" | "hard";
export type AppMode = "upload" | "explore" | "guide" | "assessment" | "flashcards" | "dashboard";

export interface StudySection {
  title: string;
  content: string;
  relevance?: string;
}

export interface KeyConcept {
  concept: string;
  explanation: string;
  importance?: string;
}

export interface VocabWord {
  term: string;
  definition: string;
}

export interface FlashcardItem {
  front: string;
  back: string;
}

export interface StudyGuideData {
  summary: string;
  sections: StudySection[];
  keyConcepts: KeyConcept[];
  vocabulary: VocabWord[];
  flashcards: FlashcardItem[];
}

export interface AssessmentQuestion {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[]; // MCQs & True/False
  correctAnswer?: string; // MCQs, TF, Fill in the blanks, Short Answer matching
  sampleAnswer?: string; // Essays, Scenario models
  gradingCriteria?: string; // Essay checklist points
  explanation: string;
}

export interface QuizHistory {
  id: string;
  fileName: string;
  score: number;
  total: number;
  difficulty: DifficultyTier;
  date: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  xpToNextLevel: number;
  dailyStreak: number;
  lastActiveDate: string; // ISO String
  totalFocusSeconds: number; // For Pomodoro tracked study hours
  quizHistory: QuizHistory[];
  masteredTermsCount: number;
  completedStudiesCount: number;
  unlockedAchievements?: string[];
}
