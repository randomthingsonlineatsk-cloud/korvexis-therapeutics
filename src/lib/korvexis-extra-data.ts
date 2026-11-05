// ---------------------------------------------------------------------------
// Additional fictional Korvexis content: platform mechanism, leadership and
// board, careers, investor facts, and patient resources. Extends
// korvexis-data.ts rather than folding into it, since that file is already
// substantial. All names, bios, and figures are invented for a portfolio
// demonstration.
// ---------------------------------------------------------------------------

export interface MechanismStep {
  step: number
  title: string
  body: string
}

export const MECHANISM_STEPS: MechanismStep[] = [
  {
    step: 1,
    title: 'Design the shell',
    body: 'A lipid–polymer hybrid shell is engineered per program: particle size, surface charge, and PEGylation density are tuned for the target tissue and circulation time needed.',
  },
  {
    step: 2,
    title: 'Load the payload',
    body: 'The therapeutic cargo — a small molecule, an siRNA strand, an enzyme, or an mRNA construct — is encapsulated inside the shell using a formulation process specific to that payload class.',
  },
  {
    step: 3,
    title: 'Target the tissue',
    body: 'Passive targeting (particle size tuned to exploit leaky tumor vasculature) or active targeting (a surface ligand that binds a receptor on the target cell) directs the particle to where it is needed.',
  },
  {
    step: 4,
    title: 'Release on arrival',
    body: 'A release trigger — pH shift, enzymatic cleavage, or simple diffusion — is tuned so the payload is retained in circulation and released once the particle reaches its target.',
  },
]

export interface Leader {
  name: string
  role: string
  bio: string
}

export const LEADERSHIP: Leader[] = [
  {
    name: 'Dr. Elena Marchetti',
    role: 'Chief Executive Officer & Co-Founder',
    bio: 'Previously led early clinical development for a lipid nanoparticle vaccine program before co-founding Korvexis in 2019. Holds a Ph.D. in Chemical Engineering.',
  },
  {
    name: 'Dr. Samuel Okoye',
    role: 'Chief Scientific Officer & Co-Founder',
    bio: 'Spent a decade in academic nanoparticle-delivery research before co-founding Korvexis to translate the Thalorix platform into clinical programs. Holds a Ph.D. in Pharmaceutical Sciences.',
  },
  {
    name: 'Dr. Priya Raghunathan',
    role: 'Chief Medical Officer',
    bio: 'Board-certified oncologist who joined Korvexis to lead clinical development across the oncology portfolio, including BN-101 and BN-310.',
  },
  {
    name: 'Michael Chen',
    role: 'Chief Financial Officer',
    bio: 'Joined Korvexis ahead of its Series C financing, having previously led finance for two clinical-stage biotechnology companies through IPO.',
  },
  {
    name: 'Dr. Anya Petrova',
    role: 'Head of Rare Disease Research',
    bio: 'Leads the BN-204 and BN-500 rare disease programs, with a research background in lysosomal storage disorders and RNA therapeutics.',
  },
]

export interface BoardMember {
  name: string
  affiliation: string
}

export const BOARD: BoardMember[] = [
  { name: 'Dr. Elena Marchetti', affiliation: 'Chief Executive Officer, Korvexis Therapeutics' },
  { name: 'Dr. Robert Hale', affiliation: 'General Partner, Meridian Life Sciences Partners' },
  { name: 'Dr. Wen Li', affiliation: 'Former Head of R&D, a global pharmaceutical company' },
  { name: 'Catherine Boyd', affiliation: 'Independent director; former CFO of a public biotechnology company' },
  { name: 'Dr. James Okafor', affiliation: 'Professor of Bioengineering; scientific advisor' },
]

export interface JobOpening {
  title: string
  department: 'Research & Development' | 'Clinical Operations' | 'Regulatory Affairs' | 'Corporate'
  location: string
  type: 'Full-time'
}

export const CAREERS: JobOpening[] = [
  { title: 'Senior Scientist, Formulation Development', department: 'Research & Development', location: 'Cambridge, MA', type: 'Full-time' },
  { title: 'Associate Director, Clinical Operations', department: 'Clinical Operations', location: 'Cambridge, MA', type: 'Full-time' },
  { title: 'Regulatory Affairs Manager, CMC', department: 'Regulatory Affairs', location: 'Cambridge, MA', type: 'Full-time' },
  { title: 'Research Associate, Nanoparticle Characterization', department: 'Research & Development', location: 'Cambridge, MA', type: 'Full-time' },
  { title: 'Clinical Trial Manager', department: 'Clinical Operations', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Senior Financial Analyst', department: 'Corporate', location: 'Cambridge, MA', type: 'Full-time' },
]

export const CULTURE_POINTS: string[] = [
  'Small enough that every scientist can name the patient population a program is designed for.',
  'Cross-functional by default: formulation scientists sit with clinical and regulatory colleagues from a program\'s earliest days.',
  'Comprehensive health coverage, equity for every employee, and a genuine focus on sustainable pace over long hours.',
]

export interface FundingRound {
  round: string
  year: number
  amount: string
  leadInvestor: string
}

export const FUNDING_HISTORY: FundingRound[] = [
  { round: 'Seed', year: 2019, amount: '$6M', leadInvestor: 'Meridian Life Sciences Partners' },
  { round: 'Series A', year: 2021, amount: '$32M', leadInvestor: 'Meridian Life Sciences Partners' },
  { round: 'Series B', year: 2022, amount: '$58M', leadInvestor: 'Northbridge Venture Partners' },
  { round: 'Series C', year: 2024, amount: '$85M', leadInvestor: 'Northbridge Venture Partners' },
]

export const INVESTOR_HIGHLIGHTS: string[] = [
  'Three clinical-stage programs across oncology, rare disease, and infectious disease, sharing one delivery platform.',
  'Two Orphan Drug Designations (FDA and Health Canada) for BN-204.',
  'A platform validated across four payload classes: small molecule, siRNA, mRNA, and enzyme replacement.',
]

export interface PatientResource {
  title: string
  body: string
}

export const PATIENT_RESOURCES: PatientResource[] = [
  {
    title: 'Finding a trial near you',
    body: 'Each active Korvexis trial lists its enrolling sites on the Clinical Trials page. Ask your treating physician whether a Korvexis study might be appropriate for your diagnosis and stage of disease.',
  },
  {
    title: 'Questions about eligibility',
    body: 'Trial eligibility criteria are set by each study\'s protocol and reviewed by the treating physician and study team — Korvexis cannot assess eligibility directly, but can help connect you with a study site.',
  },
  {
    title: 'Rare disease community support',
    body: 'Families affected by Vasquez–Trent Syndrome or Calder–Reyes Disease can reach Korvexis\'s Rare Disease Research team through the Contact page for information on ongoing and upcoming studies.',
  },
]
