import fs from 'node:fs'
import { DIR_APPS } from './constants'

export function getApps(): string[] {
  const apps = fs.readdirSync(DIR_APPS, { withFileTypes: true })
  return apps.filter(app => app.isDirectory()).map(app => app.name)
}
