import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../../utility';
import { FormControl, Validators, AsyncValidatorFn, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  errorMatcher = new MyErrorStateMatcher();
  actionCode: string;
  email: string;
  error: boolean = false;
  errorMessage: string;

  constructor(public route: ActivatedRoute,
    public authService: AuthService,
    public router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.actionCode = params['actionCode'];
      this.email = params["email"];
    });

    //this.password.valueChanges
    //  .pipe()
    //  .subscribe(data => {
    //    this.passValue = data;
    //  });
    
  }

  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  repassword = new FormControl('', [Validators.required, this.match()]);


 
  /**
   * change/reset the password and log in with the new password
   * */
  changePassword() {
    if (this.password.invalid || this.repassword.invalid)
      return;

    //change the password and navigate to the dashboard with the changed credential
    this.authService.changePassword(this.actionCode, this.password.value)
      .then(() => {
        this.authService.loginWithEmail(this.email, this.password.value)
          .then((result) => {
            this.router.navigate(['dashboard']);
            this.authService.setUser(result.user);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        this.error = true;

        switch (error.code) {
          case "auth/expired-action-code":
            this.errorMessage = "the password reset code has expired"
            break;
          default:
            this.errorMessage = "failed to chang the password"
            break;
        }
        console.log(error);
      });
  }


  /**
   * custom validator to check if the value of the of control is matched with other given value
   * can be used to validate if the password and confirm password control has the same value or not
   * @param value
   */
  match(): ValidatorFn {
   
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      let value = this.password.value;
      if (control.value !== "" && value!=="" && control.value !== value) {
        
        return {'matched': true};
      }

      return null;
    }
  }
}
