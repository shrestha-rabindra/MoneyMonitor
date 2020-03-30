import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalType, ActionType } from '../enums';
import { DialogComponent } from '../dialog/dialog.component';
import { TransactionComponent } from '../transaction/transaction.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  matDailogRef: MatDialogRef<any>;
  constructor(public modalService: NgbModal,
  public matDialog: MatDialog) {
  }

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
    showDeclineButton: boolean = modalType == ModalType.CONFIRMATION ? true : false
  ): Promise<boolean>
  {
    

      this.matDailogRef = this.matDialog.open(DialogComponent, {
      data: {
        title: title,
        message: message,
        btnAcceptText: btnAcceptText,
        btnDeclineText: btnDeclineText,
        modalType: modalType,
        showDeclineButton: showDeclineButton
        }

    });

    return this.matDailogRef.afterClosed().toPromise();
  }

  public showPopupDialog(
    contentComponent: any,
    action: string,
    contentData: any = null,
    title: string,
    dialogSize: 'sm'|'md'|'lg' = 'md'
  ) {
    const modalRef = this.modalService.open(contentComponent, { size: dialogSize, centered: true });
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.dataSource = contentData;

    return modalRef;

  }

}
