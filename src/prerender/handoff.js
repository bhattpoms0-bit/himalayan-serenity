// The ordinary SPA has no snapshot, so both functions are no-ops there.
// createRoot mounts into its original, EMPTY container. The separate static
// document remains visible until a resolved route commits in the same frame.
export function preparePrerender(document) {
  const snapshot = document.getElementById('prerender-content')
  if (!snapshot) return false
  document.documentElement.setAttribute('data-prerender-pending', '')
  return true
}

export function finishPrerender(document) {
  const snapshot = document.getElementById('prerender-content')
  if (!snapshot) return false
  snapshot.remove()
  document.documentElement.removeAttribute('data-prerender-pending')
  document.getElementById('prerender-handoff-style')?.remove()
  return true
}
