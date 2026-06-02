import React from 'react';
import { TestAttempt, Question } from '../types';
import { Check, X, AlertCircle, ArrowLeft, RefreshCw, Sparkles, ChevronDown, ChevronUp, BookOpen, Clock, Heart } from 'lucide-react';

interface ReviewCenterProps {
  attempt: TestAttempt;
  questions: Question[];
  onBack: () => void;
}

// Quick custom markdown and formula styling engine
function formatAIExplanation(text: string): React.JSX.Element {
  if (!text) return <></>;

  // Split lines
  const lines = text.split('\n');
  return (
    <div className="space-y-2 text-slate-100 text-sm font-sans leading-relaxed">
      {lines.map((line, idx) => {
        let clean = line.trim();
        
        // Skip empty lines
        if (!clean) return <div key={idx} className="h-2" />;

        // Check for headers (e.g., ### Title or **TITLE**)
        if (clean.startsWith('###')) {
          return <h5 key={idx} className="text-sm font-extrabold text-teal-300 mt-3">{clean.replace('###', '').trim()}</h5>;
        }
        if (clean.startsWith('##')) {
          return <h4 key={idx} className="text-base font-extrabold text-teal-300 mt-4 border-b border-teal-900 pb-1">{clean.replace('##', '').trim()}</h4>;
        }
        if (clean.startsWith('1.') || clean.startsWith('2.') || clean.startsWith('3.') || clean.startsWith('4.')) {
          return (
            <div key={idx} className="pl-2 font-semibold text-teal-100 mt-3 border-l-2 border-teal-500 pl-3">
              {applyInlineFormatting(clean)}
            </div>
          );
        }

        // Bullet items
        if (clean.startsWith('-') || clean.startsWith('*')) {
          return (
            <li key={idx} className="list-none flex items-start gap-2 pl-4 text-slate-350">
              <span className="text-teal-400 mt-1 shrink-0">•</span>
              <span className="flex-1">{applyInlineFormatting(clean.substring(1).trim())}</span>
            </li>
          );
        }

        return <p key={idx} className="text-slate-300">{applyInlineFormatting(clean)}</p>;
      })}
    </div>
  );
}

// Applies basic bold/italic transformations inline
function applyInlineFormatting(text: string) {
  // Regex pattern to capture **bold text**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="text-white font-bold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ReviewCenter({ attempt, questions, onBack }: ReviewCenterProps) {
  const [expandedQId, setExpandedQId] = React.useState<string | null>(null);
  const [aiExplanations, setAiExplanations] = React.useState<Record<string, string>>({});
  const [loadingIds, setLoadingIds] = React.useState<string[]>([]);
  const [errorIds, setErrorIds] = React.useState<Record<string, string>>({});

  // Fetch AI explanation for a single question
  const fetchAIExplanation = async (q: Question) => {
    const qid = q.id;
    if (aiExplanations[qid]) {
      // Toggle instead if already fetched
      setExpandedQId(expandedQId === qid ? null : qid);
      return;
    }

    setLoadingIds(prev => [...prev, qid]);
    setErrorIds(prev => {
      const copy = { ...prev };
      delete copy[qid];
      return copy;
    });

    const userResponse = attempt.responses[q.id] || '';

    try {
      const response = await fetch("/api/explain-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: q.questionText,
          options: q.options,
          correctAnswer: q.correctAnswer,
          userResponse,
          subject: q.subject,
          chapter: q.chapter
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Server connection failed");
      }

      const data = await response.json();
      setAiExplanations(prev => ({
        ...prev,
        [qid]: data.explanation
      }));
      setExpandedQId(qid);
    } catch (e: any) {
      console.error(e);
      setErrorIds(prev => ({
        ...prev,
        [qid]: e.message || "Failed to contact study coach. Please verify your GEMINI_API_KEY details."
      }));
    } finally {
      setLoadingIds(prev => prev.filter(id => id !== qid));
    }
  };

  const getAccuracy = () => {
    if (attempt.correctAnswers === 0) return 0;
    const attempted = attempt.correctAnswers + attempt.incorrectAnswers;
    return attempted > 0 ? Math.round((attempt.correctAnswers / attempted) * 100) : 0;
  };

  const getVibeStatus = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 85) return { text: "Outstanding Merit", color: "text-emerald-600 bg-emerald-50", desc: "You are on track for a top-tier MBBS medical seat of government caliber." };
    if (pct >= 65) return { text: "Competitive Pace", color: "text-teal-600 bg-teal-50", desc: "Solid grasp of concepts! Tighten negative mark areas to step up." };
    if (pct >= 40) return { text: "Foundation Active", color: "text-amber-600 bg-amber-50", desc: "Regular revision of NCERT checklists recommended. Emphasize Biology speed rounds." };
    return { text: "Focus Run Needed", color: "text-rose-600 bg-rose-50", desc: "Review syllabus structures and solve chapter specific daily trivia quizzes." };
  };

  const durationStr = () => {
    const m = Math.floor(attempt.timeSpentSeconds / 60);
    const s = attempt.timeSpentSeconds % 60;
    return `${m}m ${s}s`;
  };

  const statusVibe = getVibeStatus(attempt.score, attempt.totalPossibleMarks);

  return (
    <div id="exam-review-panel" className="space-y-6">
      
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <button
          id="review-back-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-xs transition"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back to Dashboard
        </button>
        <span className="text-xs text-slate-400 font-medium font-mono">Attempted: {new Date(attempt.dateStr).toLocaleString()}</span>
      </div>

      {/* Visual Report Card card */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-150 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          
          {/* Main Score Panel */}
          <div className="text-center md:border-r border-slate-100 pb-6 md:pb-0">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">NEET SCORING</span>
            <div className="inline-flex items-baseline text-slate-800">
              <span className="text-5xl font-black">{attempt.score}</span>
              <span className="text-lg text-slate-400 font-semibold ml-1">/ {attempt.totalPossibleMarks}</span>
            </div>
            
            <div className={`mt-3 inline-block px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${statusVibe.color}`}>
              {statusVibe.text}
            </div>
            <p className="text-xs text-slate-500 mt-2 max-w-[200px] mx-auto leading-relaxed">
              {statusVibe.desc}
            </p>
          </div>

          {/* Quick Metrics columns */}
          <div className="col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="bg-slate-50 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Correct</span>
              <span className="text-xl font-bold text-emerald-600 block mt-1">+{attempt.correctAnswers}</span>
              <span className="text-[9px] text-slate-400">({attempt.correctAnswers * 4} Marks)</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Incorrect</span>
              <span className="text-xl font-bold text-rose-600 block mt-1">-{attempt.incorrectAnswers}</span>
              <span className="text-[9px] text-slate-400">({attempt.incorrectAnswers * 1} Deductions)</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Accuracy</span>
              <span className="text-xl font-bold text-teal-600 block mt-1">{getAccuracy()}%</span>
              <span className="text-[9px] text-slate-400">Of attempted</span>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase block tracking-wider">Time Taken</span>
              <span className="text-xl font-bold text-slate-700 block mt-1">{durationStr()}</span>
              <span className="text-[9px] text-slate-400">Of total allowed</span>
            </div>
          </div>

        </div>
      </div>

      {/* Analysis list title */}
      <div>
        <h3 className="font-bold text-slate-800 text-base mb-1">Grid by Question & AI Breakdown</h3>
        <p className="text-xs text-slate-500">
          Review which topics you missed and call on our live AI tutoring coach for standard NCERT solutions.
        </p>
      </div>

      {/* List of graded questions */}
      <div className="space-y-4">
        {questions.map((q, qidx) => {
          const userSel = attempt.responses[q.id] || '';
          const isCorrect = userSel === q.correctAnswer;
          const isUnattempted = userSel === '';
          const isExpanded = expandedQId === q.id;
          const isLoading = loadingIds.includes(q.id);
          const hasError = errorIds[q.id];

          return (
            <div 
              key={q.id}
              className={`bg-white rounded-xl border transition-all ${
                isCorrect 
                  ? 'border-emerald-100 hover:border-emerald-200 shadow-emerald-50/10' 
                  : isUnattempted
                  ? 'border-slate-150 hover:border-slate-200'
                  : 'border-rose-100 hover:border-rose-200 shadow-rose-50/10'
              }`}
            >
              
              {/* Question metadata row */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      Q {qidx + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-600">
                      {q.subject}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      • {q.chapter}
                    </span>
                  </div>
                  
                  <h4 className="text-sm font-semibold text-slate-800 pt-1 leading-relaxed">
                    {q.questionText}
                  </h4>
                </div>

                {/* Score Status tags */}
                <div className="shrink-0 flex items-center gap-2.5">
                  {isCorrect ? (
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded border border-emerald-100 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Correct (+4)
                    </span>
                  ) : isUnattempted ? (
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 font-bold text-xs rounded border border-slate-150">
                      Skipped (0)
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 bg-rose-50 text-rose-700 font-bold text-xs rounded border border-rose-150 flex items-center gap-1">
                      <X className="w-3.5 h-3.5" /> Wrong (-1)
                    </span>
                  )}
                </div>
              </div>

              {/* Options details bar */}
              <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Core Correct Key:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded ml-2">
                    Option {q.correctAnswer}: {q.options[q.correctAnswer]}
                  </span>
                </div>
                {!isUnattempted && (
                  <div>
                    <span className="text-slate-400 font-medium">Your response:</span>
                    <span className={`font-bold border px-2 py-0.5 rounded ml-2 ${
                      isCorrect 
                        ? 'text-emerald-700 bg-emerald-50 border-emerald-100' 
                        : 'text-rose-700 bg-rose-50 border-rose-100'
                    }`}>
                      Option {userSel}: {q.options[userSel as 'A'|'B'|'C'|'D']}
                    </span>
                  </div>
                )}
              </div>

              {/* Expand section/ tutors toggle bar */}
              <div className="px-5 py-3 border-t border-slate-50 bg-slate-50/50 rounded-b-xl flex justify-between items-center flex-wrap gap-2">
                <div className="text-xs text-slate-400 font-medium">
                  NCERT aligned explanation available below.
                </div>
                
                <div className="flex gap-2">
                  {/* Basic local explanation toggle */}
                  {q.explanation && (
                    <button
                      id={`btn-exp-local-${q.id}`}
                      onClick={() => setExpandedQId(expandedQId === q.id ? null : q.id)}
                      className="text-xs text-slate-500 hover:text-slate-800 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      {isExpanded ? 'Hide Concept Notes' : 'Concept Notes'}
                    </button>
                  )}

                  {/* High class AI Tutor coach trigger */}
                  <button
                    id={`btn-exp-ai-${q.id}`}
                    disabled={isLoading}
                    onClick={() => fetchAIExplanation(q)}
                    className="px-3.5 py-1.5 bg-slate-900 border border-slate-800 disabled:opacity-50 text-white hover:bg-slate-800 text-[11px] font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    )}
                    {aiExplanations[q.id] ? (isExpanded ? 'Collapse AI Coach' : 'Reveal AI Coach') : 'Consult AI Study Coach'}
                  </button>
                </div>
              </div>

              {/* The expanded panels */}
              {isExpanded && (
                <div className="bg-slate-950 p-6 rounded-b-xl border-t border-slate-905 transition-all">
                  
                  {/* Local text explanation */}
                  {!aiExplanations[q.id] && q.explanation && (
                    <div className="text-slate-200 text-xs font-sans leading-relaxed">
                      <div className="uppercase tracking-widest text-[10px] text-teal-400 font-black mb-1.5 flex items-center gap-1">
                        <BookOpen className="w-3 h-3" /> Core NCERT Textbook Guidelines:
                      </div>
                      <p className="border-l-2 border-teal-500 pl-3 italic text-xs text-slate-350">{q.explanation}</p>
                    </div>
                  )}

                  {/* AI response panel */}
                  {aiExplanations[q.id] && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="uppercase tracking-widest text-[9px] text-teal-400 font-extrabold flex items-center gap-1.5 bg-teal-950/50 px-2 py-1 rounded">
                          <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Active AI Medical Professor Lesson
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">Reference: NEET-UG Syllabus</span>
                      </div>
                      
                      {formatAIExplanation(aiExplanations[q.id])}
                    </div>
                  )}
                  
                </div>
              )}

              {/* Error boundary container */}
              {hasError && (
                <div className="bg-rose-50 border-t border-rose-100 p-4 rounded-b-xl text-rose-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>{hasError}</p>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
export { applyInlineFormatting, formatAIExplanation };
