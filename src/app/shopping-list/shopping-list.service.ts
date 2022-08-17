import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  ingredientChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('pepper', 15),
    new Ingredient('pepper', 20)
  ];

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  ingredientWasAdded(ingredient: Ingredient) {
    this.ingredients?.push(ingredient);
    this.ingredientChanged.emit(this.getIngredients());
  }

  ingredientsWasAdded(ingredient: Ingredient[]) {
    this.ingredients?.push(...ingredient);
    this.ingredientChanged.emit(this.getIngredients());

  }


}
