import { Component, OnInit } from '@angular/core';
import { DialogService } from '../services/dailog.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  balance: number;
  userId: string;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem('user')).uid;

    this.balance = 100;
  }

  public addExpense(){
    //this.dialogService.showPopupDialog(this,'Add Expense', 'Save', 'Cancel', 'sm');
  }

}
