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

  constructor(public authService: AuthService) { 
    this.registrationForm = new FormGroup({
      
    });
  }

  userEmail = new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]);
  userPwd = new FormControl('', [Validators.required, Validators.minLength(6)])

  ngOnInit(): void {
  }

}
