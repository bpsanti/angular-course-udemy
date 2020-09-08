import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Chocolate Cake', 'Delicious chocolate cake', 'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg'),
    new Recipe('Chocolate Cake', 'Delicious chocolate cake', 'https://www.crazyforcrust.com/wp-content/uploads/2020/05/chocolate-cake-recipe-9.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
