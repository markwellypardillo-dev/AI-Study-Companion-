import { useState } from "react";
import { ChevronLeft, ChevronRight, Rotate3d, CheckCircle2, Bookmark, Award } from "lucide-react";
import { FlashcardItem } from "../types";
import { triggerConfettiWithSound as confetti } from "../lib/sounds";

interface FlashcardsProps {
  cards: FlashcardItem[];
  onMasterTerm: () => void;
}

export default function Flashcards({ cards, onMasterTerm }: FlashcardsProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredIndices, setMasteredIndices] = useState<number[]>([]);

  if (!cards || cards.length === 0) {
    return (
      <div className="p-8 text-center bg-ios-light-secondary dark:bg-ios-dark-secondary rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 text-ios-secondary-text">
        No flashcards generated yet. Please upload a study document to get started.
      </div>
    );
  }

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const markMastered = (index: number) => {
    if (!masteredIndices.includes(index)) {
      setMasteredIndices([...masteredIndices, index]);
      onMasterTerm();

      // Fun micro-confetti for a quick reward
      confetti({
        particleCount: 25,
        spread: 40,
        origin: { y: 0.8 }
      });
    }
  };

  const isMastered = masteredIndices.includes(currentIndex);
  const completionPercentage = ((masteredIndices.length) / cards.length) * 100;

  return (
    <div id="flashcards-view" className="max-w-xl mx-auto flex flex-col items-center py-6 px-4">
      <div className="w-full flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-black dark:text-white">Interactive Flashcards</h2>
          <p className="text-xs text-ios-secondary-text mt-0.5">Toggle to retrieve key terms from memory</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ios-secondary-text bg-ios-light-secondary dark:bg-ios-dark-secondary px-3 py-1 rounded-full font-medium">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>{masteredIndices.length} / {cards.length} Got it!</span>
        </div>
      </div>

      {/* Progress visual line */}
      <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-900 rounded-full mb-8 overflow-hidden">
        <div
          className="h-full bg-brand-indigo transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* 3D Flippable card frame */}
      <div
        id={`flashcard-wrapper-${currentIndex}`}
        className="w-full h-80 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* Front of Card */}
          <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-brand-indigo/10 to-ios-light-secondary dark:from-ios-dark-secondary dark:to-black border-2 border-brand-indigo/20 dark:border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-md hover:border-brand-indigo/40 dark:hover:border-zinc-700 transition-all">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase bg-brand-indigo/10 text-brand-indigo px-2.5 py-1 rounded-lg font-semibold tracking-wider">
                Question / Concept
              </span>
              <Bookmark className="w-4 h-4 text-brand-indigo" />
            </div>

            <div className="my-auto text-center px-4">
              <p className="text-2xl font-extrabold text-black dark:text-white tracking-tight leading-snug">
                {currentCard.front}
              </p>
            </div>

            <div className="flex justify-between items-center text-xs text-ios-secondary-text font-medium">
              <span>Card {currentIndex + 1} of {cards.length}</span>
              <span className="flex items-center gap-1 text-brand-indigo font-semibold animate-pulse">
                <Rotate3d className="w-4 h-4" /> Tap to reveal answer
              </span>
            </div>
          </div>

          {/* Back of Card */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-black dark:to-ios-dark-secondary border-2 border-zinc-800 rounded-3xl p-8 flex flex-col justify-between shadow-md">
            <div className="flex justify-between items-start">
              <span className="text-xs uppercase bg-brand-indigo/20 text-brand-indigo px-2.5 py-1 rounded-lg font-semibold tracking-wider">
                Explanation / Answer
              </span>
              <CheckCircle2 className={`w-5 h-5 ${isMastered ? "text-emerald-400" : "text-zinc-600"}`} />
            </div>

            <div className="my-auto px-2 overflow-y-auto max-h-40">
              <p className="text-base leading-relaxed text-zinc-250 text-center font-medium text-white">
                {currentCard.back}
              </p>
            </div>

            <div className="flex justify-between items-center border-t border-zinc-800/80 pt-4">
              <span className="text-xs text-ios-secondary-text">Card {currentIndex + 1} of {cards.length}</span>
              <button
                id={`btn-master-${currentIndex}`}
                onClick={(e) => {
                  e.stopPropagation();
                  markMastered(currentIndex);
                }}
                disabled={isMastered}
                className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1 ${
                  isMastered
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-brand-indigo text-white hover:scale-105 active:scale-95"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {isMastered ? "Mastered!" : "Mark Got It (+25 XP)"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation and Actions */}
      <div className="flex items-center justify-between w-full mt-8 gap-4">
        <button
          id="btn-flashcard-prev"
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-ios-light-secondary dark:bg-ios-dark-secondary text-black dark:text-white hover:opacity-85 font-semibold text-sm active:scale-95 transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>

        <span className="text-xs font-semibold text-ios-secondary-text uppercase tracking-widest text-center my-auto">
          Drag / Click anywhere to flip
        </span>

        <button
          id="btn-flashcard-next"
          onClick={handleNext}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-ios-light-secondary dark:bg-ios-dark-secondary text-black dark:text-white hover:opacity-85 font-semibold text-sm active:scale-95 transition-all"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {masteredIndices.length === cards.length && (
        <div className="mt-8 bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-center">
          <p className="text-xs font-bold text-amber-500">🎉 Flashcard Pro Achievement Unlocked!</p>
          <p className="text-xxs text-amber-500/80 mt-1">You mastered all concepts from this study guide!</p>
        </div>
      )}
    </div>
  );
}
