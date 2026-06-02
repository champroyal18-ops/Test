import React from 'react';
import { UserState, NEETTest, TestAttempt, ChapterProgress } from './types';
import Dashboard from './components/Dashboard';
import SyllabusTracker from './components/SyllabusTracker';
import Flashcards from './components/Flashcards';
import TestEngine from './components/TestEngine';
import ReviewCenter from './components/ReviewCenter';
import AITSPortal from './components/AITSPortal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ReminderSystem from './components/ReminderSystem';
import { GraduationCap, LayoutDashboard, CheckSquare, BookOpen, Flame, Heart, Sparkles, Trophy, BarChart3 } from 'lucide-react';
import { mockTests } from './data/mockTests';

const LOCAL_STORAGE_KEY = 'neet_ai_prep_state_v1';

const defaultState: UserState = {
  attempts: [],
  syllabusProgress: {},
  dailyTrivia: {
    solvedToday: false,
    streakCount: 0
  }
};

export default function App() {
  // Client state
  const [userState, setUserState] = React.useState<UserState>(defaultState);
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'syllabus' | 'flashcards' | 'aits' | 'analytics'>('dashboard');
  const [activeTest, setActiveTest] = React.useState<NEETTest | null>(null);
  const [activeAttempt, setActiveAttempt] = React.useState<TestAttempt | null>(null);

  // Load from local storage on mount
  React.useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        
        // Check if daily trivia streak needs reset
        const todayStr = new Date().toISOString().split('T')[0];
        let dailyTrivia = parsed.dailyTrivia || { solvedToday: false, streakCount: 0 };
        
        if (dailyTrivia.lastSolvedDate) {
          const lastDate = new Date(dailyTrivia.lastSolvedDate);
          const today = new Date(todayStr);
          const diffTime = Math.abs(today.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays > 1) {
            // Missed a day, reset streak
            dailyTrivia = {
              ...dailyTrivia,
              solvedToday: false,
              streakCount: 0
            };
          } else if (diffDays === 1) {
            // New day, reset solved but keep streak
            dailyTrivia = {
              ...dailyTrivia,
              solvedToday: false
            };
          }
        }

        setUserState({
          ...defaultState,
          ...parsed,
          dailyTrivia
        });
      }
    } catch (e) {
      console.error("Local storage restoration failed", e);
    }
  }, []);

  // Save changes to local storage
  const saveState = (newState: UserState) => {
    setUserState(newState);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
    } catch (e) {
      console.error("Store update failed", e);
    }
  };

  // Start a test
  const handleStartTest = (test: NEETTest) => {
    setActiveTest(test);
    setActiveAttempt(null);
  };

  // Submit test and handle grading
  const handleCompletedAttempt = (responses: Record<string, 'A' | 'B' | 'C' | 'D' | ''>, timeSpentSeconds: number) => {
    if (!activeTest) return;

    let score = 0;
    let correct = 0;
    let incorrect = 0;
    let unattempted = 0;

    activeTest.questions.forEach((q) => {
      const ans = responses[q.id] || '';
      if (ans === '') {
        unattempted++;
      } else if (ans === q.correctAnswer) {
        correct++;
        score += 4;
      } else {
        incorrect++;
        score -= 1;
      }
    });

    const attempt: TestAttempt = {
      id: `attempt-${Date.now()}`,
      testId: activeTest.id,
      testTitle: activeTest.title,
      isFullSyllabus: activeTest.isFullSyllabus,
      score,
      totalPossibleMarks: activeTest.questions.length * 4,
      correctAnswers: correct,
      incorrectAnswers: incorrect,
      unattemptedAnswers: unattempted,
      timeSpentSeconds,
      dateStr: new Date().toISOString(),
      responses
    };

    const updatedAttempts = [attempt, ...userState.attempts];
    const newState = {
      ...userState,
      attempts: updatedAttempts
    };

    saveState(newState);
    setActiveAttempt(attempt);
  };

  // Syllabus tracker toggle helpers
  const handleToggleProgress = (chapterId: string, flag: 'ncertRead' | 'notesRevised' | 'mcqsSolved') => {
    const progressMap = { ...userState.syllabusProgress };
    const current = progressMap[chapterId] || {
      chapterId,
      subject: 'Physics', // fallback, will be overwritten
      ncertRead: false,
      notesRevised: false,
      mcqsSolved: false,
    };

    current[flag] = !current[flag];
    progressMap[chapterId] = current;

    saveState({
      ...userState,
      syllabusProgress: progressMap
    });
  };

  // Solving daily trivia increases streak
  const handleSolveTrivia = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    const prevStreak = userState.dailyTrivia.streakCount;

    const triviaUpdated = {
      lastSolvedDate: todayStr,
      solvedToday: true,
      streakCount: prevStreak + 1
    };

    saveState({
      ...userState,
      dailyTrivia: triviaUpdated
    });
  };

  const handleSeedDemoData = () => {
    const now = new Date();
    const demoAttempts: TestAttempt[] = [
      {
        id: "demo-attempt-1",
        testId: "mock-test-1",
        testTitle: "High-Yield NEET Full Mock Syllabus Test",
        isFullSyllabus: true,
        score: 645,
        totalPossibleMarks: 720,
        correctAnswers: 166,
        incorrectAnswers: 19,
        unattemptedAnswers: 15,
        timeSpentSeconds: 9800,
        dateStr: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        responses: {
          "phy-1-q1": "A",
          "phy-1-q2": "C",
          "phy-2-q1": "C",
          "phy-2-q2": "B",
          "phy-3-q1": "C",
          "phy-3-q2": "A"
        }
      },
      {
        id: "demo-attempt-2",
        testId: "mock-test-2",
        testTitle: "Class 11 Concept booster",
        isFullSyllabus: false,
        score: 580,
        totalPossibleMarks: 720,
        correctAnswers: 152,
        incorrectAnswers: 28,
        unattemptedAnswers: 20,
        timeSpentSeconds: 7100,
        dateStr: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        responses: {
          "phy-1-q2": "A",
          "phy-2-q1": "C",
          "phy-3-q1": "C"
        }
      },
      {
        id: "demo-attempt-3",
        testId: "mock-test-2",
        testTitle: "NTA Archives Section A diagnostic run",
        isFullSyllabus: true,
        score: 512,
        totalPossibleMarks: 720,
        correctAnswers: 135,
        incorrectAnswers: 28,
        unattemptedAnswers: 37,
        timeSpentSeconds: 8400,
        dateStr: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        responses: {}
      },
      {
        id: "demo-attempt-4",
        testId: "mock-test-1",
        testTitle: "Initial Evaluation Placement Test",
        isFullSyllabus: false,
        score: 410,
        totalPossibleMarks: 720,
        correctAnswers: 110,
        incorrectAnswers: 30,
        unattemptedAnswers: 60,
        timeSpentSeconds: 5200,
        dateStr: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        responses: {}
      }
    ];

    saveState({
      ...userState,
      attempts: demoAttempts,
      dailyTrivia: {
        solvedToday: true,
        streakCount: 5
      }
    });
  };

  const handleClearHistory = () => {
    saveState({
      ...userState,
      attempts: []
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col justify-between selection:bg-teal-500/10 text-slate-800">
      
      {/* Primary Medical Sticky Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-150 backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[4rem] h-auto py-3 sm:py-0 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 lg:gap-8">
          
          {/* Logo and core title */}
          <div className="flex items-center gap-3">
            <span className="h-10 w-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/10 shrink-0">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <span className="font-bold text-slate-900 tracking-tight block text-sm sm:text-base">NEET AI Test Series</span>
              <span className="text-[10px] text-slate-400 font-medium block">NCERT-Curriculum AI Prep System</span>
            </div>
          </div>

          {/* Persistent top-row tab toggle controllers */}
          {!activeTest && !activeAttempt && (
            <nav className="flex items-center bg-slate-100 p-1 rounded-xl gap-0.5 sm:gap-1 overflow-x-auto max-w-full">
              <button
                id="tab-btn-dashboard"
                onClick={() => setActiveTab('dashboard')}
                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden md:inline ml-1.5">Dashboard</span>
              </button>
              
              <button
                id="tab-btn-syllabus"
                onClick={() => setActiveTab('syllabus')}
                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  activeTab === 'syllabus'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <CheckSquare className="w-4 h-4 text-teal-600" />
                <span className="hidden md:inline ml-1.5">Syllabus</span>
              </button>

              <button
                id="tab-btn-aits"
                onClick={() => setActiveTab('aits')}
                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  activeTab === 'aits'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden md:inline ml-1.5">AITS</span>
              </button>
              
              <button
                id="tab-btn-analytics"
                onClick={() => setActiveTab('analytics')}
                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  activeTab === 'analytics'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-indigo-600 animate-pulse" />
                <span className="hidden md:inline ml-1.5">Analytics</span>
              </button>
              
              <button
                id="tab-btn-flashcards"
                onClick={() => setActiveTab('flashcards')}
                className={`px-2 md:px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center justify-center ${
                  activeTab === 'flashcards'
                    ? 'bg-white text-slate-800 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                <span className="hidden md:inline ml-1.5">Recall</span>
              </button>
            </nav>
          )}

          {/* Quick Streak Widget */}
          <div className="flex items-center gap-1.5 shrink-0">
            <Flame className={`w-4 h-4 ${userState.dailyTrivia.streakCount > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-350'}`} />
            <span className="text-xs font-extrabold text-slate-700">{userState.dailyTrivia.streakCount} D Streak</span>
          </div>

        </div>
      </header>

      {/* Main Container screen routers */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {activeTest ? (
          /* ACTIVE TEST ARENA ROUTE */
          <TestEngine
            test={activeTest}
            onCancel={() => setActiveTest(null)}
            onSubmit={handleCompletedAttempt}
          />
        ) : activeAttempt ? (
          /* DETAILED GRADES REVIEW CENTER ROUTE */
          <ReviewCenter
            attempt={activeAttempt}
            questions={
              mockTests.find((t) => t.id === activeAttempt.testId)?.questions || activeTest?.questions || []
            }
            onBack={() => {
              setActiveAttempt(null);
              setActiveTest(null);
            }}
          />
        ) : (
          /* CORE NAV TABS ROUTES */
          <div className="space-y-6">
            <ReminderSystem
              attempts={userState.attempts}
              solvedToday={userState.dailyTrivia.solvedToday}
              onSetViewTab={setActiveTab}
            />
            {activeTab === 'dashboard' && (
              <Dashboard
                attempts={userState.attempts}
                progress={userState.syllabusProgress}
                streakCount={userState.dailyTrivia.streakCount}
                solvedToday={userState.dailyTrivia.solvedToday}
                onStartTest={handleStartTest}
                onViewAttempt={(att) => {
                  setActiveAttempt(att);
                  const foundPreset = mockTests.find((t) => t.id === att.testId);
                  
                  if (foundPreset) {
                    setActiveTest(foundPreset);
                  }
                }}
                onSetViewTab={setActiveTab}
                onSolveTrivia={handleSolveTrivia}
              />
            )}

            {activeTab === 'syllabus' && (
              <SyllabusTracker
                progress={userState.syllabusProgress}
                onToggleProgress={handleToggleProgress}
              />
            )}

            {activeTab === 'aits' && (
              <AITSPortal
                progress={userState.syllabusProgress}
                onToggleProgress={handleToggleProgress}
                onStartTest={handleStartTest}
              />
            )}

            {activeTab === 'flashcards' && (
              <Flashcards />
            )}

            {activeTab === 'analytics' && (
              <AnalyticsDashboard
                attempts={userState.attempts}
                onSetViewTab={setActiveTab}
                onSeedDemoData={handleSeedDemoData}
                onClearHistory={handleClearHistory}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer layout */}
      <footer className="bg-white border-t border-slate-150 py-6 mt-12 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p>© {new Date().getFullYear()} NEET AI Prep Series. Inspired by the National Testing Agency (NTA) guidelines and NCERT textbooks.</p>
          <p className="font-mono text-[10px] text-slate-400">
            Engineered with deep learning assistance. Premium healthcare preparation environment.
          </p>
        </div>
      </footer>

    </div>
  );
}
