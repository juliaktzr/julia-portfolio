import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggle } = useTheme()

  return (
    <>
      <Nav theme={theme} onToggleTheme={toggle} />
      <main id="main">
        <Hero />
      </main>
    </>
  )
}
