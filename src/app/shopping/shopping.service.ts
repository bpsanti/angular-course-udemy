import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsUpdatedEvent = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Chocolate', 200, 'grams'),
    new Ingredient('Flour', 1000, 'grams')
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdatedEvent.emit(this.ingredients.slice());
  }

  addIngredientList(ingredientList: Ingredient[]): void {
    this.ingredients.push(...ingredientList);
    this.ingredientsUpdatedEvent.emit(this.ingredients.slice());
  }
}
