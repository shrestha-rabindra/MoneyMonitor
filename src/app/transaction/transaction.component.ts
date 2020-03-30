import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import { User } from 'firebase';
import { Account } from '../models/account';
import { FormGroup, Validators, FormBuilder, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { DialogService } from '../services/dailog.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { stringify } from 'querystring';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Guid } from 'guid-typescript';
import { ModalType, ActionType } from '../enums';
import { MyErrorStateMatcher } from '../utility';
import { IsLoadingService, IsLoadingDirective } from '@service-work/is-loading';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit  {
    ngAfterViewInit(): void {
      this.isLoadingService.remove({key: TransactionComponent})
    }

  title: string = "Transact";
  action: string = ActionType.ADD;
  dataSource: Account;
  isLoading: Observable<boolean>

  transactionTypes = [
    { value: 'expense', viewValue: 'Expense' },
    { value: 'income', viewValue: 'Income' }];
  
  defaultTransType = this.transactionTypes[0];

  user: User;
  transform: FormGroup;
  errorMatcher = new MyErrorStateMatcher() ;
  dateFormControl = new FormControl('', [Validators.required]);
  descFormControl = new FormControl('', [Validators.required]);
  amountFormControl = new FormControl('', [Validators.required]);
  transTypeFormControl = new FormControl('', [Validators.required]);

  constructor(public router: Router,
    public route: ActivatedRoute,
    public accountService: AccountService,
    public dialogService: DialogService,
    private snackbar: MatSnackBar,
    public activeModal: NgbActiveModal,
    private isLoadingService: IsLoadingService) {

     }

  ngOnInit() {
    this.isLoading = this.isLoadingService.isLoading$();
    this.isLoadingService.add({ key: TransactionComponent })
    this.user = JSON.parse(localStorage.getItem('user'));

    

    //set the values in the form control while editting the data
    if(this.action===ActionType.EDIT && this.dataSource!=null){
      this.dateFormControl.setValue(new Date(this.dataSource.date));
      this.descFormControl.setValue(this.dataSource.description);

      //populate the transaction type and amount in respective control based on debit and credit amount
      if (this.dataSource.debitAmount !== null && this.dataSource.debitAmount.toString() !== "") {
        this.defaultTransType = this.transactionTypes[0];
        this.amountFormControl.setValue(this.dataSource.debitAmount);
      }
      else if(this.dataSource.creditAmount!=null && this.dataSource.creditAmount.toString()!=="") {
        this.defaultTransType = this.transactionTypes[1];
        this.amountFormControl.setValue(this.dataSource.creditAmount);
      }
      
    }

    this.transTypeFormControl.setValue(this.defaultTransType);
  
  }

 
compareObjects(o1: any, o2: any): boolean {
  return o1.value === o2.value && o1.viewValue === o2.viewValue;
  
}

  async save() {

    if (!this.dateFormControl.valid || !this.descFormControl.valid || !this.amountFormControl.valid)
      return;

    let accountId: string;
    
    if(this.action===ActionType.EDIT){
      accountId = this.dataSource.id;
    }
    else{
      accountId = Guid.create().toString();
    }
    
   
    let account: Account = new Account(accountId,
                                       this.dateFormControl.value,
                                       this.descFormControl.value,
                                       this.compareObjects(this.transTypeFormControl.value,this.transactionTypes[0])?this.amountFormControl.value : null,
                                       this.compareObjects(this.transTypeFormControl.value,this.transactionTypes[1])? this.amountFormControl.value : null);
      
      try {
        await this.isLoadingService.add(this.accountService.saveTransaction(this.user.uid, account, this.action));

        this.activeModal.close(true);
      }
      catch(error){
        await this.dialogService.showDialog('Error', 'Failed to save transaction' + error, 'Ok', 'Cancel', ModalType.ERROR, false);

      }   
     
 
  }
  
  cancel(){
    this.activeModal.close(false);
  }



}
