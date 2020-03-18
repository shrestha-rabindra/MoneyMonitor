import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionType, ModalType } from '../modaltype';
import { AccountService } from '../services/account.service';
import { User } from 'firebase';
import { Account } from '../models/account';
import { FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { DialogService } from '../services/dailog.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { stringify } from 'querystring';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  title: string = "Add Expense/Income";
  transType: string;
  user: User;
  transform: FormGroup;
  errorMatcher = new MyErrorStateMatcher() ;
  dateFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', Validators.required);
  amountFormControl = new FormControl('', Validators.required);

  constructor(public router: Router,
    public route: ActivatedRoute,
    public accountService: AccountService,
    public dialogService: DialogService) {

     }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));

    this.route.params.subscribe(params => {
      this.transType = params["trans-type"];
    })

    if (this.transType == 'income') {
      this.title = 'Add Income'
    } else {
      this.title = 'Add Expense'
      console.log(this.transType);
    }

  }

  public save() {
   
    let account: Account = new Account(this.dateFormControl.value,
                                       this.descFormControl.value,
                                       this.transType=="expense"?this.amountFormControl.value : null,
                                       this.transType=="income"? this.amountFormControl.value : null);
      
      if(this.dateFormControl.valid && this.descFormControl.valid && this.amountFormControl){
        this.accountService.addTransaction(this.user.uid, account).then(() => {
          this.router.navigate(['dashboard'])
        }).catch((error) => {
          this.dialogService.showDialog('Error', 'Failed to add transaction' + error, 'Ok', 'Cancel', ModalType.ERROR, false, 'md');
      });
        
      }
  

   
    
  }


  public decline() {
    
  }

}
