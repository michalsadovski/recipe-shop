import {Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe('Recipe name 1',
  //     'Recipe description 1',
  //     'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRr1Q0SQqYJ6-1PL1Xi0tZXVo5WrmJaMI9DNdlVd3RH1QZqfgVLlsdx4EGvUo9HNAlB32DoDk0XgrzoZmscE3s',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Salt', 1),
  //     ]
  //
  //   ),
  //   new Recipe('Recipe name 2',
  //     'Recipe description 2',
  //     'http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcRr1Q0SQqYJ6-1PL1Xi0tZXVo5WrmJaMI9DNdlVd3RH1QZqfgVLlsdx4EGvUo9HNAlB32DoDk0XgrzoZmscE3s',
  //     [
  //       new Ingredient('Carrot', 3),
  //       new Ingredient('Pepper', 1),
  //     ]
  //     ),
  // ];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,
    ) { }

  getRecipes() {
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  findRecipeById(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients))
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());

  }

}
