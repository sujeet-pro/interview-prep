import {
  assertArrayIncludes,
  assertEquals,
} from "https://deno.land/std@0.142.0/testing/asserts.ts";

export function twoNumSum(inputArr: number[], targetSum: number): number[] {
  const processedNumber = new Set<number>();
  for (const currentN of inputArr) {
    const reqN = targetSum - currentN;
    if (processedNumber.has(reqN)) {
      return [reqN, currentN];
    }
    processedNumber.add(currentN);
  }
  return [];
}

Deno.test("base case", () => {
  const res = twoNumSum([3, 5, -4, 8, 11, 1, -1, 6], 10);
  assertEquals(res.length, 2);
  assertArrayIncludes(res, [-1, 11]);
});

Deno.test("single number with same output", () => {
  const res = twoNumSum([11], 11);
  assertEquals(res.length, 0);
});

Deno.test("single number with differnt output", () => {
  const res = twoNumSum([11], 21);
  assertEquals(res.length, 0);
});
