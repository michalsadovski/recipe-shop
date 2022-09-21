import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {map, take, tap} from "rxjs/operators";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    // return this.authService.user.pipe(
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {
        return authState.user
      }),
      map(user => {
      // return user ? true : false;
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    })
    );
  }

}
