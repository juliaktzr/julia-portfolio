/**
 * All site copy lives here. Edit this file to change text without touching
 * components. Anything marked TODO needs your input.
 */

export const site = {
  name: 'Julia Kantzer',
  role: 'Product Engineer',
  tagline: 'I build AI products for real users and lead the people who ship them.',
  location: 'Nashville, TN',
  email: 'juliakantzer@gmail.com',
  // TODO: add your LinkedIn URL. GitHub was taken from your gh login; confirm it.
  linkedin: 'https://www.linkedin.com/in/TODO',
  github: 'https://github.com/juliaktzr',
  resumeUrl: '/resume.pdf',
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
  { label: 'Research', href: '#research' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]
