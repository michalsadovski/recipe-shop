import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from "./recipes/recipes.component";
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // { path: 'recipes', component: RecipesComponent },
  { path: 'recipes', component: RecipesComponent,
    children: [
      { path: '', component: RecipeStartComponent },
      // { path: 'recipe-list', component: RecipeListComponent },
      { path: ':id', component: RecipeDetailComponent },
    ]
  },

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
