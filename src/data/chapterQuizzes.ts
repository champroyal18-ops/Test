import { Question } from '../types';

export interface ChapterQuizQuestion {
  id: string;
  questionText: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const chapterQuizzes: Record<string, ChapterQuizQuestion[]> = {
  // PHYSICS
  'phy-1': [
    {
      id: 'phy-1-q1',
      questionText: 'A particle moves along a straight line such that its displacement s at any time t is given by s = t³ - 6t² + 3t + 4. Find the velocity of the particle when its acceleration is zero.',
      options: {
        A: '-9 m/s',
        B: '-15 m/s',
        C: '3 m/s',
        D: '0 m/s'
      },
      correctAnswer: 'A',
      explanation: 'Displacement s = t³ - 6t² + 3t + 4. Velocity v = ds/dt = 3t² - 12t + 3. Acceleration a = dv/dt = 6t - 12. Acceleration is zero when 6t - 12 = 0 => t = 2 s. Velocity at t = 2 s is v = 3(2)² - 12(2) + 3 = 12 - 24 + 3 = -9 m/s.',
      difficulty: 'Medium'
    },
    {
      id: 'phy-1-q2',
      questionText: 'If the error in the measurement of the radius of a sphere is 2%, what is the percentage error in the determination of its volume?',
      options: {
        A: '2%',
        B: '4%',
        C: '6%',
        D: '8%'
      },
      correctAnswer: 'C',
      explanation: 'Volume of a sphere is V = (4/3)π r³. The relative error in volume is ΔV/V = 3 * (Δr/r). Since the error in radius is 2%, the percentage error in volume is 3 * 2% = 6%.',
      difficulty: 'Easy'
    }
  ],
  'phy-2': [
    {
      id: 'phy-2-q1',
      questionText: 'A body of mass 2 kg is slid up a 30° inclined plane of length 10 m with an initial speed of 10 m/s. If the coefficient of friction is 0.2, find the work done against friction (Take g = 10 m/s²).',
      options: {
        A: '34.6 J',
        B: '20 J',
        C: '17.3 J',
        D: '40 J'
      },
      correctAnswer: 'A',
      explanation: 'Work done against friction W_f = f_k * d = μ_k * R * d = μ_k * (mg cos θ) * d. Here, m = 2 kg, θ = 30°, d = 10 m, μ_k = 0.2. W_f = 0.2 * (2 * 10 * cos 30°) * 10 = 0.2 * 20 * 0.866 * 10 = 34.64 J.',
      difficulty: 'Hard'
    },
    {
      id: 'phy-2-q2',
      questionText: 'A uniform force of (3i + j) N acts on a particle of mass 2 kg. Hence, the particle is displaced from position (2i + k) m to (4i + 3j - k) m. Find the work done by the force.',
      options: {
        A: '6 J',
        B: '9 J',
        C: '12 J',
        D: '15 J'
      },
      correctAnswer: 'B',
      explanation: 'Force vector F = 3i + j. Displacement vector d = r₂ - r₁ = (4i + 3j - k) - (2i + k) = 2i + 3j - 2k. Work done W = F · d = (3i + j + 0k) · (2i + 3j - 2k) = 3(2) + 1(3) + 0(-2) = 6 + 3 = 9 Joules.',
      difficulty: 'Medium'
    }
  ],
  'phy-3': [
    {
      id: 'phy-3-q1',
      questionText: 'The acceleration due to gravity at a height h above the surface of the Earth is same as that at a depth d below the surface. If h and d are very small compared to the radius of Earth R, then:',
      options: {
        A: 'd = h',
        B: 'd = 2h',
        C: 'h = 2d',
        D: 'd = h / 2'
      },
      correctAnswer: 'B',
      explanation: 'For small heights h, g_h = g(1 - 2h/R). For depth d, g_d = g(1 - d/R). Since g_h = g_d, we get 1 - 2h/R = 1 - d/R, which simplifies to d = 2h.',
      difficulty: 'Medium'
    },
    {
      id: 'phy-3-q2',
      questionText: 'If the distance between the Earth and the Sun is halved, what will be the duration of the year (originally 365 days) corresponding to Kepler\'s third law?',
      options: {
        A: '129 days',
        B: '182.5 days',
        C: '258 days',
        D: '91 days'
      },
      correctAnswer: 'A',
      explanation: 'Kepler\'s third law states T² ∝ r³. Therefore, (T₂/T₁)² = (r₂/r₁)³. Given r₂ = r₁/2, we have (T₂/T₁)² = (1/2)³ = 1/8. T₂ = T₁ / √8 = T₁ / 2.828. For T₁ = 365 days, T₂ = 365 / 2.828 ≈ 129 days.',
      difficulty: 'Hard'
    }
  ],
  'phy-4': [
    {
      id: 'phy-4-q1',
      questionText: 'An ideal heat engine operating between temperatures T₁ and T₂ has an efficiency of 1/6. When the temperature of the sink T₂ is decreased by 62 K, its efficiency doubles. Find the original source temperature T₁.',
      options: {
        A: '372 K',
        B: '268 K',
        C: '310 K',
        D: '400 K'
      },
      correctAnswer: 'A',
      explanation: 'Initial efficiency η₁ = 1 - T₂/T₁ = 1/6 => T₂/T₁ = 5/6. When T₂ is decreased by 62 K, efficiency η₂ = 1 - (T₂ - 62)/T₁ = 2/6 = 1/3. 1 - T₂/T₁ + 62/T₁ = 1/3 => 1/6 + 62/T₁ = 1/3 => 62/T₁ = 1/3 - 1/6 = 1/6 => T₁ = 62 * 6 = 372 K.',
      difficulty: 'Hard'
    },
    {
      id: 'phy-4-q2',
      questionText: 'According to the kinetic theory of gases, at what temperature (absolute) will the root mean square (rms) speed of helium atoms be equal to that of oxygen molecules at 300 K?',
      options: {
        A: '37.5 K',
        B: '50 K',
        C: '150 K',
        D: '600 K'
      },
      correctAnswer: 'A',
      explanation: 'v_rms = √(3RT/M). For v_rms(He) = v_rms(O₂): T_He / M_He = T_O₂ / M_O₂. M_He = 4 g/mol, M_O₂ = 32 g/mol, T_O₂ = 300 K. T_He / 4 = 300 / 32 => T_He = 300 / 8 = 37.5 K.',
      difficulty: 'Medium'
    }
  ],
  'phy-5': [
    {
      id: 'phy-5-q1',
      questionText: 'A parallel plate capacitor is charged and then disconnected from the battery. If the distance between the plates is increased, what happens to the charge and potential difference across the plates?',
      options: {
        A: 'Charge remains constant, potential difference increases',
        B: 'Charge increases, potential difference decreases',
        C: 'Both charge and potential difference remain constant',
        D: 'Charge remains constant, potential difference decreases'
      },
      correctAnswer: 'A',
      explanation: 'Since the capacitor is disconnected from the battery, the charge Q is isolated and must remain constant. Capacitance C = ε₀A/d. Increasing the distance d decreases C. Since Q = CV, a constant Q and a decreased C leads to an increased potential difference V across the plates.',
      difficulty: 'Medium'
    },
    {
      id: 'phy-5-q2',
      questionText: 'An electric wire of resistance 10 ohms is drawn/stretched to triple its original length. Find the new resistance of the wire.',
      options: {
        A: '30 ohms',
        B: '90 ohms',
        C: '3.33 ohms',
        D: '120 ohms'
      },
      correctAnswer: 'B',
      explanation: 'When stretched to n times its length, resistance becomes n² * R. Here, n = 3, so original resistance 10 ohms becomes 3² * 10 = 9 * 10 = 90 ohms.',
      difficulty: 'Easy'
    }
  ],
  'phy-6': [
    {
      id: 'phy-6-q1',
      questionText: 'A circular coil of radius 10 cm having 100 turns carries a current of 3.2 A. What is the magnetic field induction at the center of the coil?',
      options: {
        A: '2.01 * 10⁻³ T',
        B: '4.02 * 10⁻⁴ T',
        C: '2.01 * 10⁻⁴ T',
        D: '6.28 * 10⁻³ T'
      },
      correctAnswer: 'A',
      explanation: 'B = μ₀ I N / (2 R). Here, μ₀ = 4π * 10⁻⁷, I = 3.2 A, N = 100, R = 0.1 m. B = (4π * 10⁻⁷ * 3.2 * 100) / (2 * 0.1) = (4π * 10⁻⁵ * 3.2) / 0.2 = 20 * 3.2 * π * 10⁻⁵ = 64π * 10⁻⁵ ≈ 2.01 * 10⁻³ T.',
      difficulty: 'Medium'
    },
    {
      id: 'phy-6-q2',
      questionText: 'A conductor rod of length 1 m is rotated with an angular frequency of 400 rad/s about an axis normal to the rod passing through one of its ends in a magnetic field of 0.5 T. Find the induced EMF between the two ends.',
      options: {
        A: '100 V',
        B: '200 V',
        C: '50 V',
        D: '400 V'
      },
      correctAnswer: 'A',
      explanation: 'Induced EMF in a rotating rod is e = (1/2) B ω l². Given B = 0.5 T, ω = 400 rad/s, and l = 1 m. e = 0.5 * 0.5 * 400 * 1² = 100 V.',
      difficulty: 'Easy'
    }
  ],
  'phy-7': [
    {
      id: 'phy-7-q1',
      questionText: 'An astronomical telescope has an objective focal length of 140 cm and an eyepiece focal length of 5.0 cm. What is the magnifying power of the telescope for normal adjustment?',
      options: {
        A: '28',
        B: '700',
        C: '145',
        D: '35'
      },
      correctAnswer: 'A',
      explanation: 'Magnitude of magnifying power of a telescope in normal adjustment is m = f_o / f_e. Here f_o = 140 cm, f_e = 5 cm. m = 140 / 5 = 28.',
      difficulty: 'Easy'
    },
    {
      id: 'phy-7-q2',
      questionText: 'In Young\'s double slit experiment, the slit separation is 0.28 mm and the screen is placed 1.4 m away. If the wavelength of the light used is 600 nm, find the width of the bright fringe (fringe width).',
      options: {
        A: '3.0 mm',
        B: '1.5 mm',
        C: '4.5 mm',
        D: '6.0 mm'
      },
      correctAnswer: 'A',
      explanation: 'Fringe width β = λ D / d. Given λ = 600 nm = 600 * 10⁻⁹ m, D = 1.4 m, and d = 0.28 mm = 0.28 * 10⁻³ m. β = (600 * 10⁻⁹ * 1.4) / (0.28 * 10⁻³) = (840 * 10⁻⁹) / (0.28 * 10⁻³) = 3 * 10⁻³ m = 3.0 mm.',
      difficulty: 'Medium'
    }
  ],
  'phy-8': [
    {
      id: 'phy-8-q1',
      questionText: 'The work function of a cesium metal is 2.14 eV. When light of frequency 6.0 * 10¹⁴ Hz is incident on the metal surface, what is the maximum kinetic energy of the emitted photoelectrons? (h = 4.14 * 10⁻¹⁵ eV s)',
      options: {
        A: '0.34 eV',
        B: '2.48 eV',
        C: '0.48 eV',
        D: '1.20 eV'
      },
      correctAnswer: 'A',
      explanation: 'Energy of incident absolute photon E = hν = (4.14 * 10⁻¹/¹⁰) * (6 * 10¹⁴) = 2.48 eV. Maximum kinetic energy K_max = E - φ₀ = 2.48 eV - 2.14 eV = 0.34 eV.',
      difficulty: 'Medium'
    },
    {
      id: 'phy-8-q2',
      questionText: 'In a half-wave rectifier, if the input AC frequency is 50 Hz, what is the output ripple frequency?',
      options: {
        A: '25 Hz',
        B: '50 Hz',
        C: '100 Hz',
        D: '200 Hz'
      },
      correctAnswer: 'B',
      explanation: 'In a half-wave rectifier, the output frequency is equal to the input frequency (50 Hz). In a full-wave rectifier, the output frequency is twice the input frequency (100 Hz).',
      difficulty: 'Easy'
    }
  ],

  // CHEMISTRY
  'chy-1': [
    {
      id: 'chy-1-q1',
      questionText: 'An organic compound contains 40% carbon, 6.7% hydrogen, and 53.3% oxygen. What is the empirical formula of the compound?',
      options: {
        A: 'CHO',
        B: 'CH₂O',
        C: 'C₂H₄O₂',
        D: 'CHO₂'
      },
      correctAnswer: 'B',
      explanation: 'Molar ratios: Carbon (40 / 12 = 3.33), Hydrogen (6.7 / 1 = 6.7), Oxygen (53.3 / 16 = 3.33). Dividing by 3.33 gives: C: 1, H: 2, O: 1. So the empirical formula is CH₂O.',
      difficulty: 'Easy'
    },
    {
      id: 'chy-1-q2',
      questionText: 'What is the maximum number of emission lines obtained when the excited electron of a hydrogen atom in n = 5 drops to ground state (n = 1)?',
      options: {
        A: '10',
        B: '15',
        C: '5',
        D: '20'
      },
      correctAnswer: 'A',
      explanation: 'Number of spectral lines emitted when electron transitions from n₂ down to n₁ is given by N = (n₂ - n₁)(n₂ - n₁ + 1)/2. For transition from n = 5 to n = 1: N = (5 - 1)(5 - 1 + 1)/2 = 4 * 5 / 2 = 10 lines.',
      difficulty: 'Medium'
    }
  ],
  'chy-2': [
    {
      id: 'chy-2-q1',
      questionText: 'Which of the following molecules has a non-zero dipole moment despite having a symmetrical structure representation?',
      options: {
        A: 'CO₂',
        B: 'NF₃',
        C: 'BF₃',
        D: 'CCl₄'
      },
      correctAnswer: 'B',
      explanation: 'NF₃ has a pyramidal geometry because of the presence of one lone pair on nitrogen. The individual N-F bonds are highly polar, and the vector sum of their dipoles does not cancel out the dipole of the lone pair, leading to a permanent non-zero dipole moment. CO₂, BF₃, and CCl₄ are completely symmetrical with net zero dipole moments.',
      difficulty: 'Medium'
    },
    {
      id: 'chy-2-q2',
      questionText: 'Which of the following compounds displays the highest ionic character based on Fajan\'s rules?',
      options: {
        A: 'LiCl',
        B: 'NaCl',
        C: 'KCl',
        D: 'CsCl'
      },
      correctAnswer: 'D',
      explanation: 'According to Fajan\'s rules, covalent character decreases and ionic character increases as the size of the cation increases. Among alkali metal cations, Cs⁺ is the largest, resulting in the least polarizing power and highest ionic character in CsCl.',
      difficulty: 'Medium'
    }
  ],
  'chy-3': [
    {
      id: 'chy-3-q1',
      questionText: 'For a spontaneous chemical reaction at constant temperature and pressure, which criteria must be satisfied regarding enthalpy, entropy, and Gibbs free energy?',
      options: {
        A: 'ΔG < 0, ΔH < 0, ΔS > 0 always',
        B: 'ΔG < 0',
        C: 'ΔH < 0 and ΔS < 0',
        D: 'ΔG > 0'
      },
      correctAnswer: 'B',
      explanation: 'The fundamental thermodynamic criterion for spontaneity at constant temperature and pressure is that the change in Gibbs Free Energy must be negative (ΔG < 0). Although negative ΔH and positive ΔS favor spontaneity, they are not strictly required if other variables compensate.',
      difficulty: 'Easy'
    },
    {
      id: 'chy-3-q2',
      questionText: 'The pH of a 10⁻⁸ M aqueous solution of hydrochloric acid (HCl) at 298 K is:',
      options: {
        A: '8.00',
        B: '6.00',
        C: '6.98',
        D: '7.02'
      },
      correctAnswer: 'C',
      explanation: 'In extremely dilute HCl solutions (10⁻⁸ M), we cannot ignore the [H⁺] contributed by the auto-ionization of water (~10⁻⁷ M). Total [H⁺] = [H⁺]_acid + [H⁺]_water ≈ 10⁻⁸ + 10⁻⁷ = 1.1 * 10⁻⁷ M. Taking the negative log: pH = -log(1.1 * 10⁻⁷) ≈ 6.98 (slightly acidic, which makes physical sense for an acid in water, unlike pH = 8 which is basic).',
      difficulty: 'Hard'
    }
  ],
  'chy-4': [
    {
      id: 'chy-4-q1',
      questionText: 'In the redox reaction: 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O, the manganese atoms undergo:',
      options: {
        A: 'Only oxidation',
        B: 'Only reduction',
        C: 'Disproportionation',
        D: 'Decomposition'
      },
      correctAnswer: 'C',
      explanation: 'Manganese in reactant MnO₄²⁻ has oxidation state +6. In products, it exists in MnO₄⁻ (+7 oxidation state, oxidized) and MnO₂ (+4 oxidation state, reduced). Since the same element under oxidation and reduction simultaneously, it is a disproportionation reaction.',
      difficulty: 'Medium'
    },
    {
      id: 'chy-4-q2',
      questionText: 'Which of the following acts as the strongest electrophilic species during a nitration reaction of benzene?',
      options: {
        A: 'NO₃⁻',
        B: 'NO₂⁺ (Nitronium ion)',
        C: 'HNO₃',
        D: 'NO⁺'
      },
      correctAnswer: 'B',
      explanation: 'Nitration of benzene uses a mixture of concentrated HNO₃ and H₂SO₄. Sulfuric acid protonates nitric acid, which splits off water to generate the electrophile NO₂⁺ (nitronium ion), which directly attacks the benzene ring.',
      difficulty: 'Easy'
    }
  ],
  'chy-5': [
    {
      id: 'chy-5-q1',
      questionText: 'A first-order chemical reaction takes 40 minutes for 30% decomposition. What is its half-life (t_1/2)? (log 7 = 0.845, log 10 = 1)',
      options: {
        A: '77.7 mins',
        B: '53.5 mins',
        C: '22.3 mins',
        D: '112.5 mins'
      },
      correctAnswer: 'A',
      explanation: 'For a first-order reaction: k = (2.303 / t) * log(A₀ / A). Here, t = 40 min, A = 0.70 A₀. k = (2.303 / 40) * log(1 / 0.7) = 0.0575 * (log 10 - log 7) = 0.0575 * 0.155 ≈ 0.00891 min⁻¹. Half-life t_1/2 = 0.693 / k = 0.693 / 0.00891 ≈ 77.7 minutes.',
      difficulty: 'Hard'
    },
    {
      id: 'chy-5-q2',
      questionText: 'Which of the following square planar complexes exhibits geometric cis/trans isomerism?',
      options: {
        A: '[Pt(NH₃)₄]²⁺',
        B: '[Pt(NH₃)₃Cl]⁺',
        C: '[Pt(NH₃)₂Cl₂]',
        D: '[Pt(NH₃)Cl₃]⁻'
      },
      correctAnswer: 'C',
      explanation: 'Square planar complexes of the type [MA₂B₂] exhibit geometric isomerism (cis and trans). [Pt(NH₃)₂Cl₂] represents this class (cis-platin and trans-platin exist). Complexes like [MA₄], [MA₃B] do not form structural geometric isomers.',
      difficulty: 'Medium'
    }
  ],
  'chy-6': [
    {
      id: 'chy-6-q1',
      questionText: 'Why do transition elements (d-block) show highly variable oxidation states compared to representative elements?',
      options: {
        A: 'Due to very small energy difference between (n-1)d and ns orbitals',
        B: 'Due to inert pair effect in outermost s subshell',
        C: 'Because d orbitals are completely filled',
        D: 'Due to their gaseous nature'
      },
      correctAnswer: 'A',
      explanation: 'Transition metals show variable oxidation states because the energy differences between the (n-1)d orbitals and the ns orbitals are extremely small, allowing electrons from both levels to participate in chemical bond formation.',
      difficulty: 'Easy'
    },
    {
      id: 'chy-6-q2',
      questionText: 'Which of the following Biomolecules is a fibrous structural protein found majorly in hair, nails, and skin epidermal layers?',
      options: {
        A: 'Insulin',
        B: 'Albumin',
        C: 'Keratin',
        D: 'Myosin'
      },
      correctAnswer: 'C',
      explanation: 'Keratin is a classic fibrous structural protein containing disulfide cross-links, rendering it insoluble in water. It constitutes the major component of hair, outer layers of skin, and nails.',
      difficulty: 'Easy'
    }
  ],
  'chy-7': [
    {
      id: 'chy-7-q1',
      questionText: 'When phenol is treated with chloroform (CHCl₃) in the presence of sodium hydroxide (NaOH), followed by acidification, salicylaldehyde is obtained. This reaction is known as:',
      options: {
        A: 'Kolbe-Schmitt reaction',
        B: 'Reimer-Tiemann reaction',
        C: 'Williamson synthesis',
        D: 'Friedel-Crafts acylation'
      },
      correctAnswer: 'B',
      explanation: 'The reaction of phenol with chloroform in alkaline medium (NaOH) to yield o-hydroxybenzaldehyde (salicylaldehyde) is the Reimer-Tiemann reaction. Electrophile involved is dichlorocarbene (:CCl₂).',
      difficulty: 'Medium'
    },
    {
      id: 'chy-7-q2',
      questionText: 'Which of the following organic structures will react fastest with hydrogen halide via S_N1 mechanistic pathway?',
      options: {
        A: 'Primary alcohol',
        B: 'Secondary alcohol',
        C: 'Tertiary alcohol',
        D: 'Methanol'
      },
      correctAnswer: 'C',
      explanation: 'S_N1 reactions proceed through carbocation intermediates. Tertiary carbocations are highly stabilized by hyperconjugation and inductive effect, making tertiary alcohols dehydrate and exchange fastest via S_N1 mechanisms.',
      difficulty: 'Easy'
    }
  ],
  'chy-8': [
    {
      id: 'chy-8-q1',
      questionText: 'Which of the following nitrogenous systems does NOT undergo acetylation on reaction with acetic anhydride or acetyl chloride?',
      options: {
        A: 'Primary amine (R-NH₂)',
        B: 'Secondary amine (R₂NH)',
        C: 'Tertiary amine (R₃N)',
        D: 'Aniline (C₆H₅NH₂)'
      },
      correctAnswer: 'C',
      explanation: 'Acetylation is a nucleophilic acyl substitution which requires an amine to possess at least one replaceable hydrogen on nitrogen to form stable amides. Tertiary amines lack any hydrogen on nitrogen and hence do not undergo acetylation reactions under standard conditions.',
      difficulty: 'Medium'
    },
    {
      id: 'chy-8-q2',
      questionText: 'Which test is used to specifically distinguish between Aldehydes (aliphatic/aromatic) and Ketone functional groups?',
      options: {
        A: 'Lucas Test',
        B: 'Tollens\' Silver Mirror Test',
        C: 'Hinsberg Reactant Test',
        D: 'Carbylamine Reaction'
      },
      correctAnswer: 'B',
      explanation: 'Aldehydes are easily oxidized to carboxylic acids. They reduce Tollens\' reagent [Ag(NH₃)₂]⁺ to form a reflective silver mirror. Ketones cannot be easily oxidized and do not respond to Tollens\' reagent, making it a benchmark diagnostic test.',
      difficulty: 'Easy'
    }
  ],

  // BOTANY
  'bot-1': [
    {
      id: 'bot-1-q1',
      questionText: 'In taxonomic hierarchies, which of the following categories holds the maximum number of common characters between its constituents?',
      options: {
        A: 'Kingdom',
        B: 'Class',
        C: 'Family',
        D: 'Species'
      },
      correctAnswer: 'D',
      explanation: 'As we go up in the taxonomic hierarchy from species to kingdom, the number of common characteristics decreases. Thus, the lowest category, Species, possesses the maximum share of common characteristics.',
      difficulty: 'Easy'
    },
    {
      id: 'bot-1-q2',
      questionText: 'Five-kingdom system of classification proposed by R.H. Whittaker does NOT include which of the following groups?',
      options: {
        A: 'Bacteria',
        B: 'Archaebacteria',
        C: 'Viruses',
        D: 'Fungi'
      },
      correctAnswer: 'C',
      explanation: 'Whittaker\'s five-kingdom classification (Monera, Protista, Fungi, Plantae, Animalia) does not classify acellular organisms like Viruses, Viroids, and Lichens of sub-autonomous structure.',
      difficulty: 'Easy'
    }
  ],
  'bot-2': [
    {
      id: 'bot-2-q1',
      questionText: 'Which of the following anatomical sections of dicotyledonous stems is composed of highly thickened, lignified sclerenchymatous cell deposits acting as mechanically supporting tissues?',
      options: {
        A: 'Hypodermis',
        B: 'Pericycle (in patches)',
        C: 'Medullary rays',
        D: 'Primary Cortex'
      },
      correctAnswer: 'B',
      explanation: 'In dicot stems, the pericycle is located on the inner side of the endodermis and above the phloem, presenting as semi-lunar patches of sclerenchyma cells providing high mechanical strength. Hypodermis of dicot stems is instead collenchymatous.',
      difficulty: 'Hard'
    },
    {
      id: 'bot-2-q2',
      questionText: 'Double fertilization, a very distinctive characteristic of flowering plants (Angiosperms), involves which dual fusions?',
      options: {
        A: 'Syngamy and Triple Fusion',
        B: 'Fusion of two polar nuclei',
        C: 'Self-pollination fusions',
        D: 'Fusion of male gamete with synergids'
      },
      correctAnswer: 'A',
      explanation: 'Double fertilization consists of: 1) Syngamy (fusion of one male gamete with the egg cell to form diploid zygote) + 2) Triple Fusion (fusion of alternative male gamete with the diploid secondary nucleus to form triploid Primary Endosperm Nucleus PEN).',
      difficulty: 'Medium'
    }
  ],
  'bot-3': [
    {
      id: 'bot-3-q1',
      questionText: 'Which of the following cellular organelles is bound by a single lipid membrane and contains high abundance of hydrolytic enzymes active under acidic conditions?',
      options: {
        A: 'Ribosome',
        B: 'Lysosome',
        C: 'Mitochondrion',
        D: 'Chloroplast'
      },
      correctAnswer: 'B',
      explanation: 'Lysosomes are single-membrane bound vesicular organelles formed by Golgi processes. They are packed with acid hydrolases (lipases, proteases) active at pH ~5, engineered for phagocytic cellular cleanups.',
      difficulty: 'Easy'
    },
    {
      id: 'bot-3-q2',
      questionText: 'During the cell cycle, duplication of centrioles and replication of nuclear DNA take place in which respective locations/phases?',
      options: {
        A: 'Both inside the cytoplasm in G1 phase',
        B: 'Duplication in cytoplasm, replication in nucleus; both in S phase',
        C: ' Duplication in cytoplasm, replication in nucleus; both in G2 phase',
        D: 'Replication in cytoplasm during mitotic metaphase'
      },
      correctAnswer: 'B',
      explanation: 'During the S (Synthesis) phase of interphase, nuclear DNA is replicated. Simultaneously, the centrioles duplicate inside the cytoplasm in animal cells. This is a classic NCERT line.',
      difficulty: 'Medium'
    }
  ],
  'bot-4': [
    {
      id: 'bot-4-q1',
      questionText: 'How many ATP and NADPH molecules are consumed during the dark reaction (Calvin Cycle) to synthesize exactly one molecule of glucose?',
      options: {
        A: '18 ATP and 12 NADPH',
        B: '12 ATP and 12 NADPH',
        C: '30 ATP and 12 NADPH',
        D: '18 ATP and 18 NADPH'
      },
      correctAnswer: 'A',
      explanation: 'For every CO₂ molecule fixed in the Calvin cycle, 3 ATP and 2 NADPH are consumed. Since synthesis of one glucose (C₆H₁₂O₆) requires 6 rounds of the cycle to fix 6 CO₂, total energy consumed is: 6 * 3 = 18 ATP, and 6 * 2 = 12 NADPH.',
      difficulty: 'Medium'
    },
    {
      id: 'bot-4-q2',
      questionText: 'The respiratory respiratory quotient (RQ) of tripalmitin (a standard fatty acid) during aerobic cellular respiration is:',
      options: {
        A: '1.0',
        B: '0.7',
        C: '0.9',
        D: '1.3'
      },
      correctAnswer: 'B',
      explanation: 'RQ is the ratio of volume of CO₂ evolved to the volume of O₂ consumed. For carbohydrates, RQ = 1.0. For fats like tripalmitin, RQ is ~0.7. For proteins, it is ~0.9.',
      difficulty: 'Easy'
    }
  ],
  'bot-5': [
    {
      id: 'bot-5-q1',
      questionText: 'What is the characteristic biological role of filiform apparatus present in the synergid cells of angiospermic embryo sac?',
      options: {
        A: 'It prevents self-pollination mechanisms',
        B: 'It guides the entry of pollen tube into the synergid cell',
        C: 'It triggers double fertilization by dividing polar bodies',
        D: 'It forms the primary protective endosperm tissue'
      },
      correctAnswer: 'B',
      explanation: 'The filiform apparatus is a finger-like cellular thickening found at the micropylar end of the synergids. It plays a primary role in secreting chemotropic substances that guide the entry of the pollen tube into the synergid.',
      difficulty: 'Medium'
    },
    {
      id: 'bot-5-q2',
      questionText: 'Which of the following represents a structural device in angiosperms to prevent both autogamy and geitonogamy?',
      options: {
        A: 'Dioecious plant bearing Unisexual flowers',
        B: 'Monoecious plant like Castor',
        C: 'Protandry timing shifts',
        D: 'Self-incompatibility biochemical mechanisms'
      },
      correctAnswer: 'A',
      explanation: 'In dioecious plants (such as papaya), male and female flowers are borne on completely different individuals. This spatial isolation prevents both autogamy (pollination within same flower) and geitonogamy (pollination across flowers of same plant). Monoecious plants prevent only autogamy.',
      difficulty: 'Hard'
    }
  ],
  'bot-6': [
    {
      id: 'bot-6-q1',
      questionText: 'A cross between a true-breeding red-flowered plant (RR) and true-breeding white-flowered plant (rr) in Snapdragon (Antirrhinum majus) results in pink-flowered F1 progeny. This is due to:',
      options: {
        A: 'Codominance',
        B: 'Incomplete Dominance',
        C: 'Pleiotropy',
        D: 'Polygenic Inheritance'
      },
      correctAnswer: 'B',
      explanation: 'In incomplete dominance, the dominant allele does not completely mask the recessive allele, yielding an F1 hybrid with an intermediate phenotype (pink). Snapdragon flowers are classic examples of incomplete dominance.',
      difficulty: 'Easy'
    },
    {
      id: 'bot-6-q2',
      questionText: 'A pleiotropic gene display in genetics corresponds to a situation where:',
      options: {
        A: 'Multiple genes control a single phenotypic trait',
        B: 'A single gene controls multiple, apparently unrelated phenotypic traits',
        C: 'Both alleles express themselves fully in the heterozygote',
        D: 'Genes are located extremely close on the same chromosome'
      },
      correctAnswer: 'B',
      explanation: 'Pleiotropy is defined as a genetic phenomenon where a single gene or mutation exerts influence on multiple, distinct phenotypic characters (e.g. Phenylketonuria showing mental retardation and reduced hair pigmentation).',
      difficulty: 'Medium'
    }
  ],
  'bot-7': [
    {
      id: 'bot-7-q1',
      questionText: 'In a transcription unit in eukaryotic DNA, what is the role of the promoter element on the template strand?',
      options: {
        A: 'It serves as the binding site for RNA polymerase',
        B: 'It encodes the terminal poly-A tail',
        C: 'It represents the start triplet codon for translation',
        D: 'It binds with tRNA anticodons'
      },
      correctAnswer: 'A',
      explanation: 'The promoter is a specific sequence of DNA that provides the binding site for RNA polymerase to initiate the transcription process. It is located toward the 5\'-end of the structural gene (upstream).',
      difficulty: 'Easy'
    },
    {
      id: 'bot-7-q2',
      questionText: 'During translation, the initiation codon (AUG) specifically codes for which amino acid in eukaryotes?',
      options: {
        A: 'Phenylalanine',
        B: 'Methionine',
        C: 'Leucine',
        D: 'Glycine'
      },
      correctAnswer: 'B',
      explanation: 'AUG has dual actions. It acts as the primary initiation codon for translation and also specifically codes for the amino acid Methionine (Met) in both prokaryotes (formyl-methionine) and eukaryotes.',
      difficulty: 'Easy'
    }
  ],
  'bot-8': [
    {
      id: 'bot-8-q1',
      questionText: 'According to the competitive exclusion principle proposed by G.F. Gause, what happens when two closely related species compete for identical resources?',
      options: {
        A: 'Both species coexist through resource partitioning',
        B: 'The competitively inferior species will eventually be eliminated in the long run',
        C: 'Both will undergo horizontal gene transfer',
        D: 'Both species will double their reproductive rate'
      },
      correctAnswer: 'B',
      explanation: 'Gause\'s Principle states that two species competing for the exact same limiting resources cannot coexist indefinitely. The competitively superior species will capture the resources, driving the inferior competitor to extinction.',
      difficulty: 'Medium'
    },
    {
      id: 'bot-8-q2',
      questionText: 'In an ecological pyramid of numbers, a single large oak tree supporting thousands of herbivorous insects and hundreds of small birds displays:',
      options: {
        A: 'An upright pyramid representation',
        B: 'An inverted or spindle-shaped pyramid representation',
        C: 'A completely linear pyramid',
        D: 'An unstable dynamic bubble'
      },
      correctAnswer: 'B',
      explanation: 'For a single oak tree (1 primary producer), which supports thousands of insects (primary consumers) and birds, the pyramid of numbers is inverted at the base because a single individual is supporting thousands of others.',
      difficulty: 'Medium'
    }
  ],

  // ZOOLOGY
  'zoo-1': [
    {
      id: 'zoo-1-q1',
      questionText: 'Which structural junction in cardiac muscle cells acts as an electrical booster, allowing swift ionic communication so that the heart contracts as a functional syncytium?',
      options: {
        A: 'Tight junctions',
        B: 'Intercalated discs',
        C: 'Desmosomes',
        D: 'Hemidesmosomes'
      },
      correctAnswer: 'B',
      explanation: 'Intercalated discs in cardiac muscle contain major gap junctions that function as low-resistance electrical lines. They allow waves of depolarization to travel instantly from cell to cell, making the muscle contract as a synchronized unit.',
      difficulty: 'Medium'
    },
    {
      id: 'zoo-1-q2',
      questionText: 'Identify the phylum of animals characterized by the presence of water vascular system and porous tube feet for locomotion:',
      options: {
        A: 'Porifera',
        B: 'Echinodermata',
        C: 'Coelenterata',
        D: 'Annelida'
      },
      correctAnswer: 'B',
      explanation: 'A distinctive diagnostic feature of Echinoderms (starfish, sea urchins) is the presence of an internal, coelomic water vascular system which drives hydraulic tube feet for feeding, respiration, and locomotion.',
      difficulty: 'Easy'
    }
  ],
  'zoo-2': [
    {
      id: 'zoo-2-q1',
      questionText: 'What is the primary factor that causes the oxygen-hemoglobin dissociation curve to shift to the right, facilitating the release of oxygen in active skeletal muscle tissues?',
      options: {
        A: 'Low partial pressure of CO₂ (pCO₂)',
        B: 'High pH (Alkaline state)',
        C: 'Higher temperature and high pCO₂ (Bohr effect)',
        D: 'Decrease in 2,3-BPG concentration'
      },
      correctAnswer: 'C',
      explanation: 'An increase in pCO₂, hydrogen ions (lower pH/acidic state), and higher temperatures in active muscles decreases the affinity of hemoglobin for oxygen. This shifts the curve to the right, promoting oxygen unloading to tissues (Bohr effect).',
      difficulty: 'Medium'
    },
    {
      id: 'zoo-2-q2',
      questionText: 'In human lungs, what prevents the collapse of alveolar structures and smaller bronchioles during expiration?',
      options: {
        A: 'Rings of hyaline cartilage and pulmonary surfactant (lecithin)',
        B: 'High density of smooth muscle cells',
        C: 'Strict positive feedback loop from intercostal muscles',
        D: 'Negative oxygen flow'
      },
      correctAnswer: 'A',
      explanation: 'Trachea and bronchi are supported by C-shaped hyaline cartilage rings to keep them patent. The alveoli are preventively lined by pulmonary surfactant (principally dipalmitoyl lecithins) which lowers surface tension to prevent collapse during exhalation.',
      difficulty: 'Easy'
    }
  ],
  'zoo-3': [
    {
      id: 'zoo-3-q1',
      questionText: 'What is the correct flow of blood in the cardiac conductive system during muscular excitation initiation of the human heart?',
      options: {
        A: 'SA node → AV node → Bundle of His → Purkinje fibers',
        B: 'AV node → SA node → AV Bundle → Purkinje fibers',
        C: 'SA node → Purkinje fibers → AV bundle → AV node',
        D: 'Bundle of His → SA Node → AV nodule'
      },
      correctAnswer: 'A',
      explanation: 'The cardiac impulse is generated at the SA Node (pacemaker in right atrium), travels to the AV Node, descends through the Bundle of His (atrioventricular bundle), and branches out to the ventricular walls via Purkinje fibers.',
      difficulty: 'Easy'
    },
    {
      id: 'zoo-3-q2',
      questionText: 'Which anatomical segment of the nephron is completely impermeable to water molecules, resulting in high dilution of the tubular fluid?',
      options: {
        A: 'Proximal Convoluted Tubule (PCT)',
        B: 'Descending limb of loop of Henle',
        C: 'Ascending limb of loop of Henle',
        D: 'Collecting duct'
      },
      correctAnswer: 'C',
      explanation: 'The descending limb of the loop of Henle is permeable to water but impermeable to electrolytes. Conversely, the ascending limb is completely impermeable to water but allows active/passive transport of electrolytes, diluting the fluid as it rises.',
      difficulty: 'Medium'
    }
  ],
  'zoo-4': [
    {
      id: 'zoo-4-q1',
      questionText: 'During transmission of a nerve impulse across a chemical synapse, which ion influx triggers the exocytosis of neurotransmitter vesicles from the presynaptic knob?',
      options: {
        A: 'Sodium ions (Na⁺)',
        B: 'Calcium ions (Ca²⁺)',
        C: 'Potassium ions (K⁺)',
        D: 'Chloride ions (Cl⁻)'
      },
      correctAnswer: 'B',
      explanation: 'When action potential reaches the presynaptic terminal, it opens voltage-gated Calcium channels. The resulting Ca²⁺ influx triggers fusion of synaptic vesicles carrying neurotransmitters with the presynaptic membrane, releasing them into synaptic cleft.',
      difficulty: 'Medium'
    },
    {
      id: 'zoo-4-q2',
      questionText: 'Which endocrine hormone operates through cyclic AMP (cAMP) as secondary messengers, rather than crossing the cell membrane directly?',
      options: {
        A: 'Estrogen',
        B: 'Epinephrine (Adrenaline)',
        C: 'Testosterone',
        D: 'Cortisol'
      },
      correctAnswer: 'B',
      explanation: 'Peptide and amine hormones (like Epinephrine) cannot cross the hydrophobic lipid bilayer of target cell membranes. They bind to extracellular membrane receptors, activating G-proteins that trigger secondary messengers like cAMP or IP₃. Steroid hormones (Estrogen, Testosterone, Cortisol) enter directly and bind intracellularly.',
      difficulty: 'Medium'
    }
  ],
  'zoo-5': [
    {
      id: 'zoo-5-q1',
      questionText: 'During human oogenesis, the primary oocytes are arrested in which phase of cellular division from embryonic development until ovulation?',
      options: {
        A: 'Diplotene stage of Prophase I',
        B: 'Metaphase of Meiosis II',
        C: 'Anaphase of Meiosis I',
        D: 'G2 interphase'
      },
      correctAnswer: 'A',
      explanation: 'Primary oocytes begin division during fetal gestation but get arrested in the Prophase I (specifically Diplotene stage) of Meiosis I. They complete this meiotic division only upon reaching puberty during follicular maturation.',
      difficulty: 'Hard'
    },
    {
      id: 'zoo-5-q2',
      questionText: 'Which of the following is a non-hormonal, copper-releasing Intrauterine Device (IUD) used for long-term contraception?',
      options: {
        A: 'Lippes Loop',
        B: 'LNG-20',
        C: 'CuT (Copper T)',
        D: 'Progestasert'
      },
      correctAnswer: 'C',
      explanation: 'CuT and Multiload 375 are copper-releasing IUDs. Ionized copper suppresses sperm motility and fertilizing capacity. Lippes loop is non-medicated, while LNG-20 and Progestasert are hormone-releasing IUDs.',
      difficulty: 'Easy'
    }
  ],
  'zoo-6': [
    {
      id: 'zoo-6-q1',
      questionText: 'Which of the following describes the correct chronological sequence of geological epochs of evolution representing human ancestors?',
      options: {
        A: 'Dryopithecus → Ramapithecus → Australopithecus → Homo habilis → Homo erectus',
        B: 'Homo habilis → Ramapithecus → Homo erectus → Australopithecus',
        C: 'Australopithecus → Homo erectus → Dryopithecus → Homo habilis',
        D: 'Ramapithecus → Homo erectus → Australopithecus → Neanderthal'
      },
      correctAnswer: 'A',
      explanation: 'According to human evolutionary archives (NCERT standard timeline): Dryopithecus (ape-like) and Ramapithecus (more man-like) existed 15 million years ago. These evolved into Australopithecus (2-3 mya), which split into Homo habilis (first tool maker, brain size 650-800 cc) and then Homo erectus (~1.5 mya, brain size 900 cc).',
      difficulty: 'Medium'
    },
    {
      id: 'zoo-6-q2',
      questionText: 'According to Darwin, organic evolution is driven majorly by which factors?',
      options: {
        A: 'Mutations and geographical isolation',
        B: 'Inter-species hybrid fusions',
        C: 'Natural selection acting on minor, continuous variations',
        D: 'Acquired inheritance of structural organs (Lamarck)'
      },
      correctAnswer: 'C',
      explanation: 'Charles Darwin proposed that evolution is a gradual progressive process driven by natural selection acting on minor, individual, inheritable variations. Hugo de Vries alternatively proposed that evolution is saltational, driven by random, major mutations.',
      difficulty: 'Easy'
    }
  ],
  'zoo-7': [
    {
      id: 'zoo-7-q1',
      questionText: 'Which antibody class is the most abundant immunoglobulin in colostrum (early maternal breast milk) protecting newborns against mucosal pathogens?',
      options: {
        A: 'IgG',
        B: 'IgA',
        C: 'IgM',
        D: 'IgE'
      },
      correctAnswer: 'B',
      explanation: 'IgA is the principal secretory immunoglobulin present in bodily secretions like saliva, tears, and colostrum, giving critical passive immunity to breast-fed infants.',
      difficulty: 'Easy'
    },
    {
      id: 'zoo-7-q2',
      questionText: 'In human cells, malignant cancer cells differ from standard somatic tissues by completely losing which regulatory check?',
      options: {
        A: 'Contact Inhibition',
        B: 'Glycolysis pathway',
        C: 'S-phase replicative capacity',
        D: 'Mitochondrial activity processes'
      },
      correctAnswer: 'A',
      explanation: 'Normal cells show contact inhibition; when they touch adjacent cells, division stops. Cancerous cells lose this contact inhibition, multiplying continuously and forming uninhibited tumors (neoplastic state).',
      difficulty: 'Easy'
    }
  ],
  'zoo-8': [
    {
      id: 'zoo-8-q1',
      questionText: 'What is the role of Alkaline Phosphatase in molecular gene cloning workflows?',
      options: {
        A: 'It joins adjacent DNA strands together',
        B: 'It prevents self-ligation of vector DNA by removing 5\' phosphate groups',
        C: 'It digests internal phosphodiester bonds at specific target sequences',
        D: 'It amplifies template strands during PCR cycles'
      },
      correctAnswer: 'B',
      explanation: 'Alkaline phosphatase removes the 5\'-phosphate groups from linearized vector DNA. This prevents self-ligation (re-circularization of empty vector) without the insert, increasing recombinational efficiency.',
      difficulty: 'Medium'
    },
    {
      id: 'zoo-8-q2',
      questionText: 'In downstream processing, what is the role of agarose gel electrophoresis in recombinant DNA technology?',
      options: {
        A: 'To digest genetic molecules at specific palindromic motifs',
        B: 'To separate DNA fragments based on molecular size and charge',
        C: 'To synthesize cDNA templates from mature mRNA strands',
        D: 'To select host cells carrying specific plasmids'
      },
      correctAnswer: 'B',
      explanation: 'Agarose gel electrophoresis separates DNA/RNA fragments because the negatively charged phosphate backbone is drawn toward the positive anode; smaller fragments pass faster through the pores, separating by size.',
      difficulty: 'Easy'
    }
  ]
};
