/** Fixed SVG noise at very low opacity to take the flatness off the cream. */
export function Grain() {
  return (
    <div
      aria-hidden="true"
      data-grain
      className="pointer-events-none fixed inset-0 z-[70] opacity-[0.05] mix-blend-multiply [background-size:180px_180px] dark-grain"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.17 0 0 0 0 0.11 0 0 0 0 0.09 0 0 0 0.9 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}
