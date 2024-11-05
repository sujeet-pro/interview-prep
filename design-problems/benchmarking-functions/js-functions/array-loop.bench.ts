import { bench, describe } from 'vitest'

function generateArrayOfLength(n: number) {
  const arr: number[] = []
  for (let i = 0; i < n; i++) {
    arr.push(i)
  }
  return arr
}

const testCases = [{ n: 10 }, { n: 100 }, { n: 1000 }, { n: 10000 }]
describe.each(testCases)(`Benchmarking/Js Functions - Loops - Sum($n items)`, ({ n }) => {
  const items = generateArrayOfLength(n)
  bench(`standard for loop - ${n}`, () => {
    let temp = 0
    for (let i = 0; i < items.length; i++) {
      temp += items[i]
    }
  })

  bench(`for of loop - ${n}`, () => {
    let temp = 0
    for (let item of items) {
      temp += item
    }
  })

  bench(`forEach loop - ${n}`, () => {
    let temp = 0
    items.forEach((item) => {
      temp += item
    })
  })

  bench(`reduce loop - ${n}`, () => {
    items.reduce((acc, item) => acc + item, 0)
  })
})
