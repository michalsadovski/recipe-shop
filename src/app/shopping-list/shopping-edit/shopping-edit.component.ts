import {Component, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {NgForm} from "@angular/forms";

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
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    f?.reset();

  }

}
