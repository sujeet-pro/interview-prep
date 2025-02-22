// import React from "react";
import { useLazyBuildTimeData } from '@/shared/layout/build-time-data'
import './app.css'

export const App = () => {
  const { data } = useLazyBuildTimeData(true)
  return (
    <div className="p-4">
      <h1 className="text-2xl text-center">React Interview Questions</h1>
      <ul className="flex flex-col gap-4">
        {data?.apps.map(app => (
          <li key={app.folderName}>
            <a href={app.href} className="link">
              {app.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
