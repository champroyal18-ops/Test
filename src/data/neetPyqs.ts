import { Question } from '../types';

export interface PYQQuestion extends Question {
  year: number;
}

export const neetPyqs: PYQQuestion[] = [
  // --- NEET 2024 ---
  {
    id: 'pyq-2024-phy-1',
    subject: 'Physics',
    section: 'A',
    chapter: 'Rotational Motion',
    questionText: 'The ratio of the radius of gyration of a thin uniform organic ring of radius R about an axis tangent to its plane and in the plane of the ring, to its radius of gyration about its diametric axis is:',
    options: {
      A: '√2 : 1',
      B: '√3 : √2',
      C: '√5 : √2',
      D: '√3 : 1'
    },
    correctAnswer: 'B',
    explanation: 'Moment of inertia of a ring about a diameter is I_dia = (1/2)MR² => k_dia = R / √2. Moment of inertia of a ring about a tangent in its plane: by parallel axis theorem, I_tangent = I_dia + MR² = (1/2)MR² + MR² = (3/2)MR² => k_tangent = R * √(3/2). The ratio of k_tangent to k_dia is [R * √(3/2)] / [R / √2] = √3 / √2, which is √3 : √2.',
    difficulty: 'Hard',
    year: 2024
  },
  {
    id: 'pyq-2024-chy-1',
    subject: 'Chemistry',
    section: 'A',
    chapter: 'Thermodynamics',
    questionText: 'For the free expansion of an ideal gas under adiabatic conditions, which of the following choices is correct?',
    options: {
      A: 'q = 0, ΔT < 0, w ≠ 0',
      B: 'q = 0, ΔT = 0, w = 0',
      C: 'q ≠ 0, ΔT = 0, w = 0',
      D: 'q = 0, ΔT > 0, w = 0'
    },
    correctAnswer: 'B',
    explanation: 'In free expansion, the gas expands against zero external pressure (P_ext = 0), so work done w = -P_ext * ΔV = 0. Since the process is adiabatic, heat transfer q = 0. According to the first law of thermodynamics, ΔU = q + w = 0 + 0 = 0. For an ideal gas, since internal energy U depends only on temperature, ΔU = 0 implies that change in temperature ΔT = 0.',
    difficulty: 'Medium',
    year: 2024
  },
  {
    id: 'pyq-2024-bot-1',
    subject: 'Botany',
    section: 'A',
    chapter: 'Ecology',
    questionText: 'Which of the following is NOT considered a method of ex-situ conservation of biodiversity?',
    options: {
      A: 'Seed banks',
      B: 'Wildlife Safari Parks',
      C: 'National Parks',
      D: 'Botanical Gardens'
    },
    correctAnswer: 'C',
    explanation: 'National Parks are a classic method of in-situ (on-site) conservation where threatened species are protected within their natural habitat. Seed banks, Wildlife Safari Parks, and Botanical Gardens are ex-situ (off-site) methods where organisms are kept in simulated human-curated settings.',
    difficulty: 'Easy',
    year: 2024
  },
  {
    id: 'pyq-2024-zoo-1',
    subject: 'Zoology',
    section: 'A',
    chapter: 'Human Health and Diseases',
    questionText: 'Match the hominid fossils with their respective brain capacities as established in human evolutionary history:\n(a) Homo habilis, (b) Homo erectus, (c) Homo neanderthalensis, (d) Australopithecus.',
    options: {
      A: '(a)-650-800cc, (b)-900cc, (c)-1400cc, (d)-500cc',
      B: '(a)-900cc, (b)-1400cc, (c)-650-800cc, (d)-500cc',
      C: '(a)-1400cc, (b)-900cc, (c)-500cc, (d)-650-800cc',
      D: '(a)-650-800cc, (b)-1400cc, (c)-900cc, (d)-500cc'
    },
    correctAnswer: 'A',
    explanation: 'From standard evolutionary history (NCERT): 1) Australopithecus had a brain capacity of around 500cc. 2) Homo habilis (first human-like hominid) was around 650-800cc. 3) Homo erectus had a larger brain size of about 900cc. 4) Homo neanderthalensis (Neanderthal man) had a prominent brain capacity of 1400cc.',
    difficulty: 'Medium',
    year: 2024
  },

  // --- NEET 2023 ---
  {
    id: 'pyq-2023-phy-1',
    subject: 'Physics',
    section: 'A',
    chapter: 'Magnetic Effects',
    questionText: 'The net magnetic flux through any closed surface is always:',
    options: {
      A: 'Infinite',
      B: 'Zero',
      C: 'μ₀ times the current enclosed',
      D: 'Depends on the shape of the surface'
    },
    correctAnswer: 'B',
    explanation: 'As per Gauss\'s Law for Magnetism, isolated magnetic monopoles do not exist. Magnetic poles always occur in equal and opposite pairs (North and South). Therefore, any closed surface enclosing a magnetic dipole will have equal numbers of magnetic field lines entering and leaving it, yielding a net magnetic flux of exactly zero.',
    difficulty: 'Easy',
    year: 2023
  },
  {
    id: 'pyq-2023-chy-1',
    subject: 'Chemistry',
    section: 'A',
    chapter: 'Structure of Atom',
    questionText: 'What is the relation between the number of permissible values of the magnetic quantum number (m) for a given value of the azimuthal quantum number (l)?',
    options: {
      A: 'l = (m - 1) / 2',
      B: 'm = 2l - 1',
      C: 'l = 2m + 1',
      D: 'm = l + 2'
    },
    correctAnswer: 'A',
    explanation: 'For any given value of the azimuthal quantum number l, the magnetic quantum number m can have values ranging from -l to +l (including zero). The total number of values is m = 2l + 1. Solving for l gives: m - 1 = 2l => l = (m - 1) / 2.',
    difficulty: 'Medium',
    year: 2023
  },
  {
    id: 'pyq-2023-bot-1',
    subject: 'Botany',
    section: 'A',
    chapter: 'Molecular Basis of Inheritance',
    questionText: 'The process of translation of messenger RNA (mRNA) to proteins is initiated as soon as:',
    options: {
      A: 'The tRNA gets activated with amino acids',
      B: 'The larger subunit of the ribosome binds to the mRNA strand',
      C: 'The smaller subunit of the ribosome encounters the mRNA strand',
      D: 'The DNA polymerase begins transcription'
    },
    correctAnswer: 'C',
    explanation: 'In translation, the ribosomal machinery is split into small and large subunits in the resting state. Translation initiates when the smaller subunit of the ribosome encounters and binds to the mRNA strand at the initiation codon (typically AUG). This is followed by the larger subunit docking over the system.',
    difficulty: 'Medium',
    year: 2023
  },
  {
    id: 'pyq-2023-zoo-1',
    subject: 'Zoology',
    section: 'A',
    chapter: 'Excretory Products',
    questionText: 'Which of the following is NOT an effect of the hormone Aldosterone on nephron tubules during active regulation of blood pressure?',
    options: {
      A: 'Reabsorption of Sodium (Na⁺) from Distal Tubules',
      B: 'Reabsorption of Water from Distal Convoluted Tubules',
      C: 'Excretion of Potassium (K⁺) ions',
      D: 'Vasodilation of afferent glomerular arteriole to lower GFR',
      },
    correctAnswer: 'D',
    explanation: 'Aldosterone (secreted by adrenal cortex as part of RAAS) stimulates the active reabsorption of Sodium ions and passive reabsorption of water in Distal Convoluted Tubules (DCT). In exchange, it promotes the excretion of Potassium and Hydrogen ions. It acts to increase blood volume and blood pressure (vasoconstrictive synergy via Angiotensin II), rather than causing vasodilation or lowering GFR.',
    difficulty: 'Hard',
    year: 2023
  },

  // --- NEET 2022 ---
  {
    id: 'pyq-2022-phy-1',
    subject: 'Physics',
    section: 'A',
    chapter: 'Laws of Motion',
    questionText: 'An electric lift with a total maximum mass of 2000 kg (passengers + lift carriage) is moving upwards with a constant velocity of 1.5 m/s. A constant frictional force of 4000 N opposes the upward movement. What is the minimum power delivered by the motor to the lift in horsepower (Hp)? (Take g = 10 m/s², and 1 Hp = 746 Watts)',
    options: {
      A: '32.1 Hp',
      B: '45.4 Hp',
      C: '48.2 Hp',
      D: '24.0 Hp'
    },
    correctAnswer: 'C',
    explanation: 'The forces opposing the upward motion are: 1) Gravity F_g = mg = 2000 * 10 = 20000 N. 2) Frictional opposing force f_k = 4000 N. Total force the motor must overcome is F = F_g + f_k = 20000 + 4000 = 24000 N. Power delivered P = Force * velocity = F * v = 24000 * 1.5 = 36000 Watts. In terms of Hp, Power = 36000 / 746 ≈ 48.25 Hp.',
    difficulty: 'Hard',
    year: 2022
  },
  {
    id: 'pyq-2022-chy-1',
    subject: 'Chemistry',
    section: 'A',
    chapter: 'Aldehydes, Ketones, Amines',
    questionText: 'An organic compound (X) with molecular formula C₃H₉N reacts with Hinsberg\'s Reagent (benzene sulfonyl chloride) to produce a solid residue that is completely insoluble in alkaline potassium hydroxide solution. Identify the structural formula of (X):',
    options: {
      A: 'Propan-1-amine (Primary)',
      B: 'N-Methyl ethanamine (Secondary)',
      C: 'N,N-Dimethyl methanamine (Tertiary)',
      D: 'Isopropyl amine (Primary)'
    },
    correctAnswer: 'B',
    explanation: 'Primary amines react with benzene sulfonyl chloride to yield an N-alkyl benzene sulfonamide which has an acidic hydrogen on the nitrogen capsule, rendering it soluble in alkali. Secondary amines react to form an N,N-dialkyl benzene sulfonamide which lacks any acidic hydrogen and is therefore completely insoluble in alkali. Tertiary amines do not react at all. C₃H₉N representing secondary amine is N-Methyl ethanamine (CH₃-NH-CH₂-CH₃).',
    difficulty: 'Hard',
    year: 2022
  },
  {
    id: 'pyq-2022-bot-1',
    subject: 'Botany',
    section: 'A',
    chapter: 'Ecology',
    questionText: 'Earthworms and other detritivores break down detritus into smaller, coarse fragments. This initial step in the process of decomposition is designated as:',
    options: {
      A: 'Humification',
      B: 'Leaching',
      C: 'Fragmentation',
      D: 'Catabolism'
    },
    correctAnswer: 'C',
    explanation: 'Decomposition follows successive steps: 1) Fragmentation (where detritivores like earthworms break detritus into smaller particles), 2) Leaching (water-soluble nutrients sink down into soil), 3) Catabolism (bacterial and fungal enzymes degrade chemicals), followed by Humification and Mineralization.',
    difficulty: 'Easy',
    year: 2022
  },
  {
    id: 'pyq-2022-zoo-1',
    subject: 'Zoology',
    section: 'A',
    chapter: 'Animal Kingdom',
    questionText: 'Which of the following cellular junctions performs the primary role of cementing neighboring epithelial tissues together securely?',
    options: {
      A: 'Tight junctions',
      B: 'Adhering junctions',
      C: 'Gap junctions',
      D: 'Synaptic junctions'
    },
    correctAnswer: 'B',
    explanation: 'Tight junctions help to stop substances from leaking across a tissue. Adhering junctions perform cementing to keep neighboring cells together. Gap junctions facilitate direct cytoplasmic communication for transfer of ions, small molecules, and big indicators.',
    difficulty: 'Easy',
    year: 2022
  },

  // --- NEET 2021 ---
  {
    id: 'pyq-2021-phy-1',
    subject: 'Physics',
    section: 'A',
    chapter: 'Modern Physics',
    questionText: 'An electromagnetic wave of wavelength λ is incident on a photosensitive metal plate of negligible work function. If the de Broglie wavelength of the emitted photoelectrons of mass m is λ_e, then:',
    options: {
      A: 'λ = (2mc/h) * (λ_e)²',
      B: 'λ_e = (2mc/h) * λ²',
      C: 'λ = (2h/mc) * (λ_e)²',
      D: 'λ_e = (2h/mc) * λ²'
    },
    correctAnswer: 'A',
    explanation: 'Since the work function is negligible (φ₀ ≈ 0), kinetic energy of photoelectrons K_max = E_incident = hc/λ. The de Broglie wavelength of photoelectrons is λ_e = h / √(2m K_max). Squaring both sides: (λ_e)² = h² / (2m * K_max) = h² / (2m * (hc/λ)) = hλ / (2mc). Re-arranging for λ yields: λ = (2mc/h) * (λ_e)².',
    difficulty: 'Hard',
    year: 2021
  },
  {
    id: 'pyq-2021-chy-1',
    subject: 'Chemistry',
    section: 'A',
    chapter: 'Classification of Elements',
    questionText: 'What is the correct IUPAC name for an artificial superheavy chemical element discovered with atomic number (Z) of exactly 119?',
    options: {
      A: 'Ununennium',
      B: 'Ununbium',
      C: 'Ununquadium',
      D: 'Ununoctium'
    },
    correctAnswer: 'A',
    explanation: 'For atomic name roots: 1 = un, 1 = un, 9 = enn. Applying the IUPAC systematic naming conventions for Z = 119: Root names Un + Un + Enn + "ium" suffix. Thus, the systematic name of the element is Ununennium (symbol Uue).',
    difficulty: 'Easy',
    year: 2021
  },
  {
    id: 'pyq-2021-bot-1',
    subject: 'Botany',
    section: 'A',
    chapter: 'Biotechnology: Principles',
    questionText: 'During a gene amplification process using Polymerase Chain Reaction (PCR), if we fail to maintain a very high temperature in the initial heating phase, which step of the replication cycle is blocked first?',
    options: {
      A: 'Primer annealing',
      B: 'Denaturation',
      C: 'Extension of primers',
      D: 'Ligation of adapters'
    },
    correctAnswer: 'B',
    explanation: 'The three sequential steps of PCR are: 1) Denaturation (heating double-stranded target DNA to ~94°C to split hydrogen bonds), 2) Annealing (cooling to ~54°C to let oligonucleotide primers pair with complementary templates), 3) Extension (heating to ~72°C for Taq polymerase to polymerize). If high temperature is missing at start, denaturation fails first.',
    difficulty: 'Easy',
    year: 2021
  },
  {
    id: 'pyq-2021-zoo-1',
    subject: 'Zoology',
    section: 'A',
    chapter: 'Evolution',
    questionText: 'In evolutionary genetics, what is the primary factor that triggers the occurrence of the "Founder Effect" inside isolated groups of a population?',
    options: {
      A: 'Natural Selection',
      B: 'Genetic Drift',
      C: 'Reproductive Isolation',
      D: 'Mutation accumulation'
    },
    correctAnswer: 'B',
    explanation: 'Founder effect is a specific consequence of Genetic Drift (random fluctuations of allele frequencies due to chance). If a tiny group of colonizing individuals drifts away and founds a new isolated sub-population, their narrow gene pool dictates the genetic structure of future generations, making them distinct from parent populations.',
    difficulty: 'Medium',
    year: 2021
  }
];
