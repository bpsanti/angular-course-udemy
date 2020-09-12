import { Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredientsUpdatedEvent = new Subject<Ingredient[]>();
  ingredientEditingEvent = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Chocolate', 200),
    new Ingredient('Flour', 1000)
  ];

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredientById(id: number): Ingredient {
    return this.ingredients.slice()[id];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsUpdatedEvent.next(this.ingredients.slice());
  }

  addIngredientList(ingredientList: Ingredient[]): void {
    this.ingredients.push(...ingredientList);
    this.ingredientsUpdatedEvent.next(this.ingredients.slice());
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
    this.ingredientsUpdatedEvent.next(this.ingredients.slice());
  }

  deleteIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.ingredientsUpdatedEvent.next(this.ingredients.slice());
  }
}
