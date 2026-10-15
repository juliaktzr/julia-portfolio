// Renders scripts/og-image.html to public/og-image.png at 1200x630.
// Run with `npm run og`. Needs Playwright's Chromium: `npx playwright install chromium`.
import { chromium } from 'playwright'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, resolve } from 'node:path'

const here = dirname(fileURLToPath(import.meta.url))
const source = resolve(here, 'og-image.html')
const target = resolve(here, '../public/og-image.png')

const browser = await chromium.launch()
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
  await page.goto(pathToFileURL(source).href)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: target, clip: { x: 0, y: 0, width: 1200, height: 630 } })
  console.log(`Wrote ${target}`)
} finally {
  await browser.close()
}
