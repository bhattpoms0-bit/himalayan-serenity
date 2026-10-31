// Prefer the lower corners, moving upward only when a CTA or sticky control occupies them.
// Returning null keeps the link in normal document flow rather than covering a control.
export function chooseFloatingPosition({ viewportWidth, viewportHeight, width, height, obstacles, margin = 16, clearance = 12, minimumTop = 96 }) {
  const maximumTop = viewportHeight - margin - height
  if (viewportWidth < width + margin * 2 || maximumTop < minimumTop) return null
  const lefts = [margin, viewportWidth - margin - width]
  const tops = new Set([maximumTop])
  for (const obstacle of obstacles) tops.add(Math.min(maximumTop, obstacle.top - clearance - height))
  for (let top = maximumTop; top >= minimumTop; top -= 16) tops.add(top)
  for (const top of [...tops].filter(top => top >= minimumTop).sort((a, b) => b - a)) {
    for (const left of lefts) {
      const overlaps = obstacles.some(bounds => bounds.width > 0 && bounds.height > 0 &&
        left < bounds.right + clearance && left + width > bounds.left - clearance &&
        top < bounds.bottom + clearance && top + height > bounds.top - clearance)
      if (!overlaps) return { left, top }
    }
  }
  return null
}
