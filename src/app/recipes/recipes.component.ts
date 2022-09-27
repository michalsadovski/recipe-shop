import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "./recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe | undefined;

  @Output()
  recipeWasSelected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
