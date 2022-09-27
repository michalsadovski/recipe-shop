import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';

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

  constructor(private actions$: Actions, private httpClient: HttpClient) {}

}
