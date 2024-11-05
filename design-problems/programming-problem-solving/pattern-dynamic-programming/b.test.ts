import { describe, expect, test } from 'vitest'
function sum(a: number, b: number) {
  console.log('hello world k')
  return a + b
}

describe('hello world', () => {
  test('3 + 3', () => {
    expect(sum(2, 2)).toBe(4)
  })
})
