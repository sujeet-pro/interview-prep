import ejs from 'ejs'
import { writeFileSync, readFileSync } from 'node:fs'
import { getApps } from './get-apps'
import { resolve } from 'node:path'
import { BASE, DIR_APPS, DIR_PROJECT, DIR_TEMPLATE } from './constants'
import { toTitleCase } from './file-names.utils'

function renderEjs(templateFilePath: string, outputFilePath: string, data: Record<string, unknown>) {
  console.log(`Rendering ${templateFilePath} to ${outputFilePath}`)
  const template = readFileSync(templateFilePath, 'utf-8')
  const compiledTemplate = ejs.compile(template, { filename: templateFilePath })
  const content = compiledTemplate(data)
  writeFileSync(outputFilePath, content)
}

export function updateHtml(appName: string) {
  const appFolderNames = getApps()
  const apps = appFolderNames.map(appFolderName => ({
    name: toTitleCase(appFolderName),
    href: `${BASE}apps/${appFolderName}/`,
    folderName: appFolderName,
    folderPath: resolve(DIR_APPS, appFolderName),
  }))
  const main = {
    name: 'React Interview Questions',
    href: BASE,
    folderName: 'main',
    folderPath: DIR_PROJECT,
  }
  const app = appName === 'main' ? main : apps.find(app => app.folderName === appName)

  if (!app) {
    throw new Error(`App ${appName} not found.`)
  }

  renderEjs(resolve(DIR_TEMPLATE, 'index.ejs'), resolve(app.folderPath, 'index.html'), {
    appType: appName === 'main' ? 'main' : 'app',
    main,
    app,
    apps,
  })
}
