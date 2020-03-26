import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '../../utility';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  approved: boolean;
  errMsg: string;
  errorMatcher = new MyErrorStateMatcher();

  constructor(public authService: AuthService,
              public route: ActivatedRoute,
              public router: Router) { }

  //define the validation errors
  requiredValidation = Validators.required;
  emailPatternValidation = Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");

  userName = new FormControl('', [this.requiredValidation, this.emailPatternValidation]);
  userPassword = new FormControl('', [Validators.required]);


  ngOnInit(): void {
   
  }

  async signIn() {

    await this.authService.loginWithEmail(this.userName.value, this.userPassword.value)
      .then((result) => {
        this.router.navigate(['dashboard']);
        this.authService.setUser(result.user);

      }).catch((error) => {

        //this.userName.setErrors({ invalid: true });
        //this.userName.setErrors({ invalid: true });

        switch (error.code) {
            case "auth/invalid-email":
            case "auth/wrong-password":
            case "auth/user-not-found":
              {
                this.errMsg = "Wrong email address or password.";
                break;
              }
            default:
              {
                this.errMsg = "Wrong email address or password.";
                break;
              }
          }
        });
  }

}
