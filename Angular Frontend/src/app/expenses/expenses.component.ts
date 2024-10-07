import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent {
  expenses: any[] = [];
  title: string = '';
  amount: number | null = null; 
  date: string = '';
  category: string = '';
  description: string = '';
  references: string = '';
  totalExpense: number = 0; 

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getExpenses().subscribe((data) => {
      this.expenses = data;
      this.calculateTotalExpense(); 
    });
  }

  calculateTotalExpense(): void {
    this.totalExpense = this.expenses.reduce((total, expense) => total + expense.amount, 0);
  }

  addExpense(): void {
    if (!this.title || !this.amount || !this.date || !this.category || this.amount < 0) {
      return; 
    }

    const newExpense = {
      title: this.title,
      type: 'expense',
      amount: this.amount,
      date: this.date,
      category: this.category,
      description: this.description,
      references: this.references
    };

    // SweetAlert for adding expense
    Swal.fire({
      title: 'Add Expense',
      text: `Are you sure you want to add`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.addTransaction(newExpense).subscribe((expense) => {
          this.expenses.push(expense); 
          this.calculateTotalExpense(); 
          this.resetForm();
          Swal.fire('Added!', 'Your expense has been added.', 'success');
        });
      }
    });
  }

  resetForm(): void {
    this.title = '';
    this.amount = null; 
    this.date = '';
    this.category = '';
    this.description = '';
    this.references = '';
  }

  deleteExpense(id: string): void {
    // SweetAlert for deleting expense
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.deleteTransaction(id).subscribe(() => {
          this.expenses = this.expenses.filter((expense) => expense._id !== id);
          this.calculateTotalExpense(); 
          Swal.fire('Deleted!', 'Your expense has been deleted.', 'success');
        });
      }
    });
  }
}