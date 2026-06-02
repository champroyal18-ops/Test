import React from 'react';
import { mockTests, DailyTrivia, SyllabusSyllabus } from '../data/mockTests';
import { NEETTest, TestAttempt, ChapterProgress } from '../types';
import { 
  Sparkles, Award, Flame, CheckSquare, BookOpen, GraduationCap, 
  ChevronRight, RefreshCw, AlertTriangle, PlusCircle, LayoutGrid, Heart 
} from 'lucide-react';

interface DashboardProps {
  attempts: TestAttempt[];
  progress: Record<string, ChapterProgress>;
  streakCount: number;
  solvedToday: boolean;
  onStartTest: (test: NEETTest) => void;
  onViewAttempt: (attempt: TestAttempt) => void;
  onSetViewTab: (tab: 'dashboard' | 'syllabus' | 'flashcards' | 'aits' | 'analytics') => void;
  onSolveTrivia: () => void;
}

export default function Dashboard({
  attempts,
  progress,
  streakCount,
  solvedToday,
  onStartTest,
  onViewAttempt,
  onSetViewTab,
  onSolveTrivia,
}: DashboardProps) {
  // AI Generator custom parameters
  const [aiSubject, setAiSubject] = React.useState<'Physics' | 'Chemistry' | 'Botany' | 'Zoology'>('Biology' as any);
  const [aiTopic, setAiTopic] = React.useState('');
  const [aiLoading, setAiLoading] = React.useState(false);
  const [aiError, setAiError] = React.useState('');
  
  // Daily Trivia state
  const [triviaChoice, setTriviaChoice] = React.useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [triviaSubmitted, setTriviaSubmitted] = React.useState(false);

  // Stats indicators
  const totalSolvedQuestions = attempts.reduce((acc, current) => acc + (current.correctAnswers + current.incorrectAnswers), 0);
  const bestScore = attempts.length > 0 ? Math.max(...attempts.map(a => a.score)) : 0;
  
  // Predict All India Rank (AIR) band purely as a fun supportive diagnostic
  const getPredictedAIR = (score: number) => {
    if (score >= 690) return "Rank band: AIR 1 - 250 (Exceptional!)";
    if (score >= 650) return "Rank band: AIR 251 - 1,500 (Commanding)";
    if (score >= 600) return "Rank band: AIR 1,501 - 8,000 (Strong High-tier)";
    if (score >= 500) return "Rank band: AIR 8,001 - 35,000 (Competitive pace)";
    return "Keep revising to secure an elite All-India Rank (AIR)";
  };

  const handleTriviaSubmit = (choice: 'A' | 'B' | 'C' | 'D') => {
    setTriviaChoice(choice);
    setTriviaSubmitted(true);
    if (choice === DailyTrivia.correctAnswer) {
      onSolveTrivia();
    }
  };

  const handleGenerateAITest = async (e: React.FormEvent) => {
    e.preventDefault();
    setAiLoading(true);
    setAiError('');

    try {
      const response = await fetch("/api/generate-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: aiSubject,
          topic: aiTopic || 'Comprehensive NCERT Topics',
          qCount: 5
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Internal server error occurred");
      }

      const data = await response.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error("No questions were returned. Please try another subtopic.");
      }

      const generatedTest: NEETTest = {
        id: `ai-test-${Date.now()}`,
        title: `AI Quiz: ${aiSubject} - ${aiTopic || 'NCERT Custom Spec'}`,
        description: `Custom-graded exam paper compiled specifically for you using Gemini AI on ${aiTopic || 'All-syllabus high yield concepts'}.`,
        durationMinutes: 6, // 1.2 min per question standard
        questions: data.questions,
        isFullSyllabus: false,
        isAIGenerated: true
      };

      onStartTest(generatedTest);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || "Failed to compile custom exam series. Please check your network key configurations.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div id="dashboard-tab-content" className="space-y-6">

      {/* Main Student Performance Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Welcome and Rank prediction */}
        <div className="md:col-span-2 bg-gradient-to-r from-teal-800 to-slate-900 text-white rounded-2xl p-6 shadow-sm border border-teal-900 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-widest block mb-1">Academic Status Card</span>
            <h2 className="text-xl font-bold">Resolute NEET Aspirant</h2>
            <p className="text-xs text-slate-350 mt-1.5 leading-relaxed">
              Maintain high NCERT accuracy to climb the merit list. Target: 650+ marks.
            </p>
            <button
              onClick={() => onSetViewTab('analytics')}
              className="mt-3 bg-white/10 hover:bg-white/20 text-white text-[11px] font-extrabold px-3 py-1.5 rounded-lg border border-white/15 transition cursor-pointer"
            >
              📊 Performance Analytics Insights →
            </button>
          </div>
          <div className="mt-5 pt-4 border-t border-teal-700/50 flex items-center gap-3">
            <Award className="w-5 h-5 text-teal-300 shrink-0" />
            <span className="text-xs font-semibold text-teal-300">{attempts.length > 0 ? getPredictedAIR(bestScore) : "Complete a test mock run to generate rank estimates"}</span>
          </div>
        </div>

        {/* Streak counter */}
        <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Daily preparation streak</span>
            <div className="flex items-center gap-2 mt-2">
              <Flame className={`w-8 h-8 ${streakCount > 0 ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-slate-300'}`} />
              <span className="text-3xl font-black text-slate-800">{streakCount} Days</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              {solvedToday ? "Solved today's NCERT biology boost! Keep it up." : "Solve today's question below to preserve streak stats!"}
            </p>
          </div>
        </div>

        {/* Total Questions Counter */}
        <div className="bg-white rounded-2xl p-6 border border-slate-150 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Questions Cracked</span>
            <div className="flex items-center gap-2 mt-2">
              <CheckSquare className="w-8 h-8 text-teal-600" />
              <span className="text-3xl font-black text-slate-800">{totalSolvedQuestions} MCQs</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Accumulating high solving volume enhances exam endurance.
            </p>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col (2 Columns Wide): Daily Trivia & Presets tests */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Daily NCERT Biology Boost Question */}
          <div className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6 space-y-4" id="daily-trivia-block">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 rounded-full bg-teal-500" />
                <h3 className="font-bold text-slate-800 text-sm">Active NCERT Boost Trivia</h3>
              </div>
              <span className="text-[10px] bg-teal-50 text-teal-600 font-bold px-2 py-0.5 rounded">Daily Active Reward</span>
            </div>

            <div>
              <p className="text-slate-700 text-sm font-medium leading-relaxed">
                {DailyTrivia.questionText}
              </p>
            </div>

            {/* Answer triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                const isSelected = triviaChoice === opt;
                const isCorrect = DailyTrivia.correctAnswer === opt;
                
                let btnStyle = 'border-slate-200 hover:bg-slate-50';
                if (triviaSubmitted) {
                  if (isCorrect) {
                     btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 font-semibold';
                  } else if (isSelected) {
                     btnStyle = 'border-rose-300 bg-rose-50 text-rose-800';
                  } else {
                     btnStyle = 'border-slate-150 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt}
                    id={`trivia-opt-${opt}`}
                    disabled={triviaSubmitted}
                    onClick={() => handleTriviaSubmit(opt)}
                    className={`p-3.5 text-xs text-left rounded-xl border transition ${btnStyle}`}
                  >
                    <span className="font-bold mr-2">{opt}.</span>
                    {DailyTrivia.options[opt]}
                  </button>
                );
              })}
            </div>

            {triviaSubmitted && (
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-white space-y-2 mt-4 animate-fade-in">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                    NCERT textbook solution:
                  </span>
                  <span className={`text-[10px] uppercase tracking-wider font-extrabold ${triviaChoice === DailyTrivia.correctAnswer ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {triviaChoice === DailyTrivia.correctAnswer ? 'Streak Saved!' : 'Incorrect Choice'}
                  </span>
                </div>
                <p className="text-xs text-slate-350 leading-relaxed font-sans mt-1">
                  {DailyTrivia.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Standard Mock papers library */}
          <div className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 text-sm mb-4">Elite Syllabus Mock Papers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockTests.map((test) => (
                <div key={test.id} className="p-5 border border-slate-100 rounded-xl hover:border-slate-200 transition shadow-sm hover:shadow flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-medium text-teal-600 bg-teal-50 border border-teal-100 px-2 py-0.5 rounded uppercase tracking-wider block w-max">
                      {test.isFullSyllabus ? 'Full Syllabus Test' : 'Concept Booster'}
                    </span>
                    <h4 className="font-bold text-slate-800 text-sm mt-3 leading-snug">{test.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {test.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs font-medium text-slate-400 font-mono flex items-center gap-1">
                      {test.questions.length} MCQs • {test.durationMinutes} Mins
                    </span>
                    <button
                      id={`start-test-${test.id}`}
                      onClick={() => onStartTest(test)}
                      className="px-3.5 py-1.5 bg-teal-600 text-white rounded-lg text-xs font-bold hover:bg-teal-700 transition"
                    >
                      Attempt Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Attempt logs archives */}
          {attempts.length > 0 && (
            <div className="bg-white rounded-2xl border border-slate-150 shadow-sm p-6">
              <h3 className="font-bold text-slate-800 text-sm mb-4">Historic Mock Submissions</h3>
              <div className="divide-y divide-slate-100">
                {attempts.map((attempt) => (
                  <div key={attempt.id} className="py-3 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-1">{attempt.testTitle}</h4>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                        Attempted on {new Date(attempt.dateStr).toLocaleDateString()} • {Math.round(attempt.timeSpentSeconds / 60)} minutes spent
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-xs font-bold text-slate-800 block">{attempt.score} <span className="text-[10px] font-normal text-slate-400">/ {attempt.totalPossibleMarks}</span></span>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-teal-600 bg-teal-50 border border-teal-100 px-1.5 py-0.5 rounded">Graded</span>
                      </div>
                      
                      <button
                        id={`btn-view-${attempt.id}`}
                        onClick={() => onViewAttempt(attempt)}
                        className="p-1 px-2 border border-slate-200 rounded-lg hover:bg-slate-50 hover:border-slate-300 text-[10px] font-bold text-slate-600 transition"
                      >
                        Review
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Col (1 Column Wide): AI Builder and Study cards shortcut */}
        <div className="space-y-6">
          
          {/* AI Dynamic Custom Test compiler */}
          <div className="bg-gradient-to-br from-slate-900 to-teal-950 text-white rounded-2xl p-6 shadow-sm border border-teal-900" id="ai-generator-widget">
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h3 className="font-bold text-white text-sm">AI NCERT Mock Compiler</h3>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6">
              Feeling weak in a chapter? Select any subject, specify your target chapter (e.g. Genetics, Kinetic Theory, Electrostatics), and Gemini will generate a custom 5-question mock test.
            </p>

            <form onSubmit={handleGenerateAITest} className="space-y-4">
              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-teal-400 block mb-1.5" htmlFor="ai-subject-select">Select Medical Subject</label>
                <select
                  id="ai-subject-select"
                  className="w-full bg-slate-850 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none"
                  value={aiSubject}
                  onChange={(e) => setAiSubject(e.target.value as any)}
                >
                  <option value="Physics">Physics (Equation & Mechanics)</option>
                  <option value="Chemistry">Chemistry (Organic & Physical)</option>
                  <option value="Botany">Biology - Botany (NCERT Lines)</option>
                  <option value="Zoology">Biology - Zoology (Anatomy & Bio)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] uppercase font-bold tracking-widest text-teal-400 block mb-1.5" htmlFor="ai-topic-input">Target NCERT Chapter/Topic</label>
                <input
                  id="ai-topic-input"
                  type="text"
                  placeholder="e.g. Chemical Bonding, Optics"
                  className="w-full bg-slate-850 border border-slate-800 focus:border-teal-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
                  value={aiTopic}
                  onChange={(e) => setAiTopic(e.target.value)}
                  required
                />
              </div>

              <button
                id="btn-ai-generate-run"
                type="submit"
                disabled={aiLoading}
                className="w-full py-3 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                {aiLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 text-slate-900" />
                )}
                {aiLoading ? 'Assembling Paper...' : 'Compile Custom AI Mock Exam'}
              </button>
            </form>

            {aiError && (
              <div className="mt-4 p-3 bg-rose-950/50 border border-rose-900/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <p className="leading-snug">{aiError}</p>
              </div>
            )}
          </div>

          {/* Quick study material bridges */}
          <div className="bg-white rounded-2xl border border-slate-150 p-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 uppercase">Preparation shortcuts</h4>
            
            <button
              id="dash-link-syllabus"
              onClick={() => onSetViewTab('syllabus')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-50 group transition"
            >
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Syllabus Master Board</span>
                  <span className="text-[10px] text-slate-400">Chapters checklist</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="dash-link-analytics"
              onClick={() => onSetViewTab('analytics')}
              className="w-full flex items-center justify-between p-3 bg-violet-50/50 hover:bg-violet-100/60 rounded-xl text-left border border-violet-100 group transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center bg-violet-600 text-white text-[9px] font-black leading-none rounded-md animate-pulse">AI</div>
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Performance Diagnostics</span>
                  <span className="text-[10px] text-violet-600 font-medium">Trajectory, AIR band & sub-topic struggles</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-violet-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="dash-link-pyqs"
              onClick={() => onSetViewTab('aits')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-50 group transition"
            >
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">NEET PYQs Suite</span>
                  <span className="text-[10px] text-slate-450">Official 2021-2024 Exam archive</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              id="dash-link-flashcards"
              onClick={() => onSetViewTab('flashcards')}
              className="w-full flex items-center justify-between p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-50 group transition"
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <div>
                  <span className="text-xs font-semibold text-slate-800 block">Active Recall Cards</span>
                  <span className="text-[10px] text-slate-400">Formula & reagents sheet</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
