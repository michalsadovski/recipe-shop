import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../recipes/recipe.service";
import {Recipe} from "../recipes/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
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
    return this.httpClient.get<Recipe[]>('https://recipe-shop-9f150-default-rtdb.firebaseio.com/recipes.json',
      {
        // headers: new HttpHeaders({"Custom-Header": 'HELLLLLLOOOOOOOOOOOOOO'}),
        // params: new HttpParams().set('print', 'pretty')
        // params: searchParams,
        // responseType: 'json' // ale nie text, bo przekazujemy obiekt a nie string
      })
      .pipe(map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        });
      }),
      tap(recipes => {
        this.recipeService.setRecipes(recipes);
      })
    )
  }


}
