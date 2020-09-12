import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { RecipeService } from "../recipe/recipe.service";
import { Recipe } from "../recipe/recipe.model";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  serverURL = 'https://ng-course-e7c80.firebaseio.com/';
  recipesEndpoint = this.serverURL + 'recipes.json';

  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes(): void {
    const recipesToStorage = this.recipeService.getRecipes();
    this.http
      .put(this.recipesEndpoint,
           recipesToStorage)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(this.recipesEndpoint)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
              return {
                ...recipe,
                ingredients: recipe.ingredients || []
              }
            });
        }),
        tap(
          recipes => {
            this.recipeService.setRecipes(recipes);
          }
        )
      );
  }

}
