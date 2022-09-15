import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import {shoppingListReducer} from "../shopping-list/store/shopping-list.reducer";
import * as fromAuth from "../auth/store/auth.reducer";
import {authReducer} from "../auth/store/auth.reducer";
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  shoppingList: fromShoppingList.ShoppingListState
  auth: fromAuth.AuthState
}

export const reducers: ActionReducerMap<any, any> = {
  shoppingList: shoppingListReducer,
  auth: authReducer
};
