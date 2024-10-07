import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './auth.guard';
import { ExpensesComponent } from './expenses/expenses.component';
import { IncomesComponent } from './incomes/incomes.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'view-transactions', component: ViewTransactionsComponent },
  { path: 'incomes', component: IncomesComponent },
  { path: 'expenses', component: ExpensesComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
