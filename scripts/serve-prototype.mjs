// Local-only HTTP harness. This is NOT Vercel routing or a production backend.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { resolve, relative, extname, sep, isAbsolute } from 'node:path'
import { pathToFileURL } from 'node:url'
import { prototypePaths, outputDirectory, readRouting } from './prototype-routes.mjs'

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.ico': 'image/x-icon' }

export function createPrototypeServer({ directory = fileURLToPath(outputDirectory) } = {}) {
  const routing = readRouting()
  return createServer(async (request, response) => {
    try {
      if (!['GET', 'HEAD'].includes(request.method)) {
        response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return
      }
      const url = new URL(request.url, 'http://localhost')
      const pathname = decodeURIComponent(url.pathname)
      const redirect = routing.redirects.find(rule => rule.source === pathname)
      if (redirect) {
        response.writeHead(308, { Location: redirect.destination + url.search }); response.end(); return
      }
      let file, status = 200
      // Existing React Router routes are case-insensitive and allow a trailing slash.
      const prototype = prototypePaths.find(path => path === (pathname.replace(/\/$/, '') || '/').toLowerCase())
      if (prototype) file = resolve(directory, '.' + prototype, 'index.html')
      else if (routing.isValidPage(pathname)) file = resolve(directory, '_spa.html')
      else {
        const candidate = resolve(directory, '.' + pathname)
        const local = relative(directory, candidate)
        const safe = !isAbsolute(local) && local !== '..' && !local.startsWith('..' + sep) && !local.startsWith('.') && !local.startsWith('_')
        if (safe && !local.includes(sep + '.') && (await stat(candidate).catch(() => null))?.isFile()) file = candidate
        else { file = resolve(directory, '404.html'); status = 404 }
      }
      const bytes = await readFile(file)
      response.writeHead(status, { 'Content-Type': types[extname(file)] || 'application/octet-stream',
        'Cache-Control': 'no-store', 'Content-Length': bytes.length })
      response.end(request.method === 'HEAD' ? undefined : bytes)
    } catch (error) {
      response.writeHead(error instanceof URIError ? 400 : 500, { 'Content-Type': 'text/plain' })
      response.end(error instanceof URIError ? 'Invalid URL' : 'Build the local prototype before starting preview.')
    }
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createPrototypeServer()
  const port = Number(process.argv[2] || 4175)
  server.listen(port, '127.0.0.1', () => console.log(`Local prototype: http://127.0.0.1:${port}/`))
}
