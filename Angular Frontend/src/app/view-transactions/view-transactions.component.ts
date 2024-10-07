import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent {
  transactions: any[] = [];

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getTransactions().subscribe((data) => {
      this.transactions = data;
    });
  }

  deleteTransaction(id: string): void {
    this.expenseService.deleteTransaction(id).subscribe(() => {
      this.transactions = this.transactions.filter(
        (transaction) => transaction._id !== id
      );
    });
  }
}
