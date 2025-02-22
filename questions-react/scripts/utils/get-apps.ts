import fs from 'node:fs'
import { DIR_APPS } from './constants'

/**
 * Gets a list of all app directory names in the apps folder
 * @returns Array of app directory names in kebab-case format
 * @throws Error if apps directory doesn't exist or can't be read
 */
export function getApps(): string[] {
  try {
    const apps = fs.readdirSync(DIR_APPS, { withFileTypes: true })
    return apps
      .filter(app => {
        if (!app.isDirectory()) return false
        // Check if index.html exists in the app directory
        // const indexPath = `${DIR_APPS}/${app.name}/index.html`
        // return fs.existsSync(indexPath) && fs.statSync(indexPath).isFile()
        return true
      })
      .map(app => app.name)
      .sort() // Sort alphabetically for consistent ordering
  } catch (error) {
    throw new Error(`Failed to read apps directory: ${error}`)
  }
}
