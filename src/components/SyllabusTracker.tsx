import React from 'react';
import { SyllabusSyllabus } from '../data/mockTests';
import { ChapterProgress } from '../types';
import { BookOpen, FileCheck, CheckCircle, Search, HelpCircle, GraduationCap } from 'lucide-react';

interface SyllabusTrackerProps {
  progress: Record<string, ChapterProgress>;
  onToggleProgress: (chapterId: string, flag: 'ncertRead' | 'notesRevised' | 'mcqsSolved') => void;
}

export default function SyllabusTracker({ progress, onToggleProgress }: SyllabusTrackerProps) {
  const [search, setSearch] = React.useState('');
  const [selectedSubject, setSelectedSubject] = React.useState<'All' | 'Physics' | 'Chemistry' | 'Botany' | 'Zoology'>('All');

  const subjectsList = ['All', 'Physics', 'Chemistry', 'Botany', 'Zoology'] as const;

  const filteredChapters = SyllabusSyllabus.filter((c) => {
    const matchesSubject = selectedSubject === 'All' || c.subject === selectedSubject;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.subject.toLowerCase().includes(search.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  // Calculate completion stats
  const totalSteps = SyllabusSyllabus.length * 3;
  let completedSteps = 0;
  SyllabusSyllabus.forEach((c) => {
    const p = progress[c.id];
    if (p) {
      if (p.ncertRead) completedSteps++;
      if (p.notesRevised) completedSteps++;
      if (p.mcqsSolved) completedSteps++;
    }
  });
  const percentComplete = Math.round((completedSteps / totalSteps) * 100) || 0;

  return (
    <div id="syllabus-tracker-view" className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-teal-600" />
              NCERT Syllabus Master Tracker
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Cross-reference your preparation against the official core NCERT textbook chapters for Class 11 and 12.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Overall NCERT Conquest</span>
            <div className="flex items-center gap-3 mt-1">
              <div className="w-32 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-teal-500 h-full transition-all duration-500" 
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
              <span className="text-sm font-bold text-slate-700">{percentComplete}%</span>
            </div>
            <span className="text-xs text-slate-400">{completedSteps} of {totalSteps} tasks mastered</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              id="syllabus-search"
              type="text"
              placeholder="Search chapters (e.g. Optics, Cell...)"
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-teal-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-1">
            {subjectsList.map((sub) => (
              <button
                key={sub}
                id={`sub-filter-${sub}`}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  selectedSubject === sub
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chapters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChapters.map((chapter) => {
          const p = progress[chapter.id] || {
            chapterId: chapter.id,
            subject: chapter.subject,
            ncertRead: false,
            notesRevised: false,
            mcqsSolved: false,
          };

          const isFullyMastered = p.ncertRead && p.notesRevised && p.mcqsSolved;

          return (
            <div 
              key={chapter.id}
              className={`bg-white rounded-xl p-5 border transition-all ${
                isFullyMastered 
                  ? 'border-emerald-200 bg-emerald-50/10' 
                  : 'border-slate-100 hover:border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
                    chapter.subject === 'Physics' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                    chapter.subject === 'Chemistry' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                    chapter.subject === 'Botany' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                    'bg-purple-50 text-purple-600 border border-purple-100'
                  }`}>
                    {chapter.subject} • {chapter.duration}
                  </span>
                  <h3 className="font-semibold text-slate-800 text-sm line-clamp-1">{chapter.name}</h3>
                </div>
                {isFullyMastered && (
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                )}
              </div>

              {/* Task togglers */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-50">
                <button
                  id={`btn-read-${chapter.id}`}
                  onClick={() => onToggleProgress(chapter.id, 'ncertRead')}
                  className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all ${
                    p.ncertRead
                      ? 'bg-teal-50 border-teal-200 text-teal-700'
                      : 'bg-slate-50/50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className={`w-4 h-4 mb-1 ${p.ncertRead ? 'text-teal-600' : ''}`} />
                  <span className="text-[10px] font-medium">Read NCERT</span>
                </button>

                <button
                  id={`btn-notes-${chapter.id}`}
                  onClick={() => onToggleProgress(chapter.id, 'notesRevised')}
                  className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all ${
                    p.notesRevised
                      ? 'bg-teal-50 border-teal-200 text-teal-700'
                      : 'bg-slate-50/50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <FileCheck className={`w-4 h-4 mb-1 ${p.notesRevised ? 'text-teal-600' : ''}`} />
                  <span className="text-[10px] font-medium">Notes Mastered</span>
                </button>

                <button
                  id={`btn-solve-${chapter.id}`}
                  onClick={() => onToggleProgress(chapter.id, 'mcqsSolved')}
                  className={`flex flex-col items-center justify-center py-2 px-1.5 rounded-lg border text-center transition-all ${
                    p.mcqsSolved
                      ? 'bg-teal-50 border-teal-200 text-teal-700'
                      : 'bg-slate-50/50 border-slate-100 text-slate-400 hover:border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className={`w-4 h-4 mb-1 ${p.mcqsSolved ? 'text-teal-600' : ''}`} />
                  <span className="text-[10px] font-medium">MCQs Done</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredChapters.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-400 text-sm">No chapters found matching search filters.</p>
        </div>
      )}
    </div>
  );
}
