import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridOptionsWrapper } from 'ag-grid-community';
import { Account } from '../models/account';

@Component({
  selector: 'app-edit-renderer',
  template: `<div class="align-self-center mx-auto"><button color="primary" class="btn btn-sm btn-primary " (click)="edit()"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button></div>`,
  styleUrls: ['./edit-renderer.component.scss']
})
export class EditRenderer implements ICellRendererAngularComp {
  public params: any;

  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.params = params;
  }

  edit(){
    let trans: Account = new Account(this.params.data.id,this.params.data.date,this.params.data.description,this.params.data.debitAmount,this.params.data.creditAmount)
    this.params.context.parentComponent.editCallback(trans);
  }
  

  constructor() { }

}
