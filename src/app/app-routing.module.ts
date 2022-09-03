import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from "./error-page/error-page.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {AuthComponent} from "./auth/auth.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
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
