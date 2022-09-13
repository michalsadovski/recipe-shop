import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('f') shoppingEditForm: NgForm | undefined;
  editedItemIndex: number | undefined;
  editMode = false;
  editedItem: Ingredient | undefined;

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,
  ) { }

  ngOnInit(): void {
    this.shoppingListService.ingredientEdit.subscribe((index) => {
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.editedItemIndex = index;
      this.editMode = true;
      this.shoppingEditForm?.setValue({
        "name": this.editedItem?.name,
        "amount": this.editedItem?.amount,
      })
    })
  }

  onSubmit(f: NgForm) {
    const value = f.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex as number, newIngredient);
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
  }

  onDeleteItem() {
    this.onClearItem();
    this.shoppingListService.deleteIngredient(this.editedItemIndex as number);
  }
}
