import { ShoppingListState,  shoppingListReducer } from './shopping-list.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  shoppingList: ShoppingListState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  shoppingList: shoppingListReducer
};
