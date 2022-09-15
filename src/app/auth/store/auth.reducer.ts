import {User} from "../user.model";
import {Action} from "@ngrx/store";

export interface AuthState {
  user: User;
}

const initialState = {
  user: null
};


export function authReducer(state = initialState,
                                    action: Action) {
  // switch(action.type){
  //   // case ShoppingListActions.ADD_INGREDIENT:
  //   //
  //   //   return {
  //   //     ...state,
  //   //     ingredients: [...state.ingredients, action.payload]
  //   //   };
  //   default:
      return state;
  // }
}
