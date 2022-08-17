import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {RecipeItemComponent} from "./recipes/recipe-list/recipe-item/recipe-item.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "./shopping-list/shopping-edit/shopping-edit.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full ' },
  { path: 'recipes', component: RecipesComponent },
  // { path: 'recipes', component: RecipesComponent,
  //   children: [
  //     { path: ':id', component: RecipeItemComponent },
  //     { path: ':id/edit', component: RecipeEditComponent },
  //   ]
  // },

  { path: 'shopping-list', component: ShoppingListComponent },

  // { path: 'shopping-list', component: ShoppingListComponent,
  //   children: [
  //     { path: ':id/edit', component: ShoppingEditComponent },
  //   ]
  // },
  // { path: 'not-found', component: PageNotFoundComponent },
  { path: 'not-found', component: ErrorPageComponent, data: {message: 'Page not found.......'} },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
