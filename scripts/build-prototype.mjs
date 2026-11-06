import { build, createServer } from 'vite'
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { parseArgs } from 'node:util'
import { readInventory, projectRoot } from './prototype-routes.mjs'
import { makePrototypeHTML, setDocumentRobots } from './prototype-html.mjs'
import { resolveBuildTarget } from './build-prerender.mjs'
import { parse } from '@babel/parser'

const root = fileURLToPath(projectRoot)
const { values } = parseArgs({ options: { target: { type: 'string', default: 'production' }, output: { type: 'string', default: 'dist-prototype' } } })
const target = resolveBuildTarget(process.env, values.target)
if (!['dist', 'dist-preview', 'dist-vercel', 'dist-prototype'].includes(values.output)) throw Error('Unapproved build output directory')
if ((values.output === 'dist' && target !== 'production') || (values.output === 'dist-preview' && target !== 'preview')) throw Error('Build output conflicts with indexing target')
const outputDirectory = new URL('../' + values.output + '/', import.meta.url)
const outDir = fileURLToPath(outputDirectory)
const inventory = readInventory()
await build({ root, build: { outDir, manifest: true } })
const shell = await readFile(new URL('index.html', outputDirectory), 'utf8')
await writeFile(new URL('_spa.html', outputDirectory), setDocumentRobots(shell, target))
const manifest = JSON.parse(await readFile(new URL('.vite/manifest.json', outputDirectory), 'utf8'))
// Only the build-time module graph replaces effects with a metadata collector.
// The normal production/client hook and all its callers remain untouched.
const server = await createServer({
  root,
  server: { middlewareMode: true, watch: null },
  appType: 'custom',
  plugins: [{
    name: 'prototype-capture-approved-seo', enforce: 'pre',
    transform(source, id, options) {
      // No request/user state exists at build time. Contact's original browser
      // initializer and submission handler are unchanged in the client bundle.
      if (options?.ssr && id.replace(/\\/g, '/').endsWith('/src/pages/Contact.jsx')) {
        if (!source.includes('new URLSearchParams(window.location.search)')) throw Error('Review Contact snapshot initializer')
        source = source.replace('new URLSearchParams(window.location.search)', "new URLSearchParams('')")
      }
      if (options?.ssr && id.replace(/\\/g, '/').endsWith('/src/hooks/useSEO.js')) {
        return 'export let capturedSEO; export function resetCapturedSEO(){capturedSEO=undefined} export function useSEO(value){capturedSEO=value}'
      }
      // Nested AnimatePresence components otherwise leave breadcrumb/card
      // entrances hidden forever without JS. Disable only build-time entrances;
      // authored styles, content and normal browser animation code stay intact.
      if (options?.ssr && id.endsWith('.jsx') && !id.includes('node_modules')) {
        const replacements = []
        function visit(node) {
          if (!node || typeof node !== 'object') return
          if (node.type === 'JSXAttribute' && node.name?.name === 'initial' && node.value) {
            replacements.push([node.value.start, node.value.end])
          }
          for (const value of Object.values(node)) {
            for (const child of Array.isArray(value) ? value : [value]) visit(child)
          }
        }
        visit(parse(source, { sourceType: 'module', plugins: ['jsx'] }))
        for (const [start, end] of replacements.sort((a, b) => b[0] - a[0])) {
          source = source.slice(0, start) + '{false}' + source.slice(end)
        }
        return source
      }
    },
  }],
})
try {
  const { renderPrototype } = await server.ssrLoadModule('/scripts/render-prototype.jsx')
  // Include CSS from shared imports as well as the route's own chunk.
  function routeStyles(entry, seen = new Set()) {
    if (seen.has(entry)) return []
    seen.add(entry)
    const chunk = manifest[entry]
    if (!chunk) throw Error('Missing client manifest entry: ' + entry)
    return [...new Set([...(chunk.css || []), ...(chunk.imports || []).flatMap(key => routeStyles(key, seen))])]
  }
  const captured = []
  for (const { path, canonical, entry } of inventory) {
    const directory = new URL(path === '/' ? './' : '.' + path + '/', outputDirectory)
    await mkdir(directory, { recursive: true })
    const rendered = renderPrototype(path)
    if (rendered.metadata?.canonical !== canonical) throw Error('Canonical mismatch: ' + path)
    const html = makePrototypeHTML(shell, rendered, routeStyles(entry), false, target)
    await writeFile(new URL('index.html', directory), html)
    captured.push({ path, entry, metadata: rendered.metadata })
    console.log('Prerendered ' + path)
  }
  await writeFile(new URL('404.html', outputDirectory),
    makePrototypeHTML(shell, renderPrototype('/seo-test-unknown-page', true), [], true, target))
  await writeFile(new URL('prerender-manifest.json', outputDirectory), JSON.stringify(captured, null, 2) + '\n')
  console.log(`31-page ${target} prerender written to ${values.output}; assets and branded 404 included.`)
} finally {
  await server.close()
}
