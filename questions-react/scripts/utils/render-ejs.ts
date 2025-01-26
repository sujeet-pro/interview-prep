import ejs from 'ejs'
import { writeFileSync, readFileSync } from 'node:fs'

export function renderEjs(
  templateFilePath: string,
  outputFilePath: string,
  data: Record<string, any>,
) {
  const template = readFileSync(templateFilePath, 'utf-8')
  const compiledTemplate = ejs.compile(template, { filename: templateFilePath })
  const content = compiledTemplate(data)
  writeFileSync(outputFilePath, content)
}
