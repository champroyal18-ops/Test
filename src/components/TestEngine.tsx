import React from 'react';
import { Question, NEETTest } from '../types';
import { Clock, AlertTriangle, ChevronLeft, ChevronRight, HelpCircle, CheckSquare, Sparkles } from 'lucide-react';

interface TestEngineProps {
  test: NEETTest;
  onSubmit: (responses: Record<string, 'A' | 'B' | 'C' | 'D' | ''>, timeSpentSeconds: number) => void;
  onCancel: () => void;
}

export default function TestEngine({ test, onSubmit, onCancel }: TestEngineProps) {
  // Timer state
  const totalSeconds = test.durationMinutes * 60;
  const [timeLeft, setTimeLeft] = React.useState(totalSeconds);
  
  // Scoring state
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [responses, setResponses] = React.useState<Record<string, 'A' | 'B' | 'C' | 'D' | ''>>({});
  const [markedForReview, setMarkedForReview] = React.useState<string[]>([]);
  const [visitedIds, setVisitedIds] = React.useState<string[]>([]);

  // Initialize first question as visited
  React.useEffect(() => {
    if (test.questions.length > 0) {
      setVisitedIds([test.questions[0].id]);
    }
  }, [test]);

  // Unified interval for countdown
  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit on timeout
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = test.questions[currentIdx];

  // Group question indices by Subject and Section for high fidelity navigation
  const subjects = ['Physics', 'Chemistry', 'Botany', 'Zoology'] as const;

  const getQuestionSectionCount = (sub: string, sec: 'A' | 'B') => {
    return test.questions.filter(q => q.subject === sub && q.section === sec).length;
  };

  const getSectBAnsweredCount = (sub: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology') => {
    const sectBQs = test.questions.filter(q => q.subject === sub && q.section === 'B');
    let answerCount = 0;
    sectBQs.forEach(q => {
      if (responses[q.id]) answerCount++;
    });
    return answerCount;
  };

  const handleSelectOption = (option: 'A' | 'B' | 'C' | 'D') => {
    if (!currentQuestion) return;

    // Enforce Section B rule: max 10 answers per subject section B
    if (currentQuestion.section === 'B') {
      const answeredAlready = getSectBAnsweredCount(currentQuestion.subject);
      const isOverwritingExisting = !!responses[currentQuestion.id];

      // If already answered 10 and trying to write a new one (not editing a currently answered one)
      if (answeredAlready >= 10 && !isOverwritingExisting) {
        alert(`NTA NEET Regulations Guard: You have already answered the maximum allowed 10 questions in Section B for ${currentQuestion.subject}. To attempt this question, please clear your response on another Section B question first.`);
        return;
      }
    }

    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: option
    }));
  };

  const handleClearResponse = () => {
    if (!currentQuestion) return;
    setResponses(prev => ({
      ...prev,
      [currentQuestion.id]: ''
    }));
  };

  const handleToggleReview = () => {
    if (!currentQuestion) return;
    const qid = currentQuestion.id;
    setMarkedForReview(prev =>
      prev.includes(qid) ? prev.filter(id => id !== qid) : [...prev, qid]
    );
    // Automatically advance
    handleNext();
  };

  const handleNext = () => {
    if (currentIdx < test.questions.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      const nextQId = test.questions[nextIdx].id;
      if (!visitedIds.includes(nextQId)) {
        setVisitedIds(prev => [...prev, nextQId]);
      }
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleJumpToQuestion = (index: number) => {
    setCurrentIdx(index);
    const qid = test.questions[index].id;
    if (!visitedIds.includes(qid)) {
      setVisitedIds(prev => [...prev, qid]);
    }
  };

  const handleFinalSubmit = () => {
    const timeSpent = totalSeconds - timeLeft;
    onSubmit(responses, timeSpent);
  };

  // Human readable time formatter
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs > 0 ? `${hrs}:` : ''}${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Determine question state styles for index grid
  const getQuestionButtonClass = (q: Question, idx: number) => {
    const isCurrent = idx === currentIdx;
    const isAnswered = !!responses[q.id];
    const isMarked = markedForReview.includes(q.id);
    const isVisited = visitedIds.includes(q.id);

    let bg = 'bg-slate-50 border-slate-200 text-slate-500';
    if (isCurrent) {
      bg = 'bg-slate-800 text-white ring-2 ring-slate-400 ring-offset-1';
    } else if (isMarked && isAnswered) {
      bg = 'bg-purple-600 text-white border-purple-700'; // Answered & Marked (treated as evaluated in some formats, but with purple indicator)
    } else if (isMarked) {
      bg = 'bg-violet-500 text-white border-violet-600'; // Marked for Review
    } else if (isAnswered) {
      bg = 'bg-emerald-500 text-white border-emerald-600'; // Answered
    } else if (isVisited) {
      bg = 'bg-rose-500 text-white border-rose-600'; // Visited but not answered
    }

    return bg;
  };

  const getQStatusIcon = (status: 'answered' | 'unattempted' | 'marked' | 'visited' | 'notvisited') => {
    switch(status) {
      case 'answered': return 'bg-emerald-500';
      case 'unattempted': return 'bg-rose-500';
      case 'marked': return 'bg-violet-500';
      case 'notvisited': return 'bg-slate-100 border border-slate-350';
      default: return 'bg-slate-300';
    }
  };

  // Helper properties
  const totalQuestions = test.questions.length;
  const totalAnswered = Object.values(responses).filter(v => v !== '').length;
  const totalMarked = markedForReview.length;
  const totalNotVisited = totalQuestions - visitedIds.length;
  const totalVisitedNotAnswered = visitedIds.length - totalAnswered;

  return (
    <div className="flex flex-col lg:flex-row gap-6 min-h-[580px] select-none" id="live-test-active-arena">
      
      {/* Left side: Questions Panel */}
      <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl border border-slate-150 shadow-sm p-6 lg:p-8">
        <div>
          {/* Header section with category selection and info */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-6">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">NEET Simulated Portal</span>
              <h2 className="text-lg font-bold text-slate-800 line-clamp-1 mt-0.5">{test.title}</h2>
            </div>
            
            {/* Countdown widget */}
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-colors ${
              timeLeft < 300 
                ? 'bg-rose-50 text-rose-600 border-rose-200 animate-pulse'
                : 'bg-slate-50 text-slate-700 border-slate-150'
            }`}>
              <Clock className="w-4 h-4 shrink-0" />
              <span>Time Left: {formatTime(timeLeft)}</span>
            </div>
          </div>

          {currentQuestion ? (
            <div>
              {/* Question metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className={`px-2.5 py-1 text-[11px] font-bold rounded uppercase tracking-wider ${
                  currentQuestion.subject === 'Physics' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                  currentQuestion.subject === 'Chemistry' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                  currentQuestion.subject === 'Botany' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                  'bg-purple-50 text-purple-600 border border-purple-100'
                }`}>
                  {currentQuestion.subject}
                </span>

                <span className="px-2 py-0.5 text-xs font-semibold text-slate-500 bg-slate-100 rounded">
                  Section {currentQuestion.section}
                </span>

                <span className={`px-2 py-0.5 text-xs font-medium rounded ${
                  currentQuestion.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' :
                  currentQuestion.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' :
                  'bg-rose-50 text-rose-700'
                }`}>
                  {currentQuestion.difficulty}
                </span>

                {currentQuestion.section === 'B' && (
                  <span className="text-[11px] font-medium text-amber-600 flex items-center gap-1 bg-amber-50 px-2 py-1.5 rounded-lg">
                    <AlertTriangle className="w-3.5 h-3.5" /> Max 10 attempts allowed in Sec B!
                  </span>
                )}
              </div>

              {/* Question text */}
              <div className="mb-6">
                <span className="text-sm font-semibold text-slate-400 block mb-1">Question {currentIdx + 1} of {test.questions.length}</span>
                <p className="text-slate-800 text-base font-medium leading-relaxed whitespace-pre-wrap">
                  {currentQuestion.questionText}
                </p>
              </div>

              {/* MCQ Options list */}
              <div className="space-y-3 mb-8">
                {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                  const isChecked = responses[currentQuestion.id] === optKey;
                  return (
                    <button
                      key={optKey}
                      id={`opt-btn-${optKey}`}
                      onClick={() => handleSelectOption(optKey)}
                      className={`w-full flex items-start gap-4 p-4 rounded-xl border text-left transition-all ${
                        isChecked
                          ? 'border-teal-500 bg-teal-50/40 font-medium'
                          : 'border-slate-150 hover:bg-slate-50/50 hover:border-slate-300'
                      }`}
                    >
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold grow-0 shrink-0 ${
                        isChecked 
                          ? 'bg-teal-600 text-white' 
                          : 'bg-slate-100 text-slate-600 border border-slate-200'
                      }`}>
                        {optKey}
                      </span>
                      <p className={`text-sm leading-relaxed ${isChecked ? 'text-teal-900' : 'text-slate-700'}`}>
                        {currentQuestion.options[optKey]}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-slate-500">No active questions found in this test payload.</p>
            </div>
          )}
        </div>

        {/* Question Footer: Navigation Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-150 mt-4">
          <div className="flex flex-wrap gap-2">
            <button
              id="test-prev-btn"
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <button
              id="test-next-btn"
              onClick={handleNext}
              disabled={currentIdx === test.questions.length - 1}
              className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              id="test-clear-btn"
              onClick={handleClearResponse}
              className="px-4 py-2.5 border border-rose-200 text-rose-700 hover:bg-rose-50/50 rounded-xl text-xs font-semibold transition"
            >
              Clear Choice
            </button>

            <button
              id="test-review-btn"
              onClick={handleToggleReview}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                markedForReview.includes(currentQuestion?.id || '')
                  ? 'bg-violet-100 text-violet-800 border-violet-200'
                  : 'bg-white border-violet-200 text-violet-700 hover:bg-violet-50'
              }`}
            >
              {markedForReview.includes(currentQuestion?.id || '') ? 'Starred for Review' : 'Star for Review'}
            </button>
          </div>
        </div>
      </div>

      {/* Right side: Sidebar Exam Navigation Grid */}
      <div className="w-full lg:w-80 space-y-4">
        
        {/* Statistics breakdown widget */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-sm p-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Live Progress Grid</h3>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-emerald-500 shrink-0" />
              <span className="text-slate-600 font-medium">Answered ({totalAnswered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-rose-500 shrink-0" />
              <span className="text-slate-600 font-medium">Not Answered ({totalVisitedNotAnswered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-violet-500 shrink-0" />
              <span className="text-slate-600 font-medium">Marked ({totalMarked})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-350 shrink-0" />
              <span className="text-slate-600 font-medium">Not Visited ({totalNotVisited})</span>
            </div>
          </div>
        </div>

        {/* Interactive question jumper palette */}
        <div className="bg-white rounded-2xl border border-slate-150 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Question Palette</h4>
            <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-600">Unified Mode</span>
          </div>

          <div className="max-h-60 overflow-y-auto pr-1">
            {subjects.map((sub) => {
              const subQuestions = test.questions.map((q, index) => ({ q, index })).filter(item => item.q.subject === sub);
              if (subQuestions.length === 0) return null;

              return (
                <div key={sub} className="mb-4">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase mb-2 tracking-wider">{sub}</h5>
                  <div className="grid grid-cols-5 gap-1.5">
                    {subQuestions.map(({ q, index }) => (
                      <button
                        key={q.id}
                        id={`palette-key-${index}`}
                        onClick={() => handleJumpToQuestion(index)}
                        className={`aspect-square w-full rounded-lg border text-xs font-bold flex items-center justify-center transition-all ${
                          getQuestionButtonClass(q, index)
                        }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Footer: Submit and Quit */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <button
              id="test-grid-submit"
              onClick={() => {
                if (confirm("Are you sure you want to end and submit your NEET mock exam? This triggers instant scoring and NCERT review analysis.")) {
                  handleFinalSubmit();
                }
              }}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm hover:shadow transition flex items-center justify-center gap-1.5"
            >
              <CheckSquare className="w-4 h-4 animate-pulse" /> Submit Mock Test
            </button>
            <button
              id="test-grid-cancel"
              onClick={() => {
                if (confirm("Cancel current test? Your ongoing responses on this card series will be discarded.")) {
                  onCancel();
                }
              }}
              className="w-full py-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-xl text-xs font-medium transition"
            >
              Abandon Test
            </button>
          </div>
        </div>

        {/* NTA NEET Tip module */}
        <div className="p-4 bg-teal-50 border border-teal-100 rounded-2xl flex gap-3 text-teal-800">
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed">
            <strong>NEET Marking Scheme Warning:</strong> 
            <p className="mt-1">Correct attempt gets <span className="font-bold text-emerald-600">+4</span> marks, incorrect attempts result in positive <span className="font-bold text-rose-600">-1</span> penalty, unattempted is <span className="font-bold">0</span>. Educated guessing is recommended only for high-probability option eliminations.</p>
          </div>
        </div>

      </div>

    </div>
  );
}
