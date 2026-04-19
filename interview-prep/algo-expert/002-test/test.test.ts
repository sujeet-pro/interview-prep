import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";

export function sortedSquaredArray(array: number[]) {
  const sq = new Array(array.length);
  let si = 0;
  let li = array.length - 1;
  for (let i = li; i >= 0; i -= 1) {
    if (Math.abs(array[si]) > Math.abs(array[li])) {
      sq[i] = Math.pow(array[si], 2);
      si += 1;
    } else {
      sq[i] = Math.pow(array[li], 2);
      li -= 1;
    }
  }
  return sq;
}

const testCases = [
  { input: [-3, -2, -1] },
  { input: [-1, -1, 2, 3, 3, 3, 4] },
  { input: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
  { input: [-50, -13, -2, -1, 0, 0, 1, 1, 2, 3, 19, 20] },
];

Deno.test("base case", () => {
  const res = sortedSquaredArray([-3, -2, -1]);
  assertEquals(res, null);
});
