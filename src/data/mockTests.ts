import { NEETTest } from '../types';

export const SyllabusSyllabus = [
  {
    id: 'phy-1',
    subject: 'Physics' as const,
    name: 'Units and Measurements & Kinematics',
    duration: 'Class 11'
  },
  {
    id: 'phy-2',
    subject: 'Physics' as const,
    name: 'Laws of Motion & Work, Energy & Power',
    duration: 'Class 11'
  },
  {
    id: 'phy-3',
    subject: 'Physics' as const,
    name: 'Gravitation & Gravitational Fields',
    duration: 'Class 11'
  },
  {
    id: 'phy-4',
    subject: 'Physics' as const,
    name: 'Thermodynamics & Kinetic Theory',
    duration: 'Class 11'
  },
  {
    id: 'phy-5',
    subject: 'Physics' as const,
    name: 'Electrostatics & Current Electricity',
    duration: 'Class 12'
  },
  {
    id: 'phy-6',
    subject: 'Physics' as const,
    name: 'Magnetic Effects & Electromagnetic Induction',
    duration: 'Class 12'
  },
  {
    id: 'phy-7',
    subject: 'Physics' as const,
    name: 'Optics (Ray and Wave)',
    duration: 'Class 12'
  },
  {
    id: 'phy-8',
    subject: 'Physics' as const,
    name: 'Modern Physics & Semiconductors',
    duration: 'Class 12'
  },
  {
    id: 'chy-1',
    subject: 'Chemistry' as const,
    name: 'Some Basic Concepts & Structure of Atom',
    duration: 'Class 11'
  },
  {
    id: 'chy-2',
    subject: 'Chemistry' as const,
    name: 'Classification of Elements & Chemical Bonding',
    duration: 'Class 11'
  },
  {
    id: 'chy-3',
    subject: 'Chemistry' as const,
    name: 'Thermodynamics & Equilibrium',
    duration: 'Class 11'
  },
  {
    id: 'chy-4',
    subject: 'Chemistry' as const,
    name: 'Redox Reactions & Organic Basics',
    duration: 'Class 11'
  },
  {
    id: 'chy-5',
    subject: 'Chemistry' as const,
    name: 'Chemical Kinetics & Coordination Compounds',
    duration: 'Class 12'
  },
  {
    id: 'chy-6',
    subject: 'Chemistry' as const,
    name: 'd- and f- Block Elements & Biomolecules',
    duration: 'Class 12'
  },
  {
    id: 'chy-7',
    subject: 'Chemistry' as const,
    name: 'Haloalkanes, Alcohols, Ethers, Phenols',
    duration: 'Class 12'
  },
  {
    id: 'chy-8',
    subject: 'Chemistry' as const,
    name: 'Aldehydes, Ketones, Amines',
    duration: 'Class 12'
  },
  {
    id: 'bot-1',
    subject: 'Botany' as const,
    name: 'The Living World & Biological Classification',
    duration: 'Class 11'
  },
  {
    id: 'bot-2',
    subject: 'Botany' as const,
    name: 'Plant Kingdom & Anatomy of Flowering Plants',
    duration: 'Class 11'
  },
  {
    id: 'bot-3',
    subject: 'Botany' as const,
    name: 'Cell: Unit of Life & Cell Cycle',
    duration: 'Class 11'
  },
  {
    id: 'bot-4',
    subject: 'Botany' as const,
    name: 'Photosynthesis & Respiration in Plants',
    duration: 'Class 11'
  },
  {
    id: 'bot-5',
    subject: 'Botany' as const,
    name: 'Plant Reproduction (Sexual in Plants)',
    duration: 'Class 12'
  },
  {
    id: 'bot-6',
    subject: 'Botany' as const,
    name: 'Principles of Inheritance & Variation',
    duration: 'Class 12'
  },
  {
    id: 'bot-7',
    subject: 'Botany' as const,
    name: 'Molecular Basis of Inheritance',
    duration: 'Class 12'
  },
  {
    id: 'bot-8',
    subject: 'Botany' as const,
    name: 'Ecology, Organisms, Ecosystem',
    duration: 'Class 12'
  },
  {
    id: 'zoo-1',
    subject: 'Zoology' as const,
    name: 'Animal Kingdom & Structural Organisation',
    duration: 'Class 11'
  },
  {
    id: 'zoo-2',
    subject: 'Zoology' as const,
    name: 'Breathing and Exchange of Gases',
    duration: 'Class 11'
  },
  {
    id: 'zoo-3',
    subject: 'Zoology' as const,
    name: 'Body Fluids & Excretory Products',
    duration: 'Class 11'
  },
  {
    id: 'zoo-4',
    subject: 'Zoology' as const,
    name: 'Neural Control & Chemical Coordination',
    duration: 'Class 11'
  },
  {
    id: 'zoo-5',
    subject: 'Zoology' as const,
    name: 'Human Reproduction & Reproductive Health',
    duration: 'Class 12'
  },
  {
    id: 'zoo-6',
    subject: 'Zoology' as const,
    name: 'Evolution (Origin of Life)',
    duration: 'Class 12'
  },
  {
    id: 'zoo-7',
    subject: 'Zoology' as const,
    name: 'Human Health & Diseases',
    duration: 'Class 12'
  },
  {
    id: 'zoo-8',
    subject: 'Zoology' as const,
    name: 'Biotechnology: Principles & Applications',
    duration: 'Class 12'
  },
];

export const mockTests: NEETTest[] = [
  {
    id: 'test-1',
    title: 'High-Yield Mock Syllabus Test (NEET Pattern)',
    description: 'A custom, highly realistic introductory NEET set covering core topics in Physics, Chemistry, Botany, and Zoology. Designed with standard NEET scoring (+4 / -1).',
    durationMinutes: 20,
    isFullSyllabus: true,
    questions: [
      // PHYSICS
      {
        id: 'phy-q1',
        subject: 'Physics',
        section: 'A',
        chapter: 'Units and Measurements',
        questionText: 'Which of the following represents the correct dimensional formula of the universal gravitational constant (G)?',
        options: {
          A: '[M⁻¹ L³ T⁻²]',
          B: '[M¹ L² T⁻¹]',
          C: '[M⁻² L³ T⁻¹]',
          D: '[M¹ L³ T⁻²]'
        },
        correctAnswer: 'A',
        explanation: 'F = G m₁m₂ / r² => G = F r² / (m₁m₂). Substituting dimensions: Force [M L T⁻²], distance [L²], mass [M²]. Thus G = [M L T⁻²] [L²] / [M²] = [M⁻¹ L³ T⁻²].',
        difficulty: 'Easy'
      },
      {
        id: 'phy-q2',
        subject: 'Physics',
        section: 'A',
        chapter: 'Current Electricity',
        questionText: 'A copper wire of resistance R is stretched uniformly such that its length is doubled. What will be the new resistance of the stretched wire?',
        options: {
          A: '2 R',
          B: '4 R',
          C: 'R / 2',
          D: '16 R'
        },
        correctAnswer: 'B',
        explanation: 'When stretched to double its original length, the volume remains constant. Volume = Area * length (A * l = constant). If l becomes 2l, A becomes A/2. Resistance R = ρ(l / A). The new resistance R\' = ρ(2l / (A/2)) = 4 ρ(l/A) = 4R.',
        difficulty: 'Medium'
      },
      {
        id: 'phy-q3',
        subject: 'Physics',
        section: 'B',
        chapter: 'Modern Physics',
        questionText: 'According to Einstein photoelectric equation, the graph between the stopping potential (V₀) of photoelectron and the frequency (ν) of incident light is a straight line. The slope of this line is:',
        options: {
          A: 'h',
          B: 'h / e',
          C: 'e / h',
          D: 'h · e'
        },
        correctAnswer: 'B',
        explanation: 'Einstein\'s photoelectric equation is: eV₀ = hν - φ₀, where φ₀ is the work function. V₀ = (h/e)ν - (φ₀/e). Comparing with y = mx + c, the slope (m) of the graph between V₀ and ν is h/e.',
        difficulty: 'Medium'
      },
      {
        id: 'phy-q4',
        subject: 'Physics',
        section: 'B',
        chapter: 'Electrostatics',
        questionText: 'Two point charges +3μC and +8μC repel each other with a force of 40 N. If a charge of -5μC is added to each of them, then the force between them will become:',
        options: {
          A: '+10 N (Repulsive)',
          B: '-10 N (Attractive)',
          C: '-20 N (Attractive)',
          D: '0 N'
        },
        correctAnswer: 'B',
        explanation: 'Initial force F₁ ∝ q₁q₂ = (3)(8) = 24. Added charge of -5μC makes new charges q₁\' = 3 - 5 = -2μC and q₂\' = 8 - 5 = +3μC. New product q₁\'q₂\' = (-2)(3) = -6. F₂ / F₁ = (q₁\'q₂\') / (q₁q₂) = -6 / 24 = -1/4. Thus F₂ = F₁ * (-1/4) = 40 * (-1/4) = -10 N. Negative sign indicates attraction.',
        difficulty: 'Hard'
      },

      // CHEMISTRY
      {
        id: 'chy-q1',
        subject: 'Chemistry',
        section: 'A',
        chapter: 'Chemical Bonding',
        questionText: 'What is the hybridization and molecular geometry of sulfur hexafluoride (SF₆) according to VSEPR theory?',
        options: {
          A: 'sp³d, Trigonal bipyramidal',
          B: 'sp³d², Octahedral',
          C: 'sp³d, T-shaped',
          D: 'd²sp³, Square planar'
        },
        correctAnswer: 'B',
        explanation: 'Sulfur has 6 valence electrons and forms 6 single bonds with Fluorine. Steric number = 6 (6 bonded pairs, 0 lone pairs). The hybridization is sp³d² and the shape is Octahedral (with bond angles of 90°).',
        difficulty: 'Easy'
      },
      {
        id: 'chy-q2',
        subject: 'Chemistry',
        section: 'A',
        chapter: 'Organic Basics',
        questionText: 'Which of the following organic carbocations is the most stable experimental entity due to hyperconjugation and inductive effect?',
        options: {
          A: 'Methyl carbocation (⁺CH₃)',
          B: 'Ethyl carbocation (CH₃-⁺CH₂)',
          C: 'Isopropyl carbocation ((CH₃)₂⁺CH)',
          D: 'tert-Butyl carbocation ((CH₃)₃⁺C)'
        },
        correctAnswer: 'D',
        explanation: 'The tertiary carbocation ((CH₃)₃⁺C) is the most stable because it is supported by 9 hyperconjugating α-hydrogens and the inductive electron-donating effect of 3 methyl groups.',
        difficulty: 'Easy'
      },
      {
        id: 'chy-q3',
        subject: 'Chemistry',
        section: 'B',
        chapter: 'Coordination Compounds',
        questionText: 'According to Crystal Field Theory (CFT), what is the correct d-orbital electron configuration for a high-spin d⁵ octahedral complex?',
        options: {
          A: 't₂g³ eg²',
          B: 't₂g⁵ eg⁰',
          C: 't₂g⁴ eg¹',
          D: 't₂g² eg³'
        },
        correctAnswer: 'A',
        explanation: 'For a high-spin octahedral complex, the crystal field splitting energy (Δ₀) is less than the pairing energy (P). Electrons will occupy the orbitals singly before pairing. Under octahedral symmetry, the d-orbitals split into t₂g (triply degenerate, lower energy) and eg (doubly degenerate, higher energy). Five electrons in high-spin fill as t₂g³ eg².',
        difficulty: 'Medium'
      },
      {
        id: 'chy-q4',
        subject: 'Chemistry',
        section: 'B',
        chapter: 'Aldehydes and Ketones',
        questionText: 'Which of the following compounds will successfully undergo Cannizzaro reaction when heated with concentrated sodium hydroxide (NaOH)?',
        options: {
          A: 'Acetaldehyde (CH₃CHO)',
          B: 'Benzaldehyde (C₆H₅CHO)',
          C: 'Acetone (CH₃COCH₃)',
          D: 'Propionaldehyde (CH₃CH₂CHO)'
        },
        correctAnswer: 'B',
        explanation: 'Cannizzaro reaction is given only by aldehydes which lack α-hydrogens. Benzaldehyde (C₆H₅CHO) has no α-hydrogen and undergoes self-oxidation and reduction (disproportionation). Acetaldehyde and propionaldehyde have α-hydrogens and undergo aldol condensation instead.',
        difficulty: 'Medium'
      },

      // BOTANY
      {
        id: 'bot-q1',
        subject: 'Botany',
        section: 'A',
        chapter: 'Photosynthesis',
        questionText: 'During light reaction in C3 plants, the primary electron donor for Photosystem II (PS II) is:',
        options: {
          A: 'Oxygen',
          B: 'NADP⁺',
          C: 'Water',
          D: 'Carbon Dioxide'
        },
        correctAnswer: 'C',
        explanation: 'Water is split during photolysis at the oxygen-evolving complex associated with PS II. Its oxidation produces oxygen, protons, and splits off electrons that specifically replenish the electron hole in the chlorophyll a (P680) reaction center of PS II.',
        difficulty: 'Easy'
      },
      {
        id: 'bot-q2',
        subject: 'Botany',
        section: 'A',
        chapter: 'Principles of Inheritance',
        questionText: 'If a plant of genotype AaBb (independent assortment) is self-pollinated, what is the theoretical probability of getting an offspring with homozygous recessive genotype aabb?',
        options: {
          A: '1 / 4',
          B: '1 / 16',
          C: '9 / 16',
          D: '3 / 16'
        },
        correctAnswer: 'B',
        explanation: 'AaBb x AaBb represents a Mendelian dihybrid cross. The probability of getting aa is 1/4 and the probability of getting bb is 1/4. Since they assort independently, the joint probability of aabb is 1/4 * 1/4 = 1/16.',
        difficulty: 'Easy'
      },
      {
        id: 'bot-q3',
        subject: 'Botany',
        section: 'B',
        chapter: 'Molecular Basis of Inheritance',
        questionText: 'In a DNA molecule, if the amount of Guanine is found to be 30%, what is the percentage of Thymine present based on Chargaff\'s Rule?',
        options: {
          A: '30%',
          B: '20%',
          C: '40%',
          D: '70%'
        },
        correctAnswer: 'B',
        explanation: 'Chargaff\'s rule states Adenine (A) = Thymine (T) and Guanine (G) = Cytosine (C). If G = 30%, then C = 30%. Together, G + C = 60%. The remaining 40% must be shared equally by A and T. Hence, T = 40% / 2 = 20%.',
        difficulty: 'Medium'
      },
      {
        id: 'bot-q4',
        subject: 'Botany',
        section: 'B',
        chapter: 'Plant Kingdom',
        questionText: 'Identify the characteristic feature of Gymnosperms regarding their seeds:',
        options: {
          A: 'Seeds are enclosed inside hard fruits',
          B: 'Seeds are completely naked, lacking any protective ovary wall',
          C: 'Seeds are non-endospermic always',
          D: 'No seeds are produced, only microscopic spores'
        },
        correctAnswer: 'B',
        explanation: 'Gymnosperms (Gymnos = naked, Sperma = seed) have seeds that are not covered by any ovary wall. The ovules are exposed before and after fertilization.',
        difficulty: 'Easy'
      },

      // ZOOLOGY
      {
        id: 'zoo-q1',
        subject: 'Zoology',
        section: 'A',
        chapter: 'Neural Control',
        questionText: 'Which anatomical section of the human brain contains vital centers that regulate cardiovascular reflexes, respiration, and gastric secretions?',
        options: {
          A: 'Cerebellum',
          B: 'Hypothalamus',
          C: 'Medulla oblongata',
          D: 'Corpus callosum'
        },
        correctAnswer: 'C',
        explanation: 'The medulla oblongata (part of brainstem) contains cardiovascular centers, respiratory centers (inspiration loop), and centers controlling reflexes like swatting, swallowing, vomiting, and gastric juices.',
        difficulty: 'Easy'
      },
      {
        id: 'zoo-q2',
        subject: 'Zoology',
        section: 'A',
        chapter: 'Human Reproduction',
        questionText: 'The secretor cells of Leydig, which synthesise and secrete testicular hormones (androgens / testosterone), reside in which structural compartment in human males?',
        options: {
          A: 'Inside the lumen of Seminiferous tubules',
          B: 'Interstitial spaces outside Seminiferous tubules',
          C: 'Within the Epididymis tubules',
          D: 'Prostate gland follicles'
        },
        correctAnswer: 'B',
        explanation: 'Leydig cells, also known as interstitial cells, are located in the region outside the seminiferous tubules (interstitial spaces). On stimulation by LH, they secrete testosterone.',
        difficulty: 'Medium'
      },
      {
        id: 'zoo-q3',
        subject: 'Zoology',
        section: 'B',
        chapter: 'Biotechnology',
        questionText: 'In recombinant DNA technology, which of the following is most commonly used as a highly optimized vector for cloning genes of interest into plant host cells?',
        options: {
          A: 'pBR322 plasmid',
          B: 'Bacteriophage lambda',
          C: 'Ti plasmid of Agrobacterium tumefaciens',
          D: 'Retrovirus vectors'
        },
        correctAnswer: 'C',
        explanation: 'Agrobacterium tumefaciens is a natural genetic engineer that carries the Ti (Tumor inducing) plasmid. It is disarmed and engineered to act as an effective vector to deliver genes into a wide variety of plants.',
        difficulty: 'Medium'
      },
      {
        id: 'zoo-q4',
        subject: 'Zoology',
        section: 'B',
        chapter: 'Evolution',
        questionText: 'Flippers of penguins and dolphins are classic examples of which evolutionary trait?',
        options: {
          A: 'Homologous organs representing divergent evolution',
          B: 'Analogous organs representing convergent evolution',
          C: 'Vestigial organs representing degenerative evolution',
          D: 'Co-evolution pathways'
        },
        correctAnswer: 'B',
        explanation: 'The flippers of penguins (birds) and dolphins (mammals) have different anatomical structures or origin but serve the exact same swimming function. This represents analogous organs arising from convergent evolution due to adaptation to similar marine environments.',
        difficulty: 'Easy'
      }
    ]
  },
  {
    id: 'test-2',
    title: 'Biology High-Speed Booster Quiz',
    description: 'An aggressive focused test solely targeting high-yield concepts from NCERT Biology. Test your accuracy and memorization for 360/360 marks path.',
    durationMinutes: 10,
    isFullSyllabus: false,
    questions: [
      {
        id: 'bio-boost-1',
        subject: 'Botany',
        section: 'A',
        chapter: 'Cell Cycle',
        questionText: 'At which specific phase of meiosis does crossing over and genetic recombination between homolgous chromosomes take place?',
        options: {
          A: 'Leptotene stage of Prophase I',
          B: 'Zygotene stage of Prophase I',
          C: 'Pachytene stage of Prophase I',
          D: 'Diplotene stage of Prophase I'
        },
        correctAnswer: 'C',
        explanation: 'Crossing over is an enzyme-mediated process (by recombinase) that occurs during the Pachytene stage of Prophase I inside meiotic division, where non-sister chromatids of homologous chromosomes exchange genetic segments.',
        difficulty: 'Medium'
      },
      {
        id: 'bio-boost-2',
        subject: 'Botany',
        section: 'A',
        chapter: 'Photosynthesis',
        questionText: 'In C4 plants, the primary CO₂ fixation enzyme PEPcase is located inside:',
        options: {
          A: 'Bundle sheath cell chloroplasts',
          B: 'Mesophyll cell cytoplasm',
          C: 'Epidermal cells',
          D: 'Phloem parenchyma'
        },
        correctAnswer: 'B',
        explanation: 'In C4 plants, PEPcase (phosphoenolpyruvate carboxylase) resides in the mesophyll cell cytoplasm. It joins atmospheric CO₂ with phosphoenolpyruvate (PEP) to form oxaloacetic acid (OAA). mesophyll cells lack RuBisCO, which is instead confined inside the bundle sheath cells.',
        difficulty: 'Medium'
      },
      {
        id: 'bio-boost-3',
        subject: 'Zoology',
        section: 'A',
        chapter: 'Body Fluids',
        questionText: 'Which of the following conditions triggers the release of Erythropoietin (EPO) from the juxtaglomerular cells of the kidney?',
        options: {
          A: 'Excess fluids in blood tissue',
          B: 'Hypoxia (low arterial oxygen levels)',
          C: 'High blood pressure',
          D: 'Calcium deficiency'
        },
        correctAnswer: 'B',
        explanation: 'Erythropoietin is a peptide hormone secreted primarily by the kidneys in response to oxygen deficiency (hypoxia) to stimulate red blood cell (erythrocyte) production in the bone marrow.',
        difficulty: 'Easy'
      },
      {
        id: 'bio-boost-4',
        subject: 'Zoology',
        section: 'A',
        chapter: 'Chemical Coordination',
        questionText: 'Which hormone is a peptide hormone synthesized by the hypothalamus and stored/released from the posterior pituitary?',
        options: {
          A: 'Thyroxine',
          B: 'Growth Hormone',
          C: 'Oxytocin',
          D: 'Progesterone'
        },
        correctAnswer: 'C',
        explanation: 'Oxytocin and Vasopressin (ADH) are synthesized in the hypothalamic neurons and transported axonally to the neurohypophysis (posterior pituitary), which merely stores and secretes them into systemic circulation.',
        difficulty: 'Easy'
      }
    ]
  }
];

export const DailyTrivia = {
  questionText: "Which of the following nitrogenous bases is found in RNA but completely absent in DNA nucleotides?",
  options: {
    A: "Adenine",
    B: "Uracil",
    C: "Thymine",
    D: "Cytosine"
  },
  correctAnswer: "B" as const,
  explanation: "Uracil is a nitrogenous base present specifically in RNA (where it base-pairs with Adenine). In DNA, it is replaced by Thymine (which is also known as 5-methyluracil)."
};
export type { NEETTest as NEETTestType };
