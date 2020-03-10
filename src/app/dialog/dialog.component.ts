import { Component, OnInit } from '@angular/core';
import { ModalType } from '../modaltype';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  modalType: ModalType;
  showDeclineButton: boolean;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public accept() {
    this.activeModal.close(true);
  }

  public decline() {
    this.activeModal.close(false);
  }

  public dismiss() {
    this.activeModal.dismiss();
  }

}
