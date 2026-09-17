import { LazyMotion, domAnimation } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { CaseStudy } from './components/CaseStudy'
import { CommandPalette } from './components/CommandPalette'
import { Contact, Footer } from './components/Contact'
import { CursorGlow } from './components/CursorGlow'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Grain } from './components/Grain'
import { Hero } from './components/Hero'
import { Interests } from './components/Interests'
import { Leadership } from './components/Leadership'
import { Nav } from './components/Nav'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import { Terminal } from './components/Terminal'
import { useTheme } from './hooks/useTheme'

function isTypingTarget(el: EventTarget | null) {
  if (!(el instanceof HTMLElement)) return false
  return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable
}

export default function App() {
  const { theme, toggle, setTheme } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [terminalOpen, setTerminalOpen] = useState(false)

  const openTerminal = useCallback(() => {
    setPaletteOpen(false)
    setTerminalOpen(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setTerminalOpen(false)
        setPaletteOpen((o) => !o)
        return
      }
      if (e.key === '~' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault()
        setPaletteOpen(false)
        setTerminalOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <LazyMotion features={domAnimation} strict>
      <Grain />
      <CursorGlow />
      <Nav theme={theme} onToggleTheme={toggle} onOpenPalette={() => setPaletteOpen(true)} />
      <main id="main">
        <Hero />
        <CaseStudy />
        <Experience />
        <Education />
        <Research />
        <Leadership />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        theme={theme}
        onToggleTheme={toggle}
        onOpenTerminal={openTerminal}
      />
      <Terminal
        open={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        theme={theme}
        onToggleTheme={toggle}
        onSetTheme={setTheme}
      />
    </LazyMotion>
  )
}
