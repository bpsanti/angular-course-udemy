import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingService} from "../shopping/shopping.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelectedEvent = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Chocolate Cake',
      'Delicious chocolate cake',
      'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg',
      [
        new Ingredient("Chocolate", 1000, "grams"),
        new Ingredient("Flour", 500, "grams"),
        new Ingredient("Eggs", 2, "unity"),
        new Ingredient("Milk", 1000, "mls")
      ]),
    new Recipe('Chocolate Cake',
      'Delicious chocolate cake',
      'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg',
      [
        new Ingredient("Chocolate", 1000, "grams"),
        new Ingredient("Flour", 500, "grams"),
        new Ingredient("Eggs", 2, "unity"),
        new Ingredient("Milk", 1000, "mls")
      ]),
  ];

  constructor(private shoppingService: ShoppingService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientList(ingredients);
  }
}
