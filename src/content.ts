/**
 * All site copy lives here. Edit this file to change text without touching
 * components. Anything marked TODO needs your input.
 *
 * Writing rules: direct, confident, no fluff. No em dashes. Short sentences.
 * Lead with outcomes.
 */

export const site = {
  name: 'Julia Kantzer',
  firstName: 'Julia',
  role: 'Product Engineer',
  tagline: 'I build AI products for real users and lead the people who ship them.',
  location: 'Nashville, TN',
  email: 'juliakantzer@gmail.com',
  linkedin: 'https://www.linkedin.com/in/julia-kantzer/',
  github: 'https://github.com/juliaktzr',
  resumeUrl: '/resume.pdf',
  resumeFilename: 'JuliaKantzerResume.pdf', // name the browser saves the download as
  headshot: '/headshot.jpg',
  headshotAlt: 'Julia Kantzer smiling, wearing a dark blazer',
  siteUrl: 'https://juliakantzer.com',
  description:
    'Julia Kantzer builds AI products for real users. CS and Applied Math at Vanderbilt. Product-focused engineering, AI evaluation, and mission-driven tech.',
}

export const hero = {
  commands: [
    { cmd: 'whoami', out: site.name },
    { cmd: 'cat mission.txt', out: site.tagline },
  ],
  meta: 'CS + Applied Math at Vanderbilt, May 2027',
  status: 'Currently at Pegasystems',
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
   Selected work. Pega details are kept at resume level on purpose.
------------------------------------------------------------------------- */
export type CaseStudySection = { heading: string; body: string; bullets?: string[] }
export type CaseStudyLink = { label: string; href: string; kind: 'primary' | 'secondary' }

export type CaseStudy = {
  id: string
  company: string
  role: string
  period?: string // TODO for Witness to History: add the dates you worked on it
  title: string
  summary: string
  links?: CaseStudyLink[]
  sections: CaseStudySection[]
  stack: string[]
  diagram: 'flow' | 'pipeline'
}

export const work = {
  id: 'work',
  eyebrow: 'Selected work',
  title: 'What I have shipped.',
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
    time: 'Within 5% of legacy logic',
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
    role: 'Technology Architect Intern',
    period: 'June 2026 to Present',
    title: 'Replacing a 40-hour modeling process with a guided AI experience',
    summary:
      'Infrastructure modeling at Pega ran on a manual, spreadsheet-driven process. I architected a full-stack AI product that turned it into a conversational, guided experience.',
    sections: [
      {
        heading: 'The problem',
        body: 'Modeling infrastructure for a deployment took about 40 hours of manual work per run. The logic lived in legacy Excel workbooks. Only a few people could run it, and every run was slow to iterate on.',
      },
      {
        heading: 'What I built',
        body: 'A conversational, guided experience that walks the user through the inputs and produces a model. Underneath it, a Python calculation engine that reproduces the legacy Excel logic within 5% accuracy, so the new experience did not trade away reliability.',
      },
      {
        heading: 'How I decided',
        body: 'I evaluated four solution paths across product, UX, and technical tradeoffs before building. That analysis shaped the infrastructure modeling roadmap and informed engineering leadership decisions.',
      },
    ],
    stack: ['Python', 'React', 'Claude Code', 'MCP'],
    diagram: 'flow',
  },
  {
    id: 'work-witness',
    company: 'Witness to History',
    role: 'Engineer, one of two on the team',
    title: 'Witness to History \u2014 an interactive history simulation for middle/high schoolers',
    summary:
      'A browser game where a student sits down with the people who lived a historical moment, hears their conflicting pressures, and makes the same decision with the same incomplete information they had.',
    links: [
      { label: 'Live demo', href: 'https://juliaktzr.github.io/witness-to-history/', kind: 'primary' },
      { label: 'Source', href: 'https://github.com/juliaktzr/witness-to-history', kind: 'secondary' },
    ],
    sections: [
      {
        heading: 'The problem',
        body: 'History class usually shows students the outcome, so decisions look obvious in hindsight. A 4-person Education team and I wanted students to actually feel the uncertainty the historical figures felt: sit down with the people who lived a moment, hear their conflicting pressures, and make the same decision with the same incomplete information they had, before finding out what really happened.',
      },
      {
        heading: 'What I built',
        body: 'As one of two engineers on the team, I built the content-driven game engine end to end: a browser game (no install, no login, works on a school Chromebook) where a student picks an era, talks through branching dialogue with 2-3 historical figures, makes one real decision, and sees both the outcome and the historical reveal. Specifically:',
        bullets: [
          'A content pipeline that turns a shared Google Sheet into validated game JSON, so 4 non-coding teammates can write dialogue, sources, and outcomes without touching code, and get plain-English errors (not stack traces) when something doesn\u2019t connect',
          'A branching dialogue system where every factual claim is tied to a cited primary source',
          'An illustrated map hub with the student\u2019s own character walking between figures to start each conversation',
          'Read-aloud (Web Speech API), full keyboard nav, and alt text throughout',
          'Deployed free on GitHub Pages, zero backend, zero recurring cost',
        ],
      },
      {
        heading: 'How I decided',
        body: 'This is where most of the actual work was.',
        bullets: [
          'Scoped hard against an Oct 7 pitch deadline: cut character customization and a second scenario down to must-haves (era select, one working decision loop, reliable load), even under pressure to add more, since an untested format built out 4 times risked 4x rework after feedback',
          'Chose a content-agnostic architecture (a new scenario is just one JSON file) specifically so 4 non-technical teammates could produce content independently of the 2 engineers, instead of the faster-to-build-once but slower-to-iterate option of hardcoding content',
          'Pushed for a one-job-per-person split across a single scenario over each teammate owning a whole scenario, to validate the format with real pitch feedback before parallelizing work',
          'Built validation into the tool itself (not a wiki page) because the content authors can\u2019t debug a broken reference on their own',
          'Treated historical integrity as a product requirement: composite characters instead of invented quotes from real people, mandatory source citation on every factual line, decided with the Education team rather than defaulted into by whoever finished first',
        ],
      },
    ],
    stack: [
      'Vite',
      'React',
      'TypeScript',
      'Web Speech API',
      'GitHub Pages',
      'Custom CSV/Sheets-to-JSON content pipeline',
      'No backend or database',
    ],
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

export const experience: Role[] = [
  {
    org: 'Pegasystems',
    title: 'Technology Architect Intern',
    location: 'Waltham, MA',
    period: 'June 2026 to Present',
    start: '2026-06',
    tag: 'Engineering',
    summary: 'Architected a full-stack AI product that replaced a 40-hour manual process.',
    bullets: [
      'Architected a full-stack AI product that replaced a 40-hour manual infrastructure modeling process with a conversational, guided experience, using Python, ReactJS, and Claude Code with Model Context Protocol (MCP) integrations.',
      'Built a Python calculation engine that reproduced legacy Excel-based infrastructure logic within 5% accuracy, enabling new AI-powered planning experiences without sacrificing reliability.',
      'Evaluated four solution paths across product, UX, and technical tradeoffs to shape the infrastructure modeling roadmap and inform engineering leadership decisions.',
    ],
  },
  {
    org: 'Language and Education Analytics Research Lab',
    title: 'Research Assistant, Strategy and Content Manager',
    location: 'Nashville, TN',
    period: 'September 2024 to Present',
    start: '2024-09',
    tag: 'Research',
    summary: 'Shaped AI educational software across 25+ live deployments.',
    bullets: [
      'Evaluated AI-generated educational content against quality frameworks, synthesizing findings into recommendations that shaped product, content, and model improvements across 25+ live deployments.',
      'Partnered with engineers and PhD researchers to scale AI-powered educational software from prototype to institutional deployment.',
      'Led a redesign of the lab’s public website, improving information architecture and navigation for researchers, educators, and external partners.',
    ],
  },
  {
    org: 'Handshake AI',
    title: 'MOVE Fellow',
    location: 'Remote',
    period: 'August 2025 to October 2025',
    start: '2025-08',
    tag: 'AI evaluation',
    summary: 'Found systemic failure patterns in AI outputs for a confidential training initiative.',
    bullets: [
      'Selected for a competitive fellowship supporting a confidential AI training initiative with a leading global research organization.',
      'Evaluated AI-generated outputs against detailed quality frameworks, identifying systemic failure patterns and contributing recommendations that improved evaluation consistency across the training pipeline.',
    ],
  },
  {
    org: 'Vanderbilt School of Engineering',
    title: 'Teaching Assistant, CS1101',
    location: 'Nashville, TN',
    period: 'January 2025 to December 2025',
    start: '2025-01',
    tag: 'Teaching',
    summary: 'Supported 150+ students and redesigned instructional resources with faculty.',
    bullets: [
      'Supported 150+ students through technical instruction, debugging guidance, and algorithmic problem-solving in introductory computer science.',
      'Identified recurring learning bottlenecks and partnered with faculty to redesign instructional resources and support processes.',
    ],
  },
  {
    org: 'Transmodal Corporation',
    title: 'Software Engineering Intern',
    location: 'Ramsey, NJ',
    period: 'May 2025 to August 2025',
    start: '2025-05',
    tag: 'Engineering',
    summary: 'Designed testing strategies for invoice-validation software used by global importers.',
    bullets: [
      'Designed testing strategies for commercial invoice-validation software used by global importers, ensuring reliability across complex business workflows.',
      'Built test datasets and edge-case scenarios that uncovered validation failures and improved software quality.',
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
      detail: 'One semester abroad in Madrid.',
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
  title: 'I know how AI products fail, and how to fix them.',
  intro:
    'Two years of evaluating AI output against real quality frameworks, then turning the findings into product, content, and model changes.',
  items: [
    {
      org: 'Language and Education Analytics Research Lab',
      role: 'Research Assistant, Strategy and Content Manager',
      period: 'September 2024 to Present',
      points: [
        'Evaluated AI-generated educational content against quality frameworks across 25+ live deployments.',
        'Turned findings into recommendations that shaped product, content, and model improvements.',
        'Partnered with engineers and PhD researchers to take AI educational software from prototype to institutional deployment.',
        'Led a redesign of the lab website, improving information architecture for researchers, educators, and partners.',
      ],
      stat: { value: 25, suffix: '+', label: 'live deployments' },
    },
    {
      org: 'Handshake AI',
      role: 'MOVE Fellow',
      period: 'August 2025 to October 2025',
      points: [
        'Selected for a competitive fellowship supporting a confidential AI training initiative with a leading global research organization.',
        'Evaluated AI-generated outputs against detailed quality frameworks.',
        'Identified systemic failure patterns and contributed recommendations that improved evaluation consistency across the training pipeline.',
      ],
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
  title: 'I lead people toward outcomes.',
  items: [
    {
      org: 'Read for Those in Need',
      role: 'Founder and President',
      period: 'March 2019 to July 2023',
      body: 'Founded and scaled a nonprofit that improves literacy access for underserved K-8 students. Directed outreach, fundraising, logistics, and volunteer coordination for four years.',
      counters: [
        { value: 3000, suffix: '+', label: 'books distributed' },
        { value: 5, label: 'public schools' },
        { value: 4, label: 'years of growth' },
      ] as Counter[],
    },
    {
      org: 'Zeta Tau Alpha',
      role: 'Director of Fundraising',
      period: 'February 2025 to Present',
      body: 'Directed fundraising strategy, volunteer leadership, and partner engagement for chapter-wide philanthropy supporting breast cancer education and awareness.',
      counters: [{ value: 12000, prefix: '$', label: 'raised in one semester' }] as Counter[],
    },
    {
      org: 'Incentive Spirometer for Tracheostomy Patients',
      role: 'Project Lead',
      period: 'August 2025 to December 2025',
      body: 'Led a multidisciplinary team through requirements gathering, prototyping, and user testing for a specialized medical device. Translated clinical needs into engineering requirements. Built and presented a functional prototype shaped by clinician and engineering feedback.',
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
    { name: 'Technical', items: ['Python', 'Java', 'C++', 'JavaScript', 'ReactJS', 'Git'] },
    {
      name: 'AI',
      items: ['Generative AI', 'Prompt Engineering', 'Model Context Protocol (MCP)', 'AI Evaluation'],
    },
    {
      name: 'Product and Strategy',
      items: ['Product Strategy', 'Requirements Gathering', 'User-Centered Design', 'Stakeholder Management'],
    },
    { name: 'Languages', items: ['Spanish (Professional)', 'Polish (Conversational)'] },
  ],
}

/* -------------------------------------------------------------------------
   Interests
------------------------------------------------------------------------- */
export const interests = {
  eyebrow: 'Interests',
  body: 'Building AI products end to end. I care most about the gap between a model that works in a demo and a product that works for real users.',
}

/* -------------------------------------------------------------------------
   Contact
------------------------------------------------------------------------- */
export const contact = {
  id: 'contact',
  eyebrow: 'Contact',
  title: 'Let’s build something.',
  body: 'Open to product engineering, technical PM, and forward deployed engineering roles. Willing to relocate.',
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
  line: `Open to product engineering and forward deployed roles. Say hi: ${site.email}`,
}
