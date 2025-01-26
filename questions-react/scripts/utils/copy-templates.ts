import fs from 'node:fs'
import path from 'node:path'
import { DIR_TEMPLATE, DIR_APPS } from './constants'
import { ensureValidAppName } from './file-names.utils'

export function copyTemplatesTo(appName: string, excludedFiles: string[]) {
  ensureValidAppName(appName)
  const files = fs.readdirSync(DIR_TEMPLATE, { withFileTypes: true })
  for (const file of files) {
    if (file.isDirectory() || excludedFiles.includes(file.name) || file.name == 'index.ejs') {
      continue
    }
    const srcFile = path.join(DIR_TEMPLATE, file.name)
    const destFile = path.join(DIR_APPS, appName, file.name)
    fs.copyFileSync(srcFile, destFile)
  }
}
