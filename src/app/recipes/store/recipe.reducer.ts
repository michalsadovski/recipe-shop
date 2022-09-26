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
    // case RecipeActions.ADD_RECIPE:
    //   return {
    //     ...state,
    //     recipes: [...state.recipes, action.payload]
    //   };
    // case RecipeActions.UPDATE_RECIPE:
    //   const recipe = state.recipes[state.editedRecipeIndex];
    //   const updatedRecipe = {
    //     ...recipe,
    //     ...action.payload
    //   };
    //   const updatedRecipes = [...state.recipes];
    //   updatedRecipes[state.editedRecipeIndex] = updatedRecipe;
    //   return {
    //     ...state,
    //     ingredients: updatedRecipes,
    //     editedIngredientIndex: -1,
    //     editedIngredient: null
    //   };
    // case RecipeActions.DELETE_RECIPE:
    //   return {
    //     ...state,
    //   };
    default:
      return state;
  }
}
