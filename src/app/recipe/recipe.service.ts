import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingService } from "../shopping/shopping.service";
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeUpdatedEvent = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Chocolate Cake',
  //     'Delicious chocolate cake',
  //     'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg',
  //     [
  //       new Ingredient("Chocolate", 1000),
  //       new Ingredient("Flour", 500),
  //       new Ingredient("Eggs", 2),
  //       new Ingredient("Milk", 1000)
  //     ]),
  //   new Recipe('Orange Cake',
  //     'A naturally delicious orange cake! Yay!',
  //     'https://milkandbun.files.wordpress.com/2015/01/orange-cake-1.jpg',
  //     [
  //       new Ingredient("Orange", 4),
  //       new Ingredient("Flour", 500),
  //       new Ingredient("Eggs", 2),
  //       new Ingredient("Milk", 1000)
  //     ]),
  // ];
  private recipes: Recipe[] = [];

  constructor(private shoppingService: ShoppingService) {}

  setRecipes(recipes: Recipe[]): void {
    this.recipes = recipes;
    this.recipeUpdatedEvent.next(this.recipes.slice());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeById(id: number): Recipe {
    return this.recipes.slice()[id];
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipeUpdatedEvent.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipeUpdatedEvent.next(this.recipes.slice())
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeUpdatedEvent.next(this.recipes.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingService.addIngredientList(ingredients);
  }
}
