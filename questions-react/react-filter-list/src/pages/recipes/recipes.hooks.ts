import { useContext, useMemo } from "react";
import { recipesContext } from "./recipe.context";

export function useRecipes() {
    return useContext(recipesContext);
}

export function useRecipe(id: string | undefined) {
    const recipes = useRecipes();
    const recipeId = Number(id)
    const recipe = useMemo(() => {
        if (!recipeId) return null
        return recipes.find((recipe) => recipe.id === recipeId) || null;
    }, [recipes, recipeId]);
    return recipe;
}
