import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import attemptedSolution from "./non-constructible-change.ts";

const testCases = [
  {
    "coins": [5, 7, 1, 1, 2, 3, 22],
  },
  {
    "coins": [1, 1, 1, 1, 1],
  },
  {
    "coins": [1, 5, 1, 1, 1, 10, 15, 20, 100],
  },
  {
    "coins": [6, 4, 5, 1, 1, 8, 9],
  },
  {
    "coins": [],
  },
  {
    "coins": [87],
  },
  {
    "coins": [5, 6, 1, 1, 2, 3, 4, 9],
  },
  {
    "coins": [5, 6, 1, 1, 2, 3, 43],
  },
  {
    "coins": [1, 1],
  },
  {
    "coins": [2],
  },
  {
    "coins": [109, 2000, 8765, 19, 18, 17, 16, 8, 1, 1, 2, 4],
  },
  {
    "coins": [1, 2, 3, 4, 5, 6, 7],
  },
];

export function solution(coins: number[]): number {
  coins.sort((a, b) => a - b);
  let currentChangeCreated = 0;
  for (const coin of coins) {
    if (coin > currentChangeCreated + 1) return currentChangeCreated + 1;
    currentChangeCreated += coin;
  }
  return currentChangeCreated + 1;
}

testCases.forEach((testCaseInput) => {
  Deno.test("test case", () => {
    assertEquals(
      attemptedSolution(testCaseInput.coins),
      solution(testCaseInput.coins),
    );
  });
});
