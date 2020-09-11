import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,
              private currentRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        const recipeIndex = params['id'];

        this.selectedRecipe = this.recipeService.getRecipeById(recipeIndex);
      }
    )
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

}
