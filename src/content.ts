/**
 * All site copy lives here. Edit this file to change text without touching
 * components.
 *
 * Writing rules: plain, specific, first person. Use contractions. Say each
 * fact once, in the place it fits best. No slogans, no buzzwords, no em dashes.
 */

export const site = {
  name: 'Julia Kantzer',
  firstName: 'Julia',
  role: 'AI Solutions, Strategy, and Technical Programs',
  tagline: 'Making AI useful.',
  location: 'Nashville, TN',
  email: 'juliakantzer@gmail.com',
  linkedin: 'https://www.linkedin.com/in/julia-kantzer/',
  github: 'https://github.com/juliaktzr',
  resumeUrl: '/JuliaKantzerResume.pdf',
  resumeFilename: 'JuliaKantzerResume.pdf', // name the browser saves the download as
  headshot: '/headshot.jpg',
  headshotAlt: 'Julia Kantzer smiling, wearing a dark blazer',
  siteUrl: 'https://www.juliakantzer.com',
  description:
    'Julia Kantzer studies CS and Applied Math at Vanderbilt and builds AI tools at Pegasystems, where her team now sizes infrastructure in under 40 minutes instead of 40 hours.',
}

export const hero = {
  meta: 'CS and Applied Math at Vanderbilt, graduating May 2027',
  status: 'Currently at Pegasystems',
  greeting: 'Hi, I’m',
  intro:
    'Senior at Vanderbilt and building AI tools at Pegasystems. I’m looking for new grad roles where I can help teams figure out what’s worth building, then build it.',
  /** Words on the ring that circles the headshot. */
  ring: ['CS + Applied Math', 'Vanderbilt ’27', 'AI Solutions', 'Tech Strategy', 'Product'],
  buttons: [
    { label: 'See my work', href: '#work', kind: 'primary' as const },
    { label: 'Let’s talk', href: '#contact', kind: 'secondary' as const },
  ],
  places: {
    label: 'Where I’ve worked and studied',
    items: ['Pegasystems', 'Vanderbilt', 'LEAR Lab', 'Handshake AI', 'UC3M Madrid'],
  },
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Interests', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

/* -------------------------------------------------------------------------
   Selected work. Pega client and system details stay generalized for
   confidentiality.
------------------------------------------------------------------------- */

/** Pega title, shared by the case study and the experience timeline. Matches the resume. */
const PEGA_TITLE = 'Technology Architect Consulting Intern'
/** `steps` render as a numbered list after `body`, followed by `outro`. */
export type CaseStudySection = {
  heading: string
  body: string
  bullets?: string[]
  steps?: string[]
  outro?: string
}
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
  /** Small badge in the header, e.g. "In progress". */
  status?: string
  title: string
  summary: string
  links?: CaseStudyLink[]
  /** Prose layout: a 2x2 grid of sections. Used by Pega. */
  sections?: CaseStudySection[]
  /** Compact layout: problem line, file listing, tradeoff cards. Used by Witness. */
  problem?: string
  builtIntro?: string
  /** Shown under the file listing as "Where it stands": what is done and what is next. */
  progress?: { done: string; next: string }
  built?: CaseStudyFile[]
  decisionsIntro?: string
  decisions?: CaseStudyDecision[]
  /** Shown in a row after the decision cards. */
  screenshots?: CaseStudyScreenshot[]
  /** A row of photos under the sections. Each opens full size. */
  photos?: { title: string; items: CaseStudyScreenshot[] }
  stack: string[]
  /** Pega's before and after diagram. */
  diagram?: 'flow'
}

export const work = {
  id: 'work',
  eyebrow: 'Selected work',
  title: 'What I’ve been building.',
}

/** Smaller projects, shown as compact cards after the case studies. */
export type SideProject = {
  name: string
  kind: string
  period: string
  /** One line under the name that says what it is for. */
  tagline: string
  problem: string
  solution: string
  /** Product decisions, shown as a short list. */
  decisions: string[]
  stack: string[]
  links?: CaseStudyLink[]
  image?: { src: string; alt: string; width: number; height: number }
}

export const sideProjects = {
  title: 'Smaller projects',
  items: [
    {
      name: 'Applied',
      kind: 'Chrome extension',
      period: 'October 2026',
      tagline: 'A job tracker that fills itself in.',
      problem:
        'Keeping a job tracker meant clicking away from every posting to a separate page and copying the title, company, and link over by hand. That extra step was easy to skip.',
      solution:
        'Applied removes the step. It notices job postings as I browse and marks them as applied when a confirmation page shows up, so the tracker updates itself. I only open it to change a status.',
      decisions: [
        'Automatic first: detects postings on Workday, LinkedIn, Handshake, Greenhouse, Lever, Ashby, and most company career pages',
        'A one-click “Mark this page as applied” for anything detection misses',
        'Counts for applied, interviews, offers, and rejections, so the whole pipeline is visible at a glance',
        'No account and no server, so there’s nothing to sign up for and job data never leaves the browser',
      ],
      stack: ['JavaScript', 'Chrome Manifest V3', 'chrome.storage'],
      links: [{ label: 'Source', href: 'https://github.com/juliaktzr/applied-tracker', kind: 'secondary' }],
      image: {
        src: '/work/applied-popup.webp',
        alt: 'The Applied popup showing counts for applied, interviews, offers, and rejections above a list of tracked jobs, with job details blurred',
        width: 782,
        height: 1200,
      },
    },
  ] as SideProject[],
}

export const pegaFlow = {
  before: {
    label: 'Before',
    steps: [
      'Gather inputs by hand',
      'Fill in legacy Excel workbooks',
      'Reconcile and rerun',
      'Hand off results',
    ],
    time: '~40 hours',
  },
  after: {
    label: 'After',
    steps: ['Answer questions in a guided chat', 'Python engine runs the model', 'Get results in one session'],
    time: 'Under 40 minutes, within 5% of legacy',
  },
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'work-pega',
    company: 'Pegasystems',
    role: PEGA_TITLE,
    period: 'June 2026 to Present',
    title: 'Cutting infrastructure sizing from 40 hours to under 40 minutes',
    summary:
      'Pega’s Government Consulting team sized infrastructure for each deployment in a set of legacy Excel workbooks. I rebuilt the calculations in Python and put an AI-guided interface on top, so my team can now produce the same estimate in under 40 minutes.',
    sections: [
      {
        heading: 'The problem',
        body: 'Every run meant gathering inputs by hand, filling in the workbooks, then reconciling and rerunning until the numbers lined up. It took about 40 hours, and only a few people knew the workbooks well enough to do it.',
      },
      {
        heading: 'What I built',
        body: 'First, a Python engine that reproduces the spreadsheet logic. I tested it against 12 cases, and every result came within 5% of the original workbooks. On top of that, a guided experience that asks for the inputs in plain conversation and returns a finished model.',
      },
      {
        heading: 'How I decided',
        body: 'There were four reasonable ways to deliver it:',
        steps: [
          'Claude conversational skill',
          'Claude Code with MCP tools calling the engine',
          'Python and React web app',
          'Native Pega build (in progress)',
        ],
        outro: 'Engineering leadership is using the comparison to shape the roadmap.',
      },
      {
        heading: 'Result',
        body: 'Three people on my team use it today. Pega asked me to keep working on it remotely through the school year.',
      },
    ],
    photos: {
      title: 'Summer at Pega',
      items: [
        {
          src: '/work/pega-presentation.webp',
          alt: 'Julia smiling beside a Pega podium in front of a screen showing her slide, My Summer at Pega',
          caption: 'Giving my final internship presentation in August 2026.',
          width: 1200,
          height: 1086,
        },
        {
          src: '/work/pega-team.webp',
          alt: 'Julia standing with seven members of Pega’s Government Americas consulting team in the office',
          caption: 'With my Government Americas consulting team.',
          width: 968,
          height: 1000,
        },
        {
          src: '/work/pega-product-team.webp',
          alt: 'A large group photo of Pega’s Massachusetts-based product team outdoors by the water',
          caption: 'With Pega’s Massachusetts-based product team.',
          width: 1600,
          height: 832,
        },
      ],
    },
    stack: ['Python', 'React', 'Claude Code', 'MCP'],
    diagram: 'flow',
  },
  {
    id: 'work-witness',
    company: 'Witness to History',
    role: 'Lead engineer',
    period: 'August 2026 to December 2026',
    status: 'In progress',
    title: 'A history game where students make the decisions',
    summary:
      'A browser game for middle and high school history classes that my team is building this semester for a Vanderbilt course. Students talk with people living through a historical moment, make a decision with only the information those people had, and then learn what actually happened. The core game is built and live, and we’re still adding to it.',
    links: [
      { label: 'Try the current build', href: 'https://witness-to-history.vercel.app/', kind: 'primary' },
      { label: 'Source', href: 'https://github.com/juliaktzr/witness-to-history', kind: 'secondary' },
    ],
    problem:
      'Students usually learn how history turned out before they learn what people were deciding, so every choice looks obvious. Our team of four Education students and two engineers wanted students to feel how uncertain those choices were at the time.',
    builtIntro:
      'I led the engineering and built the game engine, content pipeline, and interface. It runs in any browser with no install or login, so it works on school Chromebooks.',
    progress: {
      done: 'The game engine, content pipeline, dialogue and sources, read-aloud, town map, and character creator all work in the live build.',
      next: 'More scenarios and polish before the course ends in December.',
    },
    built: [
      {
        name: 'pipeline/',
        desc: 'Turns the team’s Google Sheet into game files and flags mistakes in plain English, so writers never touch code',
      },
      { name: 'dialogue/', desc: 'Branching conversations, with a primary source behind every factual claim' },
      { name: 'map/', desc: 'An illustrated town where the student’s character walks between people' },
      { name: 'a11y/', desc: 'Read-aloud, full keyboard navigation, and alt text on every image' },
      { name: 'deploy/', desc: 'Static site on Vercel. No backend and no running costs' },
    ],
    decisionsIntro: 'Three decisions that have shaped the project so far.',
    decisions: [
      {
        chose: 'Get one decision working in one scenario first',
        over: 'Building a second scenario or character customization early',
        why: 'If the format didn’t work, every extra piece would have to be redone. Character creation came after the core loop worked.',
      },
      {
        chose: 'An engine that loads any scenario from a single file',
        over: 'Hardcoding the first scenario, which is faster once but slow to change',
        why: 'The Education team can add and edit scenarios without waiting on an engineer.',
      },
      {
        chose: 'Composite characters, with a source for every fact',
        over: 'Made-up quotes from real historical figures',
        why: 'Accuracy mattered as much as gameplay. We set this rule together with the Education team.',
      },
    ],
    screenshots: [
      {
        src: '/work/witness-map.webp',
        alt: 'Illustrated town map from 1775 Massachusetts with three townspeople to visit and the student’s character at the edge of town',
        caption: 'The town map, where students choose who to talk to.',
        width: 1200,
        height: 1089,
      },
      {
        src: '/work/witness-character.webp',
        alt: 'Character creation screen with a customizable student avatar, poses, and an experience tracker',
        caption: 'The character creator.',
        width: 1600,
        height: 856,
      },
    ],
    stack: ['React', 'Vite', 'Web Speech API', 'Google Sheets', 'Vercel', 'No backend'],
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
    location: 'Waltham, MA (now remote)',
    period: 'June 2026 to Present',
    start: '2026-06',
    tag: 'Engineering',
    summary: 'Built an AI tool that cut a 40-hour sizing process to under 40 minutes.',
    bullets: [
      'Rebuilt the Government Consulting team’s Excel-based infrastructure sizing model as a Python engine that matches the original within 5% across 12 test cases.',
      'Built AI-guided ways to run the model with Claude Code, MCP, Python, and React, cutting a roughly 40-hour process to under 40 minutes.',
      'Compared four delivery approaches on product fit, user experience, and implementation effort, and shared recommendations that are shaping the roadmap.',
      'Asked to continue the work remotely during the school year.',
    ],
  },
  {
    org: 'Language and Education Analytics Research Lab',
    title: 'Research Assistant, Strategy and Product Manager',
    location: 'Nashville, TN',
    period: 'September 2024 to Present',
    start: '2024-09',
    tag: 'Research',
    summary: 'Product and strategy work on iTELL, an AI textbook platform in 25+ deployments.',
    bullets: [
      'Work with engineers and PhD researchers on iTELL, the lab’s AI-powered textbook platform, and help make product and strategy decisions as it has grown to 25+ deployments.',
      'Review AI-generated content and turn what I find into specific suggestions for improving the models.',
      'Led a redesign of the lab’s website to make it easier to navigate.',
    ],
  },
  {
    org: 'Vanderbilt School of Engineering',
    title: 'Teaching Assistant, CS1101',
    location: 'Nashville, TN',
    period: 'January 2025 to December 2025',
    start: '2025-01',
    tag: 'Teaching',
    summary: 'Helped 150+ intro CS students and flagged common sticking points to faculty.',
    bullets: [
      'Helped 150+ students in Vanderbilt’s intro computer science course, breaking hard concepts into steps they could follow.',
      'Noticed where students kept getting stuck in office hours and brought those patterns to faculty, which led to changes in the course materials.',
    ],
  },
  {
    org: 'Handshake AI',
    title: 'MOVE Fellow',
    location: 'Remote',
    period: 'August 2025 to October 2025',
    start: '2025-08',
    tag: 'AI evaluation',
    summary: 'Evaluated AI outputs for a confidential training project with a leading AI lab.',
    bullets: [
      'Chosen for a selective fellowship supporting a confidential AI training project with a leading research lab.',
      'Graded AI-generated webpages for accuracy and clarity, found recurring error patterns, and helped refine the grading rubrics.',
    ],
  },
  {
    org: 'Transmodal Corporation',
    title: 'Software QA Intern',
    location: 'Ramsey, NJ',
    period: 'May 2025 to August 2025',
    start: '2025-05',
    tag: 'Engineering',
    summary: 'Tested invoice-validation software used by global importers.',
    bullets: [
      'Wrote and ran test plans for commercial invoice-validation software used by global importers.',
      'Built test data and edge-case scenarios that caught validation failures.',
      'Sent weekly QA reports that helped engineers decide what to fix first and kept changing requirements clear.',
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
      coursework:
        'Relevant coursework: Principles of Software Engineering, Operating Systems, User Interface Design, Group Work Leadership.',
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
        'Took Logic, Applied Machine Learning, and Databases. Spent five months living in Madrid and traveled to 10 countries.',
      logo: '/logos/uc3m.svg',
      logoAlt: 'Universidad Carlos III de Madrid',
      logoStyle: 'seal' as const,
    },
  ],
}

/* -------------------------------------------------------------------------
   Interests: hobbies and the travel map with photos. Sits near the end of the page.
------------------------------------------------------------------------- */
export const about = {
  id: 'about',
  eyebrow: 'Interests',
  title: 'Beyond the tech.',
  intro:
    'If you want to know me outside of work, I love reading, cooking, traveling, and photography. Here are some places I explored during my semester in Madrid.',
  hobbies: ['Reading', 'Cooking', 'Traveling', 'Photography'],
  /** Cards under the travel map. */
  favoriteAuthor: {
    label: 'Favorite author',
    name: 'Freida McFadden',
  },
  /** The first photo shows large; the rest stack beside it. */
  favoritePhotos: {
    label: 'Favorite photos',
    photos: [
      {
        src: '/photos/interlaken-2.webp',
        place: 'Interlaken, Switzerland',
        alt: 'Paragliders on a snowy slope above Alpine peaks and a valley of clouds',
        width: 750,
        height: 1000,
      },
      {
        src: '/photos/boston-2.webp',
        place: 'Boston, Massachusetts',
        alt: 'Benches by the river with sailboats and the city skyline',
        width: 750,
        height: 1000,
      },
      {
        src: '/photos/boston-1.webp',
        place: 'Boston, Massachusetts',
        alt: 'A ball field at golden hour with the city in the distance',
        width: 750,
        height: 1000,
      },
    ] as Photo[],
  },
  languages: {
    label: 'Languages',
    items: [
      { hello: 'Hello', name: 'English', level: 'Native' },
      { hello: 'Hola', name: 'Spanish', level: 'Professional' },
      { hello: 'Cześć', name: 'Polish', level: 'Conversational' },
    ],
  },
}

export type Photo = { src: string; place: string; alt: string; width: number; height: number }

/** Photos shown on the travel map when someone hovers or taps a city. `place` must match a city in `travel`. */
export const photos: Photo[] = [
  { src: '/photos/madrid-3.webp', place: 'Madrid', alt: 'The Royal Palace of Madrid across a wide plaza at sunset', width: 750, height: 1000 },
  { src: '/photos/madrid-4.webp', place: 'Madrid', alt: 'The Royal Palace courtyard under a deep blue sky with white clouds', width: 750, height: 1000 },
  { src: '/photos/madrid-2.webp', place: 'Madrid', alt: 'A narrow street of colorful apartment buildings with iron balconies', width: 750, height: 1000 },
  { src: '/photos/madrid-5.webp', place: 'Madrid', alt: 'Pink blossom trees lining a quiet street', width: 750, height: 1000 },
  { src: '/photos/madrid-1.webp', place: 'Madrid', alt: 'Spanish flag above pine trees against a clear blue sky', width: 750, height: 1000 },
  { src: '/photos/segovia-4.webp', place: 'Segovia', alt: 'The Roman aqueduct of Segovia, its stone arches running above the street', width: 750, height: 1000 },
  { src: '/photos/segovia-1.webp', place: 'Segovia', alt: 'A gilded altarpiece beneath an ornate ribbed cathedral ceiling', width: 750, height: 1000 },
  { src: '/photos/segovia-2.webp', place: 'Segovia', alt: 'Gothic cloister arches framing a sunlit courtyard', width: 750, height: 1000 },
  { src: '/photos/segovia-3.webp', place: 'Segovia', alt: 'A narrow lane between old stone walls leading to an arched gate', width: 750, height: 1000 },
  { src: '/photos/rome-1.webp', place: 'Rome', alt: 'Crowds gathered around the Trevi Fountain on a sunny day', width: 750, height: 1000 },
  { src: '/photos/rome-2.webp', place: 'Rome', alt: 'A long table set for dinner in a vaulted cellar restaurant lit by a chandelier', width: 750, height: 1000 },
  { src: '/photos/capri-1.webp', place: 'Capri', alt: 'The Faraglioni rock stacks rising out of the sea off Capri', width: 750, height: 1000 },
  { src: '/photos/capri-2.webp', place: 'Capri', alt: 'A pebble cove with turquoise water below limestone cliffs', width: 750, height: 1000 },
  { src: '/photos/positano-1.webp', place: 'Positano', alt: 'A cliffside town stepping down to a blue bay under a clear sky', width: 562, height: 1000 },
  { src: '/photos/venice-1.webp', place: 'Venice', alt: 'A quiet canal lined with boats and faded yellow and red buildings, with a brick bridge ahead', width: 562, height: 1000 },
  { src: '/photos/burano-1.webp', place: 'Burano', alt: 'Brightly painted houses reflected in a canal', width: 750, height: 1000 },
  { src: '/photos/burano-2.webp', place: 'Burano', alt: 'A row of colorful houses along a canal with small boats moored', width: 750, height: 1000 },
  { src: '/photos/paris-1.webp', place: 'Paris', alt: 'A sidewalk café with wicker chairs and a chalkboard menu', width: 750, height: 1000 },
  { src: '/photos/paris-2.webp', place: 'Paris', alt: 'The Eiffel Tower above a bridge on a sunny day', width: 1000, height: 699 },
  { src: '/photos/crete-1.webp', place: 'Crete', alt: 'Three friends waving from ATVs above a green mountain valley', width: 1000, height: 750 },
  { src: '/photos/budapest-1.webp', place: 'Budapest', alt: 'The Hungarian Parliament lit up gold at night across the Danube', width: 563, height: 1000 },
  { src: '/photos/interlaken-2.webp', place: 'Interlaken', alt: 'Paragliders on a snowy slope above Alpine peaks and a valley of clouds', width: 750, height: 1000 },
  { src: '/photos/interlaken-1.webp', place: 'Interlaken', alt: 'Footprints across fresh snow with the sun low over the Alps', width: 750, height: 1000 },
  { src: '/photos/interlaken-3.webp', place: 'Interlaken', alt: 'A paraglider drifting under storm clouds over a snowy ridge', width: 750, height: 1000 },
  { src: '/photos/copenhagen-1.webp', place: 'Copenhagen', alt: 'Colorful canal houses and boats reflected in the water', width: 750, height: 1000 },
  { src: '/photos/copenhagen-2.webp', place: 'Copenhagen', alt: 'A yellow arched walkway with a hanging lantern', width: 750, height: 1000 },
  { src: '/photos/dublin-1.webp', place: 'Dublin', alt: 'A Gothic stone cathedral with daffodils lining the path to its door', width: 750, height: 1000 },
  { src: '/photos/edinburgh-1.webp', place: 'Edinburgh', alt: 'Colorful shopfronts along a curving cobblestone street', width: 750, height: 1000 },
  { src: '/photos/vienna-1.webp', place: 'Vienna', alt: 'A quiet Vienna street lined with ornate cream buildings', width: 750, height: 1000 },
  { src: '/photos/vienna-2.webp', place: 'Vienna', alt: 'An ornate stone building under a deep blue sky', width: 750, height: 1000 },
]

/* Travel map. Arcs fly out from `home` in list order, or from `from` when a place was part of a longer trip. */
export type Place = { city: string; country: string; lat: number; lon: number; from?: string }

export const travel = {
  label: 'Semester abroad',
  title: 'Five months based in Madrid',
  caption: '18 places in 10 countries.',
  hint: 'Hover a place to see where it is. Click one with a camera to open its photos.',
  home: 'Madrid',
  places: [
    { city: 'Madrid', country: 'Spain', lat: 40.4168, lon: -3.7038 },
    { city: 'Edinburgh', country: 'United Kingdom', lat: 55.9533, lon: -3.1883 },
    { city: 'Paris', country: 'France', lat: 48.8566, lon: 2.3522 },
    { city: 'Interlaken', country: 'Switzerland', lat: 46.6863, lon: 7.8632 },
    { city: 'Barcelona', country: 'Spain', lat: 41.3874, lon: 2.1686 },
    { city: 'Copenhagen', country: 'Denmark', lat: 55.6761, lon: 12.5683 },
    { city: 'Dublin', country: 'Ireland', lat: 53.3498, lon: -6.2603 },
    { city: 'Budapest', country: 'Hungary', lat: 47.4979, lon: 19.0402 },
    { city: 'Rome', country: 'Italy', lat: 41.9028, lon: 12.4964 },
    { city: 'Crete', country: 'Greece', lat: 35.3, lon: 24.9 },
    { city: 'Positano', country: 'Italy', lat: 40.6281, lon: 14.485 },
    { city: 'Capri', country: 'Italy', lat: 40.5532, lon: 14.2222, from: 'Positano' },
    { city: 'Mallorca', country: 'Spain', lat: 39.5696, lon: 2.6502 },
    { city: 'Venice', country: 'Italy', lat: 45.4408, lon: 12.3155 },
    { city: 'Burano', country: 'Italy', lat: 45.4853, lon: 12.417, from: 'Venice' },
    { city: 'Murano', country: 'Italy', lat: 45.458, lon: 12.353, from: 'Burano' },
    { city: 'Vienna', country: 'Austria', lat: 48.2082, lon: 16.3738 },
    { city: 'Segovia', country: 'Spain', lat: 40.9429, lon: -4.1088 },
  ] as Place[],
}

/* -------------------------------------------------------------------------
   Leadership and impact
------------------------------------------------------------------------- */
export type Counter = { value: number; prefix?: string; suffix?: string; label: string }

export const leadership = {
  id: 'leadership',
  eyebrow: 'Leadership',
  title: 'Teams I’ve led.',
  items: [
    {
      org: 'Read for Those in Need',
      role: 'Founder and CEO',
      period: 'March 2019 to July 2023',
      body: 'I started a nonprofit to get books to underserved K-8 students. I ran outreach, fundraising, logistics, and partnerships, and over four years our volunteers distributed more than 3,000 books across five public schools.',
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
      body: 'I lead fundraising for my chapter’s philanthropy, from planning campaigns to working with partners. In one semester, we raised $12,000 for breast cancer education.',
      counters: [{ value: 12000, prefix: '$', label: 'raised in one semester' }] as Counter[],
    },
    {
      org: 'Incentive Spirometer for Tracheostomy Patients',
      role: 'Project Lead',
      period: 'August 2025 to December 2025',
      body: 'I led a multidisciplinary team designing a breathing-exercise device for tracheostomy patients. We turned clinicians’ needs into engineering requirements, built a working prototype, and refined it through user testing and clinician feedback.',
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
  title: 'Tools I use.',
  groups: [
    {
      name: 'Technical',
      items: ['Python', 'JavaScript', 'Java', 'C++', 'C', 'HTML/CSS', 'ReactJS', 'Git', 'Linux', 'MATLAB'],
    },
    {
      name: 'AI',
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
        'Competitive Benchmarking',
        'User Personas',
      ],
    },
  ],
}

/* -------------------------------------------------------------------------
   Interests
------------------------------------------------------------------------- */
export const interests = {
  eyebrow: 'What I want next',
  body: 'My favorite part of any project is figuring out what’s actually worth building. At Pega, that meant building four versions of the same tool to see which one fit best. I want to keep doing that with AI: talking to the people who’ll use it, learning what they need, and making something that still works after the demo.',
}

/* -------------------------------------------------------------------------
   Contact
------------------------------------------------------------------------- */
export const contact = {
  id: 'contact',
  eyebrow: 'Contact',
  title: 'Let’s talk.',
  body: 'I’m looking for new grad roles starting summer 2027 in AI solutions engineering, technology consulting and strategy, or product and program management. I’m open to relocating for the right role. Email is the best way to reach me.',
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
  line: `Hi, I'm Julia. I'm looking for AI solutions, consulting, and product roles. Say hi: ${site.email}`,
}
