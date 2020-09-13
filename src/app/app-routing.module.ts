import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { RecipeComponent } from "./recipe/recipe.component";
import { ShoppingListComponent } from "./shopping/shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./recipe/recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent},
  { path: 'recipes', component: RecipeComponent, resolve: [RecipeResolverService], canActivate: [AuthGuard],
    children: [
      { path: 'add', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
    ]
  },
  { path: 'shopping', component: ShoppingListComponent }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
