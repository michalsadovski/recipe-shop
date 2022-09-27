import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import * as RecipeActions from "../store/recipe.actions";
import {map} from "rxjs/operators";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number | undefined;
  editMode = false;
  recipeForm!: FormGroup;

  private storeSub: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      if (isNaN(this.id)) {
        this.editMode = false;
      } else {
        this.editMode = true;
      }
      this.initForm();
    });
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub?.unsubscribe();
    }
  }

  private initForm() {
    let recipeName: string = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.id;
            });
          })
        )
        .subscribe(recipe => {
          recipeName = recipe?.name as string;
          recipeImagePath = recipe?.imagePath as string;
          recipeDescription = recipe?.description as string;
          if (recipe?.ingredients) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm?.get('ingredients'))?.controls;
  }

  onSubmit() {
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],
    // );

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id as number, this.recipeForm.value)
      this.store.dispatch(new RecipeActions.UpdateRecipe({index: this.id as number, newRecipe: this.recipeForm.value}));
    } else {
      // this.recipeService.addRecipe(this.recipeForm.value)
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onAddIngrdient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
    }))

  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.activatedRoute});
  }

  onDelete(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
