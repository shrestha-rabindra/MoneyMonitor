import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { error } from 'protractor';

@Component({
  selector: 'app-emailhandler',
  templateUrl: './emailhandler.component.html',
  styleUrls: ['./emailhandler.component.scss']
})
export class EmailhandlerComponent implements OnInit {
  mode: string;
  actionCode: string;
  continueUrl: string;
  lang: string = 'en';

  constructor(public route: ActivatedRoute,
    public authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
    //get the params from the url
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
      this.continueUrl = params['continueUrl'];
      this.lang = params['lang'];
    });

    switch (this.mode) {
      case 'verifyEmail':
        this.authService.verifyEmail(this.actionCode)
          .then((response) => {
            this.router.navigate(['confirm-email/']);
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      case 'resetPassword':
        this.authService.verifyPasswordResetCode(this.actionCode)
          .then((email) => {
            this.router.navigate(['change-password'], { queryParams: { "actionCode": this.actionCode, "email": email } });
          })
          .catch((error) => {
            console.log(error);
          });
        break;
      default:
        console.log('invalid authentication operation');

    }
  }



  @HostListener('document:DOMContentLoaded', ['$event'])
  onDocumentLoaded() {
    //window.alert('Document Loaded');
  }
}
