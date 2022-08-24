import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] | undefined;
  private ingredientChangedSub: Subscription | undefined;

  constructor(
    private shoppingListService: ShoppingListService,
  ) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangedSub = this.shoppingListService.ingredientChanged
      .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients
      }
    )
  }

  ngOnDestroy() {
    this.ingredientChangedSub?.unsubscribe();
  }

}
