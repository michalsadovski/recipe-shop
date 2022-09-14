import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from "../store/index";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingEditForm: NgForm | undefined;
  subscription: Subscription | undefined;
  editMode = false;
  editedItem: Ingredient | null | undefined;

  constructor(
    private store: Store<fromShoppingList.AppState>,
  ) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if (stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingEditForm?.setValue({
          "name": this.editedItem?.name,
          "amount": this.editedItem?.amount,
        })
      } else {
        this.editMode = false;
      }
    });
    // this.subscription = this.shoppingListService.ingredientEdit.subscribe((index) => {
    //   this.editedItem = this.shoppingListService.getIngredient(index);
    //   this.editedItemIndex = index;
    //   this.editMode = true;
    // })
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      // this.shoppingListService.updateIngredient(this.editedItemIndex as number, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    } else {
      // this.shoppingListService.addIngredient(newIngredient);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    f?.reset();

  }

  onClearItem() {
    this.shoppingEditForm?.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDeleteItem() {
    // this.shoppingListService.deleteIngredient(this.editedItemIndex as number);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClearItem();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }


}
