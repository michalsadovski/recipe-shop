import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromRecipes from "../recipes/store/recipe.reducer";
import {shoppingListReducer} from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import {authReducer} from "../auth/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";
import {recipeReducer} from "../recipes/store/recipe.reducer";

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState
  recipes: fromRecipes.RecipeState
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<any, any> = {
  shoppingList: shoppingListReducer,
  recipes: recipeReducer,
  auth: authReducer
};
