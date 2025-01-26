import { BrowserRouter, Route, Routes } from 'react-router'
import { Layout } from './layout'
import { NotFoundRoute } from './pages/not-found'
import { HomeRoute } from './pages/home'
import { RecipesRoute, RecipeRoute } from './pages/recipes'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeRoute />} />
          <Route path="recipes" element={<RecipesRoute />}>
            <Route path=":id" element={<RecipeRoute />} />
          </Route>
          <Route path="*" element={<NotFoundRoute />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
