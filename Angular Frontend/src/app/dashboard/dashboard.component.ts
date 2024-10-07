import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Chart, registerables } from 'chart.js';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe] 
})
export class DashboardComponent {
  totalIncome = 0;
  totalExpense = 0;
  netBalance = 0;
  transactions: any[] = [];
  recentTransactions: any[] = [];
  public lineChart: Chart | undefined;

  constructor(private expenseService: ExpenseService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.loadTransactions();
    Chart.register(...registerables); 
  }

 private loadTransactions(): void {
  debugger
  this.expenseService.getTransactions().subscribe(
    (transactions: any[]) => {
      console.log("Fetched Transactions:", transactions); 

      this.transactions = transactions;
      this.totalIncome = 0;
      this.totalExpense = 0;

      const transactionAmounts: number[] = [];
      const transactionDates: string[] = [];

      transactions.forEach((transaction: any) => {
        transactionAmounts.push(transaction.amount);
        transactionDates.push(transaction.date);

        if (transaction.type === 'income') {
          this.totalIncome += transaction.amount;
        } else if (transaction.type === 'expense') {
          this.totalExpense += transaction.amount;
        }
      });

      this.netBalance = this.totalIncome - this.totalExpense;
      this.recentTransactions = transactions.slice(-5); 
      
      console.log("Recent Transactions:", this.recentTransactions); 

      this.updateChart(transactionDates, transactionAmounts);
    },
    error => {
      console.error("Error fetching transactions:", error); 
    }
  );
}


  private updateChart(dates: string[], amounts: number[]): void {
    const incomeData = amounts.filter((_, index) => this.transactions[index].type === 'income');
    const expenseData = amounts.filter((_, index) => this.transactions[index].type === 'expense');

    const labels = dates.map(date => this.datePipe.transform(date, 'MMM d') || ''); 

    
    const data = labels.map((_, index) => {
      const income = incomeData[index] || 0; 
      const expense = expenseData[index] || 0; 
      return income - expense; 
    });

    if (this.lineChart) {
      this.lineChart.destroy(); 
    }

    this.lineChart = new Chart('lineChart', {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Income',
            data: incomeData,
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1
          },
          {
            label: 'Expense',
            data: expenseData,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            tension: 0.1
          },
          {
            label: 'Net Balance',
            data: data,
            fill: false,
            borderColor: 'rgba(54, 162, 235, 1)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Dates'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Amount'
            }
          }
        }
      }
    });
  }
  
}
