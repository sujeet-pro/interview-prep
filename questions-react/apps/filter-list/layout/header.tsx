import { Link } from 'react-router'

export function Header() {
  return (
    <header className="bg-slate-800 text-white p-4">
      <ul className="flex gap-x-4">
        <li>
          <Link to={`/`} className="p-4 hover:bg-slate-700">
            Recipes - Fitler List
          </Link>
        </li>
      </ul>
    </header>
  )
}
