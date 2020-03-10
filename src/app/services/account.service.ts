import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Account } from '../models/account';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';
import { DatePipe } from '@angular/common';
import { TransactionType } from '../modaltype';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  accountCollection: AngularFirestoreCollection<any>;
  accountDoc: AngularFirestoreDocument<any>;

  constructor(public afs: AngularFirestore) { }

  /**
   * get the list of the finanacial transactions of the user
   * @param userId 
   */
  public getAccount(userId){
    this.accountCollection = this.afs.collection('users/' + userId + '/account', ref => ref.orderBy('date'));

    //return this.accountCollection.valueChanges();

    return this.accountCollection
          .valueChanges()
          .pipe(map((result: Account[]) => result.map(r => new Account(r.date, r.description, r.debitAmount, r.creditAmount)) )
          );
  }

  /**
   * add the transaction record to the database
   * @param userId 
   * @param trans 
   * @param transType 
   */
  public addTransaction( userId: string, trans: Account){
    const accountCollRef: AngularFirestoreCollection<any> = this.afs.collection('users').doc(userId).collection('account');
    
    return accountCollRef.add({
      date: trans.date,
      description: trans.description,
      creditAmount: trans.creditAmount,
      debitAmount: trans.debitAmount
    });

  }
}
