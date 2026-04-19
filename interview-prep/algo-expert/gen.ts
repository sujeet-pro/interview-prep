import { resolve } from "https://deno.land/std/path/mod.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";
console.log("Deno args : ", Deno.args);
const dirName = Deno.args[0];
const nameRegex = /^\d{3}-[a-z-]+/;

if (!dirName) {
  throw new Error("Name not provided");
}
if (!nameRegex.test(dirName)) {
  throw new Error("Name does not match the pattern");
}
const fileName = dirName.replace(/^\d{3}-/, "");

ensureDirSync(resolve(dirName));

const markdownContent = fileName.split("-").map((word) =>
  word[0].toUpperCase() + word.substring(1)
).join(" ");
Deno.writeTextFileSync(
  resolve(`${dirName}/${fileName}.md`),
  `# ${markdownContent}
[Algo Expert Link](https://www.algoexpert.io/questions/${fileName})
`,
);

const tsContent = `
export default function attemptedSolution(input) {
  return null
}
`;

const tsTestContent = `
import { assertEquals } from "https://deno.land/std@0.142.0/testing/asserts.ts"
import attemptedSolution from './${fileName}.ts'

const testCases = [

]

export function solution(): null {
  return null
}

testCases.forEach(testCaseInput => {
  Deno.test("test case", () => {
    assertEquals(
      attemptedSolution(testCaseInput),
      solution(testCaseInput),
    )
  })
})

  `;
Deno.writeTextFileSync(resolve(`${dirName}/${fileName}.ts`), tsContent);
Deno.writeTextFileSync(
  resolve(`${dirName}/${fileName}.test.ts`),
  tsTestContent,
);
