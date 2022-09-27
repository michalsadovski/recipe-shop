import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {switchMap, map, withLatestFrom} from 'rxjs/operators';
import * as fromApp from "../../store/app.reducer";

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeEffects {

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.httpClient.get<Recipe[]>('https://recipe-shop-9f150-default-rtdb.firebaseio.com/recipes.json')),
    map(recipes => new RecipesActions.SetRecipes(
      recipes
        ? recipes.map(recipe => ({ ingredients: [], ...recipe }))
        : []
      )
    )
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.httpClient.put<Recipe[]>('https://recipe-shop-9f150-default-rtdb.firebaseio.com/recipes.json', recipesState.recipes)
    }),
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromApp.AppState>) {}

}
