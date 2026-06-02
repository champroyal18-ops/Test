import React from 'react';
import { RefreshCw, Check, AlertCircle, Sparkles, BookOpen } from 'lucide-react';

interface Flashcard {
  id: string;
  subject: 'Physics' | 'Chemistry' | 'Biology';
  topic: string;
  front: string;
  back: string;
  tip?: string;
}

const defaultFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    subject: 'Biology',
    topic: 'Genetics (Start & Stop Codons)',
    front: 'What is the universal start codon in genetic translation, and what are the three standard stop codons?',
    back: 'Start Codon: AUG (codes for Methionine).\nStop Codons: UAA (Ochre), UAG (Amber), UGA (Opal).',
    tip: 'Mnemonic for stop codons: U Are Away (UAA), U Are Gone (UAG), U Go Away (UGA).'
  },
  {
    id: 'fc-2',
    subject: 'Physics',
    topic: 'Modern Physics (De Broglie Wavelength)',
    front: 'What is the formula for the de Broglie wavelength (λ) of an electron accelerated through a voltage V?',
    back: 'λ = h / p = h / √(2m e V)\nFor an electron, this simplifies to:\nλ ≈ 12.27 / √V Å (Angstroms) or √(150/V) Å.',
    tip: 'Highly tested in NEET. Useful to directly bypass h, m, and e constants values.'
  },
  {
    id: 'fc-3',
    subject: 'Chemistry',
    topic: 'Organic Reagents (Clemmensen vs Wolff-Kishner)',
    front: 'Specify the reagents used for (a) Clemmensen Reduction and (b) Wolff-Kishner Reduction, and their primary function.',
    back: 'Primary Function: Reduce carbonyl group (C=O) of aldehydes/ketones to CH₂.\n(a) Clemmensen: Zinc Amalgam & Concentrated HCl (Zn-Hg / HCl) [Acidic condition].\n(b) Wolff-Kishner: Hydrazine followed by KOH in ethylene glycol (NH₂NH₂ / KOH / glycol) [Basic condition].',
    tip: 'Use Clemmensen for acid-stable molecules and Wolff-Kishner for base-stable molecules.'
  },
  {
    id: 'fc-4',
    subject: 'Biology',
    topic: 'Human Physiology (ECG Waves)',
    front: 'In a standard Electrocardiogram (ECG), what physiological events correspond to the P-wave, QRS-complex, and T-wave?',
    back: 'P-wave: Depolarisation of Auricles (atria) leading to atrial contraction.\nQRS-complex: Depolarisation of Ventricles, triggering ventricular contraction.\nT-wave: Repolarisation of Ventricles returning to normal state.',
    tip: 'Slight deviation in the segment amplitude shows heart injury or infarction.'
  },
  {
    id: 'fc-5',
    subject: 'Physics',
    topic: 'Electrostatics',
    front: 'What is the electric field E inside a hollow charged spherical shell of radius R at a distance r from the center?',
    back: '1) Inside the shell (r < R): E = 0\n2) On/Outside the shell (r ≥ R): E = k Q / r² (acts as a point charge at the center).',
    tip: 'Recall that potential V inside is CONSTANT and equals kQ/R.'
  },
  {
    id: 'fc-6',
    subject: 'Chemistry',
    topic: 'Inorganic Chemistry (Hybridization)',
    front: 'Determine the hybridization state and shape of XeF₄ (Xenon Tetrafluoride) using VSEPR calculations.',
    back: 'Hybridization: sp³d²\nShape: Square Planar\n(Xenon has 8 valence electrons, 4 are shared in single bonds, leaving 2 lone pairs occupied axially).',
    tip: 'The steric index is 6 (4 sigma bonds, 2 lone pairs) which translates to octahedral arrangement but square planar shape.'
  }
];

export default function Flashcards() {
  const [selectedSubject, setSelectedSubject] = React.useState<'All' | 'Physics' | 'Chemistry' | 'Biology'>('All');
  const [index, setIndex] = React.useState(0);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [masteredIds, setMasteredIds] = React.useState<string[]>([]);

  const filtered = defaultFlashcards.filter(c => selectedSubject === 'All' || c.subject === selectedSubject);

  React.useEffect(() => {
    // Reset index if filtered size is smaller
    if (index >= filtered.length) {
      setIndex(0);
    }
    setIsFlipped(false);
  }, [selectedSubject, filtered.length, index]);

  const currentCard = filtered[index];

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % filtered.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    }, 150);
  };

  const toggleMastered = (id: string) => {
    setMasteredIds(prev => 
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const percentageMastered = filtered.length > 0
    ? Math.round((filtered.filter(c => masteredIds.includes(c.id)).length / filtered.length) * 100)
    : 0;

  return (
    <div id="flashcards-section" className="max-w-2xl mx-auto space-y-6">
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-2xl p-6 border border-teal-100 flex items-start gap-4">
        <Sparkles className="w-8 h-8 text-teal-600 shrink-0 mt-1" />
        <div>
          <h3 className="font-semibold text-teal-900 text-lg">NEET High-Yield Active Recall</h3>
          <p className="text-sm text-teal-700 mt-1">
            Revisit critical formulae, anatomy terms, and organic chemistry catalysts. Flip the card to test your memory and solidify concept connections.
          </p>
        </div>
      </div>

      {/* Filters and counters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-1.5">
          {(['All', 'Physics', 'Chemistry', 'Biology'] as const).map((sub) => (
            <button
              key={sub}
              id={`fc-tab-${sub}`}
              onClick={() => { setSelectedSubject(sub); setIndex(0); }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all ${
                selectedSubject === sub
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500 font-medium">
          Mastery rate for {selectedSubject}: <span className="font-bold text-teal-600">{percentageMastered}%</span>
        </div>
      </div>

      {filtered.length > 0 && currentCard ? (
        <div className="space-y-6">
          {/* Main Flashcard Container */}
          <div 
            id="fc-interactive-box"
            onClick={() => setIsFlipped(!isFlipped)}
            className="group cursor-pointer perspective-1000 h-80 min-h-[320px] relative w-full"
          >
            <div 
              className={`duration-500 preserve-3d relative w-full h-full transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT SIDE */}
              <div className="absolute backface-hidden w-full h-full bg-white rounded-2xl shadow-sm border border-slate-150 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 border border-teal-100 uppercase tracking-widest px-2.5 py-1 rounded">
                      {currentCard.subject} • {currentCard.topic}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      card {index + 1} of {filtered.length}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-slate-800 leading-relaxed mt-4">
                    {currentCard.front}
                  </h4>
                </div>
                
                <div className="flex justify-between items-center text-xs text-slate-400 mt-2 border-t border-slate-50 pt-4">
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5" /> Click anywhere to reveal explanation
                  </span>
                  {masteredIds.includes(currentCard.id) && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Mastered
                    </span>
                  )}
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute backface-hidden rotate-y-180 w-full h-full bg-slate-900 text-slate-100 rounded-2xl p-8 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold text-teal-400 bg-teal-950 border border-teal-900 uppercase tracking-widest px-2.5 py-1 rounded">
                      Explanatory Fact
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      Solution Grid
                    </span>
                  </div>
                  <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed scrollbar-thin max-h-40 overflow-y-auto">
                    {currentCard.back}
                  </div>
                  {currentCard.tip && (
                    <div className="mt-4 p-3 rounded-lg bg-teal-950/40 border border-teal-900/30 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                      <p className="text-[11px] text-teal-300 italic leading-normal">
                        {currentCard.tip}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center text-xs text-slate-400 mt-2 border-t border-slate-800 pt-4">
                  <span>Click to flip back</span>
                  <span className="text-[10px] text-teal-400 uppercase font-semibold">NCERT Standard</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-between items-center gap-4">
            <button
              id="fc-prev-btn"
              onClick={handlePrev}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Previous Card
            </button>

            <button
              id={`fc-mastery-${currentCard.id}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleMastered(currentCard.id);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition ${
                masteredIds.includes(currentCard.id)
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100'
              }`}
            >
              <Check className="w-4 h-4" />
              {masteredIds.includes(currentCard.id) ? 'Mastered!' : 'Mark as Mastered'}
            </button>

            <button
              id="fc-next-btn"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
            >
              Next Card
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl border border-slate-100">
          <p className="text-slate-400">No flashcards matching the filters currently exist.</p>
        </div>
      )}
    </div>
  );
}
