import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { notFound, site } from './content'

function NotFound() {
  const path = typeof location !== 'undefined' ? location.pathname : '/'
  return (
    <main className="mx-auto flex min-h-svh max-w-5xl items-center px-4 py-16 sm:px-6">
      <div className="w-full max-w-2xl rounded-xl border border-line bg-surface/70">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-accent/80" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-accent-2/70" aria-hidden="true" />
          <span className="h-3 w-3 rounded-full bg-muted/50" aria-hidden="true" />
          <span className="ml-3 font-mono text-xs text-muted">julia@vanderbilt ~ zsh</span>
        </div>
        <div className="space-y-4 px-4 py-6 font-mono text-sm sm:px-6 sm:py-8 sm:text-base">
          <p className="text-muted">
            <span className="text-accent-ink" aria-hidden="true">
              ❯{' '}
            </span>
            cat {path}
          </p>
          <h1 className="text-text">
            zsh: no such file or directory: <span className="break-all">{path}</span>
          </h1>
          <p className="sr-only">{notFound.title}</p>
          <p className="text-muted">
            <span className="text-accent-ink" aria-hidden="true">
              ❯{' '}
            </span>
            <a href="/" className="text-accent-ink underline underline-offset-4 hover:text-text">
              {notFound.home}
            </a>
            <span className="sr-only"> {notFound.homeLabel}</span>
          </p>
        </div>
      </div>
      <p className="sr-only">{site.name}</p>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotFound />
  </StrictMode>,
)
