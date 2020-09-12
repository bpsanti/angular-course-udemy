import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEdit: boolean = false;

  recipeId: number;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private currentRoute: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.recipeId = +params['id'];
        this.isEdit = this.recipeId >= 0;

        this.initForm();
      }
    )
  }

  initForm(): void {
    let recipe: Recipe = null;

    if (this.isEdit) {
      recipe = this.recipeService.getRecipeById(this.recipeId);
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipe?.name, Validators.required),
      'imagePath': new FormControl(recipe?.imagePath, Validators.required),
      'description': new FormControl(recipe?.description, Validators.required),
      'ingredients': this.ingredientsToFormArray(recipe?.ingredients)
    });
  }

  ingredientsToFormArray(ingredients: Ingredient[]): FormArray {
    if (!ingredients) {
      return new FormArray([]);
    }

    let formGroupArray: FormGroup[] = ingredients.map((ingredient) => {
      return this.ingredientToFormGroup(ingredient)
    });

    return new FormArray(formGroupArray);
  }

  ingredientToFormGroup(ingredient: Ingredient): FormGroup {
    return new FormGroup({
      'name': new FormControl(ingredient?.name, Validators.required),
      'amount': new FormControl(ingredient?.amount, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    });
  }

  get ingredientControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


  onAddIngredient(): void {
    (<FormArray>this.recipeForm.get('ingredients')).push(this.ingredientToFormGroup(null));
  }

  onDeleteIngredient(ingredientId: number): void {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientId);
  }

  onCancel(): void {
    this.router.navigate(['recipes', this.recipeId]);
  }

  onSubmit(): void {
    let recipeId;

    if (this.isEdit) {
      this.recipeService.updateRecipe(this.recipeId, this.recipeForm.value)
      recipeId = this.recipeId;
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
      recipeId = this.recipeService.getRecipes().length - 1;
    }

    this.router.navigate(['recipes', recipeId]);
  }
}
