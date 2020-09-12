import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeId: number;
  selectedRecipe: Recipe;

  constructor(private recipeService: RecipeService,
              private currentRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = params['id'];

        this.selectedRecipe = this.recipeService.getRecipeById(this.recipeId);
      }
    )
  }

  onAddToShoppingList(): void {
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients);
  }

  onEditRecipe(): void {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute});
  }

  onDeleteRecipe(): void {
    this.recipeService.deleteRecipe(this.recipeId);
    this.router.navigate(['/']);
  }

}
