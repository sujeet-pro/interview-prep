import { useLazyBuildTimeData } from './build-time-data'

const Icon = (
  <svg
    width="12px"
    height="12px"
    className="inline-block h-2 w-2 fill-current opacity-60"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 2048 2048"
  >
    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
  </svg>
)
export function AppSwitcher() {
  const { data, loadData } = useLazyBuildTimeData()
  const apps = data?.apps

  return (
    <div className="dropdown dropdown-end p-0">
      <div onMouseEnter={loadData} tabIndex={0} role="button" className="btn btn-ghost">
        Apps
        {Icon}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl flex flex-col gap-1 size-max"
      >
        {apps?.map(app => (
          <li key={app.folderName}>
            <a href={app.href}>{app.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
