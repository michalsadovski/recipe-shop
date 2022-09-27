import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Ingredient} from "../../shared/ingredient.model";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import {pipe} from "rxjs";
import {map, switchMap} from "rxjs/operators";
import * as RecipeActions from "../store/recipe.actions";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe | undefined;
  id: number | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(params => {
          return +params['id'];
        }),
        switchMap(id => {
          this.id = id;
          return this.store.select('recipes');
        }),
        map(recipesState => {
          return recipesState.recipes.find((recipe, index) => {
            return index === this.id;
          });
        })
      )
      .subscribe(recipe => {
        this.recipeDetail = recipe;
      });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // alternatywnie:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.activatedRoute});
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeDetail?.ingredients as Ingredient[]);
  }

  onDeleteRecipe() {
    // this.recipeService.deleteRecipe(this.id as number);
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id as number));
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }
}
