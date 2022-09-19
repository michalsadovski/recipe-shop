import {Actions, ofType, Effect, createEffect} from '@ngrx/effects'
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {of, throwError} from "rxjs";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import * as AuthActions from "./auth.actions"
import {environment} from "../../../environments/environment";
import {AuthResponseData} from "../auth.service";
import {Injectable} from "@angular/core";

const handleAuthentication = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = 'An uknown error occured';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage))
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
          {email: signupAction.payload.email, password: signupAction.payload.password, returnSecureToken: true}
        )
        .pipe(
          map(resData => {
            return handleAuthentication(+resData.expiresIn, resData.email, resData.localId, resData.idToken);
          }),
          catchError(errorRes => {
            return handleError(errorRes);

          }))
    }),
  );

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
            return new AuthActions.AuthenticateSuccess({
              email: resData.email,
              userId: resData.localId,
              token: resData.idToken,
              expirationDate: expirationDate
            });
          }),
          catchError(errorRes => {
            let errorMessage = 'An uknown error occured';
            if (!errorRes.error || !errorRes.error.error) {
              return of(new AuthActions.AuthenticateFail(errorMessage))
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
            return of(new AuthActions.AuthenticateFail(errorMessage));
        }))
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
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
