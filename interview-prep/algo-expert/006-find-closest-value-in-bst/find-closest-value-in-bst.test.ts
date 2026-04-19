import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts";
import attemptedSolution from "./find-closest-value-in-bst.ts";

const testCases = [];

export function solution(): null {
  return null;
}

testCases.forEach((testCaseInput) => {
  Deno.test("test case", () => {
    assertEquals(
      attemptedSolution(testCaseInput),
      solution(testCaseInput),
    );
  });
});
