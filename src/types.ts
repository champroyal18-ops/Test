/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Question {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';
  section: 'A' | 'B';
  chapter: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface NEETTest {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  questions: Question[];
  isFullSyllabus: boolean;
  isAIGenerated?: boolean;
}

export interface TestAttempt {
  id: string;
  testId: string;
  testTitle: string;
  isFullSyllabus: boolean;
  score: number;
  totalPossibleMarks: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattemptedAnswers: number;
  timeSpentSeconds: number;
  dateStr: string; // ISO String
  responses: Record<string, 'A' | 'B' | 'C' | 'D' | ''>; // questionId -> response
}

export interface ChapterProgress {
  chapterId: string;
  subject: 'Physics' | 'Chemistry' | 'Botany' | 'Zoology';
  ncertRead: boolean;
  notesRevised: boolean;
  mcqsSolved: boolean;
}

export interface DailyTriviaProgress {
  lastSolvedDate?: string; // YYYY-MM-DD
  solvedToday: boolean;
  streakCount: number;
}

export interface UserState {
  attempts: TestAttempt[];
  syllabusProgress: Record<string, ChapterProgress>;
  dailyTrivia: DailyTriviaProgress;
}
