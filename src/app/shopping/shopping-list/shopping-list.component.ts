import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingService } from "../shopping.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private ingredientsEventSub: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.ingredientsEventSub = this.shoppingService.ingredientsUpdatedEvent.subscribe(
      (updatedIngredients: Ingredient[]) => {
        this.ingredients = updatedIngredients;
      }
    )
  }

  onSelectIngredient(id: number) {
    this.shoppingService.ingredientEditingEvent.next(id);
  }

  ngOnDestroy(): void {
    this.ingredientsEventSub.unsubscribe();
  }
}
