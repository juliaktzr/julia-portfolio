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
  linkedin: 'https://linkedin.com/julia-kantzer',
  github: 'https://github.com/juliaktzr',
  resumeUrl: '/resume.pdf',
  headshot: '/headshot.jpg',
  headshotAlt: 'Julia Kantzer smiling, wearing a dark blazer',
  siteUrl: 'https://TODO.vercel.app', // TODO: set after first deploy (used for Open Graph)
  description:
    'Julia Kantzer builds AI products for real users. CS and Applied Math at Vanderbilt. Product-focused engineering, AI evaluation, and mission-driven tech.',
}

export const hero = {
  commands: [
    { cmd: 'whoami', out: site.name },
    { cmd: 'cat mission.txt', out: site.tagline },
  ],
  meta: 'CS + Applied Math at Vanderbilt, May 2027',
  buttons: [
    { label: 'View Work', href: '#work', kind: 'primary' as const },
    { label: 'Resume', href: site.resumeUrl, kind: 'secondary' as const, download: true },
    { label: 'Contact', href: '#contact', kind: 'ghost' as const },
  ],
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

/* -------------------------------------------------------------------------
   Featured case study
   TODO: Confirm with Pegasystems which of these details are shareable
   publicly before launch. Everything below is kept at resume level.
------------------------------------------------------------------------- */
export const caseStudy = {
  id: 'work',
  eyebrow: 'Featured work',
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
  shareNote: 'TODO: confirm with Pega what is shareable. Details here stay at resume level on purpose.',
}

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
      // TODO: confirm the school name and add a line about what you studied there.
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
    { label: 'LinkedIn', value: 'linkedin.com/julia-kantzer', href: site.linkedin },
    { label: 'GitHub', value: 'github.com/juliaktzr', href: site.github },
  ],
}

export const footer = {
  line: `\u00A9 ${new Date().getFullYear()} ${site.name}`,
}
