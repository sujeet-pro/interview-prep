import { describe, expect, test } from 'vitest'
function sum(a: number, b: number) {
  console.log('hello')
  return a + b
}

describe('hell', () => {
  test('2 + 2', () => {
    expect(sum(2, 2)).toBe(4)
  })
})
