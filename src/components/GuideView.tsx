import { useState } from "react";
import { BookOpen, Key, Brain, ListCollapse, Search, BookMarked, HelpCircle, GraduationCap, ChevronRight } from "lucide-react";
import { StudyGuideData } from "../types";

interface GuideViewProps {
  guide: StudyGuideData;
  fileName: string;
}

export default function GuideView({ guide, fileName }: GuideViewProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "notes" | "concepts" | "vocabulary">("summary");
  const [vocabSearch, setVocabSearch] = useState<string>("");

  if (!guide) {
    return (
      <div className="p-8 text-center bg-ios-light-secondary dark:bg-ios-dark-secondary rounded-3xl border border-zinc-200 dark:border-zinc-800 text-ios-secondary-text">
        No study guide generated. Please complete a document extraction first.
      </div>
    );
  }

  // Filter vocabulary words based on search term
  const filteredVocab = guide.vocabulary.filter((v) =>
    v.term.toLowerCase().includes(vocabSearch.toLowerCase()) ||
    v.definition.toLowerCase().includes(vocabSearch.toLowerCase())
  );

  return (
    <div id="study-guide-screen" className="max-w-4xl mx-auto py-4 px-2">
      {/* Subject Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-zinc-250 dark:border-zinc-800/80 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-1 text-xs text-brand-indigo font-bold uppercase tracking-wide">
            <GraduationCap className="w-3.5 h-3.5" /> Core Course Syllabus
          </div>
          <h1 className="text-2xl font-black text-black dark:text-white tracking-tight mt-1">
            {fileName.replace(/\.[^/.]+$/, "")}
          </h1>
          <p className="text-xs text-ios-secondary-text mt-1">
            AI-Engineered Study Blueprint • Grounded in Document Source
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="relative mb-8">
        <div className="flex gap-2 p-1 bg-ios-light-secondary dark:bg-ios-dark-secondary rounded-2xl overflow-x-auto scroller-hidden pr-8 md:pr-1">
          <button
            id="btn-tab-summary"
            onClick={() => setActiveTab("summary")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "summary"
                ? "bg-white dark:bg-zinc-800 text-brand-indigo shadow-sm"
                : "text-ios-secondary-text hover:text-black dark:hover:text-white"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Summary
          </button>
          <button
            id="btn-tab-notes"
            onClick={() => setActiveTab("notes")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "notes"
                ? "bg-white dark:bg-zinc-800 text-brand-indigo shadow-sm"
                : "text-ios-secondary-text hover:text-black dark:hover:text-white"
            }`}
          >
            <ListCollapse className="w-4 h-4" /> Structured Notes
          </button>
          <button
            id="btn-tab-concepts"
            onClick={() => setActiveTab("concepts")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "concepts"
                ? "bg-white dark:bg-zinc-800 text-brand-indigo shadow-sm"
                : "text-ios-secondary-text hover:text-black dark:hover:text-white"
            }`}
          >
            <Brain className="w-4 h-4" /> Key Concepts
          </button>
          <button
            id="btn-tab-vocabulary"
            onClick={() => setActiveTab("vocabulary")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "vocabulary"
                ? "bg-white dark:bg-zinc-800 text-brand-indigo shadow-sm"
                : "text-ios-secondary-text hover:text-black dark:hover:text-white"
            }`}
          >
            <BookMarked className="w-4 h-4" /> Vocabulary Glossary
          </button>
        </div>
        {/* Mobile Swipe Hint */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-ios-light-secondary dark:from-ios-dark-secondary to-transparent pointer-events-none flex items-center justify-end pr-2 md:hidden rounded-r-2xl">
          <ChevronRight className="w-4 h-4 text-ios-secondary-text animate-pulse" />
        </div>
      </div>

      {/* Tab Contents */}
      <div id="guide-tab-viewport" className="transition-all duration-300">
        
        {/* Summary Tab */}
        {activeTab === "summary" && (
          <div className="bg-ios-light-secondary dark:bg-ios-dark-secondary border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-lg font-black text-black dark:text-white flex items-center gap-2 mb-4 animate-fade-in">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-indigo animate-pulse" /> Executive Digest
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-black/85 dark:text-zinc-300">
              {guide.summary.split("\n\n").map((para, idx) => (
                <p key={idx} className="indent-2">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Structured Notes Tab */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            {guide.sections.map((section, idx) => (
              <div
                key={idx}
                id={`note-chapter-${idx}`}
                className="bg-ios-light-secondary dark:bg-ios-dark-secondary border border-zinc-200 dark:border-zinc-800 hover:border-brand-indigo dark:hover:border-zinc-700 rounded-2xl p-6 shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between border-b border-zinc-200/50 dark:border-zinc-800/50 pb-3 mb-4">
                  <h3 className="font-extrabold text-base text-black dark:text-white flex items-center gap-2">
                    <span className="w-6 h-6 rounded-lg bg-brand-indigo/10 text-brand-indigo flex items-center justify-center text-xs font-bold font-mono">
                      {idx + 1}
                    </span>
                    {section.title}
                  </h3>
                </div>

                {/* Bullet Points format parsing */}
                <div className="space-y-2">
                  {section.content.split("\n").filter(line => line.trim().length > 0).map((bullet, bidx) => (
                    <div key={bidx} className="flex items-start gap-2.5 text-sm my-1">
                      <span className="text-brand-indigo font-extrabold mt-0.5">•</span>
                      <p className="text-black/85 dark:text-zinc-300 leading-relaxed font-normal">
                        {bullet.replace(/^-\s*/, "").replace(/^\*\s*/, "")}
                      </p>
                    </div>
                  ))}
                </div>

                {section.relevance && (
                  <div className="mt-4 bg-brand-indigo/5 border border-zinc-200/80 dark:border-zinc-850 p-3 rounded-xl flex items-start gap-2 text-xs">
                    <HelpCircle className="w-4 h-4 text-brand-indigo shrink-0 mt-0.5" />
                    <p className="text-ios-secondary-text italic">
                      <strong className="text-black dark:text-white not-italic font-bold">Why it matters:</strong> {section.relevance}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Key Concepts Bento Tab */}
        {activeTab === "concepts" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guide.keyConcepts.map((item, idx) => (
              <div
                key={idx}
                id={`concept-card-${idx}`}
                className="bg-ios-light-secondary dark:bg-ios-dark-secondary border border-zinc-200 dark:border-zinc-800 hover:border-brand-indigo dark:hover:border-zinc-700 rounded-3xl p-6 shadow-sm flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/25">
                      <Key className="w-3.5 h-3.5" /> Core Concept
                    </span>
                    <span className="text-xs text-ios-secondary-text font-bold font-mono">#{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-black dark:text-white tracking-tight leading-snug">
                    {item.concept}
                  </h3>
                  <p className="text-sm text-ios-secondary-text leading-relaxed mt-3">
                    {item.explanation}
                  </p>
                </div>
                {item.importance && (
                  <div className="border-t border-zinc-200/50 dark:border-zinc-800/50 pt-4 mt-4 text-xs font-medium text-ios-secondary-text bg-ios-light-bg dark:bg-ios-dark-bg px-3 py-2 rounded-xl">
                    <strong className="text-black dark:text-white font-bold">Importance:</strong> {item.importance}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Vocabulary Search Dictionary Tab */}
        {activeTab === "vocabulary" && (
          <div className="bg-ios-light-secondary dark:bg-ios-dark-secondary border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-black text-black dark:text-white">Word Dictionary</h2>
                <p className="text-xs text-ios-secondary-text mt-1">Search or review important key terminology from this lesson</p>
              </div>
              
              {/* Filter Search Input box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-ios-secondary-text absolute top-1/2 left-3 transform -translate-y-1/2" />
                <input
                  id="inp-dictionary-search"
                  type="text"
                  placeholder="Find a terms or root word..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-ios-light-bg dark:bg-ios-dark-bg border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none focus:border-brand-indigo focus:ring-1 focus:ring-brand-indigo text-black dark:text-white/90 transition-all font-semibold"
                />
              </div>
            </div>

            {/* Vocabulary Dictionary list */}
            {filteredVocab.length > 0 ? (
              <div className="divide-y divide-zinc-200/50 dark:divide-zinc-800/50 font-sans">
                {filteredVocab.map((item, idx) => (
                  <div key={idx} id={`vocab-item-${idx}`} className="py-4 first:pt-0 last:pb-0 flex flex-col md:flex-row md:items-start gap-2 md:gap-6 group">
                    <div className="md:w-1/4 font-extrabold text-sm text-brand-indigo group-hover:translate-x-1 transition-transform">
                      {item.term}
                    </div>
                    <div className="md:w-3/4 text-sm text-black/85 dark:text-white/85 font-normal leading-relaxed">
                      {item.definition}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-ios-secondary-text text-xs font-semibold">
                No matching terms found. Try adjusting your filter query!
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
