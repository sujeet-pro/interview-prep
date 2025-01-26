import { createContext } from "react";
import { Recipe } from "./recipes.types";

export const recipesContext = createContext<Recipe[]>([]);
