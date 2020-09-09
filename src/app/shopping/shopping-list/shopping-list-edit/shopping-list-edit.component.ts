import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../../shared/ingredient.model";

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

  @Output()
  addedIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit(): void {
  }

  onAddIngredient() {
    this.addedIngredient.emit(new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value,
      'grams'
    ))
  }
}
