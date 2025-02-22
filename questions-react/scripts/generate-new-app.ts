import * as fs from 'node:fs'
import * as path from 'node:path'
import * as readline from 'node:readline'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { copyTemplatesTo } from './utils/copy-templates'
import { updateHtml } from './utils/render-ejs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export function createApp(name: string) {
  const appsDir = path.join(__dirname, '../apps')
  const newAppDir = path.join(appsDir, name)

  if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir)
  }

  if (fs.existsSync(newAppDir)) {
    console.error(`Directory ${newAppDir} already exists.`)
    return
  }

  fs.mkdirSync(newAppDir)
  copyTemplatesTo(name, ['index.ejs'])
  updateHtml(name)
  updateHtml('main') // index.html

  console.log(`App ${name} created successfully.`)
}

// Example usage
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('Please provide an app name: ', appName => {
  if (!appName) {
    console.error('App name cannot be empty.')
    process.exit(1)
  }
  const isValidAppName = /^[a-z]+(-[a-z]+)*$/.test(appName)
  if (!isValidAppName) {
    console.error('App name must be in snake case and contain only lowercase alphabets and hyphens.')
    process.exit(1)
  }
  createApp(appName)
  rl.close()
})
