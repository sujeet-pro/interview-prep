import * as fs from 'node:fs'
import * as path from 'node:path'
import * as readline from 'node:readline'

export function createApp(name: string) {
  const appsDir = path.join(__dirname, '../apps')
  const templateDir = path.join(__dirname, '../_template')
  const newAppDir = path.join(appsDir, name)

  if (!fs.existsSync(appsDir)) {
    fs.mkdirSync(appsDir)
  }

  if (fs.existsSync(newAppDir)) {
    console.error(`Directory ${newAppDir} already exists.`)
    return
  }

  fs.mkdirSync(newAppDir)

  fs.readdir(templateDir, (err, files) => {
    if (err) {
      console.error(`Error reading template directory: ${err}`)
      return
    }

    files.forEach(file => {
      const srcFile = path.join(templateDir, file)
      const destFile = path.join(newAppDir, file)

      fs.copyFile(srcFile, destFile, err => {
        if (err) {
          console.error(`Error copying file ${file}: ${err}`)
        }
      })
    })
  })

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
    console.error(
      'App name must be in snake case and contain only lowercase alphabets and hyphens.',
    )
    process.exit(1)
  }
  createApp(appName)
  rl.close()
})
