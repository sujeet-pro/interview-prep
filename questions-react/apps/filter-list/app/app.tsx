import { HashRouter, Route, Routes } from 'react-router'
import { Layout } from '../layout'
import { RecipesRoute, RecipeRoute } from '../pages/recipes'
import './app.css'

export function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<RecipesRoute />}>
            <Route path=":id" element={<RecipeRoute />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  )
}
