import { CaseStudy } from './components/CaseStudy'
import { Contact, Footer } from './components/Contact'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Interests } from './components/Interests'
import { Leadership } from './components/Leadership'
import { Nav } from './components/Nav'
import { Research } from './components/Research'
import { Skills } from './components/Skills'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
        <CaseStudy />
        <Experience />
        <Research />
        <Leadership />
        <Skills />
        <Interests />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
