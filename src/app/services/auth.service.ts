import { Injectable, NgZone } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, Data, NavigationExtras } from '@angular/router';
import { auth } from 'firebase/app';
import { DialogService } from './dailog.service';
import { ModalType } from '../enums';
import { promise } from 'protractor';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: any;
  constructor(public afAuth: AngularFireAuth,
              public afStore: AngularFirestore,
              public router: Router,
              public ngZone: NgZone,
              public dialogService: DialogService) {
                //save user in local storage
                this.afAuth.authState.subscribe(user => {
                  if (user) {
                    this.userInfo = user;
                    localStorage.setItem('user', JSON.stringify(this.userInfo));
                    JSON.parse(localStorage.getItem('user'));
                  } else {
                    localStorage.setItem('user', null);
                    JSON.parse(localStorage.getItem('user'));
                  }
                });
              }


    /**
     * logout the user
     */
    public logout(){
      return this.afAuth.auth.signOut().then(() => {
        localStorage.removeItem('user');
        this.router.navigate(['login']);
      })
    }

    /**
     * User login with email and password
     * @param email 
     * @param password 
     */
    async loginWithEmail(email, password) {
  
      let res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);

      return res;

    }


    /**
     * user signup with email and password
     * @param email 
     * @param password 
     */
  public register(email, password) {

    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      

     //this.userAlreadyExist(email).subscribe(result => {
     //  if(result.length>0) {
     //    window.alert('Another user with same email address already exist')
     //  }
     //  else{
     //     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
     //     .then((result) => {
     //       this.sendVerificationEmail(result.user);
     //       this.setUser(result.user);
     //     }).catch((error) => {
     //       window.alert(error.message)
     //     })
     //   }
     //})
    }

    public userAlreadyExist(email) {
      return this.afStore.collection('users',ref => ref.where('email', "==", email)).snapshotChanges();
    }

    /**
     * send the verification email to the sign up user
     */
  public sendVerificationEmail(user) {
      return this.afAuth.auth.currentUser.sendEmailVerification()
        .then(() => {
          let navigationExtra: NavigationExtras = {
            queryParams: {
              'user': JSON.stringify(user)
            }
          };
          this.router.navigate(['verify-email'], navigationExtra);
        } );

    }

    /**
     * submit forgot password request for the specified mail to send
     * forgot passwod email
     * @param passworResetEmail 
     */
    public submitForgotPassword(passworResetEmail){
      return this.afAuth.auth.sendPasswordResetEmail(passworResetEmail);
    }

    /**
     * Authenticate with google account
     */
    googleAuth(){
      return this.authLogin(new auth.GoogleAuthProvider());
    }


    public facebookAuth(){
      return this.authLogin(new auth.FacebookAuthProvider());
    }


    /**
     * @param provider 
     */
    public authLogin(provider) {
     
       return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
          this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
          });
          
          this.setUser(result.user);


      
    }).catch((error) => {
        window.alert(error)
      })
  }


  public isUserLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    
    //return (user !== null && user.emailVerified !== false) ? true : false;

    return user !==null;

  }

    /**
     * save the signup user into the firestore database
     * @param user 
     */
    public setUser(user){
      const userRefDoc: AngularFirestoreDocument<any> = this.afStore.doc('users/' + user.uid);
      const userData: User = {
       userId: user.uid,
       email: user.email,
       displayName: user.displayName,
       photoUrl: user.photoUrl? user.photoUrl : '',
       emailVerified: user.emailVerified
     };

     localStorage.setItem('user', JSON.stringify(user));
     
     return userRefDoc.set(userData, {
       merge: true
     });

    }

  /**
   * Verify the authentication code in the email verification link sent to the user
   * @param verificationCode
   */
  verifyEmail(verificationCode) {
    return this.afAuth.auth.applyActionCode(verificationCode);
  }

  /**
   * Verify the password reset code sent to the specified email
   * @param resetCode
   */
  verifyPasswordResetCode(resetCode) {
    return this.afAuth.auth.verifyPasswordResetCode(resetCode);

  }

  /**
   * reset the new password
   * @param resetCode
   * @param newPassword
   */
  changePassword(resetCode, newPassword) {
    return this.afAuth.auth.confirmPasswordReset(resetCode, newPassword);
  }


}
