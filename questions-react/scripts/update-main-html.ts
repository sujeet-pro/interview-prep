import { resolve } from 'node:path'
import { getApps } from './utils/get-apps'
import { DIR_PROJECT, DIR_TEMPLATE } from './utils/constants'
import {} from '../vite.config'
import { toTitleCase } from './utils/file-names.utils'
import { renderEjs } from './utils/render-ejs'

function updateMainHtml() {
  const apps = getApps()

  renderEjs(
    resolve(DIR_TEMPLATE, 'main.ejs'),
    resolve(DIR_PROJECT, 'index.html'),
    {
      appname: 'React Interview Questions',
      apps: apps.map(app => ({
        name: toTitleCase(app),
        href: `/interview-questions-react/apps/${app}/`,
      })),
    },
  )
}

updateMainHtml()
