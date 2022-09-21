import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared-data/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription | undefined;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>
  ) {
  }

  ngOnInit(): void {
    // this.userSub = this.authService.user
    this.userSub = this.store.select('auth')
      .pipe(map(authState => {
        return authState.user
      }))
      .subscribe(user => {
      console.log(user);
      this.isAuthenticated = !user ? false : true;

    });
  }

  ngOnDestroy(): void {
    // @ts-ignore
    this.userSub = this.authService.user.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe();
  }

  onLogout() {
    // this.authService.logout();
    this.store.dispatch(new AuthActions.Logout());

  }
}
