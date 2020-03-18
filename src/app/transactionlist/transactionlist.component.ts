import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { database } from 'firebase';
import { filter } from 'rxjs/operators';
import { AlignedGridsService } from 'ag-grid-community';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.scss']
})
export class TransactionlistComponent implements OnInit {
  @Input() userId: string;

  private gridApi;
  private gridColumnApi;

  domLayout = 'print';

 columnDefs = [
    {headerName: 'Date', field: 'date', sortable: true},
    {headerName: 'Description', field: 'description', filter: true, sortable: true, autoHeight: true, cellStyle: {'white-space': 'normal'}, width: 400},
    {headerName: 'Debit', field: 'debitAmount', sortable: true, cellStyle: {textAlign: 'right'}},
    {headerName: 'Credit', field: 'creditAmount', sortable: true, cellStyle: {textAlign: 'right'}}
  ];


  rowData: any;

  constructor(public accountService: AccountService,
              public http: HttpClient) { }

  ngOnInit(): void {

    //get datasource for the grid
    this.rowData = this.accountService.getAccount(this.userId);

  }

  public onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    params.api.resetRowHeights();

    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }
  
    

}
