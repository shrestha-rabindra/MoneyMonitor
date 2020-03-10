import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
registrationForm: FormGroup;

  constructor(public authService: AuthService) { 
    this.registrationForm = new FormGroup({
      
    });
  }

  ngOnInit(): void {
  }

}
