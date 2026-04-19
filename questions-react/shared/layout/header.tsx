import { ThemeSelector } from './theme-selector'
import { AppSwitcher } from './app-switcher'

export function Header() {
  return (
    <header className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <a href={import.meta.env.BASE_URL} className="btn btn-ghost text-xl">
          React Practice
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal m-0 p-0">
          <li>
            <AppSwitcher />
          </li>
          <li>
            <ThemeSelector />
          </li>
        </ul>
      </div>
    </header>
  )
}
