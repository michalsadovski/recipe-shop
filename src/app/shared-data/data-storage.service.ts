import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as RecipeActions from '../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put('https://recipe-shop-9f150-default-rtdb.firebaseio.com/recipes.json', recipes,
        {
          observe: 'response'
        }
      )
      .subscribe(recipes => {
        console.log(recipes);
      });
  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://recipe-shop-9f150-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
          });
        }),
        tap(recipes => {
          // this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipeActions.SetRecipes(recipes))
        })
      );
  }


}
