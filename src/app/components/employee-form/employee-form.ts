import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css'
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee = {
    id: 0,
    name: '',
    email: '',
    department: '',
    position: '',
    salary: 0,
    joinDate: ''
  };

  isEditMode = false;
  employeeId: number | null = null;

  departments = ['Engineering', 'Marketing', 'HR', 'Sales', 'Finance', 'Operations'];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.employeeId) {
      this.isEditMode = true;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        if (data) {
          this.employee = data;
        }
      },
      error: (err) => console.error('Error loading employee:', err)
    });
  }

  onSubmit(): void {
    if (this.isEditMode && this.employeeId) {
      this.employeeService.updateEmployee(this.employeeId, this.employee).subscribe({
        next: () => {
          alert('Employee updated successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error updating employee:', err)
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe({
        next: () => {
          alert('Employee added successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error adding employee:', err)
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/']);
  }
}
