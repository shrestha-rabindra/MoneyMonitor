import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MyErrorStateMatcher } from '../../utility';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  errorMatcher = new MyErrorStateMatcher();
  emailSent: boolean = false;
  errorMessage: string;

  passwordResetEmail = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  resetPassword() {
    if (this.passwordResetEmail.invalid)
      return;

    this.authService.submitForgotPassword(this.passwordResetEmail.value)
      .then(() => {
        this.emailSent = true;
      }).catch((error) => {

        switch (error.code) {
          case "auth/user-not-found":
            this.passwordResetEmail.setErrors({"error-extra": true});
            this.errorMessage = 'the user does not exist';
            break;
          case "auth/invalid-email":
            this.passwordResetEmail.setErrors({'error-extra': true})
            this.errorMessage = "the email is not valid";
            break;
          default:
            //this.errorMessage = "Unexpected error, reset link could not be sent";
            break;
        }
        console.log(error);
      });
  }

}
