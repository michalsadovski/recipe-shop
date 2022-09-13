import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import {Action} from "@ngrx/store";

export interface ShoppingListState{
  ingredients: Ingredient[];
}

const initialState: ShoppingListState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient("Tomatoes", 4),
  ]
};

export function shoppingListReducer(state: ShoppingListState = initialState,
                                    action: ShoppingListActions.ShoppingListActions): ShoppingListState {
  switch(action.type){
    case ShoppingListActions.ADD_INGREDIENT:
      console.log(action);
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {
        ...state,
        ingredients: updatedIngredients
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      console.log(action);
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
          return ingredientIndex !== action.payload
        })
      };
    default:
      return state;
  }
}
