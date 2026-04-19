import { useState } from 'react'
import { RecipeList } from './recipe-list.component'
import { Outlet } from 'react-router'
import { RecipesProvider } from './recipe.provider'
import { useDebounce } from '../../hooks/debounce.hook'

export function RecipesRoute() {
  const [queryInput, setQueryInput] = useState('')
  // const searchQuery = useDeferredValue(queryInput);
  const debouncedQuery = useDebounce(queryInput, 500)

  return (
    <RecipesProvider>
      <section className="flex flex-col sm:flex-row w-full gap-4">
        <div>
          <input
            placeholder="Search"
            type="search"
            value={queryInput}
            onChange={e => setQueryInput(e.target.value)}
            className="block border border-gray-500 w-full p-2"
          />
          <RecipeList searchQuery={debouncedQuery} />
        </div>
        <div className="grow pl-6">
          <Outlet />
        </div>
      </section>
    </RecipesProvider>
  )
}
