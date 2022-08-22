import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe: Recipe | undefined;

  @Output()
  recipeWasSelected = new EventEmitter<string>();

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

}
