import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';
import { EmployeeCardComponent } from '../employee-card/employee-card';

@Component({
  selector: 'app-employee-list',
  imports: [CommonModule, RouterModule, EmployeeCardComponent],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (err) => console.error('Error loading employees:', err)
    });
  }

  handleDelete(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.loadEmployees();
      },
      error: (err) => console.error('Error deleting employee:', err)
    });
  }

  filterEmployees(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value.toLowerCase();
    
    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchTerm) ||
      emp.department.toLowerCase().includes(this.searchTerm) ||
      emp.position.toLowerCase().includes(this.searchTerm)
    );
  }
}
