import React from 'react';
import { SyllabusSyllabus } from '../data/mockTests';
import { chapterQuizzes, ChapterQuizQuestion } from '../data/chapterQuizzes';
import { ChapterProgress, NEETTest } from '../types';
import { neetPyqs } from '../data/neetPyqs';
import { 
  Sparkles, Award, Trophy, Users, CheckCircle, XCircle, ChevronRight, 
  RefreshCw, Play, BookOpen, AlertCircle, ArrowLeft, BarChart3, Clock, HelpCircle,
  Search
} from 'lucide-react';

interface AITSPortalProps {
  progress: Record<string, ChapterProgress>;
  onToggleProgress: (chapterId: string, flag: 'ncertRead' | 'notesRevised' | 'mcqsSolved') => void;
  onStartTest: (test: NEETTest) => void;
}

// Simulated AITS Leaderboard competitors
const simulatedCompetitors = [
  { rank: 1, name: "Aarav Sharma", state: "Delhi", score: 710, accuracy: 98, percentile: "99.99" },
  { rank: 2, name: "Prisha Patel", state: "Gujarat", score: 705, accuracy: 97, percentile: "99.98" },
  { rank: 3, name: "Aditi Rao", state: "Karnataka", score: 695, accuracy: 96, percentile: "99.95" },
  { rank: 4, name: "Sai Karthik", state: "Andhra Pradesh", score: 692, accuracy: 95, percentile: "99.93" },
  { rank: 5, name: "Rahul Deshmukh", state: "Maharashtra", score: 688, accuracy: 95, percentile: "99.90" },
  { rank: 6, name: "Ananya Sen", state: "West Bengal", score: 685, accuracy: 94, percentile: "99.88" },
  { rank: 7, name: "Ketan Meena", state: "Rajasthan", score: 680, accuracy: 94, percentile: "99.85" }
];

export default function AITSPortal({
  progress,
  onToggleProgress,
  onStartTest
}: AITSPortalProps) {
  // Navigation: 'aits', 'quizzes' or 'pyqs'
  const [subTab, setSubTab] = React.useState<'aits' | 'quizzes' | 'pyqs'>('quizzes');
  
  // PYQ search and filters state
  const [pyqSearch, setPyqSearch] = React.useState('');
  const [pyqSubject, setPyqSubject] = React.useState<'All' | 'Physics' | 'Chemistry' | 'Botany' | 'Zoology'>('All');
  const [pyqYear, setPyqYear] = React.useState<'All' | '2024' | '2023' | '2022' | '2021'>('All');
  const [pyqCardAnswers, setPyqCardAnswers] = React.useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({});

  // Dynamic custom PYQ mock generator state
  const [mockPyqSubject, setMockPyqSubject] = React.useState<'All' | 'Physics' | 'Chemistry' | 'Botany' | 'Zoology'>('All');
  const [mockPyqYear, setMockPyqYear] = React.useState<'All' | '2024' | '2023' | '2022' | '2021'>('All');
  const [mockPyqCount, setMockPyqCount] = React.useState<number>(5);
  const [mockPyqError, setMockPyqError] = React.useState('');

  const handleStartCustomPyqTest = () => {
    setMockPyqError('');
    let filtered = neetPyqs;
    if (mockPyqSubject !== 'All') {
      filtered = filtered.filter(q => q.subject === mockPyqSubject);
    }
    if (mockPyqYear !== 'All') {
      filtered = filtered.filter(q => q.year.toString() === mockPyqYear);
    }

    if (filtered.length === 0) {
      setMockPyqError('No matching PYQs found for the selected subject/year combination.');
      return;
    }

    // Shuffle and pick
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, Math.min(mockPyqCount, shuffled.length));

    const testTitle = `NEET PYQs: ${mockPyqSubject === 'All' ? 'Mixed' : mockPyqSubject} (${mockPyqYear === 'All' ? '2021-2024' : mockPyqYear})`;
    
    const pyqTest: NEETTest = {
      id: `pyq-mock-${Date.now()}`,
      title: testTitle,
      description: `Authentic NEET previous year mock session containing ${selectedQuestions.length} real questions. Score correctly using NTA grading specs (+4 / -1 marks).`,
      durationMinutes: Math.max(2, Math.round(selectedQuestions.length * 1.2)),
      questions: selectedQuestions,
      isFullSyllabus: mockPyqSubject === 'All'
    };

    onStartTest(pyqTest);
  };
  
  // Chapter-wise selection state
  const [selectedSubject, setSelectedSubject] = React.useState<'All' | 'Physics' | 'Chemistry' | 'Botany' | 'Zoology'>('All');
  
  // Live Active Quiz State
  const [activeQuizChapter, setActiveQuizChapter] = React.useState<{ id: string; name: string; subject: string } | null>(null);
  const [currentQuizQuestions, setCurrentQuizQuestions] = React.useState<ChapterQuizQuestion[]>([]);
  const [quizIdx, setQuizIdx] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [quizAnswers, setQuizAnswers] = React.useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [quizScore, setQuizScore] = React.useState({ correct: 0, total: 0 });
  const [quizFinished, setQuizFinished] = React.useState(false);

  // Filter Chapters
  const chaptersList = SyllabusSyllabus.filter((c) => selectedSubject === 'All' || c.subject === selectedSubject);

  // Launch a chapter quiz
  const handleStartChapterQuiz = (chapterId: string, chapterName: string, subject: string) => {
    const questions = chapterQuizzes[chapterId] || [];
    if (questions.length === 0) {
      alert("No pre-compiled questions found for this subtopic. Our dynamic AI engine on the dashboard is ready to compile a quiz for you!");
      return;
    }
    setActiveQuizChapter({ id: chapterId, name: chapterName, subject });
    setCurrentQuizQuestions(questions);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setQuizAnswers({});
    setQuizScore({ correct: 0, total: questions.length });
    setQuizFinished(false);
  };

  // Select option in chapter quiz
  const handleSelectOption = (opt: 'A' | 'B' | 'C' | 'D') => {
    if (selectedAnswer !== null) return; // Answer locked
    setSelectedAnswer(opt);
    setQuizAnswers(prev => ({ ...prev, [quizIdx]: opt }));
    
    // Check correctness
    const currentQ = currentQuizQuestions[quizIdx];
    if (opt === currentQ.correctAnswer) {
      setQuizScore(prev => ({ ...prev, correct: prev.correct + 1 }));
    }
  };

  // Advance to next question in chapter quiz
  const handleNextQuizQuestion = () => {
    if (quizIdx < currentQuizQuestions.length - 1) {
      setQuizIdx(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      // Finished! Sync with App progress state
      setQuizFinished(true);
      if (activeQuizChapter) {
        // Automatically check the MCQs Solved box in the syllabus tracker!
        const isAlreadyChecked = progress[activeQuizChapter.id]?.mcqsSolved;
        if (!isAlreadyChecked) {
          onToggleProgress(activeQuizChapter.id, 'mcqsSolved');
        }
      }
    }
  };

  // Exit chapter quiz
  const handleExitQuiz = () => {
    setActiveQuizChapter(null);
    setCurrentQuizQuestions([]);
    setQuizIdx(0);
    setSelectedAnswer(null);
    setQuizAnswers({});
    setQuizFinished(false);
  };

  // Calculated variables for percent completion
  const totalChapters = SyllabusSyllabus.length;
  const completedQuizzes = SyllabusSyllabus.filter(c => progress[c.id]?.mcqsSolved).length;
  const quizPercent = Math.round((completedQuizzes / totalChapters) * 100);

  return (
    <div id="aits-portal-container" className="space-y-6">

      {/* Main Tab bar */}
      <div className="bg-white rounded-2xl border border-slate-150 p-1.5 flex flex-wrap sm:flex-nowrap gap-2 shadow-sm w-full max-w-2xl mx-auto">
        <button
          id="btn-subtab-quizzes"
          onClick={() => { if (!activeQuizChapter) setSubTab('quizzes'); }}
          disabled={!!activeQuizChapter}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'quizzes' 
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 disabled:opacity-50'
          }`}
        >
          <BookOpen className="w-4 h-4" /> NCERT Chapter Quizzes
        </button>
        <button
          id="btn-subtab-pyqs"
          onClick={() => { if (!activeQuizChapter) setSubTab('pyqs'); }}
          disabled={!!activeQuizChapter}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'pyqs' 
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 disabled:opacity-50'
          }`}
        >
          <Award className="w-4 h-4 text-amber-500" /> NEET PYQs (2021-2024)
        </button>
        <button
          id="btn-subtab-aits"
          onClick={() => { if (!activeQuizChapter) setSubTab('aits'); }}
          disabled={!!activeQuizChapter}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            subTab === 'aits'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800 disabled:opacity-50'
          }`}
        >
          <Trophy className="w-4 h-4" /> All India Test (AITS)
        </button>
      </div>

      {/* CHAPTER QUIZ ACTIVE GAME AREA */}
      {activeQuizChapter ? (
        <div className="bg-white rounded-2xl border border-slate-150 shadow-md p-6 max-w-3xl mx-auto" id="active-chapter-quiz-engine">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
            <button
              id="quiz-leave-btn"
              onClick={handleExitQuiz}
              className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-xs font-bold transition"
            >
              <ArrowLeft className="w-4 h-4" /> Return to List
            </button>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-teal-600">{activeQuizChapter.subject} UNIT QUIZ</span>
              <h4 className="text-xs text-slate-400 max-w-[250px] truncate leading-none">{activeQuizChapter.name}</h4>
            </div>
          </div>

          {!quizFinished ? (
            <div className="space-y-6">
              {/* Progress and status */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Question {quizIdx + 1} of {currentQuizQuestions.length}</span>
                <div className="flex gap-1.5">
                  {currentQuizQuestions.map((_, i) => (
                    <span 
                      key={i} 
                      className={`h-2 w-8 rounded-full transition ${
                        i === quizIdx 
                          ? 'bg-teal-500' 
                          : quizAnswers[i] !== undefined 
                            ? 'bg-emerald-200' 
                            : 'bg-slate-100'
                      }`} 
                    />
                  ))}
                </div>
              </div>

              {/* Question card */}
              <div className="space-y-4">
                <p className="text-base text-slate-800 font-semibold leading-relaxed">
                  {currentQuizQuestions[quizIdx].questionText}
                </p>

                {/* Option selection blocks with instant feedback */}
                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                    const isSelected = selectedAnswer === opt;
                    const isCorrect = currentQuizQuestions[quizIdx].correctAnswer === opt;
                    const isAnswered = selectedAnswer !== null;

                    let buttonClass = 'border-slate-200 hover:bg-slate-50/50 hover:border-slate-350 cursor-pointer';
                    let leadingClass = 'bg-slate-100 text-slate-600 border border-slate-200';

                    if (isAnswered) {
                      if (isCorrect) {
                        buttonClass = 'border-emerald-500 bg-emerald-50/50 text-emerald-900 font-semibold';
                        leadingClass = 'bg-emerald-600 text-white';
                      } else if (isSelected) {
                        buttonClass = 'border-rose-400 bg-rose-50/50 text-rose-900';
                        leadingClass = 'bg-rose-600 text-white';
                      } else {
                        buttonClass = 'border-slate-200 text-slate-400 opacity-60';
                        leadingClass = 'bg-slate-50 text-slate-400 border border-slate-100';
                      }
                    }

                    return (
                      <button
                        key={opt}
                        id={`quiz-opt-${opt}`}
                        disabled={isAnswered}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition ${buttonClass}`}
                      >
                        <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 ${leadingClass}`}>
                          {opt}
                        </span>
                        <span className="text-sm leading-relaxed">{currentQuizQuestions[quizIdx].options[opt]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Instant explanation feedback shown right after locking choice */}
              {selectedAnswer !== null && (
                <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl border border-slate-800 space-y-3 animate-fade-in">
                  <div className="flex items-center justify-between border-b border-slate-850 pb-2">
                    <span className="text-[10px] uppercase tracking-widest font-extrabold text-teal-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> High-yield NCERT concept key
                    </span>
                    <span className={`text-xs font-bold uppercase ${
                      selectedAnswer === currentQuizQuestions[quizIdx].correctAnswer ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {selectedAnswer === currentQuizQuestions[quizIdx].correctAnswer ? 'Option Correct! +4 Marks' : 'Option Incorrect! -1 Marks'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-350 leading-relaxed">
                    {currentQuizQuestions[quizIdx].explanation}
                  </p>
                  
                  <div className="flex justify-end pt-2">
                    <button
                      id="quiz-next-arrow"
                      onClick={handleNextQuizQuestion}
                      className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-xs font-bold rounded-xl shadow transition"
                    >
                      {quizIdx < currentQuizQuestions.length - 1 ? 'Next Question' : 'Finish Quiz Card'}
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            // SCORE CARD VIEW
            <div className="text-center py-6 space-y-6 animate-fade-in" id="quiz-completed-view">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                <CheckCircle className="w-10 h-10" />
              </div>
              
              <div>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest block">Chapter Quiz Completed</span>
                <h3 className="text-xl font-bold text-slate-800 mt-1">{activeQuizChapter.name}</h3>
              </div>

              {/* Scoring board */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 max-w-sm mx-auto grid grid-cols-2 gap-4">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Acquisition Score</span>
                  <span className="text-2xl font-extrabold text-slate-800 block mt-1">{quizScore.correct * 4 - (quizScore.total - quizScore.correct)} Marks</span>
                  <span className="text-[9px] text-slate-400">({quizScore.correct} correct of {quizScore.total})</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">NCERT Accuracy</span>
                  <span className="text-2xl font-extrabold text-teal-600 block mt-1">
                    {Math.round((quizScore.correct / quizScore.total) * 100)}%
                  </span>
                  <span className="text-[9px] text-slate-400">Of total questions</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Congratulations! Completing chapter-wise practice tests solidifies your cognitive retention. This completed status is updated on your syllabus checklists automatically!
              </p>

              <div className="flex justify-center gap-3">
                <button
                  id="quiz-retry-btn"
                  onClick={() => handleStartChapterQuiz(activeQuizChapter.id, activeQuizChapter.name, activeQuizChapter.subject)}
                  className="px-4 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Re-attempt
                </button>
                <button
                  id="quiz-done-btn"
                  onClick={handleExitQuiz}
                  className="px-5 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 text-xs font-bold transition shadow"
                >
                  Back to Syllabus
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (

        /* MAIN QUIZ BROWSER ELEMENT / AITS TAB CONTENT */
        <div>
          {subTab === 'quizzes' ? (
            /* NCERT QUIZZING GRID */
            <div className="space-y-6" id="quizzes-subtab-view">
              
              {/* Mini progress board */}
              <div className="bg-white rounded-2xl border border-slate-150 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
                <div>
                  <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" /> Chapter Quiz Master Progress
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Every chapter has a pre-compiled set of extreme high-yield multiple choice questions.
                  </p>
                </div>
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="flex-1 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div className="bg-teal-500 h-full transition-all duration-300" style={{ width: `${quizPercent}%` }} />
                  </div>
                  <span className="text-xs font-black text-slate-700 shrink-0">{completedQuizzes} of {totalChapters} Solved ({quizPercent}%)</span>
                </div>
              </div>

              {/* Subject filters */}
              <div className="flex flex-wrap gap-1">
                {(['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'] as const).map((subject) => (
                  <button
                    key={subject}
                    id={`subject-quiz-filter-${subject}`}
                    onClick={() => setSelectedSubject(subject)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                      selectedSubject === subject
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'bg-white border border-slate-150 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {subject === 'All' ? 'All Subjects' : subject}
                  </button>
                ))}
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {chaptersList.map((chapter) => {
                  const hasCompleted = progress[chapter.id]?.mcqsSolved;
                  const quizQuestionsCount = chapterQuizzes[chapter.id]?.length || 0;

                  return (
                    <div 
                      key={chapter.id} 
                      className={`bg-white rounded-2xl p-5 border transition-all flex flex-col justify-between ${
                        hasCompleted 
                          ? 'border-emerald-250 bg-emerald-50/10' 
                          : 'border-slate-150 hover:border-slate-200 hover:shadow shadow-sm'
                      }`}
                    >
                      <div>
                        {/* Upper Badge metadata */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`inline-block px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            chapter.subject === 'Physics' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                            chapter.subject === 'Chemistry' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                            chapter.subject === 'Botany' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                            'bg-purple-50 text-purple-600 border border-purple-100'
                          }`}>
                            {chapter.subject} • {chapter.duration}
                          </span>
                          
                          {hasCompleted ? (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded flex items-center gap-0.5 border border-emerald-200">
                              <CheckCircle className="w-3 h-3" /> Solved
                            </span>
                          ) : (
                            <span className="text-[10px] bg-slate-100 text-slate-500 font-extrabold px-1.5 py-0.5 rounded">
                              Pending
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-slate-800 text-xs sm:text-sm line-clamp-1 leading-snug">
                          {chapter.name}
                        </h4>
                        
                        <p className="text-[11px] text-slate-400 mt-1">
                          {quizQuestionsCount} Typical extreme-fidelity MCQs Aligned with NTA NCERT specs.
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                        <span className="text-[10px] font-mono text-slate-450">
                          Scoring: +12 / -3 Marks
                        </span>

                        <button
                          id={`btn-launch-quiz-${chapter.id}`}
                          onClick={() => handleStartChapterQuiz(chapter.id, chapter.name, chapter.subject)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 shadow-sm transition ${
                            hasCompleted
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-teal-600 hover:bg-teal-700 text-white'
                          }`}
                        >
                          <Play className="w-3 h-3" /> {hasCompleted ? 'Practice Again' : 'Take Practice'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          ) : subTab === 'pyqs' ? (
            /* NEET PYQS SUITE */
            <div className="space-y-6 animate-fade-in" id="pyqs-subtab-view">
              
              {/* Premium Status Banner */}
              <div className="bg-gradient-to-r from-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-teal-850">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-teal-300 uppercase tracking-widest block">NTA Official Archives</span>
                    <h2 className="text-xl font-bold mt-1">NEET Previous Years Questions (PYQs)</h2>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-2xl">
                      Practice real, historical questions asked in actual NEET exams from 2021 to 2024. Browse single questions below with detailed explanations, or launch a fully responsive custom mock exam!
                    </p>
                  </div>
                  <div className="shrink-0 flex items-center gap-2 bg-teal-950/50 border border-teal-800/40 p-3 rounded-xl">
                    <Award className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="text-[10px] text-slate-300 uppercase font-medium block">Total Solved in Session</span>
                      <span className="text-sm font-black text-white">{Object.keys(pyqCardAnswers).length} Qs Reviewed</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid with 2 columns: left for Custom Mock compiler, right for Search & Browse */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Custom PYQ Mock Exam Launcher */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-5 space-y-4">
                    <div className="flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <Trophy className="w-4 h-4 text-emerald-600 animate-pulse" />
                      <h3 className="font-bold text-slate-800 text-sm">Assemble Timed PYQ Mock</h3>
                    </div>

                    <p className="text-xs text-slate-500 leading-relaxed">
                      Pick your criteria to compile a custom timed test using authentic NEET PYQ questions. It uses official exam grading rules.
                    </p>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Subject</label>
                        <select
                          id="pyq-mock-subject-select"
                          value={mockPyqSubject}
                          onChange={(e) => setMockPyqSubject(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-150 rounded-lg p-2 text-xs text-slate-700 outline-none focus:border-teal-500"
                        >
                          <option value="All">All Subjects (Mixed Practice)</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Botany">Biology - Botany</option>
                          <option value="Zoology">Biology - Zoology</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Target Exam Year</label>
                        <select
                          id="pyq-mock-year-select"
                          value={mockPyqYear}
                          onChange={(e) => setMockPyqYear(e.target.value as any)}
                          className="w-full bg-slate-50 border border-slate-150 rounded-lg p-2 text-xs text-slate-700 outline-none focus:border-teal-500"
                        >
                          <option value="All">All Years (2021 - 2024)</option>
                          <option value="2024">NEET 2024 Paper Only</option>
                          <option value="2023">NEET 2023 Paper Only</option>
                          <option value="2022">NEET 2022 Paper Only</option>
                          <option value="2021">NEET 2021 Paper Only</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">Number of Questions</label>
                        <div className="flex gap-2">
                          {[5, 10, 15].map((cnt) => (
                            <button
                              key={cnt}
                              id={`mockq-cnt-btn-${cnt}`}
                              type="button"
                              onClick={() => setMockPyqCount(cnt)}
                              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition ${
                                mockPyqCount === cnt 
                                  ? 'bg-emerald-600 text-white shadow-sm' 
                                  : 'bg-slate-50 border border-slate-150 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              {cnt} MCQs
                            </button>
                          ))}
                        </div>
                      </div>

                      {mockPyqError && (
                        <p className="text-[11px] text-rose-500 font-semibold">{mockPyqError}</p>
                      )}

                      <button
                        id="start-custom-pyq-test-btn"
                        onClick={handleStartCustomPyqTest}
                        className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition mt-3 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" /> Go to Exam Simulation
                      </button>
                    </div>
                  </div>

                  {/* NEET Weightage Insight Card */}
                  <div className="bg-teal-50/20 border border-teal-100/55 rounded-2xl p-5 space-y-2">
                    <h4 className="text-[10px] text-teal-600 font-bold uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> High-Yield Strategy
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                      Biology typically holds 50% marks weightage (360/720), while Chemistry and Physics each hold 25% (180/720). Solving recent PYQs guarantees a strong alignment with NTA's NCERT line framing methodology!
                    </p>
                  </div>
                </div>

                {/* Question Search, Filter and Interactive Browser Feed */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="bg-white border border-slate-150 rounded-2xl shadow-sm p-6 space-y-5">
                    
                    {/* Header and Search control */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-55 pb-3">
                      <h3 className="font-bold text-slate-800 text-sm">Official NEET PYQ Interactive Browser</h3>
                      <div className="relative max-w-xs w-full">
                        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                        <input
                          id="pyq-search-input"
                          type="text"
                          placeholder="Search (e.g., ring, thermodynamic)..."
                          value={pyqSearch}
                          onChange={(e) => setPyqSearch(e.target.value)}
                          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-150 rounded-xl text-xs text-slate-755 placeholder-slate-400 focus:outline-none focus:border-teal-500 transition"
                        />
                      </div>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap items-center gap-4 bg-slate-50 border border-slate-100 rounded-xl p-4">
                      {/* Subject filters */}
                      <div className="space-y-1 flex-1 min-w-[125px]">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block" htmlFor="pyq-subject-filter">Subject Filter</label>
                        <select
                          id="pyq-subject-filter"
                          value={pyqSubject}
                          onChange={(e) => setPyqSubject(e.target.value as any)}
                          className="w-full bg-white border border-slate-155 rounded-lg p-1.5 text-xs text-slate-650 focus:outline-none focus:border-teal-500"
                        >
                          <option value="All">All Subjects</option>
                          <option value="Physics">Physics</option>
                          <option value="Chemistry">Chemistry</option>
                          <option value="Botany">Botany</option>
                          <option value="Zoology">Zoology</option>
                        </select>
                      </div>

                      {/* Year filters */}
                      <div className="space-y-1 flex-1 min-w-[125px]">
                        <label className="text-[9px] uppercase font-bold text-slate-400 block" htmlFor="pyq-year-filter">Year Filter</label>
                        <select
                          id="pyq-year-filter"
                          value={pyqYear}
                          onChange={(e) => setPyqYear(e.target.value as any)}
                          className="w-full bg-white border border-slate-155 rounded-lg p-1.5 text-xs text-slate-650 focus:outline-none focus:border-teal-500"
                        >
                          <option value="All">All Years</option>
                          <option value="2024">NEET 2024</option>
                          <option value="2023">NEET 2023</option>
                          <option value="2022">NEET 2022</option>
                          <option value="2021">NEET 2021</option>
                        </select>
                      </div>
                    </div>

                    {/* Question Cards Feed */}
                    <div className="space-y-5">
                      {(() => {
                        let processed = neetPyqs;
                        if (pyqSubject !== 'All') {
                          processed = processed.filter(q => q.subject === pyqSubject);
                        }
                        if (pyqYear !== 'All') {
                          processed = processed.filter(q => q.year.toString() === pyqYear);
                        }
                        if (pyqSearch.trim()) {
                          const query = pyqSearch.toLowerCase();
                          processed = processed.filter(q => 
                            q.questionText.toLowerCase().includes(query) ||
                            q.chapter.toLowerCase().includes(query) ||
                            (q.explanation && q.explanation.toLowerCase().includes(query))
                          );
                        }

                        if (processed.length === 0) {
                          return (
                            <div className="text-center py-10 space-y-2 border border-dashed border-slate-150 rounded-xl bg-slate-50/50">
                              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto" />
                              <p className="text-xs text-slate-500 font-semibold">No official PYQs found matching your criteria.</p>
                              <p className="text-[11px] text-slate-400">Try modifying search tags or clearing filters.</p>
                            </div>
                          );
                        }

                        return processed.map((q) => {
                          const activeChoice = pyqCardAnswers[q.id];
                          const hasAnswered = activeChoice !== undefined;

                          return (
                            <div 
                              key={q.id} 
                              className="p-5 border border-slate-150 bg-white rounded-xl space-y-4 hover:border-slate-205 hover:shadow-sm transition"
                            >
                              {/* Metadata Badge bar */}
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-50 pb-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] font-extrabold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded border border-teal-100 uppercase">
                                    NEET {q.year}
                                  </span>
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                    q.subject === 'Physics' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                    q.subject === 'Chemistry' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                    q.subject === 'Botany' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                    'bg-purple-50 text-purple-700 border-purple-100'
                                  }`}>
                                    {q.subject}
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-sans">
                                    Chapter: {q.chapter}
                                  </span>
                                </div>
                                <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                                  q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                  q.difficulty === 'Medium' ? 'bg-yellow-50 text-yellow-650 border border-yellow-100' :
                                  'bg-red-50 text-red-650 border border-red-100'
                                }`}>
                                  {q.difficulty}
                                </span>
                              </div>

                              {/* Question wording */}
                              <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed whitespace-pre-line">
                                {q.questionText}
                              </p>

                              {/* Options options */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                                  const isSelected = activeChoice === opt;
                                  const isCorrect = q.correctAnswer === opt;
                                  let optStyle = 'border-slate-200 hover:bg-slate-50 cursor-pointer';

                                  if (hasAnswered) {
                                    if (isCorrect) {
                                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-bold';
                                    } else if (isSelected) {
                                      optStyle = 'border-rose-400 bg-rose-50 text-rose-800 font-bold';
                                    } else {
                                      optStyle = 'border-slate-100 text-slate-405 opacity-60 pointer-events-none';
                                    }
                                  }

                                  return (
                                    <button
                                      key={opt}
                                      disabled={hasAnswered}
                                      onClick={() => setPyqCardAnswers(prev => ({ ...prev, [q.id]: opt }))}
                                      className={`p-3.5 text-xs text-left rounded-xl border transition ${optStyle}`}
                                    >
                                      <span className="font-extrabold mr-1.5">{opt}.</span>
                                      {q.options[opt]}
                                    </button>
                                  );
                                })}
                              </div>

                              {/* Explanation expansion */}
                              {hasAnswered && (
                                <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2.5 mt-2 animate-fade-in text-[11px] sm:text-xs">
                                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                                    <span className="font-black text-teal-400 uppercase tracking-widest block text-[10px]">NCERT Explanatory Analysis</span>
                                    <span className={`font-extrabold text-[10px] uppercase ${activeChoice === q.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                                      {activeChoice === q.correctAnswer ? 'Correct answer (+4)' : 'Incorrect choice (-1)'}
                                    </span>
                                  </div>
                                  <p className="text-slate-300 leading-relaxed font-sans">
                                    {q.explanation}
                                  </p>
                                </div>
                              )}
                            </div>
                          );
                        });
                      })()}
                    </div>

                  </div>
                </div>

              </div>

            </div>
          ) : (
            /* ALL INDIA TEST SERIES PORTAL VIEW */
            <div className="space-y-6" id="aits-subtab-view">
              
              {/* Giant Predicted Performance Metric Header */}
              <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 text-white rounded-2xl p-6 shadow-md border border-teal-850">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">NTA Mock Statistics</span>
                    <h2 className="text-xl font-black">All India Test Series (AITS)</h2>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Compete on an absolute national canvas. The scale covers percentile distribution estimates and category-wise NEET MBBS cutoff predictions.
                    </p>
                  </div>

                  <div className="bg-emerald-900/30 border border-teal-800/40 rounded-xl p-4 text-center">
                    <span className="text-[10px] font-semibold text-teal-300 block">Simulated Percentile Rank</span>
                    <span className="text-3xl font-black text-white block mt-1">98.45 %ile</span>
                    <span className="text-[10px] text-slate-350">Estimation among 1.2M candidates</span>
                  </div>

                  <div className="bg-emerald-900/30 border border-teal-800/40 rounded-xl p-4 text-center">
                    <span className="text-[10px] font-semibold text-teal-300 block">General Cutoff prediction</span>
                    <span className="text-3xl font-black text-white block mt-1">615 Marks</span>
                    <span className="text-[10px] text-emerald-400">Aim for 650+ for elite government medical seats</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Simulated Leaderboard column */}
                <div className="lg:col-span-1 bg-white rounded-2xl border border-slate-150 shadow-sm p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-teal-600" /> AITS Leaderboard
                    </h3>
                    <span className="text-[9px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-extrabold border border-emerald-100">Live Simulation</span>
                  </div>

                  <div className="space-y-3">
                    {simulatedCompetitors.map((comp) => (
                      <div key={comp.rank} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-50 hover:bg-slate-50 transition text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 flex items-center justify-center rounded text-[10px] font-black ${
                            comp.rank === 1 ? 'bg-amber-100 text-amber-800' :
                            comp.rank === 2 ? 'bg-slate-200 text-slate-800' :
                            comp.rank === 3 ? 'bg-orange-100 text-orange-850' : 'bg-slate-100 text-slate-500'
                          }`}>
                            #{comp.rank}
                          </span>
                          <div>
                            <span className="font-bold text-slate-800 block leading-tight">{comp.name}</span>
                            <span className="text-[9px] text-slate-400 font-mono">{comp.state}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="font-bold text-slate-800 block font-mono">{comp.score} <span className="text-[9px] font-normal text-slate-400">/ 720</span></span>
                          <span className="text-[9px] font-medium text-emerald-600 bg-emerald-50 px-1 rounded">{comp.percentile} %ile</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Tests Schedules column */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-150 shadow-sm p-5 space-y-4">
                  <div className="border-b border-slate-100 pb-2">
                    <h3 className="font-bold text-slate-800 text-sm">Active & Upcoming AITS Major Exams</h3>
                    <p className="text-xs text-slate-450 mt-0.5">Attempt these structured NTA full-length model configurations to receive mock counseling estimates.</p>
                  </div>

                  <div className="space-y-4">
                    
                    {/* AITS 1 Card */}
                    <div className="p-4 border border-teal-100 bg-teal-50/10 rounded-xl hover:shadow-sm transition flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-teal-600 text-white font-extrabold px-2 py-0.5 rounded">ONLINE ACTIVE</span>
                          <span className="text-xs font-mono text-slate-400">• Full Syllabus Exam Series</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">AITS-1: Open All-India NEET Mock (720 Marks)</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          Covers high-weightage sections in Mechanics, Organic Chemistry, and Plant-Animal Kingdoms. Dynamic grading scheme +4 Marks and -1 negative penalty.
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          id="btn-attempt-aits-1"
                          onClick={() => {
                            // Convert standard mock test model into AITS style title and run
                            const defaultMock = SyllabusSyllabus; // reference
                            onStartTest({
                              id: 'aits-test-1',
                              title: 'AITS-1: National Mock Exam',
                              description: 'Full-syllabus All India Test Series diagnostic simulation under strict NTA code regulations (+4 / -1 grading).',
                              durationMinutes: 15,
                              isFullSyllabus: true,
                              questions: [
                                {
                                  id: 'aits-q1',
                                  subject: 'Physics',
                                  section: 'A',
                                  chapter: 'Units and Measurements',
                                  questionText: 'Which physical quantity has the same dimension as that of Impulse?',
                                  options: {
                                    A: 'Force',
                                    B: 'Linear Momentum',
                                    C: 'Work',
                                    D: 'Power'
                                  },
                                  correctAnswer: 'B',
                                  explanation: 'Impulse = Force * Time = Change in Linear Momentum. Hence, both have the dimensional formula of [M¹ L¹ T⁻¹].',
                                  difficulty: 'Easy'
                                },
                                {
                                  id: 'aits-q2',
                                  subject: 'Chemistry',
                                  section: 'A',
                                  chapter: 'Chemical Bonding',
                                  questionText: 'Select the molecule which exhibits a net covalent dipole moment of exactly zero due to planar symmetry:',
                                  options: {
                                    A: 'NH₃',
                                    B: 'XeF₄',
                                    C: 'H₂O',
                                    D: 'CHCl₃'
                                  },
                                  correctAnswer: 'B',
                                  explanation: 'XeF₄ is square planar (sp³d² with 2 lone pairs opposite to each other). The individual Xe-F dipoles cancel each other, yielding a net dipole moment = 0.',
                                  difficulty: 'Medium'
                                },
                                {
                                  id: 'aits-q3',
                                  subject: 'Botany',
                                  section: 'A',
                                  chapter: 'Photosynthesis',
                                  questionText: 'The primary carbon dioxide acceptor molecule present inside C3 plants during carboxylation phase is:',
                                  options: {
                                    A: 'PEP (Phosphoenolpyruvate)',
                                    B: '3-PGA',
                                    C: 'RuBP (Ribulose-1,5-bisphosphate)',
                                    D: 'OAA (Oxaloacetic acid)'
                                  },
                                  correctAnswer: 'C',
                                  explanation: 'In C3 plants, Ribulose-1,5-bisphosphate (RuBP) acts as the primary 5-carbon acceptor of atmospheric CO₂ catalyzed by RuBisCO.',
                                  difficulty: 'Easy'
                                },
                                {
                                  id: 'aits-q4',
                                  subject: 'Zoology',
                                  section: 'A',
                                  chapter: 'Neural Control',
                                  questionText: 'Myelin sheath enclosing axon cylinders of central nervous system neurons is produced by:',
                                  options: {
                                    A: 'Schwann cells and Oligodendrocytes',
                                    B: 'Oligodendrocytes only',
                                    C: 'Astrocytes',
                                    D: 'Schwann cells only'
                                  },
                                  correctAnswer: 'A',
                                  explanation: 'In peripheral nervous system (PNS), Schwann cells form myelin sheaths. In the Central Nervous System (CNS), Oligodendrocytes provide myelination.',
                                  difficulty: 'Medium'
                                }
                              ]
                            });
                          }}
                          className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
                        >
                          Attempt AITS-1
                        </button>
                      </div>
                    </div>

                    {/* AITS 2 Card */}
                    <div className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center opacity-75">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-500 text-white font-extrabold px-1.5 py-0.5 rounded">LOCKS IN 3 DAYS</span>
                          <span className="text-xs font-mono text-slate-450">• Part Syllabus Focus</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">AITS-2: PCB Organic & Physiology Sprint</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          Requires completing at least 15 NCERT syllabus read chapters before registration. Includes high speed timers.
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          disabled
                          className="px-3.5 py-1.5 bg-slate-200 text-slate-500 rounded-xl text-xs font-semibold cursor-not-allowed"
                        >
                          Locked
                        </button>
                      </div>
                    </div>

                    {/* AITS 3 Card */}
                    <div className="p-4 border border-slate-100 bg-slate-50/40 rounded-xl flex flex-col sm:flex-row justify-between gap-4 items-start sm:items-center opacity-50">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] bg-slate-500 text-white font-extrabold px-1.5 py-0.5 rounded">SCHEDULED</span>
                          <span className="text-xs font-mono text-slate-455">• Pre-NEET Ultimate Grand Challenge</span>
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm">AITS-3: Grand All-India Final Mock Examination</h4>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-md">
                          Absolute replica exam consisting of 180 questions across Physics, Chemistry, Botany, and Zoology. Releases on June 15th.
                        </p>
                      </div>

                      <div className="shrink-0">
                        <button
                          disabled
                          className="px-3.5 py-1.5 bg-slate-100 text-slate-400 rounded-xl text-xs font-medium cursor-not-allowed"
                        >
                          Upcoming
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>
          )}
        </div>
      )}

    </div>
  );
}
