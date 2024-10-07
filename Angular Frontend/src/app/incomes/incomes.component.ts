import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.css']
})
export class IncomesComponent {
  incomes: any[] = [];
  totalIncome: number = 0;
  salaryTitle: string = ''; 
  amount: number | null = null; 
  date: string = ''; 
  category: string = '';
  description: string = '';
  references: string = ''; 

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.getIncomes().subscribe((data) => {
      this.incomes = data;
      this.calculateTotalIncome(); 
    });
  }

  calculateTotalIncome(): void {
    this.totalIncome = this.incomes.reduce((sum, income) => sum + income.amount, 0);
  }

  // Add new income
  addIncome(): void {
    if (!this.salaryTitle || !this.amount || !this.date || !this.category) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all required fields!',
      });
      return; 
    }

    const newIncome = {
      type: 'income',
      title: this.salaryTitle,
      amount: this.amount,
      date: this.date,
      category: this.category,
      description: this.description,
      references: this.references 
    };

    this.expenseService.addTransaction(newIncome).subscribe((income) => {
      this.incomes.push(income); 
      this.calculateTotalIncome(); 
      this.resetForm();
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Income has been added successfully!',
      });
    });
  }

  resetForm(): void {
    this.salaryTitle = '';
    this.amount = null;
    this.date = '';
    this.category = '';
    this.description = '';
    this.references = '';
  }

  // Delete income
  deleteIncome(id: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.expenseService.deleteTransaction(id).subscribe(() => {
          this.incomes = this.incomes.filter((income) => income._id !== id);
          this.calculateTotalIncome(); 
          Swal.fire(
            'Deleted!',
            'Your income has been deleted.',
            'success'
          );
        });
      }
    });
  }
}