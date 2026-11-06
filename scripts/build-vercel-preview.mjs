// Compatibility entry point. Vercel itself now uses build:vercel, which safely
// selects Preview or Production. This explicit command can only build Preview.
import { pathToFileURL } from 'node:url'
import { buildPrerender } from './build-prerender.mjs'

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) buildPrerender('preview')
