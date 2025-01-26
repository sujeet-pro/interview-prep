import * as fs from 'node:fs'
import { copyTemplatesTo } from './utils/copy-templates'
import { getApps } from './utils/get-apps'
import { DIR_APPS, DIR_TEMPLATE } from './utils/constants'

const excludedFiles = ['app.tsx']

export function updateApps() {
  if (!fs.existsSync(DIR_APPS)) {
    console.error(`Apps directory ${DIR_APPS} does not exist.`)
    return
  }
  if (!fs.existsSync(DIR_TEMPLATE)) {
    console.error(`Template directory ${DIR_TEMPLATE} does not exist.`)
    return
  }

  const apps = getApps()

  for (const app of apps) {
    copyTemplatesTo(app, excludedFiles)
  }

  console.log(`All apps updated successfully.`)
}

// Example usage
updateApps()
