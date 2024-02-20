import { memo } from "react";
import { Recipe } from "./recipes.types";

export type RecipeDetailsProps = {
  recipe: Recipe;
};
function RecipeDetailsImpl({ recipe }: RecipeDetailsProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        <img width={200} height={200} src={recipe.image} />
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grow">
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
      </div>

      <ul className="flex flex-row gap-3 my-4">
        {recipe.tags.map((tag) => (
          <li key={tag} className="bg-gray-200 rounded-full py-1 px-3">
            {tag}
          </li>
        ))}
      </ul>
      <hr className="my-4" />
      <h3 className="text-lg font-bold	">Ingredients</h3>
      <ul className="list-disc">
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>
      <hr className="my-4" />
      <h3 className="text-lg font-bold	">Instructions</h3>
      <ol className="list-decimal">
        {recipe.instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </section>
  );
}

export const RecipeDetails = memo(RecipeDetailsImpl);
