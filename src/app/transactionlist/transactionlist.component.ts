import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { database } from 'firebase';
import { filter } from 'rxjs/operators';
import { AlignedGridsService, ValueCache } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { EditRenderer } from '../edit-renderer/edit-renderer.component';
import { DeleteRenderer } from '../delete-renderer/delete-renderer.component';
import { DialogService } from '../services/dailog.service';
import { ModalType, ActionType } from '../enums'
import { TransactionComponent } from '../transaction/transaction.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-transactionlist',
  templateUrl: './transactionlist.component.html',
  styleUrls: ['./transactionlist.component.scss']
})
export class TransactionlistComponent implements OnInit {
  
  @Input() userId: string;
  title: string;
  context: any;
  frameworkComponents: any;

  private gridApi;
  private gridColumnApi;

  domLayout = 'autoHeight';

 columnDefs = [
    {headerName: 'id', field: 'id', hide:true},
    {headerName: 'Date', field: 'date', sortable: true, width:150},
    {headerName: 'Description', field: 'description', filter: true, sortable: true, autoHeight: true, cellStyle: {'white-space': 'normal'}, width: 300},
    {headerName: 'Debit', field: 'debitAmount', sortable: true, cellStyle: {textAlign: 'right'}, width:100},
    {headerName: 'Credit', field: 'creditAmount', sortable: true, cellStyle: {textAlign: 'right'}, width:100},
    {headerName: 'Edit', field: 'value', cellRenderer:'editRenderer', width: 75, editable: false, colId: 'params',cellStyle: {textAlign: 'center'}},
    {headerName: 'Delete', field: 'value', cellRenderer:'deleteRenderer', width:75, cellStyle: {textAlign: 'center'}}
  ];


  rowData: any;

  constructor(public accountService: AccountService,
              public http: HttpClient,
              public dialogService: DialogService,
              public modalService: NgbModal) {
                this.context = {parentComponent: this};
                this.frameworkComponents = {
                  editRenderer: EditRenderer,
                  deleteRenderer: DeleteRenderer
                };


               }

  ngOnInit(): void {

    this.title = 'Financial Statement';
    //get datasource for the grid
    this.rowData = this.accountService.getAccount(this.userId);

  }

  editCallback(trans: Account){
    this.dialogService.showPopupDialog(TransactionComponent, ActionType.EDIT, trans, 'Edit Transaction', 'sm');

  }

  add(){
    this.dialogService.showPopupDialog(TransactionComponent, ActionType.ADD, null, 'Add Transaction', 'sm');
  }

  //delete the specified transaction row item
  deleteCallback(accountId) {


    this.dialogService.showDialog(
      "Delete Transaction",
      'Are you sure you want to delete the transaction?',
      'Yes',
      'No',
      ModalType.CONFIRMATION,
      true)
      .then((accepted) => {
          if(accepted){
              if(accountId){
                this.accountService.deleteTransaction(this.userId,accountId)
                .then(() => {
                                              
                });
              }
          }
        })
      .catch(error => {
        console.log('Failed to delete account. Error:'+error);
      });
  
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
