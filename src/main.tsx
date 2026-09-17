import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { consoleGreeting } from './content'

console.log(
  `%c${consoleGreeting.banner}`,
  'color:#B86B77;font-family:monospace;font-size:12px;line-height:1.1',
)
console.log(`%c${consoleGreeting.line}`, 'color:#7A6358;font-size:12px')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
