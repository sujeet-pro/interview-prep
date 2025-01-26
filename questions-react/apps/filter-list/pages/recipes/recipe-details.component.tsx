import { memo } from 'react'
import { Recipe } from './recipes.types'

export type RecipeDetailsProps = {
  recipe: Recipe
}
function RecipeDetailsImpl({ recipe }: RecipeDetailsProps) {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">{recipe.name}</h2>
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <img className="w-full md:w-1/2 lg:w-2/5 aspect-square" src={recipe.image} alt={`${recipe.name} image`} />
        <div className="flex-grow">
          <ul className="grid grid-cols-1 lg:grid-cols-2 ">
            <li>
              <strong>Preparation Time:</strong> {recipe.prepTimeMinutes} minutes
            </li>
            <li>
              <strong>Cooking Time:</strong> {recipe.cookTimeMinutes} minutes
            </li>
            <li>
              <strong>Servings:</strong> {recipe.servings}
            </li>
            <li>
              <strong>Difficulty:</strong> {recipe.difficulty}
            </li>
            <li>
              <strong>Cuisine:</strong> {recipe.cuisine}
            </li>
            <li>
              <strong>Calories per Serving:</strong> {recipe.caloriesPerServing}
            </li>
            <li>
              <strong>Rating:</strong> {recipe.rating} / 5
            </li>
            <li>
              <strong>Reviews:</strong> {recipe.reviewCount}
            </li>
            <li>
              <strong>Meal Type:</strong> {recipe.mealType.join(', ')}
            </li>
          </ul>
          <hr className="my-4" />
          <h3 className="text-lg font-bold mb-2">Ingredients</h3>
          <ul className="list-disc list-inside pl-5 space-y-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
            {recipe.ingredients.map(ingredient => (
              <li key={ingredient} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ul className="flex flex-row gap-3 my-4">
        {recipe.tags.map(tag => (
          <li key={tag} className="bg-gray-200 rounded-full py-1 px-3">
            {tag}
          </li>
        ))}
      </ul>

      <hr className="my-4" />
      <h3 className="text-lg font-bold mb-2">Instructions</h3>
      <ol className="list-decimal list-inside pl-5 space-y-1">
        {recipe.instructions.map(instruction => (
          <li key={instruction} className="text-gray-700">
            {instruction}
          </li>
        ))}
      </ol>
    </section>
  )
}

export const RecipeDetails = memo(RecipeDetailsImpl)
