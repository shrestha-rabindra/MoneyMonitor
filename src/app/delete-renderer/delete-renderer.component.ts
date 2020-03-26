import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-delete-renderer',
  template: `<div class=""><button class="btn btn-sm btn-danger " (click)="delete()"><i class="fa fa-trash" aria-hidden="true"></i></button></div>`,
  styleUrls: ['./delete-renderer.component.scss']
})
export class DeleteRenderer implements ICellRendererAngularComp {
  params: any;
  
  refresh(params: any): boolean {
    return false;
  }
  agInit(params: any): void {
    this.params = params;
  }
  

  constructor() { }

  ngOnInit(): void {
  }

  delete(){
    this.params.context.parentComponent.deleteCallback(this.params.data.id);

  }

}
