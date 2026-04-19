/* DO NOT UPDATE: Auto Generated */

import React from 'react'
import ReactDOM from 'react-dom/client'

import { App } from './app/app.tsx'
import './index.css'
import { Layout } from '@/shared/layout/layout.tsx'
import { getBuildTimeData } from '@/shared/layout/build-time-data.ts'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Failed to find root element')

const buildTimeData = getBuildTimeData()
if (!buildTimeData) {
  throw new Error('Failed to get build time data')
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Layout>
      <App />
    </Layout>
  </React.StrictMode>,
)
