import { useEffect, useState } from 'react'

/** True while the page is being printed, so collapsed or animated content can render complete. */
export function usePrinting() {
  const [printing, setPrinting] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('print')
    const on = () => setPrinting(true)
    const off = () => setPrinting(false)
    const onMq = (e: MediaQueryListEvent) => setPrinting(e.matches)
    window.addEventListener('beforeprint', on)
    window.addEventListener('afterprint', off)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('beforeprint', on)
      window.removeEventListener('afterprint', off)
      mq.removeEventListener('change', onMq)
    }
  }, [])
  return printing
}
