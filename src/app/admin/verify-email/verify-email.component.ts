import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {

  user: User;

  constructor(public authService: AuthService,
    public route: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.user = JSON.parse(params['user'])

    });
  }

}
