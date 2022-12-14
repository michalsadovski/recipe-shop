import {Actions, ofType, Effect, createEffect} from '@ngrx/effects'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import * as AuthActions from "./auth.actions"
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthEffects {

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
          {email: authData.payload.email, password: authData.payload.password, returnSecureToken: true}
        )
        .pipe(
          map(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            return new AuthActions.Login({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An uknown error occured';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.LoginFail(errorMessage))
            }
            switch (errorRes.error.error.message) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email exists already';
                break;
              case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email has not been found';
                break;
              case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
            }
            return of(new AuthActions.LoginFail(errorMessage));
        }))
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/'])
    }),
  );

  // authLogin$ = createEffect(() =>

  constructor(private actions$: Actions,
              private http: HttpClient,
              private router: Router) {
  }


}
