import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-slate-800 text-white p-4">
      <ul className="flex gap-x-4">
        <li>
          <Link to="/" className="p-4 hover:bg-slate-700">
            Home
          </Link>
        </li>
        <li>
          <Link to="/recipes" className="p-4 hover:bg-slate-700">
            Recipes
          </Link>
        </li>
      </ul>
    </header>
  );
}
