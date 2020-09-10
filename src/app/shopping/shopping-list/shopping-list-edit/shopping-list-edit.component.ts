import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from "../../../shared/ingredient.model";
import { ShoppingService } from "../../shopping.service";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {
  @ViewChild('nameInput')
  nameInput: ElementRef;

  @ViewChild('amountInput')
  amountInput: ElementRef;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    let ingredientToAdd = new Ingredient(this.nameInput.nativeElement.value,
                                         this.amountInput.nativeElement.value,
                             'grams');

    this.shoppingService.addIngredient(ingredientToAdd);
  }
}
