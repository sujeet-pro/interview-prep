import { memo, useEffect, useMemo } from 'react'
import { useRecipes } from './recipes.hooks'
import { slowSync } from '../../utils/slow'
import { Link } from 'react-router'

export type RecipeListProps = {
  searchQuery?: string | null | undefined
}

function RecipeListImpl({ searchQuery }: RecipeListProps) {
  const recipes = useRecipes()
  const filteredRecipes = useMemo(() => {
    console.log(`Filtering for: ${searchQuery}`)
    if (!searchQuery) return recipes
    const lowerCaseQuery = searchQuery.toLowerCase()
    slowSync(250)
    return recipes.filter(recipe => recipe.name.toLowerCase().includes(lowerCaseQuery))
  }, [searchQuery, recipes])
  useEffect(() => {
    console.log('recipes changed')
  }, [recipes])

  return (
    <ul>
      {filteredRecipes.map(recipe => (
        <li key={recipe.id}>
          <Link to={`/${recipe.id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export const RecipeList = memo(RecipeListImpl)
