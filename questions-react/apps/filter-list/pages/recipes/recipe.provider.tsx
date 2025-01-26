import { PropsWithChildren, useEffect, useState } from 'react'
import { Recipe, RecipeResponse } from './recipes.types'
import { recipesContext } from './recipe.context'

async function getRecipes(): Promise<Recipe[]> {
  const res = await fetch('/recipes.json')
  const data: RecipeResponse = await res.json()
  return data.recipes
}

export function RecipesProvider({ children }: PropsWithChildren<unknown>) {
  const [recipes, setRecipes] = useState<Recipe[]>([])

  useEffect(() => {
    getRecipes().then(res => {
      setRecipes(res)
    })
  }, [])

  return <recipesContext.Provider value={recipes}>{children}</recipesContext.Provider>
}
