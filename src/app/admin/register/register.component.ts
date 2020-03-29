import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MyErrorStateMatcher } from 'src/app/utility';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
registrationForm: FormGroup;
  errorMatcher = new MyErrorStateMatcher();
  errorMessage: string;

  constructor(public authService: AuthService) { 
    this.registrationForm = new FormGroup({
      
    });
  }

  userEmail = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  userPwd = new FormControl('', [Validators.required, Validators.minLength(6)])

  ngOnInit(): void {
  }

  signUp() {
    if (this.userEmail.invalid || this.userPwd.invalid)
      return;

    this.authService.register(this.userEmail.value, this.userPwd.value)
      .then((result) => {
        this.authService.sendVerificationEmail(result.user);
        this.authService.setUser(result.user);
      }).catch((error) => {
        switch (error.code) {
          case "auth/invalid-email":
            this.userEmail.setErrors({ 'error-extra': true });
            this.errorMessage = 'email is not valid';
            break;
          case "auth/email-already-in-use":
            this.userEmail.setErrors({ 'error-extra': true });
            this.errorMessage = 'email already in use by other user';
            break;
          default:
            this.userPwd.setErrors({ 'error-extra': true });
            this.errorMessage = 'unexpected error, sign up failed'
            break;
        }

        console.log(error);
      });
  }

}
