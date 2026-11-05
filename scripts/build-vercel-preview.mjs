// Stage 3 is authorized for Preview only. Production release needs a separately
// reviewed build configuration; never reuse/promote this noindex artifact.
import { spawnSync } from 'node:child_process'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'
import { outputDirectory } from './prototype-routes.mjs'

export function assertPreviewTarget(env) {
  if (env.VERCEL_ENV !== 'preview') throw Error('Stage 3 build requires the Vercel Preview target; production is not authorized.')
  if (env.VERCEL_GIT_COMMIT_REF && env.VERCEL_GIT_COMMIT_REF !== 'feature/phase6-1b-prerender-prototype') {
    throw Error('Stage 3 build requires the reviewed feature branch.')
  }
}

export function preventPreviewIndexing(html) {
  const stripped = html.replace(/<meta\b[^>]*name="robots"[^>]*>(?:\r?\n)?/gi, '')
  if (!stripped.includes('</head>')) throw Error('Preview document has no head')
  return stripped.replace('</head>', '<meta name="robots" content="noindex, nofollow" />\n</head>')
}

async function protectHTML(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory)
    if (entry.isDirectory()) await protectHTML(file)
    else if (entry.name.endsWith('.html')) await writeFile(file, preventPreviewIndexing(await readFile(file, 'utf8')))
  }
}

export async function buildPreview() {
  assertPreviewTarget(process.env)
  const result = spawnSync(process.execPath, ['scripts/build-prototype.mjs'], { stdio: 'inherit' })
  if (result.error || result.status !== 0) throw Error('Preview prerender build failed: ' + (result.error?.message || result.status))
  await protectHTML(outputDirectory)
  console.log('Preview-only HTML protected with noindex; Vercel response header is configured separately.')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await buildPreview()
