import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, fromDocRef } from '@angular/fire/firestore';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';
import { DatePipe } from '@angular/common';
import { Guid } from "guid-typescript";
import { ActionType } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountCollection: AngularFirestoreCollection<any>;
  accountDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore,
    public datePipe: DatePipe) { }

  /**
   * get the list of the finanacial transactions of the user
   * @param userId 
   */
  public getAccount(userId){
    this.accountCollection = this.afs.collection('users/' + userId + '/account', ref => ref.orderBy('date','desc'));
   

    return this.accountCollection
          .valueChanges()
          .pipe(map((result: Account[]) => result.map(r => new Account(r.id, r.date, r.description, r.debitAmount, r.creditAmount)) )
          );

  
  }

  /**
   * add the transaction record to the database
   * @param userId 
   * @param trans 
   * @param transType 
   */
  async saveTransaction( userId: string, trans: Account, action: string){
    const accountCollRef: AngularFirestoreCollection<any> = this.afs.collection('users').doc(userId).collection('account');
   
    let val = {
      id: trans.id,
      date: this.datePipe.transform(trans.date,'yyyy/MM/dd'),
      description: trans.description,
      creditAmount: trans.creditAmount,
      debitAmount: trans.debitAmount

    }

    if(action===ActionType.ADD)
     return accountCollRef.doc(trans.id).set(val);
    else
      return accountCollRef.doc(trans.id).update(val);
     
  }

  /**
   * delete the transaction
   * @param userId
   * @param accountId
   */
  public deleteTransaction(userId: string, accountId: string){
    return this.afs.collection('users').doc(userId).collection('account').doc(accountId).delete();


  }
}
