import { useState } from 'react'

const themeOptions = [
  { name: 'Default', value: 'default' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
]

const ThemeDropdownIcon = () => (
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

export function ThemeSelector() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = sessionStorage.getItem('theme')
    if (savedTheme && themeOptions.some(option => option.value === savedTheme)) {
      return savedTheme
    }
    return themeOptions[0].value
  })

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.value
    setTheme(newTheme)
    sessionStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="dropdown dropdown-end p-0">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        Theme
        <ThemeDropdownIcon />
      </div>
      <ul tabIndex={0} className="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl flex flex-col size-max">
        {themeOptions.map(themeOption => (
          <li key={themeOption.value}>
            <input
              type="radio"
              name="theme-dropdown"
              className="theme-controller btn  btn-sm btn-block justify-start"
              aria-label={themeOption.name}
              value={themeOption.value}
              checked={theme === themeOption.value}
              onChange={handleThemeChange}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
