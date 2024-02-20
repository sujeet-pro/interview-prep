import { memo } from "react";
import { Recipe } from "../hooks/useRecipes";

export type RecipeListProps = {
  recipes: Recipe[];
  onSelect: (recipe: Recipe) => void;
};
function RecipeListImpl({ recipes, onSelect }: RecipeListProps) {
  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe.id}>
          <button onClick={() => onSelect(recipe)}>{recipe.name}</button>
        </li>
      ))}
    </ul>
  );
}

export const RecipeList = memo(RecipeListImpl);
