import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import ejs from 'ejs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const templateDir = path.join(__dirname, '../_template')
const appsDir = path.join(__dirname, '../../apps')

export function copyTemplatesTo(appName: string, excludedFiles: string[] = []) {
  const files = fs.readdirSync(templateDir, { withFileTypes: true })
  for (const file of files) {
    if (
      file.isDirectory() ||
      excludedFiles.includes(file.name) ||
      file.name == 'index.ejs'
    ) {
      continue
    }
    const srcFile = path.join(templateDir, file.name)
    const destFile = path.join(appsDir, appName, file.name)
    fs.copyFileSync(srcFile, destFile)
  }
  // Handle EJS files separately
  ejs.renderFile(
    path.join(templateDir, 'index.ejs'),
    { appname: toTitleCase(appName) },
    (err, str) => {
      if (err) {
        console.error(err)
        return
      }
      fs.writeFileSync(path.join(appsDir, appName, 'index.html'), str)
    },
  )
}

export function toTitleCase(str: string): string {
  return str
    .toLowerCase()
    .split(/[_-\s]/) // Split by underscores, dash or spaces
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
