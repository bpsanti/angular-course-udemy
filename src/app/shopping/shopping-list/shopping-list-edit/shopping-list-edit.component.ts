import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

import { Ingredient } from "../../../shared/ingredient.model";
import { ShoppingService } from "../../shopping.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm')
  shoppingForm: NgForm;

  isEditMode: boolean = false;
  ingredientSelectedIndex: number;
  ingredientEditingSubscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredientEditingSubscription = this.shoppingService.ingredientEditingEvent.subscribe(
      (id) => {
        this.loadIngredient(id);
      }
    )
  }

  loadIngredient(id: number) {
    this.isEditMode = true;
    this.ingredientSelectedIndex = id;

    let ingredient = this.shoppingService.getIngredientById(id);
    this.shoppingForm.setValue({
      'name': ingredient.name,
      'amount': ingredient.amount
    });
  }

  onSubmit(shoppingForm: NgForm) {
    const name = shoppingForm.value.name;
    const amount = shoppingForm.value.amount;

    const ingredientToAdd = new Ingredient(name,
                                           amount);

    if (!this.isEditMode) {
      this.shoppingService.addIngredient(ingredientToAdd);
    } else {
      this.shoppingService.updateIngredient(this.ingredientSelectedIndex, ingredientToAdd);
    }

    this.onClear();
  }

  onClear() {
    this.isEditMode = false;
    this.shoppingForm.reset();
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.ingredientSelectedIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.ingredientEditingSubscription.unsubscribe();
  }
}
