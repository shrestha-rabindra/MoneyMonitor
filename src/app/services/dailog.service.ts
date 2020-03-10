import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalType } from '../modaltype';
import { DialogComponent } from '../dialog/dialog.component';
import { TransactionComponent } from '../transaction/transaction.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public modalService: NgbModal) { }

  /**
   * show the dialog box based specified param using the component DailogComponent
   * @param title 
   * @param message 
   * @param btnAcceptText 
   * @param btnDeclineText 
   * @param modalType 
   * @param showDeclineButton 
   * @param dialogSize 
   */
  public showDialog(
    title: string,
    message: string,
    btnAcceptText: string = "OK",
    btnDeclineText: string = "Cancel",
    modalType: ModalType = ModalType.INFORMATION,
    showDeclineButton: boolean = modalType == ModalType.CONFIRMATION ? true : false,
    dialogSize: 'sm'|'lg'|'md' = 'md'
  ): Promise<boolean>
  {
      const modalRef = this.modalService.open(DialogComponent, {size: dialogSize});
      modalRef.componentInstance.title = title;
      modalRef.componentInstance.message = message;
      modalRef.componentInstance.btnAcceptText = btnAcceptText;
      modalRef.componentInstance.btnDeclineText = btnDeclineText;
      modalRef.componentInstance.modaltype = modalType;
      modalRef.componentInstance.showDeclineButton = showDeclineButton;

      return modalRef.result;
  }

  public showPopupDialog(
    content: any,
    title: string,
    btnAcceptText: string = "OK",
    btnDeclineText: string = "Cancel",
    dialogSize: 'sm'|'md'|'lg' = 'md'
  ){
    const modalRef = this.modalService.open(TransactionComponent, {size: dialogSize});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.btnAcceptText = btnAcceptText;
    modalRef.componentInstance.btnDeclineText = btnDeclineText;

    return modalRef;

  }

}
