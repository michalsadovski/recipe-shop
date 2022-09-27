import * as RecipeActions from "./recipe.actions";
import {Recipe} from "../recipe.model";

export interface RecipeState {
  recipes: Recipe[];
  editedRecipe: Recipe | undefined;
  editedRecipeIndex: number;
}

const initialState = {
  recipes: [],
  editedRecipe: null,
  editedRecipeIndex: -1
};

export function recipeReducer(state = initialState,
                              action: RecipeActions.RecipeActions) {
  switch(action.type){

    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index] as object,
        ...action.payload.newRecipe
      };
      const updatedRecipes = [...state.recipes];
      // @ts-ignore
      updatedRecipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: updatedRecipes,
      };
    case RecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload
        })
      };
    default:
      return state;
  }
}
