import React from 'react'

interface AppInfo {
  name: string
  href: string
  folderName: string
  folderPath: string
}

type AppType = 'app' | 'main'

export interface BuildTimeData {
  app: AppInfo
  main: AppInfo
  appType: AppType
  apps: AppInfo[]
}

let cachedData: BuildTimeData | null = null

export function getBuildTimeData(): BuildTimeData | null {
  if (cachedData) return cachedData
  cachedData = JSON.parse(document.querySelector('#build-time-data')?.textContent ?? '{}')
  return cachedData
}

export function useLazyBuildTimeData(eager = false) {
  const [data, setData] = React.useState<BuildTimeData | null>(eager ? getBuildTimeData : null)

  const loadData = React.useCallback(() => {
    if (data) return
    setData(getBuildTimeData())
  }, [data])

  return { data, loadData }
}
