import { Recipe, useRecipes } from "./hooks/useRecipes";
import styles from "./app.module.css";
import { useDeferredValue, useMemo, useState } from "react";
import { RecipeDetails } from "./components/recipe.component";
import { slowSync } from "./utils/slow";
import { RecipeList } from "./components/recipe-list.component";
export default function App() {
  const recipes = useRecipes();
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [queryInput, setQueryInput] = useState("");
  const query = useDeferredValue(queryInput);

  const filteredRecipes = useMemo(() => {
    const lowerCaseQuery = query.toLowerCase();
    slowSync();
    return recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(lowerCaseQuery)
    );
  }, [query, recipes]);

  return (
    <main className={styles.layout}>
      <div>
        <input
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          disabled={!recipes.length}
        />
        <RecipeList recipes={filteredRecipes} onSelect={setSelectedRecipe} />
      </div>
      <div>
        <RecipeDetails recipe={selectedRecipe} />
      </div>
    </main>
  );
}
