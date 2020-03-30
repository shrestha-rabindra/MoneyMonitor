import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TransactionlistComponent } from './transactionlist/transactionlist.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AccountService } from './services/account.service';
import { DialogComponent } from './dialog/dialog.component';
import { TransactionComponent } from './transaction/transaction.component';
import { MaterialModule } from './material.module';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditRenderer } from './edit-renderer/edit-renderer.component';
import { DeleteRenderer } from './delete-renderer/delete-renderer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmailhandlerComponent } from './admin/emailhandler/emailhandler.component';
import { EmailConfirmationComponent } from './admin/email-confirmation/email-confirmation.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { PortalModule } from '@angular/cdk/portal';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    HeaderComponent,
    FooterComponent,
    TransactionlistComponent,
    DialogComponent,
    TransactionComponent,
    EditRenderer,
    DeleteRenderer,
    EmailhandlerComponent,
    EmailConfirmationComponent,
    ChangePasswordComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firbaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    CdkStepperModule,
    CdkTableModule,
    PortalModule
    
  ],
  providers: [HttpClient, AccountService, DatePipe, MatSnackBar, { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent
  ]
})
export class AppModule { }
