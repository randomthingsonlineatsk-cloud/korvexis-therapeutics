// ---------------------------------------------------------------------------
// Korvexis Therapeutics — entirely fictional biotech portfolio site content.
// Every company, program code, disease name, trial ID, and press release
// below is invented for a portfolio demonstration. Disease names are
// deliberately fictional (not real conditions) so nothing here reads as a
// factual medical or regulatory claim.
// ---------------------------------------------------------------------------

export const COMPANY = {
  name: 'Korvexis Therapeutics',
  short: 'Korvexis',
  tagline: 'Precision-targeted nanomedicine for cancers and rare diseases that have run out of options.',
  founded: 2019,
  hq: 'Cambridge, Massachusetts',
  platformName: 'Thalorix',
  mission:
    "Korvexis engineers lipid–polymer hybrid nanoparticles that carry a therapeutic payload to a specific tissue and release it there — reducing the dose that reaches everywhere else. We apply the Thalorix platform across oncology and rare genetic disease, where getting the right molecule to the right cell is most of the battle.",
  stats: [
    { value: '6', label: 'Programs in the pipeline' },
    { value: '3', label: 'Clinical-stage programs' },
    { value: '2', label: 'Orphan Drug Designations' },
    { value: '140+', label: 'People across R&D and clinical' },
  ],
} as const

export type Phase =
  | 'Discovery'
  | 'Preclinical'
  | 'IND-Enabling'
  | 'Phase 1'
  | 'Phase 1/2'
  | 'Phase 2'
  | 'Filed'

export const PHASE_ORDER: Phase[] = ['Discovery', 'Preclinical', 'IND-Enabling', 'Phase 1', 'Phase 1/2', 'Phase 2', 'Filed']

export interface Program {
  code: string
  /** Brand name, once one has been assigned. Earlier-stage programs go by code only. */
  name?: string
  modality: string
  indication: string
  target: string
  phase: Phase
  summary: string
  differentiator: string
  lead: boolean
}

export const PIPELINE: Program[] = [
  {
    code: 'BN-101',
    name: 'NanoDox',
    modality: 'Thalorix-encapsulated topoisomerase inhibitor',
    indication: 'HER2-low metastatic breast cancer',
    target: 'Topoisomerase II, tumor-selective release',
    phase: 'Phase 2',
    summary:
      'A Thalorix-encapsulated analog of a well-characterized topoisomerase inhibitor, designed to concentrate in tumor tissue via enhanced permeability and retention while reducing cardiac and systemic exposure relative to the unencapsulated drug.',
    differentiator: 'Phase 1 data showed a materially improved cardiac safety margin at equivalent tumor exposure.',
    lead: true,
  },
  {
    code: 'BN-204',
    name: 'HepaSiRx',
    modality: 'Hepatocyte-targeted siRNA nanoparticle',
    indication: 'Vasquez–Trent Syndrome (a fictional rare hepatic metabolic disorder)',
    target: 'Silences the mutant enzyme transcript driving toxic metabolite buildup',
    phase: 'Phase 1',
    summary:
      'A liver-targeted lipid nanoparticle carrying an siRNA payload designed to silence the transcript responsible for toxic metabolite accumulation in Vasquez–Trent Syndrome, an ultra-rare inherited hepatic disorder.',
    differentiator: 'First disease-modifying approach in a condition currently managed with diet alone.',
    lead: false,
  },
  {
    code: 'BN-310',
    modality: 'Stroma-penetrating nanoparticle chemotherapy',
    indication: 'Locally advanced pancreatic adenocarcinoma',
    target: 'Dense-stroma tumor penetration',
    phase: 'IND-Enabling',
    summary:
      'Applies a next-generation Thalorix formulation engineered for deeper penetration of the dense stromal barrier characteristic of pancreatic tumors, in combination with standard-of-care chemotherapy.',
    differentiator: 'Preclinical models showed 3x deeper tumor penetration than the unmodified carrier.',
    lead: false,
  },
  {
    code: 'BN-450',
    name: 'ImmunoCarrier-RSV',
    modality: 'mRNA nanoparticle vaccine',
    indication: 'Respiratory syncytial virus, adults 60+',
    target: 'Prefusion F protein antigen',
    phase: 'Phase 1/2',
    summary:
      'Adapts the Thalorix lipid nanoparticle platform, originally built for oncology payload delivery, to mRNA vaccine antigen delivery — targeting a stabilized prefusion F protein construct.',
    differentiator: "Korvexis's first program outside oncology and rare disease, validating the platform's breadth.",
    lead: false,
  },
  {
    code: 'BN-500',
    modality: 'Enzyme-replacement nanoparticle',
    indication: 'Calder–Reyes Disease (a fictional rare lysosomal storage disorder)',
    target: 'Blood–brain barrier-crossing enzyme delivery',
    phase: 'Preclinical',
    summary:
      'Encapsulates a recombinant enzyme replacement therapy in a Thalorix formulation designed to cross the blood–brain barrier, addressing the neurological manifestations of Calder–Reyes Disease that current enzyme-replacement therapies cannot reach.',
    differentiator: 'Earliest-stage program aimed at the unmet neurological component of the disease.',
    lead: false,
  },
  {
    code: 'BN-600',
    modality: 'Ligand-targeted next-generation nanoparticle',
    indication: 'Platform research — solid tumor targeting',
    target: 'Tunable surface-ligand targeting module',
    phase: 'Discovery',
    summary:
      'Research-stage work on a modular surface-ligand targeting system intended to let a single Thalorix chassis be re-targeted to different tumor types by swapping the ligand rather than re-engineering the whole particle.',
    differentiator: 'A platform investment intended to shorten future program timelines, not a single-indication asset.',
    lead: false,
  },
]

export type TrialStatus = 'Recruiting' | 'Active, not recruiting' | 'Completed'

export interface Trial {
  id: string
  programCode: string
  phase: Phase
  indication: string
  status: TrialStatus
  sites: string
  enrollment: number
  primaryEndpoint: string
  started: string
}

export const TRIALS: Trial[] = [
  {
    id: 'BN-CT-2024-101A',
    programCode: 'BN-101',
    phase: 'Phase 2',
    indication: 'HER2-low metastatic breast cancer',
    status: 'Recruiting',
    sites: '18 sites, United States',
    enrollment: 120,
    primaryEndpoint: 'Objective response rate at 24 weeks',
    started: 'March 2024',
  },
  {
    id: 'BN-CT-2022-101P',
    programCode: 'BN-101',
    phase: 'Phase 1',
    indication: 'Advanced solid tumors, dose escalation',
    status: 'Completed',
    sites: '4 sites, United States',
    enrollment: 42,
    primaryEndpoint: 'Maximum tolerated dose and cardiac safety',
    started: 'June 2022',
  },
  {
    id: 'BN-CT-2023-204A',
    programCode: 'BN-204',
    phase: 'Phase 1',
    indication: 'Vasquez–Trent Syndrome',
    status: 'Active, not recruiting',
    sites: '6 sites, United States and Canada',
    enrollment: 18,
    primaryEndpoint: 'Safety, tolerability, and reduction in toxic metabolite levels',
    started: 'November 2023',
  },
  {
    id: 'BN-CT-2025-450A',
    programCode: 'BN-450',
    phase: 'Phase 1/2',
    indication: 'RSV, adults 60 and older',
    status: 'Recruiting',
    sites: '9 sites, United States',
    enrollment: 240,
    primaryEndpoint: 'Immunogenicity (neutralizing antibody titer) and safety',
    started: 'February 2025',
  },
]

export type Authority = 'FDA' | 'EMA' | 'Health Canada'
export type MilestoneType =
  | 'IND Clearance'
  | 'Orphan Drug Designation'
  | 'Fast Track Designation'
  | 'First Patient Dosed'
  | 'Type B Meeting'
  | 'Scientific Advice'

export interface Milestone {
  date: string
  authority: Authority
  type: MilestoneType
  programCode: string
  description: string
}

export const REGULATORY_MILESTONES: Milestone[] = [
  {
    date: '2022-04',
    authority: 'FDA',
    type: 'IND Clearance',
    programCode: 'BN-101',
    description: 'IND cleared for BN-101 in advanced solid tumors, allowing first-in-human dosing to begin.',
  },
  {
    date: '2022-06',
    authority: 'FDA',
    type: 'First Patient Dosed',
    programCode: 'BN-101',
    description: 'First patient dosed in the BN-101 Phase 1 dose-escalation study.',
  },
  {
    date: '2023-02',
    authority: 'FDA',
    type: 'Orphan Drug Designation',
    programCode: 'BN-204',
    description: 'Orphan Drug Designation granted for BN-204 in Vasquez–Trent Syndrome.',
  },
  {
    date: '2023-08',
    authority: 'FDA',
    type: 'IND Clearance',
    programCode: 'BN-204',
    description: 'IND cleared for BN-204, supported by the preclinical package and the Orphan Drug Designation.',
  },
  {
    date: '2023-11',
    authority: 'FDA',
    type: 'First Patient Dosed',
    programCode: 'BN-204',
    description: 'First patient dosed in the BN-204 Phase 1 study.',
  },
  {
    date: '2024-01',
    authority: 'EMA',
    type: 'Scientific Advice',
    programCode: 'BN-204',
    description: 'Scientific Advice granted by EMA on the BN-204 clinical development plan ahead of a planned European filing.',
  },
  {
    date: '2024-05',
    authority: 'FDA',
    type: 'Fast Track Designation',
    programCode: 'BN-101',
    description: 'Fast Track Designation granted for BN-101, based on Phase 1 safety and preliminary activity data.',
  },
  {
    date: '2024-09',
    authority: 'Health Canada',
    type: 'Orphan Drug Designation',
    programCode: 'BN-204',
    description: 'Orphan Drug Designation granted by Health Canada for BN-204.',
  },
  {
    date: '2025-01',
    authority: 'FDA',
    type: 'IND Clearance',
    programCode: 'BN-450',
    description: 'IND cleared for BN-450, the first Thalorix program outside oncology and rare disease.',
  },
  {
    date: '2025-06',
    authority: 'FDA',
    type: 'Type B Meeting',
    programCode: 'BN-101',
    description: 'End-of-Phase 1 (Type B) meeting held with FDA to align on the Phase 2 design for BN-101.',
  },
]

export interface NewsPost {
  slug: string
  date: string
  category: 'Clinical' | 'Regulatory' | 'Corporate'
  headline: string
  excerpt: string
  body: string[]
  programCode?: string
}

export const NEWSROOM: NewsPost[] = [
  {
    slug: 'fda-fast-track-bn-101',
    date: '2024-05-14',
    category: 'Regulatory',
    programCode: 'BN-101',
    headline: 'Korvexis Receives FDA Fast Track Designation for BN-101 in HER2-Low Metastatic Breast Cancer',
    excerpt: 'The designation follows Phase 1 safety and preliminary activity data and is intended to support an efficient path through the remaining stages of development.',
    body: [
      'Korvexis Therapeutics today announced that the U.S. Food and Drug Administration (FDA) has granted Fast Track Designation to BN-101, the company\'s lead Thalorix-encapsulated candidate, for the treatment of HER2-low metastatic breast cancer.',
      'Fast Track Designation is intended for therapies that treat serious conditions and demonstrate the potential to address an unmet medical need, and provides for more frequent interaction with the FDA throughout development, among other benefits.',
      '"This designation reflects the strength of the safety and early activity signal we saw in the Phase 1 program," said Korvexis\'s Chief Medical Officer. "We are now focused on completing enrollment in our Phase 2 study and on the End-of-Phase 1 discussions that will shape the path forward."',
      'BN-101 is currently being evaluated in a Phase 2 study (BN-CT-2024-101A) enrolling patients with HER2-low metastatic breast cancer at 18 sites across the United States.',
    ],
  },
  {
    slug: 'first-patient-dosed-bn-204',
    date: '2023-11-02',
    category: 'Clinical',
    programCode: 'BN-204',
    headline: 'Korvexis Doses First Patient in Phase 1 Study of BN-204 for Vasquez–Trent Syndrome',
    excerpt: 'BN-204 is Korvexis\'s first program to apply the Thalorix platform to RNA-based silencing therapy, targeting an ultra-rare inherited hepatic disorder.',
    body: [
      'Korvexis Therapeutics announced today that the first patient has been dosed in its Phase 1 study of BN-204, an investigational siRNA nanoparticle therapy for Vasquez–Trent Syndrome, a rare and serious inherited metabolic disorder currently managed with dietary restriction alone.',
      'BN-204 applies Korvexis\'s Thalorix lipid nanoparticle platform to deliver an siRNA payload designed to silence the transcript responsible for toxic metabolite accumulation in the liver.',
      '"Families living with Vasquez–Trent Syndrome have had no disease-modifying option — only management of the diet," said Korvexis\'s Head of Rare Disease Research. "Dosing our first patient is an important step toward changing that."',
      'The study will enroll approximately 18 patients across sites in the United States and Canada, evaluating safety, tolerability, and reduction in circulating toxic metabolite levels.',
    ],
  },
  {
    slug: 'orphan-drug-designation-bn-204',
    date: '2023-02-20',
    category: 'Regulatory',
    programCode: 'BN-204',
    headline: 'FDA Grants Orphan Drug Designation to BN-204 for Vasquez–Trent Syndrome',
    excerpt: 'The designation recognizes BN-204 as a candidate therapy for a rare disease affecting a small patient population with no approved disease-modifying treatment.',
    body: [
      'Korvexis Therapeutics announced that the FDA has granted Orphan Drug Designation to BN-204 for the treatment of Vasquez–Trent Syndrome.',
      'Orphan Drug Designation is granted to therapies intended to treat rare diseases affecting fewer than 200,000 people in the United States, and provides incentives including tax credits for clinical development costs and eligibility for market exclusivity upon approval.',
      'Korvexis plans to submit an Investigational New Drug (IND) application for BN-204 later this year, supported by its ongoing preclinical program.',
    ],
  },
  {
    slug: 'bn-450-ind-clearance',
    date: '2025-01-16',
    category: 'Regulatory',
    programCode: 'BN-450',
    headline: 'Korvexis\'s First Infectious Disease Program, BN-450, Clears FDA IND Review',
    excerpt: 'BN-450 adapts the Thalorix lipid nanoparticle platform, originally built for oncology, to mRNA vaccine delivery — the company\'s first program outside oncology and rare disease.',
    body: [
      'Korvexis Therapeutics announced that the FDA has completed its review of the Investigational New Drug (IND) application for BN-450, an mRNA vaccine candidate targeting respiratory syncytial virus (RSV) in adults 60 and older, without placing the study on clinical hold.',
      'BN-450 marks the first application of Korvexis\'s Thalorix lipid nanoparticle platform outside oncology and rare disease, delivering a stabilized prefusion F protein mRNA construct.',
      '"BN-450 is a validation of the platform itself, not just a single program," said Korvexis\'s Chief Scientific Officer. "The same lipid nanoparticle chemistry that carries a chemotherapy payload to a tumor can carry an mRNA antigen to trigger an immune response — that versatility is the whole thesis behind Thalorix."',
      'A Phase 1/2 study is expected to begin enrollment in the coming months.',
    ],
  },
  {
    slug: 'bn-101-phase-2-initiation',
    date: '2024-03-11',
    category: 'Clinical',
    programCode: 'BN-101',
    headline: 'Korvexis Initiates Phase 2 Study of BN-101 in HER2-Low Metastatic Breast Cancer',
    excerpt: 'The Phase 2 study follows a Phase 1 program that showed a materially improved cardiac safety margin relative to the unencapsulated chemotherapy.',
    body: [
      'Korvexis Therapeutics announced the initiation of a Phase 2 study evaluating BN-101 in patients with HER2-low metastatic breast cancer.',
      'The study will enroll approximately 120 patients across 18 sites in the United States, with objective response rate at 24 weeks as the primary endpoint.',
      'BN-101 completed a Phase 1 dose-escalation study in 2023, which showed a materially improved cardiac safety margin at tumor exposure levels comparable to the unencapsulated chemotherapy it is derived from.',
    ],
  },
  {
    slug: 'ema-scientific-advice-bn-204',
    date: '2024-01-25',
    category: 'Regulatory',
    programCode: 'BN-204',
    headline: 'Korvexis Receives EMA Scientific Advice on BN-204 Development Plan',
    excerpt: 'The advice supports Korvexis\'s plan for a future European regulatory filing for BN-204 in Vasquez–Trent Syndrome.',
    body: [
      'Korvexis Therapeutics announced that it has received Scientific Advice from the European Medicines Agency (EMA) regarding the clinical development plan for BN-204 in Vasquez–Trent Syndrome.',
      'Scientific Advice from EMA is a non-binding process through which a sponsor can seek the Agency\'s views on the design of studies intended to support a future marketing authorization application.',
      'Korvexis intends to use the advice received to align its ongoing Phase 1 study and future clinical program with expectations for an eventual European filing.',
    ],
  },
  {
    slug: 'series-c-financing',
    date: '2024-07-09',
    category: 'Corporate',
    headline: 'Korvexis Announces $85 Million Series C Financing to Advance Thalorix Pipeline',
    excerpt: 'The financing will fund the ongoing BN-101 Phase 2 study, continued enrollment in BN-204, and IND-enabling work for BN-310.',
    body: [
      'Korvexis Therapeutics announced the completion of an $85 million Series C financing round.',
      'Proceeds will support the ongoing Phase 2 study of BN-101 in HER2-low metastatic breast cancer, continued enrollment in the BN-204 Phase 1 study, and IND-enabling activities for BN-310 in pancreatic cancer.',
      '"This financing lets us execute on three clinical and near-clinical programs at once, without slowing any of them down to fund the others," said Korvexis\'s Chief Executive Officer.',
    ],
  },
]

export function programByCode(code: string): Program | undefined {
  return PIPELINE.find((p) => p.code === code)
}

export function trialsForProgram(code: string): Trial[] {
  return TRIALS.filter((t) => t.programCode === code)
}

export function milestonesForProgram(code: string): Milestone[] {
  return REGULATORY_MILESTONES.filter((m) => m.programCode === code)
}
