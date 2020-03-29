import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { RegisterComponent } from './admin/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifyEmailComponent } from './admin/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AuthGuard } from './auth.guard';
import { TransactionComponent } from './transaction/transaction.component';
import { EmailhandlerComponent } from './admin/emailhandler/emailhandler.component';
import { EmailConfirmationComponent } from './admin/email-confirmation/email-confirmation.component';
import { ChangePasswordComponent } from './admin/change-password/change-password.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'dashboard', component:DashboardComponent, canActivate: [AuthGuard]},
  {path: 'verify-email', component: VerifyEmailComponent },
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'transaction/', component: TransactionComponent },
  { path: 'action', component: EmailhandlerComponent },
  { path: 'confirm-email', component: EmailConfirmationComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
