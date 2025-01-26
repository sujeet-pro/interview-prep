import { useParams } from "react-router";
import { useRecipe } from "./recipes.hooks";
import { RecipeDetails } from "./recipe-details.component";

export function RecipeRoute() {
  const { id } = useParams();
  const recipe = useRecipe(id);

  if (recipe) {
    return <RecipeDetails recipe={recipe} />;
  }

  return (
    <section>
      <h2>Select a Recipe</h2>
    </section>
  );
}
