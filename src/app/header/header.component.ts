import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public user: any;
  constructor(public authService: AuthService) {
     this.user=localStorage.getItem('user');
   }

  ngOnInit(): void {

  }

}
