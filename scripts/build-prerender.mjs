// One renderer, fresh target-specific artifacts. No deployment or account writes.
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

// Vercel documents VERCEL=1, VERCEL_ENV and VERCEL_TARGET_ENV as system
// signals. Never infer production from NODE_ENV, a URL, a branch, or absence.
export function resolveBuildTarget(env, requested) {
  if (!['production', 'preview', 'vercel'].includes(requested)) throw Error('Choose an explicit production, preview or vercel build.')
  const hasPlatformSignal = ['VERCEL', 'VERCEL_ENV', 'VERCEL_TARGET_ENV'].some(key => env[key] !== undefined)
  let detected
  if (hasPlatformSignal) {
    if (env.VERCEL !== '1' || !['production', 'preview'].includes(env.VERCEL_ENV)) {
      throw Error('Missing or unsupported Vercel system environment signals.')
    }
    detected = env.VERCEL_ENV
    if (env.VERCEL_TARGET_ENV !== undefined && env.VERCEL_TARGET_ENV !== detected) {
      throw Error('Conflicting or custom Vercel target environment; review before building.')
    }
    if (detected === 'production' && env.VERCEL_GIT_COMMIT_REF && env.VERCEL_GIT_COMMIT_REF !== 'main') {
      throw Error('Production Git builds must use the approved main branch.')
    }
  }
  if (requested === 'vercel') {
    if (!detected) throw Error('Vercel build requires verified platform environment signals.')
    return detected
  }
  if (detected && requested !== detected) throw Error('Requested build conflicts with the Vercel deployment target.')
  return requested
}

export function buildPlan(env, requested) {
  const target = resolveBuildTarget(env, requested)
  return { target, output: requested === 'vercel' ? 'dist-vercel' : target === 'production' ? 'dist' : 'dist-preview' }
}

export function buildPrerender(requested, env = process.env) {
  const plan = buildPlan(env, requested)
  // Vite empties the selected allowlisted output and rebuilds from source.
  // Never copy an existing Preview directory into a Production artifact.
  const result = spawnSync(process.execPath,
    ['scripts/build-prototype.mjs', '--target', plan.target, '--output', plan.output], { stdio: 'inherit', env })
  if (result.error || result.status !== 0) throw Error('Prerender build failed: ' + (result.error?.message || result.status))
  console.log(`${plan.target} prerender complete: ${plan.output} (31 public routes).`)
  return plan
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) buildPrerender(process.argv[2])
