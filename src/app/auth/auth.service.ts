import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC0DAvqnXia7C9cBO55Ab46WFSnEtCy_tg',
        {email: email, password: password, returnSecureToken: true}
      )
      .pipe(
        catchError(errorRes => {
        let errorMessage = 'An uknown error occured';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage)
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
        }
        return throwError(errorMessage);
      })
    );
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key'); // nic nie robi, ot taki example

    return this.http
      .get('https://ng-complete-guide-41326-default-rtdb.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({"Custom-Header": 'HELLLLLLOOOOOOOOOOOOOO'}),
          // params: new HttpParams().set('print', 'pretty')
          params: searchParams,
          responseType: 'json' // ale nie text, bo przekazujemy obiekt a nie string
        })
      // .pipe(
      //   map((responseData) => {
      //     const postArray: Post[] = [];
      //     for (const key in responseData) {
      //       if (responseData.hasOwnProperty(key)) {
      //         postArray.push({...responseData[key], id: key})
      //       }
      //     }
      //     return postArray;
      //   })
      // );
  }


}
