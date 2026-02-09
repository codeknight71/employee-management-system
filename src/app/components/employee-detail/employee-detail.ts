import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css'
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadEmployee(id);
  }

  loadEmployee(id: number): void {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => console.error('Error loading employee:', err)
    });
  }

  onEdit(): void {
    if (this.employee) {
      this.router.navigate(['/edit-employee', this.employee.id]);
    }
  }

  onDelete(): void {
    if (this.employee && confirm(`Are you sure you want to delete ${this.employee.name}?`)) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.router.navigate(['/']);
        },
        error: (err) => console.error('Error deleting employee:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
