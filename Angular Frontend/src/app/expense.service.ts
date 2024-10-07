import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private _http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token for auth
      },
    };
  }
  getTransactions(): Observable<any> {
    return this._http.get(`${environment._api}/api/user/transaction`, this.getHeaders());
  }

  addTransaction(transaction: any): Observable<any> {
    return this._http.post(`${environment._api}/api/user/addtransaction`,transaction,this.getHeaders());
  }

  deleteTransaction(id: string): Observable<any> {
    return this._http.delete(`${environment._api}/api/user/delete/${id}`,this.getHeaders());
  }
  // Get only incomes
  getIncomes(): Observable<any> {
    return this._http.get(`${environment._api}/api/user/incomes`,this.getHeaders());
  }

  // Get only expenses
  getExpenses(): Observable<any> {
    return this._http.get(`${environment._api}/api/user/expenses`,this.getHeaders());
  }


}