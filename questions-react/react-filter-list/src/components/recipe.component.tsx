import { memo } from "react";
import { Recipe } from "../hooks/useRecipes";

export type RecipeDetailsProps = {
  recipe?: Recipe | null | undefined;
};
function RecipeDetailsImpl({ recipe }: RecipeDetailsProps) {
  if (!recipe) {
    return (
      <section>
        <h2>Select a Recipe</h2>
      </section>
    );
  }
  return (
    <section>
      <h2>{recipe.name}</h2>
      <img width={200} height={200} src={recipe.image} />
      <ul>
        <li>prepTimeMinutes: {recipe.prepTimeMinutes}</li>
        <li>cookTimeMinutes: {recipe.cookTimeMinutes}</li>
        <li>servings: {recipe.servings}</li>
        <li>difficulty: {recipe.difficulty}</li>
        <li>cuisine: {recipe.cuisine}</li>
        <li>caloriesPerServing: {recipe.caloriesPerServing}</li>
        <li>rating: {recipe.rating}</li>
        <li>reviewCount: {recipe.reviewCount}</li>
        <li>
          Meal Type:{" "}
          {recipe.mealType.map((type) => (
            <span>{type}</span>
          ))}
        </li>
      </ul>
      <h3>Tags</h3>
      <ul>
        {recipe.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <ul>
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ul>
    </section>
  );
}

export const RecipeDetails = memo(RecipeDetailsImpl);
