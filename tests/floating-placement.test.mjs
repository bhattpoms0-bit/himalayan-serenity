import test from 'node:test'
import assert from 'node:assert/strict'
import { chooseFloatingPosition } from '../src/utils/floatingPlacement.js'

// Synthetic geometry checks; these do not replace rendered viewport/scroll tests.
const rect = (left, top, width, height) => ({ left, top, width, height, right: left + width, bottom: top + height })
const intersects = (a, b, gap = 0) => a.left < b.right + gap && a.right > b.left - gap && a.top < b.bottom + gap && a.bottom > b.top - gap
const choose = (obstacles, viewportWidth = 390, viewportHeight = 844) => chooseFloatingPosition({ viewportWidth, viewportHeight, width: 48, height: 48, obstacles })

test('390px: avoid description, heading, navigation, consent and sticky enquiry controls', () => {
  const description = rect(24, 520, 342, 170)
  const obstacles = [rect(0, 0, 390, 120), rect(24, 180, 342, 240), description, rect(0, 670, 390, 68), rect(0, 738, 390, 106)]
  assert.ok(intersects(rect(16, 590, 48, 48), description), 'old fixed-corner example overlaps the copy')
  const result = choose(obstacles)
  assert.ok(result)
  const button = rect(result.left, result.top, 48, 48)
  assert.ok(obstacles.every(obstacle => !intersects(button, obstacle, 12)))
})

test('use the other lower corner when a link occupies the first corner', () => {
  const obstacles = [rect(0, 720, 190, 124)]
  const result = choose(obstacles)
  assert.equal(result.left, 326)
  assert.ok(!intersects(rect(result.left, result.top, 48, 48), obstacles[0], 12))
})

test('return normal-flow fallback when the menu and controls leave no clear slot', () => {
  assert.equal(choose([rect(0, 0, 390, 700), rect(0, 700, 390, 144)]), null)
})

test('short windows and enlarged content use normal flow instead of overlaying content', () => {
  assert.equal(choose([rect(0, 0, 390, 360)], 390, 360), null)
  assert.equal(choose([], 70, 150), null)
})

test('geometry remains within bounds and clear of bottom controls at tablet/desktop sizes', () => {
  for (const width of [768, 1440]) {
    const obstacles = [rect(0, 0, width, 120), rect(0, 710, width, 90)]
    const result = choose(obstacles, width, 800)
    assert.ok(result)
    const button = rect(result.left, result.top, 48, 48)
    assert.ok(button.left >= 16 && button.right <= width - 16)
    assert.ok(obstacles.every(obstacle => !intersects(button, obstacle, 12)))
  }
})
