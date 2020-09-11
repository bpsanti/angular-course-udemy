import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping/shopping.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Chocolate Cake',
      'Delicious chocolate cake',
      'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg',
      [
        new Ingredient("Chocolate", 1000, "g"),
        new Ingredient("Flour", 500, "g"),
        new Ingredient("Eggs", 2, "u"),
        new Ingredient("Milk", 1000, "mls")
      ]),
    new Recipe('Orange Cake',
      'A naturally delicious orange cake! Yay!',
      'https://milkandbun.files.wordpress.com/2015/01/orange-cake-1.jpg',
      [
        new Ingredient("Orange", 4, "u"),
        new Ingredient("Flour", 500, "g"),
        new Ingredient("Eggs", 2, "u"),
        new Ingredient("Milk", 1000, "mls")
      ]),
  ];

  constructor(private shoppingService: ShoppingService) {}

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientList(ingredients);
  }
}
