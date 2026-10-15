/**
 * All site copy lives here. Edit this file to change text without touching
 * components.
 *
 * Writing rules: direct, confident, no fluff. No em dashes. Short sentences.
 * Lead with outcomes.
 */

export const site = {
  name: 'Julia Kantzer',
  firstName: 'Julia',
  role: 'Technology Strategy, Consulting, and TPM',
  tagline: 'Making AI useful',
  location: 'Nashville, TN',
  email: 'juliakantzer@gmail.com',
  linkedin: 'https://www.linkedin.com/in/julia-kantzer/',
  github: 'https://github.com/juliaktzr',
  resumeUrl: '/JuliaKantzerResume.pdf',
  resumeFilename: 'JuliaKantzerResume.pdf', // name the browser saves the download as
  headshot: '/headshot.jpg',
  headshotAlt: 'Julia Kantzer smiling, wearing a dark blazer',
  siteUrl: 'https://juliakantzer.com',
  description:
    'CS and Applied Math at Vanderbilt, May 2027. Cut a 40-hour infrastructure sizing process at Pegasystems to under 40 minutes with a guided AI tool. Seeking technology strategy, consulting, and TPM roles.',
}

export const hero = {
  meta: 'CS + Applied Math at Vanderbilt, May 2027',
  status: 'Currently at Pegasystems',
  /** Shown between the tagline and the buttons. */
  seeking: 'Seeking a role between strategy and engineering, turning AI into products people use.',
  buttons: [
    { label: 'View Work', href: '#work', kind: 'primary' as const },
    { label: 'Resume', href: site.resumeUrl, kind: 'secondary' as const, download: true },
    { label: 'Contact', href: '#contact', kind: 'ghost' as const },
  ],
}

export const nav = [
  { label: 'Selected work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

/* -------------------------------------------------------------------------
   Selected work. Pega client and system details stay generalized for
   confidentiality.
------------------------------------------------------------------------- */

/** Pega title, shared by the case study and the experience timeline. Matches the resume. */
const PEGA_TITLE = 'Technology Architect Consulting Intern'
export type CaseStudySection = { heading: string; body: string; bullets?: string[] }
export type CaseStudyLink = { label: string; href: string; kind: 'primary' | 'secondary' }
/** A line in the terminal-style feature listing. */
export type CaseStudyFile = { name: string; desc: string }
/** One tradeoff: what was chosen, what it was chosen over, and why. */
export type CaseStudyDecision = { chose: string; over: string; why: string }
/** A product screenshot. Width and height are the image's real pixel size, to prevent layout shift. */
export type CaseStudyScreenshot = { src: string; alt: string; caption: string; width: number; height: number }

export type CaseStudy = {
  id: string
  company: string
  role: string
  period?: string
  title: string
  summary: string
  links?: CaseStudyLink[]
  /** Prose layout: a 2x2 grid of sections. Used by Pega. */
  sections?: CaseStudySection[]
  /** Compact layout: problem line, file listing, tradeoff cards. Used by Witness. */
  problem?: string
  builtIntro?: string
  /** Shown under "What I built" as "My part". */
  contribution?: string
  built?: CaseStudyFile[]
  decisionsIntro?: string
  decisions?: CaseStudyDecision[]
  /** Shown in a row between the decision cards and the diagram. */
  screenshots?: CaseStudyScreenshot[]
  stack: string[]
  diagram: 'flow' | 'pipeline'
}

export const work = {
  id: 'work',
  eyebrow: 'Selected work',
  title: 'Two problems I owned end to end.',
}

export const pegaFlow = {
  before: {
    label: 'Before',
    steps: [
      'Gather inputs by hand',
      'Fill legacy Excel workbooks',
      'Reconcile and rerun',
      'Hand off results',
    ],
    time: '~40 hours',
  },
  after: {
    label: 'After',
    steps: ['Guided conversation collects inputs', 'Python engine runs the model', 'Results in one session'],
    time: 'Under 40 minutes, within 5% of legacy',
  },
}

/** Content pipeline for Witness to History. The validator is the point of the story. */
export const witnessPipeline = {
  steps: [
    { label: 'Google Sheet', note: 'Teammates write dialogue, sources, outcomes' },
    { label: 'CSV', note: 'Exported from the sheet' },
    { label: 'Validator', note: 'Checks every reference, plain-English errors', highlight: true },
    { label: 'JSON', note: 'One file per scenario' },
    { label: 'Game', note: 'Browser, no install, no login' },
  ],
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-pega',
    company: 'Pegasystems',
    role: PEGA_TITLE,
    period: 'June 2026 to Present',
    title: 'Cutting a 40-hour modeling process to under 40 minutes',
    summary:
      'On Pega’s Government Consulting team, sizing infrastructure for a deployment took about 40 hours in legacy spreadsheets that only a few people could run. I built a Python engine that matches those spreadsheets within 5%, then built guided AI experiences on top of it. My team now gets a model in under 40 minutes.',
    sections: [
      {
        heading: 'The problem',
        body: 'Modeling infrastructure for a deployment took about 40 hours of manual work per run. The logic lived in legacy Excel workbooks. Only a few people could run it, and every run was slow to iterate on.',
      },
      {
        heading: 'What I built',
        body: 'A conversational, guided experience that walks the user through the inputs and produces a model. Underneath it, a Python calculation engine that reproduces the legacy Excel logic within 5% accuracy, so the new experience did not trade away reliability. I validated the engine against 12 test cases. Every result landed within 5% of the spreadsheet output.',
      },
      {
        heading: 'How I decided',
        body: 'I mapped four ways to rebuild it: a Claude conversational skill, Claude Code with MCP tools calling the Python engine, a Python backend with a React front end, and a native build on Pega rules. Instead of choosing one on paper, I am prototyping each in turn and comparing them on product, user experience, and implementation tradeoffs. I built the MCP version first, then the skill, then the React app, and I am now building the Pega version. The comparison is shaping the infrastructure modeling roadmap and informing engineering leadership decisions.',
      },
      {
        heading: 'Result',
        body: 'In use by 3 people on my team. A model run now takes under 40 minutes instead of about 40 hours, with estimates within 5% of the legacy spreadsheets. Pega invited me to continue the work remotely through the school year. Client and system details are generalized for confidentiality.',
      },
    ],
    stack: ['Python', 'React', 'Claude Code', 'MCP'],
    diagram: 'flow',
  },
  {
    id: 'work-witness',
    company: 'Witness to History',
    role: 'Lead engineer, six-person team (2\u00A0CS,\u00A04\u00A0Education) · CS 3892, Vanderbilt',
    period: 'August 2026 to December 2026',
    title: 'An interactive history simulation for middle and high schoolers',
    summary:
      'A course project for middle and high school history classes. Students talk with people living through a moment, make the call with only what they knew, then see what really happened. I built the game engine and a pipeline that lets non-coders add new scenarios without touching code.',
    links: [
      { label: 'Live demo', href: 'https://juliaktzr.github.io/witness-to-history/', kind: 'primary' },
      { label: 'Source', href: 'https://github.com/juliaktzr/witness-to-history', kind: 'secondary' },
    ],
    problem:
      'History class shows the outcome first, so every decision looks obvious in hindsight. Our team of four Education students, one other engineer, and me wanted students to feel that uncertainty instead.',
    builtIntro:
      'I built the content-driven game engine end to end. A browser game: no install, no login, runs on a school Chromebook. A student picks an era, talks through branching dialogue with two or three figures, makes one real decision, and sees the outcome and the historical reveal.',
    contribution:
      'The game engine, the Sheets-to-JSON pipeline and validator, dialogue and source panels, read-aloud, the map hub, the title screen and character creator, and deployment. The Education team researched, wrote, and sourced every scenario.',
    built: [
      {
        name: 'pipeline/',
        desc: 'Google Sheet to validated game JSON. Four non-coders write content, get plain-English errors, never touch code',
      },
      { name: 'dialogue/', desc: 'Branching conversations. Every factual claim cites a primary source' },
      { name: 'map/', desc: 'Illustrated hub. Your own character walks between figures' },
      { name: 'a11y/', desc: 'Read-aloud via Web Speech API, full keyboard nav, alt text throughout' },
      { name: 'deploy/', desc: 'GitHub Pages. Zero backend, zero recurring cost' },
    ],
    decisionsIntro:
      'This is where most of the actual work was. Every call was made against an Oct 7 pitch deadline.',
    decisions: [
      {
        chose: 'A working decision loop on one scenario, before any extras',
        over: 'Starting with a second scenario or character customization',
        why: 'An untested format built out twice means twice the rework after feedback. Character creation came only after the core loop worked end to end.',
      },
      {
        chose: 'Content-agnostic engine. A new scenario is one JSON file',
        over: 'Hardcoding content, faster once but slower to iterate',
        why: 'Four non-technical teammates ship content without waiting on the two engineers',
      },
      {
        chose: 'One job per person on a single scenario',
        over: 'Each teammate owning a whole scenario',
        why: 'Validate the format with real pitch feedback before parallelizing',
      },
      {
        chose: 'Validation built into the tool',
        over: 'A wiki page of rules',
        why: 'Content authors cannot debug a broken reference on their own',
      },
      {
        chose: 'Composite characters, a citation on every factual line',
        over: 'Invented quotes from real people',
        why: 'Historical integrity is a product requirement, decided with the Education team',
      },
    ],
    screenshots: [
      {
        src: '/work/witness-map.webp',
        alt: 'Illustrated town map from 1775 Massachusetts with three townspeople to visit and the student’s character at the edge of town',
        caption: 'The town map hub. Students choose who to talk to.',
        width: 1200,
        height: 1089,
      },
      {
        src: '/work/witness-character.webp',
        alt: 'Character creation screen with a customizable student avatar, poses, and an experience tracker',
        caption: 'Character creator. Students design who walks through history with them.',
        width: 1600,
        height: 856,
      },
    ],
    stack: ['Vite', 'React', 'Web Speech API', 'GitHub Pages', 'Sheets-to-JSON pipeline', 'No backend'],
    diagram: 'pipeline',
  },
]

/* -------------------------------------------------------------------------
   Experience timeline
------------------------------------------------------------------------- */
export type Role = {
  org: string
  title: string
  location: string
  period: string
  start: string // YYYY-MM, used for ordering only
  tag: 'Engineering' | 'Research' | 'AI evaluation' | 'Teaching'
  summary: string
  bullets: string[]
}

/** Same order as the resume: current roles first, then by end date. */
export const experience: Role[] = [
  {
    org: 'Pegasystems',
    title: PEGA_TITLE,
    location: 'Waltham, MA and remote',
    period: 'June 2026 to Present',
    start: '2026-06',
    tag: 'Engineering',
    summary: 'Cut a 40-hour sizing process to under 40 minutes with a tool my team uses today.',
    bullets: [
      'On the Government Consulting team, assessed product, user experience, and implementation trade-offs across four solution paths, delivering recommendations that shaped enterprise infrastructure strategy and roadmap decisions.',
      'Modernized a 40-hour manual enterprise sizing process into an AI-powered experience, converting spreadsheet-driven workflows into guided conversations and interactive applications.',
      'Translated Excel-based infrastructure logic into reusable Python services, building a calculation engine that produced estimates within 5% of legacy spreadsheet models.',
      'Built full-stack AI solutions using Python, ReactJS, Git, Claude Code, and Model Context Protocol (MCP) integrations.',
      'Invited to continue the work remotely through the school year after the summer internship.',
    ],
  },
  {
    org: 'Language and Education Analytics Research Lab',
    title: 'Research Assistant, Strategy and Product Manager',
    location: 'Nashville, TN',
    period: 'September 2024 to Present',
    start: '2024-09',
    tag: 'Research',
    summary: 'Helped scale iTELL, the lab’s AI-powered textbook platform, to 25+ deployments.',
    bullets: [
      'Collaborated with a team of engineers and PhD researchers to scale iTELL, the lab’s AI-powered textbook platform, to 25+ deployments.',
      'Evaluated AI-generated content and delivered insights that guided iterative model improvements.',
      'Led the restructuring of the lab’s website, improving navigation and usability.',
    ],
  },
  {
    org: 'Vanderbilt School of Engineering',
    title: 'Teaching Assistant, CS1101',
    location: 'Nashville, TN',
    period: 'January 2025 to December 2025',
    start: '2025-01',
    tag: 'Teaching',
    summary: 'Supported 150+ students and fed recurring bottlenecks back into the course materials.',
    bullets: [
      'Supported 150+ students by translating complex algorithmic concepts into clear, actionable steps, improving understanding and accelerating student progress.',
      'Identified common learning bottlenecks during office hours and communicated insights to faculty, leading to adjustments to instructional materials.',
    ],
  },
  {
    org: 'Handshake AI',
    title: 'MOVE Fellow',
    location: 'Remote',
    period: 'August 2025 to October 2025',
    start: '2025-08',
    tag: 'AI evaluation',
    summary:
      'Selected to evaluate AI outputs for a confidential training initiative with a top global research lab.',
    bullets: [
      'Selected as a MOVE Fellow to support a confidential AI training initiative with a top global research lab.',
      'Evaluated webpage outputs against detailed accuracy and clarity rubrics, identifying systemic error patterns and informing rubric refinements.',
    ],
  },
  {
    org: 'Transmodal Corporation',
    title: 'Software QA Intern',
    location: 'Ramsey, NJ',
    period: 'May 2025 to August 2025',
    start: '2025-05',
    tag: 'Engineering',
    summary: 'Weekly QA reports that helped prioritize engineering fixes on invoice-validation software.',
    bullets: [
      'Designed and executed test plans for commercial-invoice validation software used by global importers.',
      'Built datasets and test scenarios to uncover edge-case failures and improve validation accuracy.',
      'Delivered weekly QA reports that helped prioritize engineering fixes and clarify evolving requirements.',
    ],
  },
]

/* -------------------------------------------------------------------------
   Education
------------------------------------------------------------------------- */
export const education = {
  id: 'education',
  eyebrow: 'Education',
  title: 'Where I study.',
  schools: [
    {
      name: 'Vanderbilt University',
      location: 'Nashville, TN',
      period: 'August 2023 to May 2027',
      degree: 'B.S. Computer Science, B.A. Applied Mathematics',
      detail: 'Minors in Human and Organizational Development and Scientific Computing.',
      logo: '/logos/vanderbilt.png',
      logoAlt: 'Vanderbilt University',
      logoStyle: 'mark' as const,
    },
    {
      name: 'Universidad Carlos III de Madrid (UC3M)',
      location: 'Madrid, Spain',
      period: 'January 2026 to June 2026',
      degree: 'Study abroad',
      detail:
        'Spring 2026 semester abroad. Coursework in Logic, Applied Machine Learning, and Databases. Lived in Madrid for five months and traveled to 10 countries.',
      logo: '/logos/uc3m.svg',
      logoAlt: 'Universidad Carlos III de Madrid',
      logoStyle: 'seal' as const,
    },
  ],
}

/* -------------------------------------------------------------------------
   Research and AI evaluation
------------------------------------------------------------------------- */
export const research = {
  id: 'research',
  eyebrow: 'Research and AI evaluation',
  title: 'Finding where AI output breaks, then fixing the product.',
  intro:
    'At LEAR Lab, I evaluate AI-generated content in iTELL, an AI-powered textbook platform, across 25+ live deployments, and help shape its product and strategy decisions. At Handshake AI, I evaluated outputs for a confidential model training effort. In both, the job was turning failure patterns into specific product and model changes.',
  items: [
    {
      org: 'Language and Education Analytics Research Lab',
      role: 'Research Assistant, Strategy and Product Manager',
      period: 'September 2024 to Present',
      stat: { value: 25, suffix: '+', label: 'live deployments' },
    },
    {
      org: 'Handshake AI',
      role: 'MOVE Fellow',
      period: 'August 2025 to October 2025',
      stat: null,
    },
  ],
}

/* -------------------------------------------------------------------------
   Leadership and impact
------------------------------------------------------------------------- */
export type Counter = { value: number; prefix?: string; suffix?: string; label: string }

export const leadership = {
  id: 'leadership',
  eyebrow: 'Leadership and impact',
  title: 'Teams I have led.',
  items: [
    {
      org: 'Read for Those in Need',
      role: 'Founder and CEO',
      period: 'March 2019 to July 2023',
      body: 'Founded and operated a nonprofit improving literacy access for underserved K-8 students, distributing 3,000+ books across 5 public schools. Directed outreach, fundraising, logistics, volunteer coordination, and community partnerships over four years.',
      counters: [
        { value: 3000, suffix: '+', label: 'books distributed' },
        { value: 5, label: 'public schools' },
        { value: 25, label: 'volunteers' },
      ] as Counter[],
    },
    {
      org: 'Zeta Tau Alpha',
      role: 'Director of Fundraising',
      period: 'February 2025 to Present',
      body: 'Directed fundraising strategy and partner engagement for chapter-wide philanthropy, leading campaigns that raised $12,000 in a single semester for breast cancer education programs.',
      counters: [{ value: 12000, prefix: '$', label: 'raised in one semester' }] as Counter[],
    },
    {
      org: 'Incentive Spirometer for Tracheostomy Patients',
      role: 'Project Lead',
      period: 'August 2025 to December 2025',
      body: 'Led a multidisciplinary team through requirements gathering, prototyping, and user testing to deliver a functional medical device prototype refined through clinician feedback.',
      counters: [] as Counter[],
    },
  ],
}

/* -------------------------------------------------------------------------
   Skills
------------------------------------------------------------------------- */
export const skills = {
  id: 'skills',
  eyebrow: 'Skills',
  title: 'Tools I reach for.',
  groups: [
    {
      name: 'Technical',
      items: ['Python', 'Java', 'C++', 'C', 'HTML/CSS', 'ReactJS', 'Git', 'Linux', 'MATLAB', 'Kubernetes'],
    },
    {
      name: 'AI and Emerging Technology',
      items: [
        'Generative AI',
        'Prompt Engineering',
        'Model Context Protocol (MCP)',
        'Claude Code',
        'AI Evaluation',
        'Machine Learning',
      ],
    },
    {
      name: 'Product and Strategy',
      items: [
        'Requirements Gathering',
        'User-Centered Design',
        'Stakeholder Management',
        'Technical Documentation',
        'Competitive Benchmarking',
        'Requirements Matrices',
        'User Personas',
      ],
    },
    { name: 'Languages', items: ['English (Native)', 'Spanish (Professional)', 'Polish (Conversational)'] },
  ],
}

/* -------------------------------------------------------------------------
   Interests
------------------------------------------------------------------------- */
export const interests = {
  eyebrow: 'What I want next',
  body: 'I like deciding what to build and why as much as building it. I want a role between the people who set direction and the engineers who deliver it, especially on AI products, where the gap between a working demo and a reliable product is widest.',
}

/* -------------------------------------------------------------------------
   Contact
------------------------------------------------------------------------- */
export const contact = {
  id: 'contact',
  eyebrow: 'Contact',
  title: 'Let’s talk.',
  body: 'Open to new grad roles in technology strategy, technology consulting, technical program management, and product-focused engineering, starting summer 2027. Willing to relocate. Email is the fastest way to reach me.',
  links: [
    { label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { label: 'LinkedIn', value: 'linkedin.com/in/julia-kantzer', href: site.linkedin },
    { label: 'GitHub', value: 'github.com/juliaktzr', href: site.github },
  ],
}

export const footer = {
  line: `\u00A9 ${new Date().getFullYear()} ${site.name}`,
  hint: 'press ~ for terminal',
}

export const notFound = {
  title: 'Page not found',
  home: 'cd ~',
  homeLabel: 'Back to home',
}

/** Printed to the browser console on load. */
export const consoleGreeting = {
  banner: `
      _       _ _         _  __           _
     | |_   _| (_) __ _  | |/ /__ _ _ __ | |_ _______ _ __
  _  | | | | | | |/ _\` | | ' // _\` | '_ \\| __|_  / _ \\ '__|
 | |_| | |_| | | | (_| | | . \\ (_| | | | | |_ / /  __/ |
  \\___/ \\__,_|_|_|\\__,_| |_|\\_\\__,_|_| |_|\\__/___\\___|_|
`,
  line: `Open to technology strategy, consulting, and TPM roles. Say hi: ${site.email}`,
}
