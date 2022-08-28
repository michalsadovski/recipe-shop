import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string | undefined;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    if (!form.valid) {
      return;
    }

    this.isLoading = true;
    if (this.isLoginMode) {
    //   // signup logic
    } else {
      this.authService.signup(email, password)
        .subscribe(
          responseData => {
            console.log(responseData);
            this.isLoading = false;
          },
          errorMessage => {
            console.log(errorMessage);
            this.error = errorMessage;
            this.isLoading = false;
          });
    }
      form.reset();
  }
}
