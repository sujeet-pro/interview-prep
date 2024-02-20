import { useEffect, useState } from "react";

export type RecipeResponse = {
    recipes: Recipe[]
    total: number,
    skip: number,
    limit: number
}
export type Recipe = {
    id: number,
    name: string
    ingredients: string[]
    instructions: string[]
    prepTimeMinutes: number
    cookTimeMinutes: number
    servings: number
    difficulty: string
    cuisine: string
    caloriesPerServing: number
    tags: string[]
    userId: number
    image: string
    rating: number
    reviewCount: number
    mealType: string[]
}

async function getRecipes(): Promise<Recipe[]> {
    const res = await fetch('/recipes.json')
    const data: RecipeResponse = await res.json()
    return data.recipes
}

export function useRecipes() {
    const [recipes, setRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        getRecipes().then(res => {
            setRecipes(res)
        })
    }, [])
    return recipes
}