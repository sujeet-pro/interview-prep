import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import { copyTemplatesTo } from './utils/copy-templates'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const excludedFiles = ['app.tsx']

export function updateApps() {
  const appsDir = path.join(__dirname, '../apps')

  if (!fs.existsSync(appsDir)) {
    console.error(`Apps directory ${appsDir} does not exist.`)
    return
  }

  const apps = fs.readdirSync(appsDir, { withFileTypes: true })

  for (const app of apps) {
    if (!app.isDirectory()) {
      // console.error(`App ${app.name} is not a directory.`)
      return
    }
    copyTemplatesTo(app.name, excludedFiles)
  }
  console.log(`All apps updated successfully.`)
}

// Example usage
updateApps()
