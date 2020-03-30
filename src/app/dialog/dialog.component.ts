import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogService } from '../services/dailog.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  title: string;
  message: string;
  btnAcceptText: string;
  btnDeclineText: string;
  showDeclineButton: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public matDialog: MatDialog,
    public dialogService: DialogService) {
    this.title = data['title'];
    this.message = data['message'];
    this.btnAcceptText = data['btnAcceptText'];
    this.btnDeclineText = data['btnDeclineText'];
    this.showDeclineButton = data['showDeclineButton'];
  }

  ngOnInit(): void {
  }

}
